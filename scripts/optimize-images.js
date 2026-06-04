const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Pagal Next.js Image displayinimo dydžius, plus 2x retina margin
const targets = [
  // Above-fold (hero) — kritiški
  { file: 'hero_bg.webp', maxWidth: 1600, quality: 65, effort: 6 },
  { file: 'hero_mobile.webp', maxWidth: 720, quality: 80, effort: 6 },
  
  // Below-fold
  { file: 'whois_blumu.webp', maxWidth: 1000, quality: 78, effort: 6 },
  { file: 'blumu_privalumai.webp', maxWidth: 720, quality: 80, effort: 6 },
  { file: 'klientai.png', maxWidth: 400, quality: 85, effort: 6 },
];

async function optimize() {
  const inputDir = 'public/images';
  const backupDir = 'public/images-backup';
  
  // Backup originals
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  
  console.log('\n🔧 OPTIMIZUOJAM NUOTRAUKAS\n');
  console.log('File'.padEnd(28) + 'Old'.padEnd(12) + 'New'.padEnd(12) + 'Sutaupyta');
  console.log('─'.repeat(66));
  
  let totalOld = 0, totalNew = 0;
  
  for (const t of targets) {
    const input = path.join(inputDir, t.file);
    if (!fs.existsSync(input)) {
      console.log(`${t.file}: NĖRA, skip`);
      continue;
    }
    
    // Backup jei dar nebackup'inta
    const backup = path.join(backupDir, t.file);
    if (!fs.existsSync(backup)) fs.copyFileSync(input, backup);
    
    const oldSize = fs.statSync(input).size;
    const meta = await sharp(input).metadata();
    
    let pipe = sharp(input);
    if (meta.width > t.maxWidth) {
      pipe = pipe.resize(t.maxWidth, null, { withoutEnlargement: true });
    }
    
    const isWebP = t.file.endsWith('.webp');
    const tmp = input + '.tmp';
    
    if (isWebP) {
      await pipe.webp({ 
        quality: t.quality, 
        effort: t.effort, 
        smartSubsample: true 
      }).toFile(tmp);
    } else {
      // PNG → optimize
      await pipe.png({ 
        quality: t.quality, 
        compressionLevel: 9, 
        palette: true 
      }).toFile(tmp);
    }
    
    fs.renameSync(tmp, input);
    const newSize = fs.statSync(input).size;
    const saved = ((oldSize - newSize) / oldSize * 100).toFixed(1);
    
    totalOld += oldSize;
    totalNew += newSize;
    
    console.log(
      t.file.padEnd(28) +
      `${(oldSize/1024).toFixed(0)} KB`.padEnd(12) +
      `${(newSize/1024).toFixed(0)} KB`.padEnd(12) +
      `${saved}%`
    );
  }
  
  console.log('─'.repeat(66));
  console.log(
    'VISO'.padEnd(28) +
    `${(totalOld/1024).toFixed(0)} KB`.padEnd(12) +
    `${(totalNew/1024).toFixed(0)} KB`.padEnd(12) +
    `${((totalOld-totalNew)/totalOld*100).toFixed(1)}%`
  );
  console.log(`\n✓ Originalai backup'inti į ${backupDir}/`);
  console.log('✓ Patikrink vizualiai: npm run dev\n');
}

optimize().catch(e => { console.error(e); process.exit(1); });
