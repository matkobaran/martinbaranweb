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
  'BD Paris': 'events/BD_Paris',
  'BD London': 'events/BD_London', 
  'Cyber Wine': 'events/Cyber_Wine'
};

// Additional folders to process
const ADDITIONAL_FOLDERS = [
  'sports/Kendice_Kosice'
];

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

async function optimizeImageWithAspectRatio(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'contain', // Use 'contain' to preserve aspect ratio
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .webp({ quality: size.quality })
      .toFile(outputPath);
    
    console.log(`✅ Optimized with aspect ratio: ${path.basename(outputPath)} (${size.width}x${size.height})`);
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

async function processAdditionalFolder(folderPath) {
  const inputFolder = path.join(CONFIG.inputDir, folderPath);
  
  if (!fs.existsSync(inputFolder)) {
    console.log(`⚠️  Folder not found: ${inputFolder}`);
    return;
  }

  console.log(`\n🔄 Processing folder: ${folderPath}`);
  
  const files = fs.readdirSync(inputFolder);
  const imageFiles = files.filter(file => 
    CONFIG.supportedFormats.some(format => 
      file.toLowerCase().endsWith(format.toLowerCase())
    )
  );

  if (imageFiles.length === 0) {
    console.log(`⚠️  No supported images found in ${folderPath}`);
    return;
  }

  // Create output directories
  for (const sizeName of Object.keys(CONFIG.sizes)) {
    const outputDir = path.join(CONFIG.outputDir, folderPath, sizeName + 's');
    await ensureDirectoryExists(outputDir);
  }

  // Process each image
  for (const imageFile of imageFiles) {
    const inputPath = path.join(inputFolder, imageFile);
    const baseName = path.parse(imageFile).name;
    
    for (const [sizeName, size] of Object.entries(CONFIG.sizes)) {
      const outputPath = path.join(
        CONFIG.outputDir, 
        folderPath, 
        sizeName + 's', 
        `${baseName}.webp`
      );
      
      await optimizeImage(inputPath, outputPath, size);
    }
  }
  
  console.log(`✅ Completed processing ${folderPath}: ${imageFiles.length} images`);
}

async function processRootImages() {
  console.log('\n🔄 Processing root images (hero image, video thumbnails)...');
  
  // Process hero image with preserved aspect ratio
  const heroImagePath = path.join(CONFIG.inputDir, 'title.jpg');
  if (fs.existsSync(heroImagePath)) {
    const outputDir = path.join(CONFIG.outputDir, 'hero');
    await ensureDirectoryExists(outputDir);
    
    // Get original image dimensions
    const metadata = await sharp(heroImagePath).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;
    const aspectRatio = originalWidth / originalHeight;
    
    console.log(`📐 Original dimensions: ${originalWidth}x${originalHeight} (aspect ratio: ${aspectRatio.toFixed(2)})`);
    
    // Create sizes that preserve aspect ratio with higher quality for hero image
    const heroSizes = {
      thumb: { width: Math.round(400 * aspectRatio), height: 400, quality: 90 },
      medium: { width: Math.round(800 * aspectRatio), height: 800, quality: 95 },
      full: { width: Math.round(1400 * aspectRatio), height: 1400, quality: 95 }
    };
    
    for (const [sizeName, size] of Object.entries(heroSizes)) {
      const outputPath = path.join(outputDir, `title_${sizeName}.webp`);
      await optimizeImageWithAspectRatio(heroImagePath, outputPath, size);
    }
    console.log('✅ Processed hero image with preserved aspect ratio');
  }
  
  // Process video thumbnails
  const videoDir = path.join(CONFIG.inputDir, '../video');
  if (fs.existsSync(videoDir)) {
    const files = fs.readdirSync(videoDir);
    const imageFiles = files.filter(file => 
      CONFIG.supportedFormats.some(format => 
        file.toLowerCase().endsWith(format.toLowerCase())
      )
    );
    
    for (const imageFile of imageFiles) {
      const inputPath = path.join(videoDir, imageFile);
      const baseName = path.parse(imageFile).name;
      
      // Create video thumbnails directory
      const outputDir = path.join(CONFIG.outputDir, 'video-thumbnails');
      await ensureDirectoryExists(outputDir);
      
      for (const [sizeName, size] of Object.entries(CONFIG.sizes)) {
        const outputPath = path.join(outputDir, `${baseName}_${sizeName}.webp`);
        await optimizeImage(inputPath, outputPath, size);
      }
    }
    console.log(`✅ Processed ${imageFiles.length} video thumbnails`);
  }
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
  
  // Process mapped folders
  for (const folder of folders) {
    await processFolder(folder);
  }
  
  // Process additional folders that don't need mapping
  for (const folder of ADDITIONAL_FOLDERS) {
    await processAdditionalFolder(folder);
  }
  
  // Process hero image and video thumbnails
  await processRootImages();
  
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
