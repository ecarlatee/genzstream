/**
 * translate_overviews.js
 * Récupère les synopsis en français depuis TMDB pour toutes les œuvres du catalogue
 * Usage: node translate_overviews.js [TMDB_API_KEY]
 * 
 * L'API TMDB permet de récupérer les traductions directement via ?language=fr-FR
 * Si le synopsis FR est vide, on conserve le synopsis original en dernier recours.
 */

import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TMDB_API_KEY = process.env.TMDB_API_KEY || process.argv[2] || '';
const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN || process.argv[2] || '';

if (!TMDB_API_KEY && !TMDB_READ_TOKEN) {
  console.error('Usage: node translate_overviews.js <TMDB_API_KEY>');
  console.error('  ou : TMDB_API_KEY=xxx node translate_overviews.js');
  process.exit(1);
}

const CAT_PATH = path.join(__dirname, 'catalogue.json');
const OUT_PATH = path.join(__dirname, 'catalogue.json');
const PROGRESS_PATH = path.join(__dirname, '.translate_progress.json');

const catalogue = JSON.parse(fs.readFileSync(CAT_PATH, 'utf-8'));
const items = catalogue.all_items || [];

// Load progress if exists (to resume)
let progress = {};
if (fs.existsSync(PROGRESS_PATH)) {
  try {
    progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf-8'));
    console.log(`Reprise depuis la sauvegarde : ${Object.keys(progress).length} déjà traités`);
  } catch(e) {
    progress = {};
  }
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'GenZstream/1.0',
        'Accept': 'application/json'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); }
          catch(e) { reject(new Error('JSON parse error')); }
        } else if (res.statusCode === 429) {
          reject(new Error('RATE_LIMIT'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('TIMEOUT')); });
  });
}

async function fetchFrOverview(mediaType, tmdbId) {
  const type = mediaType === 'movie' ? 'movie' : 'tv';
  const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=fr-FR`;
  const data = await httpsGet(url);
  return data.overview || '';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveProgress() {
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 0));
}

function saveResult() {
  // Update catalogue with translated overviews
  for (const item of items) {
    const key = `${item.mediaType}:${item.tmdbId}`;
    if (progress[key] && progress[key].fr_overview) {
      item.overview = progress[key].fr_overview;
    }
  }
  
  // Also update movies/series/animes sub-arrays
  for (const section of ['movies', 'series', 'animes', 'browse']) {
    if (Array.isArray(catalogue[section])) {
      for (const item of catalogue[section]) {
        const key = `${item.mediaType}:${item.tmdbId}`;
        if (progress[key] && progress[key].fr_overview) {
          item.overview = progress[key].fr_overview;
        }
      }
    }
  }
  
  fs.writeFileSync(OUT_PATH, JSON.stringify(catalogue, null, 0));
  console.log(`\n✅ catalogue.json mis à jour avec les synopsis français.`);
}

async function main() {
  const total = items.length;
  let done = 0;
  let translated = 0;
  let errors = 0;
  let alreadyFr = 0;
  
  console.log(`\n🎬 Traduction des synopsis TMDB → Français`);
  console.log(`📚 ${total} œuvres à traiter\n`);
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = `${item.mediaType}:${item.tmdbId}`;
    
    // Skip if already done
    if (progress[key] && progress[key].done) {
      done++;
      alreadyFr++;
      if (i % 200 === 0) {
        process.stdout.write(`\r[${i+1}/${total}] Skip ${alreadyFr} déjà traités...`);
      }
      continue;
    }
    
    let attempts = 0;
    let success = false;
    
    while (attempts < 3 && !success) {
      try {
        const frOverview = await fetchFrOverview(item.mediaType, item.tmdbId);
        
        progress[key] = {
          done: true,
          fr_overview: frOverview || item.overview, // fallback to original
          has_fr: !!frOverview
        };
        
        if (frOverview) translated++;
        success = true;
        done++;
        
        process.stdout.write(`\r[${i+1}/${total}] ✅ ${translated} FR | ⚠️ ${errors} err | 🔄 ${done} done`);
        
        // Save progress every 50 items
        if (done % 50 === 0) {
          saveProgress();
        }
        
        // Rate limiting: ~40 requests/second max (TMDB allows ~40/s with API key)
        await sleep(30);
        
      } catch(e) {
        attempts++;
        if (e.message === 'RATE_LIMIT') {
          process.stdout.write(`\n⏳ Rate limit atteint, pause 10s...`);
          await sleep(10000);
        } else if (attempts < 3) {
          await sleep(1000 * attempts);
        } else {
          errors++;
          progress[key] = { done: true, fr_overview: item.overview, has_fr: false, error: e.message };
          done++;
          process.stdout.write(`\r[${i+1}/${total}] ❌ ${e.message.substring(0, 30)} | ${translated} FR | ${errors} err`);
        }
      }
    }
  }
  
  saveProgress();
  saveResult();
  
  console.log(`\n\n📊 Résultat final :`);
  console.log(`   ✅ Synopsis français trouvés : ${translated}`);
  console.log(`   ⚠️  Erreurs (synopsis original conservé) : ${errors}`);
  console.log(`   📚 Total traité : ${done}/${total}`);
  
  // Cleanup progress file
  if (done === total) {
    fs.unlinkSync(PROGRESS_PATH);
    console.log(`\n🗑️  Fichier de progression supprimé.`);
  }
}

main().catch(err => {
  console.error('\n❌ Erreur fatale:', err);
  saveProgress();
  process.exit(1);
});
