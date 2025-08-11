/**
 * API Response Unwrapper Utility
 *
 * Handles API responses that may be wrapped in {"data": [...]} format.
 * Provides helper functions to safely unwrap responses while maintaining
 * backward compatibility with both wrapped and unwrapped formats.
 */

/**
 * Unwrap a single API response object
 *
 * @param response - The axios response object with a data property
 * @returns The unwrapped data
 */
export function unwrapApiResponse<T>(response: { data: any }): T {
  // Handle both wrapped and unwrapped responses
  if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    return response.data.data;
  }
  return response.data;
}

/**
 * Unwrap an API response that should contain a list/array
 *
 * @param response - The axios response object with a data property
 * @returns An array, or empty array if the response is null/undefined
 */
export function unwrapApiListResponse<T>(response: { data: any }): T[] {
  const unwrapped = unwrapApiResponse<T[] | { data: T[] }>(response);

  // If unwrapped is already an array, return it
  if (Array.isArray(unwrapped)) {
    return unwrapped;
  }

  // If unwrapped has a data property that's an array, return that
  if (
    unwrapped &&
    typeof unwrapped === 'object' &&
    'data' in unwrapped &&
    Array.isArray((unwrapped as any).data)
  ) {
    return (unwrapped as any).data;
  }

  // Return empty array for null/undefined
  return [];
}
