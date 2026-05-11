const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\k.varshitha\\.gemini\\antigravity\\brain\\36f174ac-db5c-41ed-9110-5b61b83df5ea';
const TARGET_DIR = path.join(__dirname, 'public', 'images', 'work');

// Create target directory if it doesn't exist
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Map the uploaded images to work1, work2, work3, work4
const imagesToCopy = [
  { source: 'media__1778071614757.png', dest: 'work1.png' },
  { source: 'media__1778071614785.png', dest: 'work2.png' },
  { source: 'media__1778071614833.png', dest: 'work3.png' },
  { source: 'media__1778071765103.png', dest: 'work4.png' }
];

imagesToCopy.forEach(img => {
  const sourcePath = path.join(ARTIFACT_DIR, img.source);
  const destPath = path.join(TARGET_DIR, img.dest);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${img.source} to ${img.dest}`);
    } else {
      console.log(`Could not find ${img.source} in artifacts. If this is missing, please replace public/images/work/${img.dest} manually later.`);
    }
  } catch (error) {
    console.error(`Error copying ${img.source}:`, error.message);
  }
});

console.log('Finished image copy attempt. Ensure the development server is running to see changes.');
