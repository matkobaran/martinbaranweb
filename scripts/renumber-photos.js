#!/usr/bin/env node

import { renumberFolder } from './optimize-images.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  inputDir: path.join(__dirname, '../public/resources/img')
};

async function renumberAllFolders() {
  console.log('🔄 Renumbering all photo folders...\n');
  
  // List of folders to renumber
  const folders = [
    'events/BD_Paris',
    'events/BD_London', 
    'events/Cyber_Wine',
    'sports/Kendice_Kosice',
    'sports/Kendice_Saris',
    'sports/Kendice_Bardejov'
  ];
  
  for (const folder of folders) {
    const fullPath = path.join(CONFIG.inputDir, folder);
    if (fs.existsSync(fullPath)) {
      await renumberFolder(folder);
    } else {
      console.log(`⚠️  Folder not found: ${folder}`);
    }
  }
  
  console.log('\n✅ Renumbering complete!');
}

// Run the script
renumberAllFolders().catch(console.error);
