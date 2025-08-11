// Script to regenerate golden files by temporarily modifying the compareWithGolden method
const fs = require('fs');
const path = require('path');

const goldenDir = path.join(process.cwd(), 'tests/fixtures/golden');

// Delete existing golden files to force regeneration
const files = fs.readdirSync(goldenDir);
files.forEach(file => {
  if (file.endsWith('.json')) {
    fs.unlinkSync(path.join(goldenDir, file));
    console.log(`Deleted ${file}`);
  }
});

console.log('Golden files deleted. Now run the tests to regenerate them.');