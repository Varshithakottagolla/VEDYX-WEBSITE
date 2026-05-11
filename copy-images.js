const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\k.varshitha\\.gemini\\antigravity\\brain\\36f174ac-db5c-41ed-9110-5b61b83df5ea';
const destDir = 'C:\\Users\\k.varshitha\\Desktop\\Scratch\\public\\images\\blogs';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const jpgs = files.filter(f => f.endsWith('.jpg') && f.startsWith('media__1778068408'));

jpgs.sort().forEach((file, index) => {
  const src = path.join(srcDir, file);
  // Name them sequentially
  const dest = path.join(destDir, `blog${index + 1}.jpg`);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file} to blog${index + 1}.jpg`);
});
