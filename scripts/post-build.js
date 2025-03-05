import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to perform replacements in a file
const replaceInFile = (filePath, search, replace) => {
  console.log(`Processing ${filePath}`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pattern = new RegExp(search, 'g');
    const updated = content.replace(pattern, replace);
    fs.writeFileSync(filePath, updated);
    console.log(`Replaced '${search}' with '${replace}' in ${filePath}`);

    // Also fix source map if it exists
    const mapPath = `${filePath}.map`;
    if (fs.existsSync(mapPath)) {
      const mapContent = fs.readFileSync(mapPath, 'utf8');
      const updatedMap = mapContent.replace(pattern, replace);
      fs.writeFileSync(mapPath, updatedMap);
      console.log(`Fixed source map for ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Process ESM and CJS builds for web
const buildDir = path.resolve(__dirname, '../dist');
const esmFile = path.join(buildDir, 'esm/index.js');

// Replace 'react-native' with 'react-native-web' in web builds
replaceInFile(esmFile, '\\breact-native\\b', 'react-native-web');

console.log('Post-build processing completed');
