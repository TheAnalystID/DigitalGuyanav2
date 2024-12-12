const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const inputDir = 'src/assets/images';
  const outputDir = 'public/images';
  
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .resize(1200, null, { // Max width 1200px, maintain aspect ratio
          withoutEnlargement: true
        })
        .toFile(outputPath);
        
      console.log(`Optimized: ${file}`);
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 