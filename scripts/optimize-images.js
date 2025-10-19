#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script helps convert and organize your images into optimized WebP formats
 * with multiple sizes (thumbnails, medium, full resolution).
 * 
 * Prerequisites:
 * 1. Install sharp: npm install sharp
 * 2. Run this script from your project root
 * 3. Ensure your package.json has "type": "module"
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const CONFIG = {
  inputDir: './public/resources/img',
  outputDir: './public/resources/img',
  sizes: {
    thumb: { width: 300, height: 300, quality: 80 },
    medium: { width: 800, height: 800, quality: 85 },
    full: { width: 1920, height: 1920, quality: 90 }
  },
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp']
};

// Folder mappings (old -> new)
const FOLDER_MAPPINGS = {
  'BD Paris': 'BD_Paris',
  'BD London': 'BD_London', 
  'Cyber Wine': 'Cyber_Wine'
};

async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

async function optimizeImage(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: size.quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function processFolder(folderName) {
  const inputFolder = path.join(CONFIG.inputDir, folderName);
  const newFolderName = FOLDER_MAPPINGS[folderName] || folderName.replace(/\s+/g, '_');
  
  if (!fs.existsSync(inputFolder)) {
    console.log(`⚠️  Folder not found: ${inputFolder}`);
    return;
  }

  console.log(`\n🔄 Processing folder: ${folderName} -> ${newFolderName}`);
  
  const files = fs.readdirSync(inputFolder);
  const imageFiles = files.filter(file => 
    CONFIG.supportedFormats.some(format => 
      file.toLowerCase().endsWith(format.toLowerCase())
    )
  );

  if (imageFiles.length === 0) {
    console.log(`⚠️  No supported images found in ${folderName}`);
    return;
  }

  // Create output directories
  for (const sizeName of Object.keys(CONFIG.sizes)) {
    const outputDir = path.join(CONFIG.outputDir, newFolderName, sizeName + 's');
    await ensureDirectoryExists(outputDir);
  }

  // Process each image
  for (const imageFile of imageFiles) {
    const inputPath = path.join(inputFolder, imageFile);
    const baseName = path.parse(imageFile).name;
    
    for (const [sizeName, size] of Object.entries(CONFIG.sizes)) {
      const outputPath = path.join(
        CONFIG.outputDir, 
        newFolderName, 
        sizeName + 's', 
        `${baseName}.webp`
      );
      
      await optimizeImage(inputPath, outputPath, size);
    }
  }
  
  console.log(`✅ Completed processing ${folderName}: ${imageFiles.length} images`);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Check if sharp is installed
  try {
    await import('sharp');
  } catch (error) {
    console.error('❌ Sharp is not installed. Please run: npm install sharp');
    process.exit(1);
  }

  // Get all folders to process
  const folders = Object.keys(FOLDER_MAPPINGS);
  
  // Process each folder
  for (const folder of folders) {
    await processFolder(folder);
  }
  
  console.log('\n🎉 Image optimization completed!');
  console.log('\n📁 New folder structure:');
  console.log('public/resources/img/');
  for (const [oldName, newName] of Object.entries(FOLDER_MAPPINGS)) {
    console.log(`  ${newName}/`);
    console.log(`    thumbs/     # 300x300 WebP`);
    console.log(`    medium/     # 800x800 WebP`);
    console.log(`    full/       # 1920x1920 WebP`);
  }
  
  console.log('\n💡 Next steps:');
  console.log('1. Test your portfolio page');
  console.log('2. Remove old image folders if everything works');
  console.log('3. Consider adding a CDN for even better performance');
}

// Run the script
main().catch(console.error);

export { optimizeImage, processFolder };
