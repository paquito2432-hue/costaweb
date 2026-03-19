const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'src', 'assets', 'LOGO.jpg');
const dest = path.join(__dirname, 'public', 'favicon.ico');

try {
  fs.copyFileSync(source, dest);
  console.log('Copied LOGO.jpg to public/favicon.ico');
} catch (err) {
  console.error('Error copying file:', err);
}