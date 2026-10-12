import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let catalogueData = null;
const itemsMap = new Map();

try {
  const catRaw = fs.readFileSync(path.join(__dirname, 'catalogue.json'), 'utf-8');
  catalogueData = JSON.parse(catRaw);
  if (catalogueData && catalogueData.all_items) {
    for (const it of catalogueData.all_items) {
      itemsMap.set(`${it.mediaType}:${it.tmdbId}`, it);
      itemsMap.set(String(it.tmdbId), it);
      if (it.imdbId) {
        itemsMap.set(it.imdbId, it);
        itemsMap.set(`${it.mediaType}:${it.imdbId}`, it);
      }
    }
  }
  console.log(`[CATALOGUE] Chargé avec succès : ${catalogueData?.all_items?.length || 0} œuvres indexées.`);
} catch (e) {
  console.error('[CATALOGUE] Erreur de chargement de catalogue.json:', e.message);
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webmanifest': 'application/manifest+json'
};

function sendJson(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  });
  res.end(JSON.stringify(data));
}

function cleanOverview(text) {
  if (!text) return '';
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();
}

function formatMediaDetail(it) {
  const isMovie = it.mediaType === 'movie';
  const releaseYear = it.releaseYear || 2023;
  const releaseDate = it.releaseDate || `${releaseYear}-01-01`;
  const epCount = it.episodes || (isMovie ? 0 : 12);

  let seasons = [];
  if (!isMovie) {
    if (it.kind === 'animes') {
      seasons = [
        { seasonNumber: 1, name: 'Saison 1', episodeCount: Math.max(1, epCount) }
      ];
    } else if (epCount > 24) {
      const s1Count = Math.min(24, Math.ceil(epCount / 2));
      const s2Count = epCount - s1Count;
      seasons = [
        { seasonNumber: 1, name: 'Saison 1', episodeCount: s1Count },
        { seasonNumber: 2, name: 'Saison 2', episodeCount: s2Count }
      ];
    } else {
      seasons = [
        { seasonNumber: 1, name: 'Saison 1', episodeCount: Math.max(1, epCount) }
      ];
    }
  }

  return {
    tmdbId: it.tmdbId,
    mediaType: it.mediaType,
    contentType: isMovie ? 'movie' : 'series',
    title: it.title,
    posterPath: it.posterPath || null,
    backdropPath: it.backdropPath || it.posterPath || null,
    logoPath: it.logoPath || null,
    releaseDate,
    releaseYear,
    runtime: it.runtime || (isMovie ? 115 : 24),
    voteAverage: it.voteAverage || 8.0,
    genres: it.genres && it.genres.length > 0 ? it.genres : ['Action', 'Aventure'],
    overview: cleanOverview(it.overview) || 'Synopsis non renseigné.',
    tagline: it.tagline || '',
    sousTitres: true,
    audiodescription: false,
    hauteQualite: true,
    hasLinks: true,
    languages: ['VF', 'VOSTFR'],
    seasons,
    reviewCount: 18,
    reviewAverage: it.voteAverage || 8.2,
    favoriteCount: 120,
    youtubeId: it.youtubeId || null,
    nextEpisode: null
  };
}

function generateEpisodes(it, seasonNumber = 1) {
  const detail = formatMediaDetail(it);
  const season = (detail.seasons && detail.seasons.find(s => s.seasonNumber === seasonNumber)) || { seasonNumber, episodeCount: 12 };
  const epCount = season.episodeCount || 12;
  const episodes = [];

  for (let i = 1; i <= epCount; i++) {
    episodes.push({
      id: `${it.tmdbId}_S${String(seasonNumber).padStart(2, '0')}E${String(i).padStart(2, '0')}`,
      episodeNumber: i,
      episodeNumberEnd: i,
      name: `Épisode ${i}`,
      overview: `Épisode ${i} de la saison ${seasonNumber} de ${it.title}.`,
      stillPath: it.backdropPath || it.posterPath || null,
      stillUrl: it.backdropPath || it.posterPath || null,
      hasLinks: true,
      airDate: `${it.releaseYear || 2023}-01-01`,
      runtime: 24
    });
  }

  return { episodes };
}

function generateAnnexes(it) {
  const all = (catalogueData && catalogueData.all_items) || [];
  const similarItems = all
    .filter(other => other.tmdbId !== it.tmdbId && (other.kind === it.kind || other.mediaType === it.mediaType))
    .slice(0, 12)
    .map(other => ({
      tmdbId: other.tmdbId,
      mediaType: other.mediaType,
      contentType: other.mediaType === 'movie' ? 'movie' : 'series',
      title: other.title,
      posterPath: other.posterPath,
      backdropPath: other.backdropPath,
      releaseYear: other.releaseYear,
      voteAverage: other.voteAverage,
      genres: other.genres,
      hasLinks: true
    }));

  return {
    cast: [
      { id: 1, name: 'Voix / Acteur principal', character: 'Protagoniste', profilePath: null },
      { id: 2, name: 'Second rôle', character: 'Allié', profilePath: null }
    ],
    realisation: [
      { id: 10, name: 'Studio / Réalisateur', job: 'Réalisateur', profilePath: null }
    ],
    similar: similarItems,
    saga: null
  };
}

const animeStreamCache = new Map();
const animeImdbCache = new Map();
const openSubtitlesCache = new Map();
const subtitleVttCache = new Map();
const animeSamaSlugCache = new Map();
const animeVfStreamCache = new Map();

function srtToVtt(srt) {
  let cleaned = (srt || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
  if (cleaned.includes('Ã')) {
    try {
      cleaned = Buffer.from(cleaned, 'latin1').toString('utf8');
    } catch (e) {}
  }
  cleaned = cleaned.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
  return 'WEBVTT\n\n' + cleaned;
}

async function getAnimeImdbId(title) {
  if (!title) return null;
  if (animeImdbCache.has(title)) return animeImdbCache.get(title);

  try {
    const clean = title.replace(/:/g, ' ').replace(/\s+/g, ' ').trim();
    const res = await fetch(`https://v3-cinemeta.strem.io/catalog/series/top/search=${encodeURIComponent(clean)}.json`, {
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const json = await res.json();
      const meta = (json.metas || [])[0];
      if (meta && meta.id) {
        animeImdbCache.set(title, meta.id);
        return meta.id;
      }
    }
  } catch (e) {
    console.error(`[CINEMETA ERROR] for ${title}:`, e.message);
  }
  return null;
}

async function getFrenchSubtitles(imdbId, season = 1, episode = 1) {
  if (!imdbId) return null;
  const key = `${imdbId}:${season}:${episode}`;
  if (openSubtitlesCache.has(key)) return openSubtitlesCache.get(key);

  try {
    const res = await fetch(`https://opensubtitles-v3.strem.io/subtitles/series/${imdbId}:${season}:${episode}.json`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const json = await res.json();
      const frSubs = (json.subtitles || []).filter(s => s.lang === 'fre' || s.lang === 'fra' || s.lang === 'fr');
      if (frSubs.length > 0) {
        const url = frSubs[0].url;
        openSubtitlesCache.set(key, url);
        return url;
      }
    }
  } catch (e) {
    console.error(`[OPENSUBTITLES ERROR] for ${key}:`, e.message);
  }
  return null;
}

async function getAnimeSamaSlug(title) {
  if (!title) return null;
  if (animeSamaSlugCache.has(title)) return animeSamaSlugCache.get(title);

  const clean = title.toLowerCase().trim();
  const directMap = {
    'attack on titan': 'shingeki-no-kyojin',
    'shingeki no kyojin': 'shingeki-no-kyojin',
    "l'attaque des titans": 'shingeki-no-kyojin',
    'demon slayer': 'demon-slayer',
    'demon slayer: kimetsu no yaiba': 'demon-slayer',
    'kimetsu no yaiba': 'demon-slayer',
    'death note': 'death-note',
    'jujutsu kaisen': 'jujutsu-kaisen',
    'one piece': 'one-piece',
    'chainsaw man': 'chainsaw-man',
    'solo leveling': 'solo-leveling',
    'naruto': 'naruto',
    'naruto shippuden': 'naruto-shippuden',
    'hunter x hunter': 'hunter-x-hunter-2011',
    'my hero academia': 'my-hero-academia',
    'boku no hero academia': 'my-hero-academia',
    'bleach': 'bleach',
    'fullmetal alchemist: brotherhood': 'fullmetal-alchemist-brotherhood',
    'fullmetal alchemist brotherhood': 'fullmetal-alchemist-brotherhood',
    'tokyo ghoul': 'tokyo-ghoul',
    'sword art online': 'sword-art-online',
    'vinland saga': 'vinland-saga',
    'black clover': 'black-clover',
    'dragon ball z': 'dragon-ball-z',
    'dragon ball super': 'dragon-ball-super'
  };

  for (const [key, slug] of Object.entries(directMap)) {
    if (clean === key || clean.startsWith(key)) {
      animeSamaSlugCache.set(title, slug);
      return slug;
    }
  }

  try {
    const searchRes = await fetch('https://anime-sama.to/template-php/defaut/fetch.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: `query=${encodeURIComponent(title.replace(/:/g, ' ').slice(0, 30))}`,
      signal: AbortSignal.timeout(5000)
    });
    if (searchRes.ok) {
      const html = await searchRes.text();
      const regex = /<a href="https:\/\/anime-sama\.to\/catalogue\/([^"/]+)\/"/g;
      let m;
      const matches = [];
      while ((m = regex.exec(html)) !== null) {
        matches.push(m[1]);
      }
      if (matches.length > 0) {
        const nonSpinOff = matches.find(s => !s.includes('chuugakkou') && !s.includes('junior') && !s.includes('spin-off')) || matches[0];
        animeSamaSlugCache.set(title, nonSpinOff);
        return nonSpinOff;
      }
    }
  } catch (e) {
    console.error(`[ANIME-SAMA SEARCH ERROR] for ${title}:`, e.message);
  }
  return null;
}

async function extractVidmolyM3u8(link) {
  if (!link) return null;
  const idMatch = link.match(/embed-([a-zA-Z0-9]+)\.html/);
  if (!idMatch) return null;
  const id = idMatch[1];
  const embedUrl = `https://vidmoly.biz/embed-${id}.html`;
  try {
    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://anime-sama.to/'
      },
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m3u8Match = html.match(/file:\s*["']([^"']+\.m3u8[^"']*)["']/i);
    return m3u8Match ? m3u8Match[1] : null;
  } catch (e) {
    return null;
  }
}

async function resolveAnimeVfStream(title, season = 1, episodeNumber = 1) {
  const cacheKey = `${title}_${season}_${episodeNumber}`;
  const cached = animeVfStreamCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < 15 * 60 * 1000) {
    return cached.data;
  }

  const slug = await getAnimeSamaSlug(title);
  if (!slug) return null;

  try {
    const url = `https://anime-sama.to/catalogue/${slug}/saison${season}/vf/episodes.js`;
    let res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok && season === 1) {
      res = await fetch(`https://anime-sama.to/catalogue/${slug}/vf/episodes.js`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(5000)
      });
    }

    if (res && res.ok) {
      const code = await res.text();
      const arrayRegex = /var\s+eps(\d+)\s*=\s*\[([\s\S]*?)\];/g;
      let m;
      const vidmolyLinks = [];
      const sendvidLinks = [];
      while ((m = arrayRegex.exec(code)) !== null) {
        const links = m[2].split(',').map(s => s.trim().replace(/'/g, '')).filter(s => s.startsWith('http'));
        const epLink = links[episodeNumber - 1];
        if (epLink) {
          if (epLink.includes('vidmoly') || epLink.includes('ansembed')) {
            vidmolyLinks.push(epLink);
          } else if (epLink.includes('sendvid')) {
            sendvidLinks.push(epLink);
          }
        }
      }

      // Try Vidmoly first
      for (const link of vidmolyLinks) {
        const m3u8 = await extractVidmolyM3u8(link);
        if (m3u8) {
          const proxiedHls = `/api/v1/stream/hls?url=${encodeURIComponent(m3u8)}&referer=${encodeURIComponent('https://vidmoly.biz/')}`;
          const result = {
            url: link,
            hls: proxiedHls,
            hlsProgressif: false,
            direct: false,
            hote: 'GenZ VF HD (1080p)',
            downloads: [],
            downloadUrl: null,
            sousTitres: [],
            generiques: null
          };
          animeVfStreamCache.set(cacheKey, { timestamp: Date.now(), data: result });
          return result;
        }
      }

      // Try Sendvid
      for (const link of sendvidLinks) {
        try {
          const svRes = await fetch(link, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            signal: AbortSignal.timeout(5000)
          });
          if (svRes.ok) {
            const html = await svRes.text();
            const srcMatch = html.match(/source\s+src="([^"]+)"/i) || html.match(/"(https?:\/\/[^"]+\.mp4[^"]*)"/i);
            if (srcMatch && srcMatch[1]) {
              const mp4Url = srcMatch[1];
              const result = {
                url: link,
                hls: mp4Url,
                hlsProgressif: true,
                direct: true,
                hote: 'GenZ VF HD (Direct)',
                downloads: [],
                downloadUrl: mp4Url,
                sousTitres: [],
                generiques: null
              };
              animeVfStreamCache.set(cacheKey, { timestamp: Date.now(), data: result });
              return result;
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {
    console.error(`[RESOLVE ANIME VF ERROR] for ${title} S${season}E${episodeNumber}:`, e.message);
  }

  return null;
}

async function resolveAnimeStream(aniId, episodeNumber, lang, item = null, season = 1) {
  // If requesting true VF, resolve through the anime VF engine
  if (lang === 'vf') {
    const vfData = await resolveAnimeVfStream(item ? item.title : '', season, episodeNumber);
    if (vfData) return vfData;
  }

  const track = (lang === 'vf' || lang === 'dub' || lang === 'va') ? 'dub' : 'sub';
  const cacheKey = `${aniId}_${episodeNumber}_${track}_${season}`;
  const cached = animeStreamCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < 15 * 60 * 1000) {
    return cached.data;
  }

  const embedUrl = `https://anixo.buzz/embed/ani/${aniId}/${episodeNumber}?track=${track}`;

  let res;
  try {
    res = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Referer': 'https://anixo.buzz/'
      },
      signal: AbortSignal.timeout(6000)
    });
  } catch (err) {
    console.error(`[STREAM RESOLVE TIMEOUT] ${embedUrl}:`, err.message);
  }

  if ((!res || !res.ok) && track === 'dub') {
    try {
      res = await fetch(`https://anixo.buzz/embed/ani/${aniId}/${episodeNumber}?track=sub`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
          'Referer': 'https://anixo.buzz/'
        },
        signal: AbortSignal.timeout(6000)
      });
    } catch (e) {}
  }

  if (res && res.ok) {
    const html = await res.text();
    const match = html.match(/window\.__INITIAL_STREAM__\s*=\s*(\{.*?\});/);
    if (match) {
      try {
        const rawData = JSON.parse(match[1]);
        if (rawData.streamUrl) {
          const proxiedHls = `/api/v1/stream/hls?url=${encodeURIComponent(rawData.streamUrl)}`;

          // Find French subtitles if this is VOSTFR
          let frenchSrtUrl = null;
          if (track === 'sub') {
            const animeTitle = item ? item.title : null;
            let imdbId = item ? item.imdbId : null;
            if (!imdbId && animeTitle) {
              imdbId = await getAnimeImdbId(animeTitle);
            }
            if (imdbId) {
              frenchSrtUrl = await getFrenchSubtitles(imdbId, season, episodeNumber);
            }
          }

          const formattedSubs = [];
          if (frenchSrtUrl) {
            formattedSubs.push({
              url: `/api/v1/stream/vtt?srt=${encodeURIComponent(frenchSrtUrl)}`,
              label: 'Français (VOSTFR)',
              langue: 'fr',
              defaut: true
            });
          }

          const rawSubs = rawData.subtitles || [];
          for (const s of rawSubs) {
            const isFr = s.label.toLowerCase().includes('fr');
            if (isFr && !frenchSrtUrl) {
              formattedSubs.push({
                url: `/api/v1/stream/vtt?url=${encodeURIComponent(s.url)}`,
                label: s.label,
                langue: 'fr',
                defaut: true
              });
            } else if (!isFr) {
              formattedSubs.push({
                url: `/api/v1/stream/vtt?url=${encodeURIComponent(s.url)}`,
                label: s.label,
                langue: s.label.toLowerCase().includes('eng') ? 'en' : 'autre',
                defaut: false
              });
            }
          }

          // If still no French track in VOSTFR, provide auto-translated track from English
          if (track === 'sub' && !formattedSubs.some(s => s.langue === 'fr')) {
            const engSub = rawSubs.find(s => s.label.toLowerCase().includes('eng')) || rawSubs[0];
            if (engSub) {
              formattedSubs.unshift({
                url: `/api/v1/stream/vtt?url=${encodeURIComponent(engSub.url)}&translate=fr`,
                label: 'Français (VOSTFR Traduit)',
                langue: 'fr',
                defaut: true
              });
            }
          }

          const generiques = {
            intro: rawData.intro ? { debutMs: rawData.intro.start * 1000, finMs: rawData.intro.end * 1000 } : null,
            outro: rawData.outro ? { debutMs: rawData.outro.start * 1000, finMs: rawData.outro.end * 1000 } : null
          };

          const result = {
            url: embedUrl,
            hls: proxiedHls,
            hlsProgressif: false,
            direct: false,
            hote: rawData.server || 'GenZ Player HD',
            downloads: [],
            downloadUrl: null,
            sousTitres: formattedSubs,
            generiques
          };

          animeStreamCache.set(cacheKey, { timestamp: Date.now(), data: result });
          return result;
        }
      } catch (e) {
        console.error('[STREAM PARSE ERROR]:', e.message);
      }
    }
  }

  return {
    url: embedUrl,
    hls: null,
    hlsProgressif: false,
    direct: false,
    hote: 'Anixo Direct',
    downloads: [],
    downloadUrl: null,
    sousTitres: []
  };
}

function generateLinks(it, season = 1, episodeNumber = 1) {
  const isAnime = it.kind === 'animes';
  const isMovie = it.mediaType === 'movie';
  const tmdbId = it.tmdbId;

  if (isAnime) {
    return [
      {
        id: `genzhd_${tmdbId}_${season}_${episodeNumber}_vostfr`,
        name: 'Lecteur 1 · GenZ HD (VOSTFR)',
        provider: 'genzhd',
        language: 'VOSTFR',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `vidsrc_${tmdbId}_${season}_${episodeNumber}_vostfr`,
        name: 'Lecteur 2 · VidSrc HD (VOSTFR)',
        provider: 'vidsrc',
        language: 'VOSTFR',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `genzvf_${tmdbId}_${season}_${episodeNumber}_vf`,
        name: 'Lecteur 1 · GenZ HD (VF)',
        provider: 'genzvf',
        language: 'VF',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `vidsrc_${tmdbId}_${season}_${episodeNumber}_vf`,
        name: 'Lecteur 2 · VidSrc HD (VF)',
        provider: 'vidsrc',
        language: 'VF',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `genzhd_${tmdbId}_${season}_${episodeNumber}_va`,
        name: 'Lecteur 3 · GenZ HD (Version Anglaise / Dub)',
        provider: 'genzhd',
        language: 'VO',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      }
    ];
  }

  if (isMovie) {
    return [
      {
        id: `vidsrc_${tmdbId}_1_1_vf`,
        name: 'Lecteur 1 · VidSrc HD (VF / VOSTFR)',
        provider: 'vidsrc',
        language: 'VF',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `vidsrcpm_${tmdbId}_1_1_vostfr`,
        name: 'Lecteur 2 · VidSrc PM (VF / Multi)',
        provider: 'vidsrcpm',
        language: 'VOSTFR',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `autoembed_${tmdbId}_1_1_multi`,
        name: 'Lecteur 3 · AutoEmbed (Multi)',
        provider: 'autoembed',
        language: 'VOSTFR',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      },
      {
        id: `vidlink_${tmdbId}_1_1_multi`,
        name: 'Lecteur 4 · VidLink HD (Multi)',
        provider: 'vidlink',
        language: 'VOSTFR',
        quality: '1080p',
        zplayer: true,
        hasLinks: true
      }
    ];
  }

  return [
    {
      id: `vidsrc_${tmdbId}_${season}_${episodeNumber}_vf`,
      name: 'Lecteur 1 · VidSrc HD (VF / VOSTFR)',
      provider: 'vidsrc',
      language: 'VF',
      quality: '1080p',
      zplayer: true,
      hasLinks: true
    },
    {
      id: `vidsrcpm_${tmdbId}_${season}_${episodeNumber}_vostfr`,
      name: 'Lecteur 2 · VidSrc PM (VF / Multi)',
      provider: 'vidsrcpm',
      language: 'VOSTFR',
      quality: '1080p',
      zplayer: true,
      hasLinks: true
    },
    {
      id: `autoembed_${tmdbId}_${season}_${episodeNumber}_multi`,
      name: 'Lecteur 3 · AutoEmbed (Multi)',
      provider: 'autoembed',
      language: 'VOSTFR',
      quality: '1080p',
      zplayer: true,
      hasLinks: true
    },
    {
      id: `vidlink_${tmdbId}_${season}_${episodeNumber}_multi`,
      name: 'Lecteur 4 · VidLink HD (Multi)',
      provider: 'vidlink',
      language: 'VOSTFR',
      quality: '1080p',
      zplayer: true,
      hasLinks: true
    }
  ];
}

function getRandomItems(count = 14, kind = null, genre = null) {
  let pool = (catalogueData && catalogueData.all_items) || [];
  if (kind === 'films') pool = (catalogueData && catalogueData.movies) || [];
  else if (kind === 'series') pool = (catalogueData && catalogueData.series) || [];
  else if (kind === 'animes') pool = (catalogueData && catalogueData.animes) || [];

  if (genre) {
    const gLower = genre.toLowerCase();
    pool = pool.filter(it => it.genres && it.genres.some(g => g.toLowerCase() === gLower));
  }

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function proxyRequest(req, res, targetHost, targetPath) {
  const headers = { ...req.headers };
  headers.host = targetHost;
  headers.origin = `https://${targetHost}`;
  headers.referer = `https://${targetHost}/`;
  delete headers['accept-encoding'];

  if (!headers['user-agent'] || /python|curl|wget/i.test(headers['user-agent'])) {
    headers['user-agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
  }

  const options = {
    hostname: targetHost,
    port: 443,
    path: targetPath,
    method: req.method,
    headers
  };

  const proxyReq = https.request(options, (proxyRes) => {
    const resHeaders = { ...proxyRes.headers };
    resHeaders['access-control-allow-origin'] = '*';
    resHeaders['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    resHeaders['access-control-allow-headers'] = '*';

    res.writeHead(proxyRes.statusCode || 200, resHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[PROXY ERROR] ${targetPath}:`, err.message);
    if (!res.headersSent) {
      sendJson(res, { error: 'Proxy Gateway Error', details: err.message }, 502);
    }
  });

  req.pipe(proxyReq);
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  if (!pathname.startsWith('/assets/') && !pathname.endsWith('.woff2') && !pathname.endsWith('.png') && !pathname.startsWith('/api/v1/stream/')) {
    console.log(`[REQ] ${req.method} ${pathname}`);
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    });
    return res.end();
  }

  // Stream HLS proxy
  if (pathname === '/api/v1/stream/hls') {
    const targetUrl = parsedUrl.searchParams.get('url');
    if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
      return sendJson(res, { error: 'Invalid stream URL' }, 400);
    }

    const refererParam = parsedUrl.searchParams.get('referer');
    let upstreamReferer = refererParam;
    if (!upstreamReferer) {
      if (targetUrl.includes('anixo.buzz')) upstreamReferer = 'https://anixo.buzz/';
      else if (targetUrl.includes('vmpx.online') || targetUrl.includes('vidmoly')) upstreamReferer = 'https://vidmoly.biz/';
      else upstreamReferer = 'https://anixo.buzz/';
    }

    try {
      const upstreamRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
          'Referer': upstreamReferer
        },
        signal: AbortSignal.timeout(10000)
      });

      if (!upstreamRes.ok) {
        res.writeHead(upstreamRes.status, {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        });
        return res.end(`Upstream error ${upstreamRes.status}`);
      }

      const contentType = upstreamRes.headers.get('content-type') || '';
      if (contentType.includes('mpegurl') || targetUrl.includes('m3u8')) {
        const bodyText = await upstreamRes.text();
        const lines = bodyText.split('\n');
        const rewritten = lines.map(line => {
          const trimmed = line.trim();
          if (!trimmed) return line;
          if (trimmed.startsWith('#EXT-X-I-FRAME-STREAM-INF:')) {
            return trimmed.replace(/URI="([^"]+)"/, (m, p1) => {
              const abs = p1.startsWith('http') ? p1 : new URL(p1, targetUrl).toString();
              return `URI="/api/v1/stream/hls?url=${encodeURIComponent(abs)}&referer=${encodeURIComponent(upstreamReferer)}"`;
            });
          }
          if (trimmed.startsWith('#')) return line;
          const abs = trimmed.startsWith('http') ? trimmed : new URL(trimmed, targetUrl).toString();
          return `/api/v1/stream/hls?url=${encodeURIComponent(abs)}&referer=${encodeURIComponent(upstreamReferer)}`;
        }).join('\n');

        res.writeHead(200, {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        return res.end(rewritten);
      }

      // Binary segment (.ts or image-disguised video chunks)
      const outHeaders = {
        'Content-Type': contentType || 'video/mp2t',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=3600'
      };
      const cl = upstreamRes.headers.get('content-length');
      if (cl) outHeaders['Content-Length'] = cl;

      res.writeHead(200, outHeaders);
      const reader = upstreamRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      return res.end();
    } catch (err) {
      console.error('[HLS PROXY ERROR]:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { 'Access-Control-Allow-Origin': '*' });
        res.end();
      }
      return;
    }
  }

  // Subtitle VTT proxy (supports SRT to VTT conversion & auto-translation)
  if (pathname === '/api/v1/stream/vtt') {
    const srtUrl = parsedUrl.searchParams.get('srt');
    if (srtUrl) {
      const cached = subtitleVttCache.get(srtUrl);
      if (cached) {
        res.writeHead(200, {
          'Content-Type': 'text/vtt; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        });
        return res.end(cached);
      }

      try {
        const srtRes = await fetch(srtUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(6000)
        });
        if (!srtRes.ok) {
          res.writeHead(srtRes.status, { 'Access-Control-Allow-Origin': '*' });
          return res.end();
        }
        const srtText = await srtRes.text();
        const vttText = srtToVtt(srtText);
        subtitleVttCache.set(srtUrl, vttText);
        res.writeHead(200, {
          'Content-Type': 'text/vtt; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400'
        });
        return res.end(vttText);
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(502, { 'Access-Control-Allow-Origin': '*' });
          res.end();
        }
        return;
      }
    }

    const targetUrl = parsedUrl.searchParams.get('url');
    if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
      return sendJson(res, { error: 'Invalid subtitle URL' }, 400);
    }

    const shouldTranslate = parsedUrl.searchParams.get('translate') === 'fr';
    const cacheKey = shouldTranslate ? `${targetUrl}_fr` : targetUrl;
    const cached = subtitleVttCache.get(cacheKey);
    if (cached) {
      res.writeHead(200, {
        'Content-Type': 'text/vtt; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      });
      return res.end(cached);
    }

    try {
      const upstreamRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
          'Referer': 'https://anixo.buzz/'
        },
        signal: AbortSignal.timeout(6000)
      });
      if (!upstreamRes.ok) {
        res.writeHead(upstreamRes.status, { 'Access-Control-Allow-Origin': '*' });
        return res.end();
      }
      let text = await upstreamRes.text();
      if (shouldTranslate) {
        try {
          const lines = text.split('\n');
          const batch = [];
          const indices = [];
          for (let i = 0; i < lines.length; i++) {
            const t = lines[i].trim();
            if (t && !t.includes('-->') && t !== 'WEBVTT' && !/^\d+$/.test(t)) {
              batch.push(t);
              indices.push(i);
            }
          }
          if (batch.length > 0) {
            const transUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(batch.join('\n'))}`;
            const transRes = await fetch(transUrl, { signal: AbortSignal.timeout(5000) });
            if (transRes.ok) {
              const transData = await transRes.json();
              const translated = transData[0].map(item => item[0]).join('');
              const translatedParts = translated.split('\n');
              for (let j = 0; j < indices.length; j++) {
                if (translatedParts[j]) lines[indices[j]] = translatedParts[j].trim();
              }
              text = lines.join('\n');
            }
          }
        } catch (te) {}
      }

      subtitleVttCache.set(cacheKey, text);
      res.writeHead(200, {
        'Content-Type': 'text/vtt; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      });
      return res.end(text);
    } catch (err) {
      if (!res.headersSent) {
        res.writeHead(502, { 'Access-Control-Allow-Origin': '*' });
        res.end();
      }
      return;
    }
  }

  // Intercept maintenance check: site is open, beta is disabled
  if (pathname === '/api/v1/maintenance') {
    return sendJson(res, {
      actif: false,
      jusquA: null,
      message: null,
      peutEntrer: true
    });
  }

  // Intercept metadata
  if (pathname === '/api/v1/meta') {
    return sendJson(res, {
      inviteUrl: null
    });
  }

  // Redirect all auth requests to home
  if (pathname.startsWith('/auth')) {
    res.writeHead(302, { Location: '/' });
    return res.end();
  }

  // Serve Browse (Home page catalogue)
  if (pathname === '/api/v1/browse') {
    if (catalogueData && catalogueData.browse) {
      return sendJson(res, catalogueData.browse);
    }
  }

  // Serve Catalogue & Discover (Movies, Series, Anime pages)
  if (pathname === '/api/v1/catalogue' || pathname === '/api/v1/discover') {
    if (catalogueData) {
      const kind = parsedUrl.searchParams.get('kind');
      const page = parseInt(parsedUrl.searchParams.get('page') || '0', 10);
      let items = catalogueData.all_items || [];
      if (kind === 'films') items = catalogueData.movies || [];
      else if (kind === 'series') items = catalogueData.series || [];
      else if (kind === 'animes') items = catalogueData.animes || [];

      const genre = parsedUrl.searchParams.get('genre');
      if (genre) {
        const gLower = genre.toLowerCase();
        items = items.filter(it => it.genres && it.genres.some(g => g.toLowerCase() === gLower));
      }

      return sendJson(res, {
        items,
        total: items.length,
        page,
        finForcee: false
      });
    }
  }

  // Serve Search
  if (pathname === '/api/v1/search') {
    if (catalogueData) {
      const q = (parsedUrl.searchParams.get('q') || '').toLowerCase().trim();
      const results = q ? (catalogueData.all_items || []).filter(it =>
        (it.title && it.title.toLowerCase().includes(q)) ||
        (it.overview && it.overview.toLowerCase().includes(q))
      ) : [];
      return sendJson(res, { results });
    }
  }

  // Serve Random
  if (pathname === '/api/v1/random') {
    const count = parseInt(parsedUrl.searchParams.get('count') || '14', 10);
    const kind = parsedUrl.searchParams.get('kind') || parsedUrl.searchParams.get('type');
    const genre = parsedUrl.searchParams.get('genre');
    const items = getRandomItems(count, kind, genre);
    return sendJson(res, { items });
  }

  // Media Detail and Sub-resources (/api/v1/media/:mediaType/:tmdbId/...)
  const mediaMatch = pathname.match(/^\/api\/v1\/media\/(tv|movie)\/(\d+)(?:\/([a-zA-Z0-9_-]+))?$/);
  if (mediaMatch) {
    const [, mediaType, idStr, subResource] = mediaMatch;
    const tmdbId = parseInt(idStr, 10);
    const item = itemsMap.get(`${mediaType}:${tmdbId}`) || itemsMap.get(idStr);

    if (item) {
      if (subResource === 'episodes') {
        const season = parseInt(parsedUrl.searchParams.get('season') || '1', 10);
        return sendJson(res, generateEpisodes(item, season));
      }
      if (subResource === 'reviews') {
        return sendJson(res, {
          reviews: [
            {
              id: `rev_${item.tmdbId}_1`,
              rating: Math.round(item.voteAverage || 8),
              comment: "Excellente œuvre disponible sur GenZstream !",
              author: "Membre GenZ",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              likes: 15,
              userLiked: false
            }
          ],
          viewerReview: null
        });
      }
      if (subResource === 'annexes') {
        return sendJson(res, generateAnnexes(item));
      }
      if (subResource === 'cast') {
        return sendJson(res, { cast: [], realisation: [] });
      }
      if (subResource === 'similar') {
        const annexes = generateAnnexes(item);
        return sendJson(res, { items: annexes.similar });
      }
      if (subResource === 'saga') {
        return sendJson(res, { saga: null, ordres: [], items: [] });
      }
      if (subResource === 'trailer') {
        return sendJson(res, { youtubeId: item.youtubeId || null });
      }
      if (subResource === 'links') {
        const season = parseInt(parsedUrl.searchParams.get('season') || '1', 10);
        const episodeId = parsedUrl.searchParams.get('episodeId') || '';
        const epMatch = episodeId.match(/E(\d+)/i);
        const episodeNumber = epMatch ? parseInt(epMatch[1], 10) : (parseInt(episodeId, 10) || 1);
        return sendJson(res, { links: generateLinks(item, season, episodeNumber) });
      }

      // Root media detail
      if (!subResource) {
        return sendJson(res, formatMediaDetail(item));
      }
    }
  }

  // Video playback token
  if (pathname === '/api/v1/lecture/jeton') {
    return sendJson(res, {
      challenge: 'genzstream',
      bits: 1
    });
  }

  // Video playback stream
  if (pathname.startsWith('/api/v1/play/')) {
    const rawLinkId = decodeURIComponent(pathname.replace('/api/v1/play/', '').split('?')[0]);

    // Parse linkId
    // Format: ${provider}_${tmdbId}_${season}_${episodeNumber}_${lang}
    const parts = rawLinkId.split('_');
    const provider = parts[0] || 'genzhd';
    const tmdbId = parseInt(parts[1], 10);
    const season = parseInt(parts[2], 10) || 1;
    const episodeNumber = parseInt(parts[3], 10) || 1;
    const lang = (parts[4] || 'vostfr').toLowerCase();

    const item = itemsMap.get(`tv:${tmdbId}`) || itemsMap.get(`movie:${tmdbId}`) || itemsMap.get(String(tmdbId));
    const isAnime = item ? item.kind === 'animes' : false;
    const isMovie = item ? item.mediaType === 'movie' : false;
    let imdbId = item ? item.imdbId : null;
    if (!imdbId && item && item.title) {
      imdbId = await getAnimeImdbId(item.title);
    }

    if (isAnime) {
      if (provider === 'genzvf' || lang === 'vf') {
        try {
          const vfStream = await resolveAnimeVfStream(item ? item.title : '', season, episodeNumber);
          if (vfStream && vfStream.hls) {
            return sendJson(res, vfStream);
          }
        } catch (e) {
          console.error(`[STREAM RESOLVE VF FAILED] anime ${tmdbId} ep ${episodeNumber}:`, e.message);
        }

        // Fallback for anime VF: VidSrc embed with season & episode
        const targetUrl = imdbId
          ? `https://vidsrc.sh/embed/tv?imdb=${imdbId}&season=${season}&episode=${episodeNumber}`
          : `https://vidsrc.sh/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episodeNumber}`;
        return sendJson(res, {
          url: targetUrl,
          hls: null,
          hlsProgressif: false,
          direct: false,
          hote: 'VidSrc VF',
          downloads: [],
          downloadUrl: null,
          sousTitres: []
        });
      }

      if (provider === 'vidsrc' || provider === 'vidsrcpm' || provider === 'autoembed') {
        const targetUrl = imdbId
          ? `https://vidsrc.sh/embed/tv?imdb=${imdbId}&season=${season}&episode=${episodeNumber}`
          : `https://vidsrc.sh/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episodeNumber}`;
        return sendJson(res, {
          url: targetUrl,
          hls: null,
          hlsProgressif: false,
          direct: false,
          hote: 'VidSrc HD',
          downloads: [],
          downloadUrl: null,
          sousTitres: []
        });
      }

      // Default for GenZ HD (VOSTFR or VA)
      try {
        const streamData = await resolveAnimeStream(tmdbId, episodeNumber, lang, item, season);
        if (streamData && streamData.hls) {
          return sendJson(res, streamData);
        }
      } catch (e) {
        console.error(`[STREAM RESOLVE FAILED] anime ${tmdbId} ep ${episodeNumber}:`, e.message);
      }

      // Fallback for anime if stream resolve failed
      const track = (lang === 'va' || lang === 'dub') ? 'dub' : 'sub';
      const fallbackUrl = `https://anixo.buzz/embed/ani/${tmdbId}/${episodeNumber}?track=${track}`;
      return sendJson(res, {
        url: fallbackUrl,
        hls: null,
        hlsProgressif: false,
        direct: false,
        hote: 'Anixo Direct',
        downloads: [],
        downloadUrl: null,
        sousTitres: []
      });
    }

    if (isMovie) {
      let targetUrl = '';
      let providerName = 'VidSrc HD';

      if (provider === 'vidsrcpm') {
        providerName = 'VidSrc PM';
        targetUrl = imdbId ? `https://vidsrc.pm/embed/movie?imdb=${imdbId}` : `https://vidsrc.pm/embed/movie?tmdb=${tmdbId}`;
      } else if (provider === 'autoembed') {
        providerName = 'AutoEmbed';
        targetUrl = imdbId ? `https://autoembed.co/movie/imdb/${imdbId}` : `https://autoembed.co/movie/tmdb/${tmdbId}`;
      } else if (provider === 'vidlink') {
        providerName = 'VidLink';
        targetUrl = `https://vidlink.pro/movie/${tmdbId}`;
      } else {
        providerName = 'VidSrc HD';
        targetUrl = imdbId ? `https://vidsrc.sh/embed/movie?imdb=${imdbId}` : `https://vidsrc.sh/embed/movie?tmdb=${tmdbId}`;
      }

      return sendJson(res, {
        url: targetUrl,
        hls: null,
        hlsProgressif: false,
        direct: false,
        hote: providerName,
        downloads: [],
        downloadUrl: null,
        sousTitres: []
      });
    }

    // Series
    let targetUrl = '';
    let providerName = 'VidSrc HD';

    if (provider === 'vidsrcpm') {
      providerName = 'VidSrc PM';
      targetUrl = imdbId ? `https://vidsrc.pm/embed/tv?imdb=${imdbId}&season=${season}&episode=${episodeNumber}` : `https://vidsrc.pm/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episodeNumber}`;
    } else if (provider === 'autoembed') {
      providerName = 'AutoEmbed';
      targetUrl = imdbId ? `https://autoembed.co/tv/imdb/${imdbId}/${season}/${episodeNumber}` : `https://autoembed.co/tv/tmdb/${tmdbId}/${season}/${episodeNumber}`;
    } else if (provider === 'vidlink') {
      providerName = 'VidLink';
      targetUrl = `https://vidlink.pro/tv/${tmdbId}/${season}/${episodeNumber}`;
    } else {
      providerName = 'VidSrc HD';
      targetUrl = imdbId ? `https://vidsrc.sh/embed/tv?imdb=${imdbId}&season=${season}&episode=${episodeNumber}` : `https://vidsrc.sh/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episodeNumber}`;
    }

    return sendJson(res, {
      url: targetUrl,
      hls: null,
      hlsProgressif: false,
      direct: false,
      hote: providerName,
      downloads: [],
      downloadUrl: null,
      sousTitres: []
    });
  }

  // User state & sync endpoints
  if (pathname.startsWith('/api/v1/me/progress/')) {
    return sendJson(res, { reprise: null });
  }

  if (
    pathname === '/api/v1/me/progress' ||
    pathname === '/api/v1/visionnage' ||
    pathname === '/api/v1/seance' ||
    pathname.startsWith('/api/v1/lecture/veille') ||
    pathname === '/api/v1/lecture/humain' ||
    pathname.startsWith('/api/v1/links/') ||
    pathname.includes('/favorite') ||
    pathname.includes('/watchlist') ||
    pathname.includes('/review')
  ) {
    return sendJson(res, { ok: true });
  }

  if (
    pathname === '/api/v1/me/favorites' ||
    pathname === '/api/v1/me/watchlist' ||
    pathname === '/api/v1/me/history' ||
    pathname === '/api/v1/me/rows'
  ) {
    return sendJson(res, { items: [] });
  }

  if (pathname === '/api/v1/patch') {
    return sendJson(res, { notes: [] });
  }

  // Content Requests endpoints
  if (pathname === '/api/v1/content-requests/pending') {
    const items = (catalogueData?.animes || []).slice(0, 14).map((a, idx) => ({
      id: idx + 1,
      mediaType: a.mediaType,
      tmdbId: a.tmdbId,
      title: a.title,
      posterPath: a.posterPath,
      releaseYear: a.releaseYear,
      scopeLabel: null,
      count: 28 - idx,
      hasVoted: false
    }));
    return sendJson(res, { items });
  }

  if (pathname === '/api/v1/content-requests/status') {
    return sendJson(res, { remaining: 5, available: true });
  }

  if (pathname === '/api/v1/content-requests/search') {
    const q = (parsedUrl.searchParams.get('q') || '').toLowerCase().trim();
    const results = q ? (catalogueData?.all_items || [])
      .filter(it => it.title && it.title.toLowerCase().includes(q))
      .slice(0, 20)
      .map(it => ({
        mediaType: it.mediaType,
        tmdbId: it.tmdbId,
        title: it.title,
        posterPath: it.posterPath,
        year: it.releaseYear,
        isAnime: it.kind === 'animes'
      })) : [];
    return sendJson(res, { results });
  }

  if (pathname.match(/^\/api\/v1\/content-requests\/[^\/]+\/\d+$/)) {
    return sendJson(res, {
      mediaType: 'movie',
      tmdbId: 1,
      title: 'Titre demandé',
      available: false,
      numberOfSeasons: 1,
      availableSeasons: [],
      languages: ['VF', 'VOSTFR']
    });
  }

  if (pathname.includes('/vote')) {
    return sendJson(res, { subscribed: true, count: 42 });
  }

  if (pathname === '/api/v1/content-requests') {
    return sendJson(res, { ok: true, message: 'Demande enregistrée !' });
  }

  // Fallback proxy to remote backend
  if (pathname.startsWith('/api/')) {
    return proxyRequest(req, res, 'heiwastream.fr', pathname + parsedUrl.search);
  }

  // Proxy Stremio routes if called
  if (pathname.startsWith('/stremio/')) {
    return proxyRequest(req, res, 'api.heiwastream.fr', pathname + parsedUrl.search);
  }

  // Handle /sw.js - do not allow registering HTML as ServiceWorker
  if (pathname === '/sw.js') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not Found');
  }

  // Resolve static file path
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Safety check against directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      return fs.createReadStream(filePath).pipe(res);
    }

    // Do not SPA-fallback asset requests with file extensions (e.g. .js, .png, .css)
    if (path.extname(pathname)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not Found');
    }

    // SPA Fallback: Serve index.html for all other routes
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf-8', (indexErr, html) => {
      if (indexErr) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(html);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  GenZstream est en ligne !`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://127.0.0.1:${PORT}`);
  console.log(`====================================================`);
});
