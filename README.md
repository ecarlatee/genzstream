# GenZstream & GenZ Anime Clone

## Liens d'accès en ligne
- **Site Principal (Films, Séries & Animés) :** https://stephen-eos-nickname-paint.trycloudflare.com/
- **Clone 100% Animé (Ad-Free, VOSTFR & VF) :** https://stephen-eos-nickname-paint.trycloudflare.com/animes

---

## Fonctionnalités du Clone Animé (`/animes`)
1. **100% Porté sur les Animés :**
   - Catalogue de 2 512 animés japonais.
   - Rubriques dédiées : Top 10 Animés, Saga Dragon Ball (39 œuvres), Shōnen, Isekai & Fantaisie, VOSTFR Pépites, VF Disponibles.
2. **Lecteurs 100% Sans Publicité :**
   - Flux HLS direct `.m3u8` lu nativement par `Hls.js` dans une balise HTML5 `<video>`.
   - Zéro iframe tierce, zéro popup, zéro redirection intrusive.
3. **Règle Stricte sur l'Audio :**
   - **VOSTFR obligatoire** : Audio original japonais avec sous-titres français soignés sur 100% des animés.
   - **Règle stricte VF** : Si un animé ne dispose pas de doublage officiel français (`hasVf !== true`), la VF **n'est JAMAIS proposée** (pas de badge trompeur, bouton VF strictement absent du lecteur). Si `hasVf === true` (219 animés), le sélecteur permet de basculer instantanément entre VOSTFR et VF.
4. **Catalogue & Filtres Complets :**
   - Filtre par audio (`Tous`, `VOSTFR Exclusif`, `VF Disponible`), filtre par genres, tri par note, date ou titre A-Z.
   - Recherche instantanée avec prévisualisation des fiches et badges audio.
