const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'src', 'assets', 'LOGO.jpg');
const destIco = path.join(__dirname, 'public', 'favicon.ico');
const destJpg = path.join(__dirname, 'public', 'logo.jpg');

try {
  fs.copyFileSync(source, destIco);
  console.log('Copied LOGO.jpg to public/favicon.ico');
  fs.copyFileSync(source, destJpg);
  console.log('Copied LOGO.jpg to public/logo.jpg');
} catch (err) {
  console.error('Error copying file:', err);
}