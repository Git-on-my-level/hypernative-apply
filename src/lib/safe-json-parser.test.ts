/**
 * Security-focused tests for SafeJsonParser
 * Verifies protection against prototype pollution and other JSON-based attacks
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { SafeJsonParser } from './safe-json-parser.js';

describe('SafeJsonParser Security Tests', () => {
  const simpleSchema = z.object({
    name: z.string(),
    value: z.number(),
  });

  describe('Prototype Pollution Protection', () => {
    it('should detect and reject __proto__ pollution attempts', () => {
      const maliciousJson = '{"name": "test", "value": 42, "__proto__": {"isAdmin": true}}';

      expect(() => {
        SafeJsonParser.parse(maliciousJson, simpleSchema.passthrough());
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should detect constructor.prototype pollution', () => {
      const maliciousJson =
        '{"name": "test", "value": 42, "constructor": {"prototype": {"isAdmin": true}}}';

      expect(() => {
        SafeJsonParser.parse(maliciousJson, simpleSchema.passthrough());
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should detect nested prototype pollution', () => {
      const nestedSchema = z.object({
        data: z.object({
          user: z.any(),
        }),
      });

      const maliciousJson = '{"data": {"user": {"name": "test", "__proto__": {"admin": true}}}}';

      expect(() => {
        SafeJsonParser.parse(maliciousJson, nestedSchema);
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should detect prototype pollution in arrays', () => {
      const arraySchema = z.object({
        items: z.array(z.any()),
      });

      const maliciousJson = '{"items": [{"name": "item1"}, {"__proto__": {"admin": true}}]}';

      expect(() => {
        SafeJsonParser.parse(maliciousJson, arraySchema);
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should allow legitimate constructor property that is not an object', () => {
      const validJson = '{"name": "test", "value": 42, "constructor": "MyClass"}';

      expect(() => {
        SafeJsonParser.parse(validJson, simpleSchema.passthrough());
      }).not.toThrow();
    });

    it('should allow legitimate proto property (not __proto__)', () => {
      const validJson = '{"name": "test", "value": 42, "proto": "some value"}';

      expect(() => {
        SafeJsonParser.parse(validJson, simpleSchema.passthrough());
      }).not.toThrow();
    });
  });

  describe('DoS Protection', () => {
    it('should reject payloads exceeding size limit', () => {
      // Create a large JSON payload (>10MB)
      const largeValue = 'x'.repeat(11 * 1024 * 1024); // 11MB string
      const largeJson = `{"name": "${largeValue}", "value": 42}`;

      expect(() => {
        SafeJsonParser.parse(largeJson, simpleSchema.passthrough());
      }).toThrow('JSON payload too large');
    });

    it('should accept payloads within size limit', () => {
      // Create a reasonably sized JSON payload
      const normalValue = 'x'.repeat(1000);
      const normalJson = `{"name": "${normalValue}", "value": 42}`;

      expect(() => {
        SafeJsonParser.parse(normalJson, simpleSchema.passthrough());
      }).not.toThrow();
    });

    it('should handle exactly at size limit', () => {
      // Create JSON that's exactly at the 10MB limit
      const maxValue = 'x'.repeat(10 * 1024 * 1024 - 100); // Slightly under 10MB to account for JSON structure
      const maxJson = `{"name": "${maxValue}", "value": 42}`;

      expect(() => {
        SafeJsonParser.parse(maxJson, simpleSchema.passthrough());
      }).not.toThrow();
    });
  });

  describe('JSON Syntax Validation', () => {
    it('should handle malformed JSON gracefully', () => {
      const malformedJson = '{"name": "test", "value": 42,}'; // trailing comma

      expect(() => {
        SafeJsonParser.parse(malformedJson, simpleSchema);
      }).toThrow('Invalid JSON syntax');
    });

    it('should handle completely invalid JSON', () => {
      const invalidJson = 'this is not json at all';

      expect(() => {
        SafeJsonParser.parse(invalidJson, simpleSchema);
      }).toThrow('Invalid JSON syntax');
    });

    it('should handle empty string', () => {
      expect(() => {
        SafeJsonParser.parse('', simpleSchema);
      }).toThrow('Invalid JSON syntax');
    });
  });

  describe('Schema Validation', () => {
    it('should enforce schema validation after security checks', () => {
      const validJson = '{"name": "test", "value": "not a number"}'; // wrong type

      expect(() => {
        SafeJsonParser.parse(validJson, simpleSchema);
      }).toThrow('JSON validation failed');
    });

    it('should provide detailed validation error messages', () => {
      const invalidJson = '{"name": 123, "value": "not a number"}'; // multiple errors

      try {
        SafeJsonParser.parse(invalidJson, simpleSchema);
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error.message).toContain('JSON validation failed');
        expect(error.message).toContain('name');
        expect(error.message).toContain('value');
      }
    });

    it('should pass valid data through schema validation', () => {
      const validJson = '{"name": "test", "value": 42}';

      const result = SafeJsonParser.parse(validJson, simpleSchema);
      expect(result).toEqual({ name: 'test', value: 42 });
    });
  });

  describe('Edge Cases', () => {
    it('should handle null input safely', () => {
      const nullJson = 'null';

      expect(() => {
        SafeJsonParser.parse(nullJson, z.null());
      }).not.toThrow();
    });

    it('should handle primitive values', () => {
      const numberJson = '42';

      const result = SafeJsonParser.parse(numberJson, z.number());
      expect(result).toBe(42);
    });

    it('should handle boolean values', () => {
      const booleanJson = 'true';

      const result = SafeJsonParser.parse(booleanJson, z.boolean());
      expect(result).toBe(true);
    });

    it('should handle arrays without prototype pollution', () => {
      const arrayJson = '[{"name": "item1"}, {"name": "item2"}]';
      const arraySchema = z.array(z.object({ name: z.string() }));

      const result = SafeJsonParser.parse(arrayJson, arraySchema);
      expect(result).toEqual([{ name: 'item1' }, { name: 'item2' }]);
    });

    it('should handle deeply nested objects', () => {
      const deepSchema = z.object({
        level1: z.object({
          level2: z.object({
            level3: z.object({
              value: z.string(),
            }),
          }),
        }),
      });

      const deepJson = '{"level1": {"level2": {"level3": {"value": "deep"}}}}';

      const result = SafeJsonParser.parse(deepJson, deepSchema);
      expect(result.level1.level2.level3.value).toBe('deep');
    });
  });

  describe('Real-world Attack Scenarios', () => {
    it('should prevent classic prototype pollution attack', () => {
      // This is a classic prototype pollution payload that would modify Object.prototype
      const classicAttack = '{"__proto__": {"polluted": true}}';

      expect(() => {
        SafeJsonParser.parse(classicAttack, z.any());
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should prevent constructor-based attacks', () => {
      const constructorAttack = '{"constructor": {"prototype": {"polluted": true}}}';

      expect(() => {
        SafeJsonParser.parse(constructorAttack, z.any());
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should handle complex nested attack attempts', () => {
      const complexAttack = `{
        "users": [
          {
            "name": "legitimate_user",
            "data": {
              "preferences": {
                "__proto__": {
                  "admin": true
                }
              }
            }
          }
        ]
      }`;

      expect(() => {
        SafeJsonParser.parse(complexAttack, z.any());
      }).toThrow('JSON contains potential prototype pollution');
    });

    it('should allow legitimate data that looks suspicious but is safe', () => {
      const legitimateData = `{
        "className": "proto",
        "methodName": "constructor",
        "parameters": ["__proto__"],
        "metadata": {
          "description": "This is legitimate data that mentions __proto__ in a string"
        }
      }`;

      const schema = z.object({
        className: z.string(),
        methodName: z.string(),
        parameters: z.array(z.string()),
        metadata: z.object({
          description: z.string(),
        }),
      });

      expect(() => {
        SafeJsonParser.parse(legitimateData, schema);
      }).not.toThrow();
    });
  });

  describe('Performance and Resource Safety', () => {
    it('should handle reasonable sized objects efficiently', () => {
      // Create a reasonably complex object
      const reasonableObject = {
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `user${i}`,
          data: { value: i * 2 },
        })),
      };

      const jsonString = JSON.stringify(reasonableObject);
      const schema = z.object({
        users: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            data: z.object({ value: z.number() }),
          })
        ),
      });

      expect(() => {
        SafeJsonParser.parse(jsonString, schema);
      }).not.toThrow();
    });

    it('should prevent memory exhaustion attacks', () => {
      // This would be a memory exhaustion attempt if not caught by size limit
      const memoryAttack = '{"data": "' + 'x'.repeat(11 * 1024 * 1024) + '"}';

      expect(() => {
        SafeJsonParser.parse(memoryAttack, z.any());
      }).toThrow('JSON payload too large');
    });
  });
});
