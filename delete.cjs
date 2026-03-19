const fs = require('fs');
const path = require('path');

const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
try {
  fs.unlinkSync(faviconPath);
  console.log('Deleted public/favicon.ico');
} catch (err) {
  console.error('Error deleting file:', err);
}