import * as fs from 'fs';
import * as path from 'path';

// Define the source and destination directories
const sourceDir = path.join(__dirname, '_site', 'vite');
const destDir = path.join(__dirname, '_site', 'jekyll');

// Read the manifest file
const manifest = JSON.parse(fs.readFileSync(path.join(sourceDir, '.vite', 'manifest.json'), 'utf-8'));

// Get the hashed filename of app.js from the manifest
const appJsManifest = manifest['src/app.js'];

if (!appJsManifest) {
  console.error('src/app.js not found in manifest.json');
  process.exit(1);
}

const hashedFilename = appJsManifest.file;

if (!fs.existsSync(path.join(destDir, 'assets', 'js'))) {
  fs.mkdirSync(path.join(destDir, 'assets', 'js'), { recursive: true });
}

// Move the files from the source to the destination directory
fs.renameSync(path.join(sourceDir, hashedFilename), path.join(destDir, hashedFilename));

// After moving the file...
const htmlFilePath = path.join(__dirname, '_site', 'jekyll', 'index.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
htmlContent = htmlContent.replace('APP_JS_FILE', hashedFilename);
fs.writeFileSync(htmlFilePath, htmlContent);
