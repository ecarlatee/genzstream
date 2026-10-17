import puppeteer from 'puppeteer';
import fs from 'fs';

async function runTests() {
  console.log('🚀 Démarrage des tests automatisés End-to-End avec Puppeteer...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      testsPassed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      testsFailed++;
    }
  }
  const delay = ms => new Promise(r => setTimeout(r, ms));

  try {
    // 1. Tester le chargement de http://localhost:3000/animes
    console.log('📌 Test 1 : Chargement de http://localhost:3000/animes');
    const response = await page.goto('http://localhost:3000/animes', { waitUntil: 'networkidle2', timeout: 15000 });
    assert(response.status() === 200, `Code de statut HTTP 200 (reçu: ${response.status()})`);
    
    const title = await page.title();
    assert(title.includes('GenZ Anime'), `Titre de page contient 'GenZ Anime' (reçu: "${title}")`);

    // Attendre le chargement des rails
    await page.waitForSelector('#rails-container .section-rail', { timeout: 10000 });
    const railsCount = await page.$$eval('#rails-container .section-rail', els => els.length);
    assert(railsCount >= 5, `Rails d'animés chargés (trouvé: ${railsCount} rubriques)`);

    // 2. Tester le Hero
    console.log('\n📌 Test 2 : Vérification du Hero Spotlight');
    const heroTitle = await page.$eval('#hero-title', el => el.textContent.trim());
    assert(heroTitle.length > 0 && heroTitle !== 'Chargement des animés...', `Hero animé affiché : "${heroTitle}"`);

    // 3. Tester la section Top 10
    console.log('\n📌 Test 3 : Vérification du Top 10 Animés');
    const top10Cards = await page.$$eval('#top-10-track .ranked-card', els => els.length);
    assert(top10Cards === 10, `Top 10 contient exactement 10 animés numérotés (trouvé: ${top10Cards})`);

    // 4. Tester la section Dragon Ball
    console.log('\n📌 Test 4 : Vérification de la Saga Dragon Ball');
    const dbCards = await page.$$eval('#dragon-ball-track .anime-card', els => els.length);
    assert(dbCards === 39, `Saga Dragon Ball contient les 39 titres (trouvé: ${dbCards})`);

    // 5. Tester la règle stricte VF : animé SANS VF ne doit JAMAIS proposer la VF
    console.log('\n📌 Test 5 : Règle stricte Audio - Animé SANS VF (ex: One-Punch Man)');
    // Chercher One-Punch Man dans la recherche
    await page.type('#search-input', 'One-Punch Man');
    await page.waitForSelector('#search-dropdown .search-item', { timeout: 5000 });
    
    // Cliquer sur le résultat One-Punch Man
    await page.$eval('#search-dropdown .search-item', el => el.click());
    await page.waitForSelector('#detail-modal', { visible: true });

    const modalTitleNoVf = await page.$eval('#modal-title', el => el.textContent.trim());
    const modalNoticeNoVf = await page.$eval('#modal-audio-notice', el => el.textContent.trim());
    const modalBadgesNoVf = await page.$eval('#modal-badges', el => el.textContent.trim());
    
    assert(modalTitleNoVf.includes('One-Punch Man'), `Fiche One-Punch Man ouverte ("${modalTitleNoVf}")`);
    assert(modalNoticeNoVf.includes('VOSTFR') && !modalNoticeNoVf.includes('VF officiel'), `Notice indique VOSTFR exclusive sans VF : "${modalNoticeNoVf.substring(0, 60)}..."`);
    assert(!modalBadgesNoVf.includes('VF Disponible'), `Le badge 'VF Disponible' n'apparaît PAS sur l'animé sans VF`);

    // Ouvrir le lecteur sur One-Punch Man
    await page.click('#modal-btn-play');
    await page.waitForSelector('#player-modal', { visible: true });

    const isVfBtnHidden = await page.$eval('#btn-audio-vf', el => el.style.display === 'none' || window.getComputedStyle(el).display === 'none');
    const isVostfrBtnVisible = await page.$eval('#btn-audio-vostfr', el => window.getComputedStyle(el).display !== 'none');
    assert(isVfBtnHidden, `Bouton VF est STRICTEMENT MASQUÉ dans le lecteur pour One-Punch Man`);
    assert(isVostfrBtnVisible, `Bouton VOSTFR est affiché et actif`);

    // Fermer le lecteur et le modal
    await page.evaluate(() => {
      closePlayerModal();
      closeDetailModal();
    });
    await delay(500);

    // 6. Tester la règle stricte VF : animé AVEC VF doit proposer VF ET VOSTFR
    console.log('\n📌 Test 6 : Règle stricte Audio - Animé AVEC VF (ex: Attack on Titan)');
    await page.click('#search-input', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await delay(200);
    await page.type('#search-input', 'Attack on Titan');
    await page.waitForFunction(() => {
      const item = document.querySelector('#search-dropdown .search-item-title');
      return item && item.textContent.includes('Attack on Titan');
    }, { timeout: 5000 });
    await page.$eval('#search-dropdown .search-item', el => el.click());
    await page.waitForSelector('#detail-modal', { visible: true });

    const modalTitleVf = await page.$eval('#modal-title', el => el.textContent.trim());
    const modalNoticeVf = await page.$eval('#modal-audio-notice', el => el.textContent.trim());
    assert(modalTitleVf.includes('Attack on Titan'), `Fiche Attack on Titan ouverte ("${modalTitleVf}")`);
    assert(modalNoticeVf.includes('VF'), `Notice confirme disponibilité de la VF pour Attack on Titan`);

    // Ouvrir le lecteur sur Attack on Titan
    await page.click('#modal-btn-play');
    await page.waitForSelector('#player-modal', { visible: true });

    const isVfBtnShown = await page.$eval('#btn-audio-vf', el => window.getComputedStyle(el).display !== 'none');
    assert(isVfBtnShown, `Bouton VF est BIEN PROPOSÉ pour Attack on Titan`);

    // Fermer le lecteur et le modal
    await page.evaluate(() => {
      closePlayerModal();
      closeDetailModal();
    });
    await delay(500);

    // 7. Tester la vue Catalogue et filtres
    console.log('\n📌 Test 7 : Vue Catalogue et filtres');
    await page.click('#nav-catalogue');
    await page.waitForSelector('#catalogue-grid .anime-card', { timeout: 8000 });

    const initialCardsCount = await page.$$eval('#catalogue-grid .anime-card', els => els.length);
    assert(initialCardsCount === 36, `Catalogue affiche 36 animés par page (trouvé: ${initialCardsCount})`);

    // Filtrer par VF
    await page.click('button[data-audio="vf"]');
    await delay(800);
    const vfCardsCount = await page.$$eval('#catalogue-grid .anime-card', els => els.length);
    assert(vfCardsCount > 0, `Filtre VF actif : ${vfCardsCount} animés affichés`);

    // 8. Tester le tunnel Cloudflare
    console.log('\n📌 Test 8 : Vérification sur le tunnel Cloudflare public');
    let tunnelUrl = '';
    try {
      tunnelUrl = fs.readFileSync('TUNNEL_URL.txt', 'utf8').trim();
    } catch (e) {}

    if (tunnelUrl && tunnelUrl.startsWith('https://')) {
      const tunnelAnimeUrl = `${tunnelUrl}/animes`;
      console.log(`  Accès au tunnel : ${tunnelAnimeUrl}`);
      const tunnelPage = await browser.newPage();
      const tunnelRes = await tunnelPage.goto(tunnelAnimeUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      assert(tunnelRes.status() === 200, `Tunnel public HTTP 200 OK (${tunnelRes.status()})`);
      const tunnelTitle = await tunnelPage.title();
      assert(tunnelTitle.includes('GenZ Anime'), `Tunnel affiche GenZ Anime ("${tunnelTitle}")`);
      await tunnelPage.close();
    } else {
      console.log('  ⚠️ TUNNEL_URL.txt non trouvé ou invalide, ignoré.');
    }

    // Erreurs console
    console.log('\n📌 Vérification des erreurs JavaScript en console :');
    const fatalErrors = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('404') && !e.includes('manifest'));
    if (fatalErrors.length === 0) {
      console.log('  ✅ [PASS] 0 erreur critique JavaScript en console !');
      testsPassed++;
    } else {
      console.warn('  ⚠️ Avertissements / erreurs console :', fatalErrors);
    }

  } catch (err) {
    console.error('❌ ERREUR PENDANT LE TEST :', err);
    testsFailed++;
  } finally {
    await browser.close();
  }

  console.log('\n======================================================');
  console.log(`  RÉSULTATS : ${testsPassed} tests réussis, ${testsFailed} échecs.`);
  console.log('======================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
