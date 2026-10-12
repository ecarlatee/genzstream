import{r as x,j as n}from"./il30qalw.js";import{c as h}from"./bo4866ec.js";import{b as ve,e as je,L as g,u as ee,a as be}from"./iyuzmj8o.js";import{a as D,h as E}from"./ky5hs6cv.js";import{r as Ne}from"./f0205gm0.js";import{u as $,f as I}from"./nta6kbnf.js";import{a5 as ne,bD as te,bE as qe,bF as se,aj as M,ad as ae,g as Ce,Z as re,T as Le,C as ye,bG as we,X as Se,_ as _e,r as Ae,bH as De,b8 as Ee,y as Pe,bn as Re,S as ke,bI as Te,bJ as $e,an as Ie,bK as Me,bL as Oe,aw as Ue,bM as ze,aB as Fe}from"./krrbl36g.js";import"./cijzsz2z.js";const He={partout:{titre:"Partout",phrase:"Sur un serveur où le service est présent, en message privé avec lui, et dans un groupe privé. Tu n'as besoin d'aucune permission."},equipe:{titre:"Réservée aux admins",phrase:"Sur un serveur uniquement : elle ne marche pas en message privé, et Plateforme ne l'affiche même pas aux membres qui n'y ont pas droit."}},ie=[{titre:"Regarder et trouver",intro:"Ce qui sert tous les jours.",teinte:"vert",portee:"partout",commandes:[{nom:"/panel",nomEn:"/panel",args:"[theme] [layout]",quoi:"Afficher le panel principal GenZstream.",precision:"Le point d'entrée : recherche, catalogue, listes et profil au même endroit. Les deux options changent l'apparence du panneau, pas ce qu'il contient."},{nom:"/recherche",nomEn:"/search",args:"(query)",quoi:"Rechercher du contenu dans le catalogue.",precision:"La saisie propose des titres pendant que tu tapes : en choisir un ouvre directement sa fiche."},{nom:"/catalogue",nomEn:"/catalog",quoi:"Parcourir le catalogue : filtres, tri et vues."},{nom:"/aleatoire",nomEn:"/random",quoi:"Tirer au sort un contenu à regarder."},{nom:"/similaire",nomEn:"/similar",args:"(titre)",quoi:"Trouver des contenus proches d'un titre du catalogue."},{nom:"/pourtoi",nomEn:"/foryou",quoi:"Des contenus choisis selon tes goûts."}]},{titre:"Ton compte",intro:"Tes listes, tes réglages et tes alertes. Elles répondent à toi seul, même lancées dans un salon.",teinte:"bleu",portee:"partout",commandes:[{nom:"/profil",nomEn:"/profile",quoi:"Afficher ton profil et tes statistiques.",precision:"C'est le même profil que sur le site : ce que tu regardes ici s'y retrouve, et l'adresse publique de ton profil se règle là-bas."},{nom:"/favoris",nomEn:"/favorites",quoi:"Retrouver tes contenus favoris."},{nom:"/maliste",nomEn:"/mylist",quoi:"Retrouver les titres gardés pour plus tard."},{nom:"/historique",nomEn:"/history",quoi:"Ouvrir ton historique de visionnage."},{nom:"/parametre",nomEn:"/settings",quoi:"Régler tes préférences : lecteurs, langues, notifications."},{nom:"/avertir",nomEn:"/alert",args:"[titre] [langue] [qualité]",quoi:"Être prévenu en message privé quand un contenu indisponible arrive.",precision:"Sans titre, la commande ouvre la gestion de tes alertes en cours. La langue et la qualité restreignent l'alerte : sans elles, toutes comptent."}]},{titre:"Participer et demander",intro:"Réclamer un titre, en proposer un, signaler ce qui ne va pas.",teinte:"rouge",portee:"partout",commandes:[{nom:"/demande",nomEn:"/request",args:"(titre)",quoi:"Demander l'ajout d'un film, d'une série ou d'un animé."},{nom:"/ajouter",nomEn:"/add",args:"[titre]",quoi:"Ajouter du contenu à l'application.",precision:"Précise l'année quand le titre existe plusieurs fois : Snowfall 2017. Les règles à respecter sont dans le règlement d'ajout."},{nom:"/retour",nomEn:"/feedback",quoi:"Signaler un bug ou proposer une amélioration, pour le service comme pour le site."},{nom:"/guide",nomEn:"/guide",quoi:"Ouvrir le guide GenZstream et son menu de tutoriels."},{nom:"/tuto",nomEn:"/howto",args:"(sujet)",quoi:"Des guides courts : publicités, compte, favoris, signalements.",precision:"Tape dans le champ pour filtrer la liste des sujets."}]},{titre:"L'équipe du serveur",intro:"La seule commande qui ne s'adresse pas à tout le monde.",teinte:"jaune",portee:"equipe",commandes:[{nom:"/config",nomEn:"/config",args:"[système]",quoi:"Configurer GenZstream sur ton serveur.",precision:"Réservée aux administrateurs. L'option ouvre directement un système : sorties, annonces, classement, arrivées."}]}];ie.reduce((t,e)=>t+e.commandes.length,0);function Be(t,e){return[t.nom,t.nomEn,t.args??"",t.quoi,t.precision??"",e.titre].join(" ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}const B={titre:"Guide d'utilisation · GenZstream",description:"Installer GenZstream sur ton service, pas à pas : ajouter le service, ouvrir /config, puis activer les annonces, les sorties, l'accueil des nouveaux et les autres systèmes."},w=[{section:"Installer",intro:"Ajouter le service à ton serveur, puis apprendre les cinq réglages que tous les écrans partagent.",teinte:"vert",slugs:["demarrer","reglages-communs"]},{section:"Les systèmes",intro:"Dix systèmes, indépendants les uns des autres. Tu n'actives que ceux que tu veux.",teinte:"bleu",slugs:["arrivees","annonces","sorties","versus","classement","avis","demandes","mises-a-jour","assistance","personnalisation"]},{section:"Aide",intro:"Quand ça ne marche pas, et la liste des commandes.",teinte:"jaune",slugs:["depannage","commandes","anti-pub","ajout"]}],Qe=["chercher","regarder","qualites","telecharger","profil","alertes","preferences","participer"],Q=w.flatMap(t=>t.slugs);function b(t){const e=[],s=/\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;let i=0,r;for(;r=s.exec(t);)r.index>i&&e.push({type:"texte",texte:t.slice(i,r.index)}),r[1]!=null?e.push({type:"gras",contenu:b(r[1])}):r[2]!=null?e.push({type:"code",texte:r[2]}):e.push({type:"lien",texte:r[3],href:r[4]}),i=r.index+r[0].length;return i<t.length&&e.push({type:"texte",texte:t.slice(i)}),e}function T(t){return t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function oe(t){var i;const e=[],s=[];for(const r of t){if(r.type==="titre"&&r.niveau===2){s.push({titre:r.texte,ancre:r.ancre,blocs:[],apercu:""});continue}(((i=s[s.length-1])==null?void 0:i.blocs)??e).push(r)}for(const r of s)r.apercu=Ve(r.blocs);return{preambule:e,sections:s}}function Ve(t,e=130){const s=t.find(c=>c.type==="paragraphe"||c.type==="liste"||c.type==="note");if(!s)return"";const i=P(s).trim(),r=i.search(/\.\s/),o=r>30?i.slice(0,r+1):i;return o.length>e?o.slice(0,e).replace(/\s\S*$/,"")+"…":o}function q(t){return t.map(e=>e.type==="gras"?q(e.contenu):(e.type==="texte"||e.type==="code",e.texte)).join("")}function P(t){switch(t.type){case"titre":return t.texte;case"paragraphe":case"note":return q(t.contenu);case"liste":return t.points.map(q).join(" ");case"image":return t.legende;case"pas":return t.etapes.map(e=>e.legende).join(" ");case"tableau":return[t.colonnes.join(" "),...t.lignes.map(e=>e.map(q).join(" "))].join(" ");case"commandes":return""}}function S(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}function V(t){return t.replace(/^\||\|$/g,"").split("|").map(e=>e.trim())}function Ge(t){return/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(t)}function G(t){const e=t.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"(\d+)x(\d+)")?((?:\s+[\d.]+,[\d.]+,[\d.]+,[\d.]+)*)\)$/);if(!e)return null;const s=(e[5]??"").trim().split(/\s+/).filter(Boolean).map(i=>{const[r,o,c,a]=i.split(",").map(Number);return{x:r,y:o,l:c,h:a}});return{type:"image",src:e[2],legende:e[1],largeur:Number(e[3]??0),hauteur:Number(e[4]??0),cadres:s}}function We(t){return t.flatMap(e=>e.type==="image"?[e]:e.type==="pas"?e.etapes:[])}function Je(t){const e=[];let s=null;const i=()=>{s&&e.push({type:"liste",...s}),s=null},r=t.split(`
`);for(let o=0;o<r.length;o++){const c=r[o].trim();if(!c){i();continue}if(c.startsWith("|")&&r[o+1]&&Ge(r[o+1].trim())){i();const p=V(c),f=[];let j=o+2;for(;j<r.length&&r[j].trim().startsWith("|");)f.push(V(r[j].trim()).map(b)),j++;e.push({type:"tableau",colonnes:p,lignes:f}),o=j-1;continue}if(c==="{{commandes}}"){i(),e.push({type:"commandes"});continue}if(c===":::pas"){i();const p=[];let f=o+1;for(;f<r.length&&r[f].trim()!==":::";){const j=G(r[f].trim());j&&p.push(j),f++}e.push({type:"pas",etapes:p}),o=f;continue}const a=G(c);if(a){i(),e.push(a);continue}const l=c.match(/^(#{2,3})\s+(.*)$/);if(l){i();const p=l[2];e.push({type:"titre",niveau:l[1].length===2?2:3,texte:p,ancre:T(p)});continue}const u=c.match(/^>\s+(.*)$/);if(u){i(),e.push({type:"note",contenu:b(u[1])});continue}const v=c.match(/^[-*]\s+(.*)$/),d=c.match(/^\d+\.\s+(.*)$/);if(v||d){const p=!!d;s&&s.ordonnee!==p&&i(),s||(s={ordonnee:p,points:[]}),s.points.push(b((v??d)[1]));continue}i(),e.push({type:"paragraphe",contenu:b(c)})}return i(),e}const Ze=`---
titre: "Ajouter du contenu"
description: "Le tuto des hosteurs : comment ajouter un lien proprement avec /add, étape par étape."
majLe: 2026-10-04
---

Tu es hosteur : \`/add\` ajoute un lien au catalogue, depuis Plateforme.

> Lis d'abord le [règlement d'ajout](/rules/add) : il fixe ce qui est accepté.

## Ajouter un contenu

Une fois validé, le contenu rejoint le catalogue immédiatement.

1. Lance \`/add\` et écris le nom.
2. Choisis le bon résultat : année, affiche.
3. Colle l'adresse de la page de lecture.
4. Indique la langue, et l'épisode pour une série.

## Cas particuliers

Dans ces trois cas, ne force rien.

| Ce que tu vois | Ce qu'il faut faire |
| --- | --- |
| Le contenu n'apparaît pas dans la recherche | Ouvre un ticket sur le [serveur officiel](/) |
| Un épisode en plusieurs vidéos | Ajoute chaque morceau en **partie** |
| Tu t'es trompé | Signale-le, ne réajoute pas par-dessus |

## Un doute ?

Demande avant d'ajouter : mieux vaut demander que se tromper.
`,Ke=`---
titre: "Annonces des nouveautés"
description: "Publier chez toi chaque ajout au catalogue : films, séries, animés, au fil de l'eau."
majLe: 2026-10-04
---

\`/config\` → **Annonces** : chaque ajout au catalogue, posté chez toi dès qu'il est disponible.

![Une annonce telle qu'elle arrive.](/captures/annonces-annonce.png "456x428")

## Trois catégories

Films, Séries et Animés ont chacun leur [salon](/docs/reglages-communs#le-salon) et leur [mention](/docs/reglages-communs#la-mention).

![Choisis une catégorie, ou « Tout configurer ».](/captures/annonces-categories.png "833x331" 0.9,72.1,49.2,14.1 0.9,86,17.7,11.7)

## Ce qui est annoncé

Par catégorie, choisis les événements qui déclenchent une annonce.

| Événement | Ce qui s'est passé |
| --- | --- |
| **Nouvel ajout** | Un titre entre au catalogue |
| **Nouvelle langue** | Une langue de plus sur un titre |
| **Nouvelle qualité** | Une copie CAM passe en qualité standard |
| **Nouvelle saison disponible** | Séries et animés |
| **Nouvel épisode disponible** | Séries et animés |

> « Nouvel épisode » peut poster plusieurs annonces par jour : réserve-lui un salon dédié.

## Les filtres

Sans filtre, tout est reçu.

![« Filtres (toutes catégories) » règle les trois d'un coup.](/captures/annonces-categories.png "833x331" 18.6,86,25.4,11.7)

| Filtre | Choix |
| --- | --- |
| **Langues** | VF, VOSTFR, VO |
| **Qualités** | Standard, CAM |
| **Genres** | Les genres du catalogue |
`,Xe=`---
titre: "Publicités et lecture"
description: "Aucune publicité avec le lecteur de GenZstream. Ce qu'il faut répondre quand une source extérieure en affiche."
majLe: 2026-10-04
---

Avec le lecteur de GenZstream, il n'y a aucune publicité.

## Avec ou sans publicité

La mention est écrite sous la langue, avant le clic.

| Mention | Ce que ça veut dire |
| --- | --- |
| « sans publicité » | Notre lecteur joue : aucune publicité |
| « avec publicité » | Source extérieure, rare : ses publicités |

## Sur ordinateur

Un bloqueur installé une fois suffit.

| Navigateur | Quoi installer |
| --- | --- |
| Tous | [uBlock Origin](https://ublockorigin.com) |
| Chrome ou Edge, s'il manque | uBlock Origin Lite |
| Ensuite | Recharge la page |

## Sur Android

Il faut un navigateur qui accepte les extensions.

| Navigateur | Quoi installer |
| --- | --- |
| [Firefox](https://www.mozilla.org/firefox/browsers/mobile/android/) | uBlock Origin |

## Sur iPhone et iPad

Installe, puis active.

| Navigateur | Quoi installer |
| --- | --- |
| Safari | AdGuard ou 1Blocker, depuis l'App Store |
| Pour l'activer | \`Réglages\`, \`Apps\`, \`Safari\`, \`Extensions\` |

## Si ça bloque

- La vidéo ne démarre plus : change de source, engrenage, puis Source.
- Aucune ne marche : signale le lien avec le drapeau.

> Une page demande un paiement ou un mot de passe ? Ferme-la.
`,Ye=`---
titre: "Arrivées et départs"
description: "Accueillir les nouveaux avec un message et une carte dessinée, annoncer les départs."
majLe: 2026-10-04
---

\`/config\` → **Arrivées & départs** : un message à l'arrivée, un autre au départ.

## Allumer un message

Le texte livré d'office fonctionne tel quel.

:::pas
![Clique sur « Bienvenue », ou sur « Au revoir ».](/captures/arrivees-hub.png "833x351" 0.9,75.6,14.1,11.1 15,75.6,13.2,11.1)
![Clique sur « Salon », choisis où poster, puis active.](/captures/arrivees-bienvenue.png "833x378" 0.9,77.4,10.7,10.5)
:::

## Le message

Un titre et un corps libres, sous trois apparences.

| Apparence | Ce qui est posté |
| --- | --- |
| **Embed** | Un cadre avec une barre de couleur |
| **Texte simple** | Une ligne, sans cadre |
| **Carte seule** | L'image et la mention du membre |

> « Carte seule » demande une carte allumée.

## Les variables

Écrites entre accolades, elles sont remplacées à l'envoi.

![Clique sur « Variables » pour la liste complète.](/captures/arrivees-bienvenue.png "833x378" 35.3,77.4,13.4,10.5)

| Variable | Ce qu'elle donne |
| --- | --- |
| \`{membre}\` | Sa mention, qui le notifie |
| \`{membre.nom}\` | Son surnom, sinon son pseudo |
| \`{membre.duree}\` | Le temps passé, au départ |
| \`{serveur.membres.ordinal}\` | « tu es le 4 218ᵉ » |
| \`{salutation}\` | Bonjour, de 6 h à 18 h |

## La carte d'accueil

À l'arrivée, le service peut dessiner une image du membre.

![Clique sur « Carte ».](/captures/arrivees-bienvenue.png "833x378" 24.6,77.4,10.7,10.5 2.1,51.5,26.3,21.5)

## Quand le message part

Le bouton **Quand envoyer** règle le moment.

![Clique sur « Quand envoyer ».](/captures/arrivees-hub.png "833x351" 12.3,86.5,17.4,11.1 2.2,48,29.7,23.5)

| Le moment | Ce que fait le service |
| --- | --- |
| **Après le parcours d'accueil** | Attend la fin de l'écran de règles |
| **Après le parcours d'accueil, 30 minutes au plus** | Pareil, sans attendre indéfiniment |
| **Envoi immédiat** | Dès l'arrivée |
`,en=`---
titre: "Assistance"
description: "Un assistant qui répond à tes membres à l'écrit, dans les salons que tu choisis."
majLe: 2026-10-04
---

Un assistant écrit qui répond à tes membres, dans les salons que tu choisis.

## Quand il parle

Ouvre \`/config\`, puis **Assistance**. Désactivé au départ.

![Ouvre la prise de parole.](/captures/assistance-ecran.png "833x415" 53.7,79.4,25.2,9.7 2.6,52.4,29.5,23)

| Réglage | Il répond |
| --- | --- |
| Activé | Aux mentions et aux réponses à ses messages |
| Prise de parole ouverte | Aussi sans être mentionné |

> « Activée, mais en attente » : Plateforme n'a pas encore donné l'autorisation.

## Dans quels salons

Partout par défaut. **Choisir les salons** le limite à dix salons.

![Clique sur Choisir les salons.](/captures/assistance-ecran.png "833x415" 0.7,79.4,19.6,9.7 22.1,32,19.8,18)

## Sa façon de parler

**Personnalité** fixe son style : plus court, vouvoiement. Aucune règle n'est levée.

![Clique sur Personnalité.](/captures/assistance-ecran.png "833x415" 19.8,79.4,16.3,9.7 41.6,32,15.6,18)

## Ce qu'il a appris

Écris-lui « retiens que la soirée film c'est le vendredi ». Le bouton l'efface.

![Clique sur Ce qu'il a appris.](/captures/assistance-ecran.png "833x415" 35.7,79.4,18.4,9.7 31.8,52.4,28,18.5)

## Le régler à l'écrit

Un administrateur lui dicte un réglage :

- « active le [classement hebdo](/docs/classement#le-regler-a-l-ecrit) »
- « renomme le service en CinéStream »
`,nn=`---
titre: "Avis communautaires"
description: "Recevoir dans un salon les avis déposés par tes membres sur les films, séries et animés."
majLe: 2026-10-04
---

Les avis déposés par tes membres arrivent dans un salon de ton serveur.

## Anonyme ou signé

Ouvre \`/config\`, puis **Avis communautaires**, puis **Profils**.

![Clique sur Profils.](/captures/avis-ecran.png "833x321" 24,73.5,18.6,12.4 24.8,49.8,23.6,19)

| Affichage | Ce qui arrive dans le salon |
| --- | --- |
| **Anonyme** (par défaut) | Le texte et la note, sans nom |
| **Profils visibles** | Le nom et l'avatar en plus |

> Un membre qui a choisi l'anonymat reste anonyme, même en profils visibles.

## D'où ils viennent

- De tout membre de ton serveur, où qu'il ait écrit.
- Ils sont modérés avant publication : rien à valider.
- L'écran compte les avis reçus.

## Le reste

Salon et mention : voir [Réglages communs](/docs/reglages-communs). Un avis part dès sa publication.
`,tn=`---
titre: "Classement hebdomadaire"
description: "Le top 10 des contenus les plus regardés, publié automatiquement dans ton salon."
majLe: 2026-10-04
---

Le top 10 des contenus les plus regardés, posté tout seul dans ton salon.

![Le classement posté dans le salon.](/captures/classement-carte.jpg "424x390")

## La portée

Ouvre \`/config\`, puis **Classement hebdomadaire**, puis **Portée**.

![Clique sur Portée.](/captures/classement-ecran.png "833x339" 11.4,74.9,12,11.5)

| Portée | Ce qu'elle classe |
| --- | --- |
| **Ce serveur** | Ce que regardent tes membres |
| **Global** | Ce que regarde toute l'application |

## Quand il part

Le bouton **Planification** règle les jours, l'heure et le fuseau.

![Clique sur Planification.](/captures/classement-ecran.png "833x339" 47.5,74.9,16.3,11.5 2.6,52.4,24,17.8)

> Chaque envoi couvre les **sept derniers jours**, pas la semaine calendaire.

## Le reste

Salon, mention et format : voir [Réglages communs](/docs/reglages-communs).

![Tester maintenant te le montre à toi seul.](/captures/classement-ecran.png "833x339" 15.1,86.2,20.3,11.5 35,86.2,8.6,11.5)

## Le régler à l'écrit

Avec l'[assistance](/docs/assistance) activée, un administrateur écrit au service :

- « mets le top semaine dans #salon »
- « mets le top semaine le lundi à 18 h »
- « envoie le top semaine ici »
`,sn=`---
titre: "Toutes les commandes"
description: "Les 18 commandes du service GenZstream : ce qu'elles font, ce qu'elles demandent, et où chacune fonctionne."
majLe: 2026-10-04
---

le service compte **18 commandes**, utilisables sur un serveur comme en message privé.

## Lire un argument

Ce sont les cases que Plateforme propose après le nom de la commande.

| Écrit | Sens |
| --- | --- |
| \`(titre)\` | Obligatoire |
| \`[titre]\` | Facultatif |
| rien | Tape la commande et valide |

## Les commandes

\`/panel\` mène à tout. Clique un nom pour voir sa forme anglaise.

{{commandes}}

## Commande introuvable

Trois causes, dans cet ordre.

| Cause | Solution |
| --- | --- |
| L'application n'est pas sur ce serveur | [Installe-la](/docs/demarrer) |
| Tu n'es pas administrateur | \`/config\` reste cachée |
| Le salon interdit les commandes | Essaie un autre salon |

> Le plus simple : un message privé avec le service. Seule \`/config\` y est impossible.
`,an=`---
titre: "Demandes de contenu"
description: "Recevoir chez toi les demandes d'ajout faites par tes membres, ou par tout le réseau."
majLe: 2026-10-04
---

Reçois dans un salon les demandes d'ajout faites par tes membres.

> Cet écran sert à **recevoir**. Pour demander un titre, c'est \`/demande\`.

## Régler

Ouvre \`/config\`, puis **Demandes de contenu**.

:::pas
![Clique sur Quelles demandes.](/captures/demandes-ecran.png "833x377" 33.5,77,20.4,10.8 2.6,56.8,35.6,16.4)
![Regarde la demande reçue : titre, année, nombre d'intéressés.](/captures/demandes-recue.jpg "414x692" 9.6,22.6,49.5,3.9 41.3,93.2,30.7,3.7)
:::

## Les deux choix

Le bouton **Quelles demandes** décide de ce qui arrive.

| Choix | Ce que tu reçois |
| --- | --- |
| **Toutes les demandes du réseau** (par défaut) | Celles de tous les serveurs |
| **Mes demandes seulement** | Celles faites sur ton serveur |

## Qui traite

- Ton serveur ne valide ni ne refuse rien : l'équipe traite.
- Plus un titre est demandé, plus il monte dans la pile.
- Aucun délai n'est promis.

## Le reste

Salon et mention : voir [Réglages communs](/docs/reglages-communs). Une demande arrive dès qu'elle est faite.
`,rn=`---
titre: "Installer sur ton serveur"
description: "Ajouter l'application à ton service, vérifier ce qu'elle voit, et ouvrir /config."
majLe: 2026-10-04
---

Ajoute le service à ton serveur : la recherche et la lecture marchent aussitôt.

## Ajouter l'application

Il te faut la permission **Gérer le serveur**.

:::pas
![Ouvre le profil du service, clique sur « Ajouter l'application ».](/captures/demarrer-ajouter.png "316x503" 6.5,50.5,87,7.5)
![Choisis « Ajouter au serveur », puis ton serveur.](/captures/demarrer-autorisation.png "496x494" 9.5,81.5,81,11.5)
:::

> **Ajoute à Mes applications** installe le service sur ton compte, pas sur un serveur : \`/config\` n'existe pas.

## Sans rien configurer

Ces commandes marchent dès l'installation.

| Commande | Ce qu'elle fait |
| --- | --- |
| \`/recherche\`, \`/catalogue\`, \`/aleatoire\` | Trouver un titre et le lancer |
| \`/panel\` | Un tableau de bord à épingler |
| \`/demande\` | Réclamer un titre absent |
| \`/profil\` | Favoris et historique |

## Ouvrir la configuration

Tape \`/config\` dans n'importe quel salon, puis ouvre le menu.

![Le menu liste les onze systèmes.](/captures/demarrer-config.png "833x390" 1.2,76.6,48.6,10.8)

## À savoir

- Seuls les administrateurs du serveur peuvent configurer.
- Tous les systèmes sont éteints au départ, sauf [Mises à jour](/docs/mises-a-jour).
- Tous les écrans se ressemblent : [Les réglages communs](/docs/reglages-communs).
`,on=`---
titre: "Dépannage"
description: "Ce qu'il faut vérifier quand un envoi manque, qu'une commande n'apparaît pas ou qu'un bouton reste grisé."
majLe: 2026-10-04
---

Presque toutes les pannes : une permission, un salon, un fuseau.

## /config n'apparaît pas

Trois causes, dans l'ordre.

| Ce que tu vois | Ce qu'il faut faire |
| --- | --- |
| Tu n'es pas administrateur | Rien : la commande leur est réservée |
| le service est sur ton compte seulement | [Ajoute-le au serveur](/docs/demarrer) |
| Plateforme n'est pas à jour | Ferme et rouvre Plateforme |

## Rien n'arrive dans le salon

L'écran affiche « Activé », mais rien ne part.

| Ce que tu vois | Ce qu'il faut faire |
| --- | --- |
| Aucun message | Vérifie les permissions du service |
| Pas d'image | Donne le droit de joindre des fichiers |
| Le bouton Activer est grisé | Choisis d'abord le salon |
| Mauvaise heure d'envoi | Vérifie le fuseau |

> Une permission retirée sur le salon l'emporte sur celle du serveur.

## L'assistant ne répond pas

Vérifie dans cet ordre.

| Ce que tu vois | Ce qu'il faut faire |
| --- | --- |
| Il n'a jamais répondu | Active-le dans \`/config\` |
| Il ignore un message sans mention | Mentionne-le, ou ouvre la prise de parole |
| La prise de parole reste « en attente » | Rien : Plateforme doit encore l'autoriser |

## Lecture et aide

Une vidéo se dépanne dans le lecteur.

| Ce que tu vois | Ce qu'il faut faire |
| --- | --- |
| La vidéo coupe | Change de source : engrenage du lecteur, puis Source |
| Aucune source ne marche | Signale le lien avec le drapeau |
| Autre chose | Écris sur le [serveur officiel](/) |
`,ln=`---
titre: "Mises à jour"
description: "Les notes de version du service, postées dans un salon réservé à ton équipe."
majLe: 2026-10-04
---

Les notes de version du service, postées dans un salon réservé à ton staff.

## Le salon

Activé d'office : le service choisit seul un salon que tes membres ne voient pas.

![Choisir le salon l'impose, Salon automatique rend la main.](/captures/maj-ecran.png "833x364" 0.7,76.6,18,11 18.3,76.6,20.7,11)

> « Aucun salon disponible » ? Ouvre \`/config\`, puis **Mises à jour**, et choisis un salon à la main.

## Le couper

**Désactiver** arrête la réception. Les notes restent sur [la page des nouveautés](/changelog).

![Clique sur Désactiver.](/captures/maj-ecran.png "833x364" 0.7,87.1,14.9,11)

## Ce que ça n'est pas

Ici, seuls les changements du service : commandes, réglages, corrections.

| Tu cherches | C'est ici |
| --- | --- |
| Les nouveautés du catalogue | [Annonces](/docs/annonces) |
| Les sorties à venir | [Sorties](/docs/sorties) |
`,cn=`---
titre: "Personnalisation et panel"
description: "Changer le nom, l'avatar et l'allure du service chez toi, et régler les boutons du /panel."
majLe: 2026-10-04
---

Change le profil du service sur ton serveur, et l'allure du \`/panel\`.

## L'application

Ouvre \`/config\`, puis **Personnalisation & Panel**.

:::pas
![Clique sur Application.](/captures/perso-hub.png "833x228" 0.7,79.5,15.6,17.3)
![Règle un des quatre éléments.](/captures/perso-app.png "833x300" 12.6,71.5,50.2,13)
![Clique sur Activer.](/captures/perso-app.png "833x300" 0.7,71.5,12.4,13)
:::

## Ce qui se change

**Tout réinitialiser** rend le profil officiel.

| Élément | Ce que c'est |
| --- | --- |
| **Nom** | Le nom affiché sur ce serveur |
| **Avatar**, **Bannière** | Une adresse d'image, ou un fichier |
| **Description** | Le texte de son profil |

> Faire passer le service pour un service à toi est interdit : voir le [règlement](/rules).

## Le panel

\`/panel\` publie une interface à boutons.

:::pas
![Clique sur Panel.](/captures/perso-hub.png "833x228" 15.7,79.5,11.3,17.3)
![Regarde le résultat.](/captures/panel-poste.png "457x462" 1.8,73.2,96.6,17.2 1.8,89.9,35.3,5.8)
:::

## Les boutons

Dix boutons au plus. Chacun : visible, position, ligne, couleur.

| Disposition | Ce qu'elle donne |
| --- | --- |
| **Standard** | 6 boutons sur 3 lignes |
| **Menu** | Un menu déroulant et 2 boutons |
| **Compact** | Icônes seules |
| **Minimal** | 2 menus et 1 bouton |

## L'apparence

![Auteur, bannière, pied, barre.](/captures/panel-poste.png "457x462" 5.3,7.2,27.2,6.9 5.3,52.6,89,17.8)

- Trois boutons-liens à toi, en bas du panel.
- **Réinitialiser** rend l'apparence d'origine.
`,un=`---
titre: "Les réglages communs"
description: "Salon, mention, format, planification, aperçu : les cinq réglages qu'on retrouve dans presque tous les systèmes."
majLe: 2026-10-04
---

Les mêmes boutons dans presque tous les systèmes de \`/config\`, enregistrés dès que tu valides.

## Le salon

Où le service poste : un salon écrit ou un salon d'annonces.

:::pas
![Clique sur « Salon ».](/captures/sorties-ecran.png "833x338" 0.9,75,10.8,11.5)
![Choisis le salon, puis clique sur « Envoyer ».](/captures/communs-salon.png "496x334" 5.7,60,88.7,14.8 49.8,79.5,44.5,14.5)
:::

> Sans salon, le bouton **Activer** reste grisé. Choisis le salon d'abord, active ensuite.

## La mention

Qui est notifié à chaque envoi. Par défaut : personne.

:::pas
![Clique sur « Mention ».](/captures/sorties-ecran.png "833x338" 11.6,75,12.7,11.5)
![Choisis qui prévenir, et le rôle dans le second menu.](/captures/communs-mention.png "496x492" 5.7,44.5,88.7,10.1 5.7,73,88.7,10.1)
:::

## Image ou texte

Le format ne change ni le contenu ni l'heure d'envoi.

| Format | Ce que c'est |
| --- | --- |
| **Image** (par défaut) | Une carte dessinée, avec les affiches |
| **Texte** | Un embed Plateforme classique, plus léger |

## Le jour, l'heure et le fuseau

L'heure se lit dans le fuseau choisi, le même pour tout le serveur. **Paris** par défaut.

:::pas
![Clique sur « Planification ».](/captures/sorties-ecran.png "833x338" 50.5,75,15.9,11.5)
![Règle le jour et l'heure, puis le fuseau.](/captures/communs-planification.png "496x572" 5.7,34.7,88.7,30 5.7,76.6,88.7,9)
:::

## Aperçu, test et envoi immédiat

Deux boutons voisins : l'un ne poste rien, l'autre poste vraiment.

![À gauche l'aperçu, à droite l'envoi immédiat.](/captures/sorties-ecran.png "833x338" 15.3,86.3,11.9,11.5 27.2,86.3,8.2,11.5)

| Geste | Ce qui se passe |
| --- | --- |
| **Aperçu** | Visible par toi seul, rien n'est posté |
| **Envoi immédiat** (la petite enveloppe) | Poste réellement dans le salon |
`,mn=`---
titre: "Sorties du mois et de la semaine"
description: "Le calendrier des sorties cinéma, séries et animés, posté chez toi chaque mois ou chaque semaine."
majLe: 2026-10-04
---

Deux calendriers indépendants dans \`/config\`, mois et semaine, avec le même écran.

## Ce qui est posté

Les sorties rangées par jour, en [image ou texte](/docs/reglages-communs#image-ou-texte).

![L'affiche du mois, telle qu'elle arrive.](/captures/sorties-affiche.jpg "321x389")

> Ce sont les sorties annoncées, pas le catalogue : un titre affiché n'est pas forcément disponible sur GenZstream.

## Les catégories

Films, Séries, Animés : au moins une case reste cochée.

:::pas
![Clique sur « Catégories ».](/captures/sorties-ecran.png "833x338" 36.1,75,14.4,11.5)
![Coche tes catégories, puis clique sur « Envoyer ».](/captures/communs-categories.png "496x342" 5.7,58.6,88.7,16.6 49.8,80.3,44.5,14)
:::

## Quand il part

**Planification** règle le jour, l'heure pleine et le [fuseau](/docs/reglages-communs#le-jour-l-heure-et-le-fuseau).

![Clique sur « Planification ».](/captures/sorties-ecran.png "833x338" 50.5,75,15.9,11.5 35.2,52,24.2,19)

| Calendrier | Jours proposés |
| --- | --- |
| **Sorties du mois** | Neuf jours, du 1er au 28 |
| **Sorties de la semaine** | Du lundi au dimanche |

## Vérifier, puis activer

L'[aperçu](/docs/reglages-communs#apercu-test-et-envoi-immediat) ne poste rien. Activer demande [un salon](/docs/reglages-communs#le-salon).

![À gauche « Aperçu ». À côté, l'envoi réel.](/captures/sorties-ecran.png "833x338" 15.3,86.3,11.9,11.5 27.2,86.3,8.2,11.5)
`,dn=`---
titre: "Versus"
description: "Deux contenus s'affrontent, tes membres votent. En local chez toi, ou synchronisé avec les autres serveurs."
majLe: 2026-10-04
---

\`/config\` → **Versus** : deux contenus s'affrontent, tes membres votent.

![Un Versus posté, avec son menu de vote.](/captures/versus-poste.jpg "833x415")

## Local ou synchronisé

**Mode** change le reste de l'écran.

![Clique sur « Mode ». En synchronisé, Planification est grisé.](/captures/versus-ecran.png "833x347" 11.4,75.2,11.2,11.6 46.6,75.2,16.4,11.6)

| Ce qui change | Local | Synchronisé |
| --- | --- | --- |
| Le duel | Propre à ton serveur | Le même partout |
| Le démarrage | Tu choisis | Lundi 12 h, heure de Paris |
| Les votes | Tes membres seuls | Cumulés entre serveurs |

## La cadence en local

**Planification** règle les jours, l'heure, le [fuseau](/docs/reglages-communs#le-jour-l-heure-et-le-fuseau) et la durée du vote.

> Une durée plus longue que l'écart entre deux démarrages fait se chevaucher les duels.

## Tester et envoyer

« Tester maintenant » se montre à toi seul. Le petit bouton voisin poste un vrai duel.

![À gauche le test, à côté l'envoi réel.](/captures/versus-ecran.png "833x347" 15.1,86.2,20.3,11.4 35,86.2,8.6,11.4)

## À savoir

- [Salon](/docs/reglages-communs#le-salon), [mention](/docs/reglages-communs#la-mention) et [image ou texte](/docs/reglages-communs#image-ou-texte) : les réglages communs.
- Vote en masse ou automatisé : sanctionné, voir le [règlement](/rules).
`,pn=`---
titre: "Règlement d’ajout"
description: "Les règles à respecter pour ajouter des liens au catalogue."
majLe: 2026-07-12
---

Ce règlement complète le [règlement général](/rules) pour tous les hosteurs utilisant \`/add\`.

1. **Vérifie avant d’ajouter.** Le lien doit fonctionner, lancer le bon contenu et ne pas faire doublon.
2. **Décris exactement la source.** Bon titre, saison, épisode, langue, partie et qualité ; aucune information volontairement trompeuse.
3. **Protège les membres.** Aucun paiement imposé, malware, faux téléchargement, raccourcisseur piégé ou redirection manifestement dangereuse.
4. **Ajoute pour le catalogue.** Pas de spam, faux ajout, source interdite ou manipulation du score et du classement.
5. **Corrige tes erreurs.** Une erreur honnête se répare ; la négligence répétée ou l’abus entraîne le retrait temporaire ou définitif des droits.

L’équipe reste libre de refuser ou retirer une source douteuse, instable ou inadaptée, même si elle n’est pas nommée ici. Un lien manifestement malveillant peut entraîner un bannissement immédiat.

La procédure pratique est expliquée dans le [guide d’ajout](/guides/add).
`;function le(t,e){var c,a;const s=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/),i=(s==null?void 0:s[1])??"",r=(s==null?void 0:s[2])??e,o=l=>{const u=i.match(new RegExp(`^${l}:\\s*(.*)$`,"m"));return u?u[1].trim().replace(/^["']|["']$/g,""):null};return{slug:t,titre:o("titre")??t,description:o("description")??"",section:((c=w.find(l=>l.slugs.includes(t)))==null?void 0:c.section)??"Aller plus loin",teinte:((a=w.find(l=>l.slugs.includes(t)))==null?void 0:a.teinte)??"bleu",majLe:o("majLe"),blocs:Je(r)}}const xn=Object.assign({"../content/docs/ajout.md":Ze,"../content/docs/annonces.md":Ke,"../content/docs/anti-pub.md":Xe,"../content/docs/arrivees.md":Ye,"../content/docs/assistance.md":en,"../content/docs/avis.md":nn,"../content/docs/classement.md":tn,"../content/docs/commandes.md":sn,"../content/docs/demandes.md":an,"../content/docs/demarrer.md":rn,"../content/docs/depannage.md":on,"../content/docs/mises-a-jour.md":ln,"../content/docs/personnalisation.md":cn,"../content/docs/reglages-communs.md":un,"../content/docs/sorties.md":mn,"../content/docs/versus.md":dn}),_=new Map(Object.entries(xn).map(([t,e])=>{const s=t.split("/").pop().replace(/\.md$/,"");return[s,le(s,e)]}));function O(){const t=[..._.keys()].filter(e=>!Q.includes(e)).sort();return[...Q,...t].map(e=>_.get(e)).filter(e=>!!e)}function gn(t){return _.get(t)??null}function ce(){return w.map(t=>({section:t.section,intro:t.intro,teinte:t.teinte,chapitres:t.slugs.map(e=>_.get(e)).filter(e=>!!e)})).filter(t=>t.chapitres.length>0)}function hn(t){const e=We(t.blocs)[0];return e?{src:e.src,legende:e.legende}:null}function fn(t){return t.blocs.filter(e=>e.type==="titre"&&e.niveau===2).map(e=>({texte:e.texte,ancre:e.ancre}))}const vn=Object.assign({"../content/reglement-ajout.md":pn});function jn(){const t=Object.values(vn)[0];return t?le("ajout",t):null}const W=new Map;function bn(t){let e=W.get(t.slug);return e===void 0&&(e=S([t.titre,t.description,...t.blocs.map(P)].join(` 
 `)),W.set(t.slug,e)),e}function Nn(t,e){const s=t.lignes.map(i=>i.map(q)).find(i=>S(i.join(" ")).includes(e));return s?s.join(" : "):null}function ue(t){const e=S(t.trim());return e.length<2?[]:O().filter(s=>bn(s).includes(e)).map(s=>{const i=[];let r=null,o=!1,c=null;for(const a of s.blocs){a.type==="titre"&&a.niveau===2&&(r={texte:a.texte,ancre:a.ancre},o=!1);const l=P(a);!l||!S(l).includes(e)||(!c&&a.type!=="titre"&&(c=a.type==="tableau"?Nn(a,e)??l:l),r&&!o&&(i.push(r),o=!0))}return{chapitre:s,sections:i.slice(0,3),extrait:c}})}function me(t){if(!t)return null;const e=new Date(`${t}T00:00:00Z`);return Number.isNaN(e.getTime())?null:e.toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}const qn={commandes:ze,demarrer:se,"reglages-communs":Ue,arrivees:Oe,annonces:Me,sorties:Ie,versus:$e,classement:Te,avis:ke,demandes:Re,"mises-a-jour":Pe,assistance:Ee,personnalisation:De,depannage:te,"anti-pub":Ae,ajout:_e},Cn={Installer:se,"Les systèmes":qe,Aide:te},Ln={Installer:"Ajoute le service à ton serveur","Les systèmes":"Active ceux que tu veux",Aide:"Si quelque chose coince"},C=t=>qn[t]??Fe,yn="rounded-md bg-fond px-1.5 py-0.5 font-mono text-[0.88em] text-creme ring-1 ring-inset ring-bordure-claire/70 [overflow-wrap:anywhere]",J="font-semibold text-creme underline decoration-[var(--teinte-claire)] decoration-2 underline-offset-4 hover:text-[var(--teinte-claire)]";function N({contenu:t}){return n.jsx(n.Fragment,{children:t.map((e,s)=>e.type==="gras"?n.jsx("strong",{className:"font-bold text-creme",children:n.jsx(N,{contenu:e.contenu})},s):e.type==="code"?n.jsx("code",{className:yn,children:e.texte},s):e.type==="lien"?e.href.startsWith("/")?n.jsx(g,{to:e.href,className:J,children:e.texte},s):n.jsx("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:J,children:e.texte},s):n.jsx("span",{children:e.texte},s))})}const de="w-full text-left max-sm:block sm:border-separate sm:border-spacing-x-0 sm:border-spacing-y-1.5",L="px-4 pb-0.5 text-[13px] font-semibold text-doux",pe="align-top max-sm:flex max-sm:flex-col max-sm:gap-1.5 max-sm:rounded-2xl max-sm:bg-panneau2 max-sm:px-4 max-sm:py-3.5",y="max-sm:block sm:bg-panneau2 sm:px-4 sm:py-3 sm:first:rounded-l-2xl sm:last:rounded-r-2xl text-[15px] leading-relaxed";function U({valeur:t,onChange:e,placeholder:s,label:i,grand:r,onEntree:o,refChamp:c}){const a=x.useRef(null),l=c??a;return n.jsxs("div",{className:h("flex shrink-0 items-center gap-3 bg-panneau ring-1 ring-inset ring-bordure-claire transition-shadow focus-within:ring-2 focus-within:ring-creme",r?"h-14 rounded-2xl px-5 sm:h-16":"h-11 rounded-xl px-3.5"),children:[n.jsx(re,{size:r?22:17,className:"shrink-0 text-creme","aria-hidden":!0}),n.jsx("input",{ref:l,type:"search",value:t,onChange:u=>e(u.target.value),onKeyDown:u=>{u.key==="Enter"&&(o==null||o())},placeholder:s,"aria-label":i,className:h("min-w-0 flex-1 bg-transparent text-creme outline-none placeholder:text-doux/80 [&::-webkit-search-cancel-button]:hidden",r?"text-base sm:text-lg":"text-base lg:text-sm")}),t&&n.jsx("button",{type:"button",onClick:()=>{var u;e(""),(u=l.current)==null||u.focus()},"aria-label":"Effacer",className:"-mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-doux hover:bg-panneau2 hover:text-creme",children:n.jsx(Se,{size:16})})]})}function wn({fr:t,en:e}){const[s,i]=x.useState(!1),r=t===e,o=s?e:t;return r?n.jsx("span",{className:"inline-block whitespace-nowrap rounded-lg bg-fond ring-1 ring-inset ring-bordure-claire/70 px-2.5 py-1.5 font-mono text-[15px] font-semibold text-creme",children:t}):n.jsxs("button",{type:"button",onClick:()=>i(c=>!c),title:s?`En français : ${t}`:`Le nom affiché par un Plateforme en anglais : ${e}`,"aria-label":`${t}, afficher ${s?"le nom français":"le nom anglais"}`,className:"group inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-fond ring-1 ring-inset ring-bordure-claire/70 px-2.5 py-1.5 font-mono text-[15px] font-semibold text-creme transition-colors hover:ring-creme/50",children:[o,n.jsx("span",{"aria-hidden":!0,className:`rounded px-1 py-0.5 font-texte text-[10px] font-bold uppercase tracking-wide transition-colors ${s?"bg-creme/15 text-creme":"text-doux group-hover:text-creme"}`,children:s?"en":"fr"})]})}function Sn(){const[t,e]=x.useState(""),s=t.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""),i=x.useMemo(()=>ie.map(o=>({...o,commandes:o.commandes.filter(c=>s.length===0||Be(c,o).includes(s))})).filter(o=>o.commandes.length>0),[s]),r=i.reduce((o,c)=>o+c.commandes.length,0);return n.jsxs("div",{className:"flex flex-col gap-8",children:[n.jsx(U,{valeur:t,onChange:e,placeholder:"Filtrer : favoris, alerte, search…",label:"Filtrer les commandes"}),r===0?n.jsx("p",{className:"py-6 text-[15px] leading-relaxed text-creme",children:"Aucune commande ne correspond. Le chatbot du serveur d'aide, lui, répond en toutes lettres."}):i.map(o=>{const c=He[o.portee];return n.jsxs("section",{className:"flex flex-col gap-3",children:[n.jsxs("div",{className:"flex flex-col gap-2",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-x-3 gap-y-1.5",children:[n.jsx("h3",{className:"font-titre text-[17px] font-black text-creme",children:o.titre}),n.jsx(D,{titre:c.phrase,children:c.titre})]}),n.jsx("p",{className:"text-[15px] leading-relaxed text-creme/85",children:o.intro})]}),n.jsxs("table",{className:h(de,"sm:table-fixed"),children:[n.jsx("thead",{className:"max-sm:hidden",children:n.jsxs("tr",{children:[n.jsx("th",{className:h(L,"w-[11.5rem]"),children:"Commande"}),n.jsx("th",{className:h(L,"w-[14rem]"),children:"Ce qu'elle demande"}),n.jsx("th",{className:L,children:"Ce qu'elle fait"})]})}),n.jsx("tbody",{className:"max-sm:flex max-sm:flex-col max-sm:gap-2",children:o.commandes.map(a=>n.jsxs("tr",{className:pe,children:[n.jsx("td",{className:y,children:n.jsx(wn,{fr:a.nom,en:a.nomEn})}),n.jsx("td",{className:h(y,"font-mono !text-[13px] text-creme/80",!a.args&&"max-sm:hidden"),children:a.args??n.jsx("span",{className:"font-texte text-doux",children:"rien à saisir"})}),n.jsxs("td",{className:h(y,"text-creme"),children:[a.quoi,a.precision&&n.jsx("span",{className:"mt-1 block text-sm leading-relaxed text-doux",children:a.precision})]})]},a.nom))})]})]},o.titre)})]})}function xe({capture:t,differee:e=!0}){const s=t.largeur&&t.hauteur?t.largeur/t.hauteur:0,i=Math.round(Math.min(t.largeur||640,640,s?448*s:640));return n.jsxs("span",{className:"relative block",style:{width:`min(100%, ${i}px)`,aspectRatio:s?`${t.largeur} / ${t.hauteur}`:void 0},children:[n.jsx("img",{src:t.src,alt:t.legende,loading:e?"lazy":void 0,decoding:"async",width:t.largeur||void 0,height:t.hauteur||void 0,className:"block h-auto w-full rounded-lg"}),t.cadres.map((r,o)=>n.jsx("span",{"aria-hidden":!0,className:"cadre-doc",style:{left:`${r.x}%`,top:`${r.y}%`,width:`${r.l}%`,height:`${r.h}%`}},o))]})}function _n({etapes:t}){const[e,s]=x.useState(0),[i,r]=x.useState(!1),o=t.length;if(x.useEffect(()=>{var l;if(i||o<2||(l=window.matchMedia)!=null&&l.call(window,"(prefers-reduced-motion: reduce)").matches)return;const a=window.setInterval(()=>s(u=>(u+1)%o),3200);return()=>window.clearInterval(a)},[i,o]),o===0)return null;const c=a=>{r(!0),s((a+o)%o)};return n.jsxs("figure",{className:"grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:items-start",children:[n.jsx("div",{className:"grid grid-cols-1 items-center rounded-2xl bg-fond p-3 sm:p-5",children:t.map((a,l)=>n.jsx("div",{"aria-hidden":l!==e,className:h("col-start-1 row-start-1 flex justify-center transition-opacity duration-300",l===e?"opacity-100":"pointer-events-none opacity-0"),children:n.jsx(xe,{capture:a,differee:!1})},l))}),n.jsx("ol",{className:"flex flex-col gap-1.5",children:t.map((a,l)=>n.jsx("li",{children:n.jsxs("button",{type:"button",onClick:()=>c(l),"aria-current":l===e?"step":void 0,className:h("flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left text-[15px] leading-snug transition-colors",l===e?"bg-panneau2 text-creme":"text-creme/75 hover:bg-panneau2/60 hover:text-creme"),children:[n.jsx("span",{className:h("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums",l===e?"bg-[var(--teinte)] text-[var(--teinte-encre)]":"bg-panneau2 text-creme"),children:l+1}),n.jsx("span",{className:"min-w-0 pt-0.5",children:a.legende})]})},l))})]})}function A({blocs:t}){return n.jsx("div",{className:"flex flex-col gap-4",children:t.map((e,s)=>{if(e.type==="titre")return e.niveau===3?n.jsx("h3",{id:e.ancre,className:"mt-1 scroll-mt-24 font-titre text-base font-black text-creme",children:e.texte},s):n.jsx("h2",{id:e.ancre,className:"mt-4 scroll-mt-24 font-titre text-[19px] font-black leading-tight text-creme first:mt-0",children:e.texte},s);if(e.type==="paragraphe")return n.jsx("p",{className:"max-w-[72ch] text-[15.5px] leading-[1.65] text-creme",children:n.jsx(N,{contenu:e.contenu})},s);if(e.type==="note")return n.jsxs("p",{className:"flex gap-3 rounded-2xl bg-retro-jaune/[0.13] px-4 py-3.5 text-[15.5px] leading-[1.6] text-creme",children:[n.jsx(Le,{size:18,"aria-hidden":!0,className:"mt-[0.2em] shrink-0 text-[#f1c96a]"}),n.jsx("span",{className:"min-w-0",children:n.jsx(N,{contenu:e.contenu})})]},s);if(e.type==="tableau"){const r=e.colonnes.length>2;return n.jsxs("table",{className:de,children:[n.jsx("thead",{className:"max-sm:hidden",children:n.jsx("tr",{children:e.colonnes.map((o,c)=>n.jsx("th",{className:L,children:o},c))})}),n.jsx("tbody",{className:"max-sm:flex max-sm:flex-col max-sm:gap-2",children:e.lignes.map((o,c)=>n.jsx("tr",{className:pe,children:o.map((a,l)=>n.jsxs("td",{className:h(y,l===0?"font-bold text-creme sm:w-[34%]":"text-creme/90"),children:[r&&l>0&&e.colonnes[l]&&n.jsxs("span",{className:"mr-1.5 text-[13px] font-semibold text-doux sm:hidden",children:[e.colonnes[l]," :"]}),n.jsx(N,{contenu:a})]},l))},c))})]},s)}if(e.type==="commandes")return n.jsx(Sn,{},s);if(e.type==="image")return n.jsxs("figure",{className:"flex flex-col gap-2.5",children:[n.jsx("div",{className:"flex justify-center rounded-2xl bg-fond p-3 sm:p-5",children:n.jsx(xe,{capture:e})}),e.legende&&n.jsx("figcaption",{className:"text-[14px] leading-relaxed text-creme/80",children:e.legende})]},s);if(e.type==="pas")return n.jsx(_n,{etapes:e.etapes},s);const i=e.ordonnee?"ol":"ul";return n.jsx(i,{className:"flex max-w-[72ch] flex-col gap-2.5 text-[15.5px] leading-[1.6] text-creme",children:e.points.map((r,o)=>n.jsxs("li",{className:"flex gap-3",children:[e.ordonnee?n.jsx("span",{"aria-hidden":!0,className:"flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--teinte)_22%,transparent)] text-[12.5px] font-bold tabular-nums text-[var(--teinte-claire)]",children:o+1}):n.jsx(ye,{size:17,strokeWidth:2.75,"aria-hidden":!0,className:"mt-[0.25em] shrink-0 text-[var(--teinte-claire)]"}),n.jsx("span",{className:"min-w-0",children:n.jsx(N,{contenu:r})})]},o))},s)})})}function Z(t){return t.blocs.some(e=>e.type==="image"||e.type==="pas"||e.type==="commandes"||e.type==="tableau"&&e.colonnes.length>2)||t.blocs.reduce((e,s)=>e+P(s).length,0)>620}function An(t){const e=[];for(let s=0;s<t.length;s++){const i=t[s+1];!Z(t[s])&&i&&!Z(i)?(e.push(!1,!1),s++):e.push(!0)}return e}function ge({sections:t}){const e=x.useMemo(()=>An(t),[t]);return n.jsx("div",{className:"grid grid-cols-1 gap-3 xl:grid-cols-2",children:t.map((s,i)=>n.jsxs(E,{id:s.ancre,className:h("scroll-mt-24 sm:!p-6",e[i]&&"xl:col-span-2"),children:[n.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[n.jsx("span",{"aria-hidden":!0,className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--teinte)] font-titre text-[17px] font-black tabular-nums text-[var(--teinte-encre)]",children:i+1}),n.jsx("h2",{className:"min-w-0 font-titre text-[19px] font-black leading-tight text-creme sm:text-[21px]",children:s.titre})]}),n.jsx(A,{blocs:s.blocs})]},s.ancre))})}function Dn({courant:t}){return n.jsxs("div",{className:"flex flex-col gap-5",children:[n.jsx(K,{to:"/docs",icone:M,actif:t===void 0,children:"Accueil de la doc"}),ce().map(e=>n.jsxs("div",{"data-teinte":e.teinte,children:[n.jsx("p",{className:"mb-1.5 px-3 text-xs font-semibold text-doux",children:e.section}),n.jsx("ul",{className:"flex flex-col gap-0.5",children:e.chapitres.map(s=>n.jsx("li",{children:n.jsx(K,{to:`/docs/${s.slug}`,icone:C(s.slug),actif:s.slug===t,children:s.titre})},s.slug))})]},e.section))]})}function K({to:t,icone:e,actif:s,children:i}){return n.jsxs(g,{to:t,"aria-current":s?"page":void 0,className:h("flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold leading-tight transition-colors lg:min-h-10 lg:text-sm",s?"bg-creme text-fond":"text-creme hover:bg-panneau"),children:[n.jsx(e,{size:19,strokeWidth:2,"aria-hidden":!0,className:h("shrink-0",!s&&"text-[var(--teinte-claire)]")}),n.jsx("span",{className:"min-w-0",children:i})]})}function En({resultats:t}){return t.length===0?n.jsx("p",{className:"px-3 text-sm leading-relaxed text-creme",children:"Aucun chapitre ne parle de ça."}):n.jsx("ul",{className:"flex flex-col gap-1","aria-live":"polite",children:t.map(e=>{const s=C(e.chapitre.slug);return n.jsxs("li",{"data-teinte":e.chapitre.teinte,children:[n.jsxs(g,{to:`/docs/${e.chapitre.slug}`,className:"flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold leading-tight text-creme hover:bg-panneau lg:min-h-10 lg:text-sm",children:[n.jsx(s,{size:19,"aria-hidden":!0,className:"shrink-0 text-[var(--teinte-claire)]"}),n.jsx("span",{className:"min-w-0",children:e.chapitre.titre})]}),e.sections.length>0&&n.jsx("ul",{className:"mb-1 ml-[1.35rem] flex flex-col border-l-2 border-[color-mix(in_oklab,var(--teinte)_45%,transparent)] pl-3",children:e.sections.map(i=>n.jsx("li",{children:n.jsx(g,{to:`/docs/${e.chapitre.slug}#${i.ancre}`,className:"block rounded-lg px-2 py-1.5 text-[13.5px] leading-snug text-creme/85 hover:bg-panneau hover:text-creme",children:i.texte})},i.ancre))})]},e.chapitre.slug)})})}function he({courant:t,teinte:e,sansRecherche:s,children:i}){const[r,o]=x.useState(""),[c,a]=x.useState(!1),l=x.useMemo(()=>ue(r),[r]),u=!s&&r.trim().length>=2,v=x.useRef(null),d=x.useRef(null),p=be(),f=ee();x.useEffect(()=>{a(!1),o("")},[p.pathname,p.hash]),x.useEffect(()=>{const m=d.current,R=m==null?void 0:m.querySelector('[aria-current="page"]');if(!m||!R)return;const k=R.offsetTop-m.offsetTop;(k<m.scrollTop||k+R.offsetHeight>m.scrollTop+m.clientHeight)&&(m.scrollTop=k-m.clientHeight/2)},[t]);const j=()=>{const m=l[0];u&&m&&f(`/docs/${m.chapitre.slug}${m.sections[0]?`#${m.sections[0].ancre}`:""}`)},F=m=>n.jsx(U,{valeur:r,onChange:o,onEntree:j,refChamp:m,placeholder:"Chercher dans la doc",label:"Chercher dans la documentation"}),H=u?n.jsx(En,{resultats:l}):n.jsx(Dn,{courant:t});return n.jsxs("div",{"data-teinte":e,className:"equipe mx-auto flex w-full max-w-[1560px] flex-col lg:flex-row lg:gap-8 lg:px-8",children:[n.jsxs("nav",{ref:d,"aria-label":"Plan de la documentation",className:"eq-colonne hidden w-[264px] shrink-0 flex-col gap-4 py-6 lg:flex",children:[!s&&F(),H]}),n.jsxs("div",{className:"px-4 pt-3 lg:hidden",children:[n.jsxs("div",{className:"flex gap-2",children:[n.jsxs("button",{type:"button",onClick:()=>a(m=>!m),"aria-expanded":c,className:"flex h-12 min-w-0 flex-1 items-center gap-3 rounded-2xl bg-panneau px-4 text-[15px] font-semibold text-creme active:bg-panneau2",children:[n.jsx(M,{size:19,"aria-hidden":!0,className:"shrink-0"}),n.jsx("span",{className:"min-w-0 flex-1 truncate text-left",children:"Documentation"}),n.jsx(Ce,{size:18,"aria-hidden":!0,className:h("shrink-0 transition-transform",c&&"rotate-180")})]}),!s&&n.jsx("button",{type:"button","aria-label":"Chercher dans la documentation",onClick:()=>{a(!0),requestAnimationFrame(()=>{var m;return(m=v.current)==null?void 0:m.focus()})},className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-panneau text-creme active:bg-panneau2",children:n.jsx(re,{size:19,"aria-hidden":!0})})]}),c&&n.jsxs("nav",{"aria-label":"Plan de la documentation",className:"mt-2 flex flex-col gap-4 rounded-3xl bg-fond2 p-3",children:[!s&&F(v),H]})]}),n.jsx("div",{className:"min-w-0 flex-1 px-4 pb-10 pt-5 lg:px-0 lg:pb-14 lg:pt-7",children:i})]})}function z({children:t}){return n.jsxs("nav",{className:"mt-8 flex flex-wrap gap-x-5 gap-y-2 px-1 text-sm font-semibold",children:[t,n.jsx(g,{to:"/rules",className:"text-doux hover:text-creme",children:"Règlement général"}),n.jsx(g,{to:"/terms",className:"text-doux hover:text-creme",children:"Conditions d'utilisation"}),n.jsx(g,{to:"/",className:"text-creme hover:underline",children:"Retour à l'accueil"})]})}function fe(){return n.jsxs(E,{as:"div",className:"mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",children:[n.jsx(we,{size:26,"aria-hidden":!0,className:"hidden shrink-0 text-[var(--teinte-claire)] sm:block"}),n.jsxs("p",{className:"min-w-0 flex-1 text-[15px] leading-snug text-creme",children:[n.jsx("span",{className:"font-bold",children:"Pas ta réponse ici ?"})," Sur le serveur, le chatbot lit cette documentation et répond aux questions."]}),n.jsx("a",{href:"/",target:"_blank",rel:"noopener noreferrer",className:"inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-creme px-4 text-[13px] font-bold text-fond transition-colors hover:bg-accent",children:"Rejoindre le serveur"})]})}function X(t,e){return Ne(t,e).flatMap(s=>Array.from({length:s},()=>12/s))}function Un(){const t=ce(),e=O(),[s,i]=x.useState(""),r=x.useMemo(()=>ue(s),[s]),o=s.trim().length>=2,c=ee();return $({titre:B.titre,description:B.description,chemin:"/docs",premid:"Documentation",donneesStructurees:[I([["Documentation","/docs"]]),{"@context":"https://schema.org","@type":"ItemList",name:"Documentation GenZstream",itemListElement:e.map((a,l)=>({"@type":"ListItem",position:l+1,name:a.titre,url:`https://heiwastream.fr/docs/${a.slug}`}))}]}),n.jsx(he,{sansRecherche:!0,children:n.jsxs("article",{className:"max-w-[1120px]",children:[n.jsx("h1",{className:"eq-titre",children:"Documentation"}),n.jsx("p",{className:"mt-1 text-[15px] text-creme sm:text-base",children:"Installer GenZstream sur ton service, pas à pas."}),n.jsx("div",{className:"mt-5",children:n.jsx(U,{grand:!0,valeur:s,onChange:i,onEntree:()=>{const a=r[0];a&&c(`/docs/${a.chapitre.slug}${a.sections[0]?`#${a.sections[0].ancre}`:""}`)},placeholder:"Chercher : salon, mention, permissions…",label:"Chercher dans la documentation"})}),o?n.jsxs("div",{className:"mt-5","aria-live":"polite",children:[n.jsx("p",{className:"px-1 text-[15px] font-semibold text-creme",children:r.length===0?"Aucun chapitre ne parle de ça.":`${r.length} chapitre${r.length>1?"s":""} pour « ${s.trim()} »`}),n.jsx("div",{className:"mt-3 flex flex-col gap-2.5",children:r.map(a=>{const l=C(a.chapitre.slug);return n.jsxs(E,{as:"div",teinte:a.chapitre.teinte,className:"flex gap-4",children:[n.jsx("span",{className:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--teinte)_20%,transparent)] text-[var(--teinte-claire)]",children:n.jsx(l,{size:21,"aria-hidden":!0})}),n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-x-3 gap-y-1.5",children:[n.jsx(g,{to:`/docs/${a.chapitre.slug}`,className:"font-titre text-[17px] font-black leading-tight text-creme hover:underline",children:a.chapitre.titre}),n.jsx(D,{children:a.chapitre.section})]}),a.extrait&&n.jsx("p",{className:"mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-creme/85",children:a.extrait}),a.sections.length>0&&n.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:a.sections.map(u=>n.jsxs(g,{to:`/docs/${a.chapitre.slug}#${u.ancre}`,className:"inline-flex min-h-9 items-center gap-1.5 rounded-full bg-panneau2 px-3.5 text-[13px] font-semibold text-creme transition-colors hover:bg-bordure-claire/70",children:[u.texte,n.jsx(ne,{size:13,"aria-hidden":!0,className:"text-[var(--teinte-claire)]"})]},u.ancre))})]})]},a.chapitre.slug)})})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3",children:t.map((a,l)=>{const u=Cn[a.section]??M,v=l===0?a.chapitres[0]:void 0;return n.jsxs(g,{to:v?`/docs/${v.slug}`:`#${T(a.section)}`,"data-teinte":a.teinte,className:"flex min-h-[124px] flex-col justify-between rounded-[26px] bg-[var(--teinte)] p-4 text-[var(--teinte-encre)] transition-transform active:scale-[0.98]",children:[n.jsxs("span",{className:"flex items-start gap-2 font-titre text-[17px] font-black leading-tight",children:[n.jsx(u,{size:20,strokeWidth:2.25,"aria-hidden":!0,className:"mt-px shrink-0"}),a.section]}),n.jsxs("span",{className:"flex items-end gap-3",children:[n.jsx("span",{className:"eq-nombre text-[44px] sm:text-[52px]",children:l+1}),n.jsx("span",{className:"pb-1.5 text-[14px] font-bold leading-snug",children:Ln[a.section]})]})]},a.section)})}),n.jsx("div",{className:"mt-8 flex flex-col gap-8",children:t.map(a=>{const l=a.chapitres.length,u=X(l,2),v=X(l,3);return n.jsxs("section",{id:T(a.section),"data-teinte":a.teinte,className:"scroll-mt-24",children:[n.jsx("h2",{className:"px-1 font-titre text-[17px] font-black text-creme",children:a.section}),n.jsx("div",{className:"mt-3 grid grid-cols-12 gap-2.5",children:a.chapitres.map((d,p)=>{const f=C(d.slug);return n.jsxs(g,{to:`/docs/${d.slug}`,style:{"--t2":`span ${u[p]}`,"--t3":`span ${v[p]}`},className:"col-span-12 flex items-center gap-3.5 rounded-3xl bg-panneau p-3.5 transition-colors hover:bg-panneau2 sm:p-4 sm:[grid-column:var(--t2)] xl:[grid-column:var(--t3)]",children:[n.jsx("span",{className:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--teinte)_20%,transparent)] text-[var(--teinte-claire)]",children:n.jsx(f,{size:21,"aria-hidden":!0})}),n.jsxs("span",{className:"min-w-0 flex-1",children:[n.jsx("span",{className:"block truncate text-[15px] font-bold text-creme",children:d.titre}),n.jsx("span",{className:"block truncate text-[13px] text-doux",children:d.description})]})]},d.slug)})})]},a.section)})}),n.jsx(fe,{})]}),n.jsx(z,{})]})})}function zn(){const{slug:t}=ve(),e=t?gn(t):null,s=e?hn(e):null;$({titre:e?`${e.titre} · Documentation GenZstream`:"Chapitre introuvable · GenZstream",description:(e==null?void 0:e.description)??"Ce chapitre n'existe pas, ou plus. La documentation complète est sur heiwastream.fr/docs.",chemin:e?`/docs/${e.slug}`:"/docs",premid:(e==null?void 0:e.titre)??"Documentation",donneesStructurees:e?[I([["Documentation","/docs"],[e.titre,`/docs/${e.slug}`]]),{"@context":"https://schema.org","@type":"TechArticle",headline:e.titre,description:e.description,inLanguage:"fr-FR",...s?{image:`https://heiwastream.fr${s.src}`}:{},...e.majLe?{dateModified:e.majLe}:{},author:{"@type":"Organization",name:"GenZstream"},publisher:{"@type":"Organization",name:"GenZstream"},mainEntityOfPage:`https://heiwastream.fr/docs/${e.slug}`}]:void 0});const{preambule:i,sections:r}=x.useMemo(()=>oe((e==null?void 0:e.blocs)??[]),[e]);if(x.useEffect(()=>{const d=decodeURIComponent(window.location.hash.slice(1));if(!d)return;const p=requestAnimationFrame(()=>{var f;return(f=document.getElementById(d))==null?void 0:f.scrollIntoView({block:"start"})});return()=>cancelAnimationFrame(p)},[e==null?void 0:e.slug]),!e&&t&&Qe.includes(t))return n.jsx(je,{to:"/docs",replace:!0});if(!e)return n.jsxs("div",{className:"equipe mx-auto max-w-3xl px-4 py-16",children:[n.jsx("h1",{className:"eq-titre",children:"Chapitre introuvable"}),n.jsx("p",{className:"mt-2 text-base text-creme",children:"Ce chapitre n'existe pas, ou plus. Le plan complet est juste là."}),n.jsx(g,{to:"/docs",className:"mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-creme px-5 text-sm font-bold text-fond transition-colors hover:bg-accent",children:"Voir la documentation"})]});const o=me(e.majLe),c=O(),a=c.findIndex(d=>d.slug===e.slug),l=a>0?c[a-1]:null,u=a>=0&&a+1<c.length?c[a+1]:null,v=fn(e);return n.jsx(he,{courant:e.slug,teinte:e.teinte,children:n.jsxs("article",{className:"max-w-[1120px]",children:[n.jsxs("header",{children:[n.jsx(g,{to:"/docs",className:"inline-flex rounded-full transition-opacity hover:opacity-80",children:n.jsxs(D,{className:"!gap-1.5 !px-3 !py-1.5 !text-[13px]",children:["Documentation ",n.jsx("span",{"aria-hidden":!0,children:"›"})," ",e.section]})}),n.jsx("h1",{className:"eq-titre mt-3",children:e.titre}),i.length===0&&n.jsx("p",{className:"mt-2 max-w-[70ch] text-base leading-relaxed text-creme sm:text-[17px]",children:e.description}),v.length>1&&n.jsx("nav",{"aria-label":"Sur cette page",className:"mt-4 flex flex-wrap gap-2",children:v.map((d,p)=>n.jsxs("a",{href:`#${d.ancre}`,className:"inline-flex min-h-10 items-center gap-2 rounded-full bg-panneau py-1.5 pl-1.5 pr-4 text-[13.5px] font-semibold leading-tight text-creme transition-colors hover:bg-panneau2",children:[n.jsx("span",{"aria-hidden":!0,className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--teinte)_22%,transparent)] text-[12.5px] font-bold tabular-nums text-[var(--teinte-claire)]",children:p+1}),d.texte]},d.ancre))})]}),n.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[i.length>0&&n.jsx("div",{className:"px-1 pb-2",children:n.jsx(A,{blocs:i})}),n.jsx(ge,{sections:r})]}),(l||u)&&n.jsxs("div",{className:"mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3",children:[l&&n.jsx(Y,{chapitre:l,sens:"precedent",seule:!u}),u&&n.jsx(Y,{chapitre:u,sens:"suivant",seule:!l})]}),n.jsx(fe,{}),o&&n.jsxs("p",{className:"mt-4 px-1 text-[13px] text-doux",children:["Chapitre mis à jour le ",o,"."]}),n.jsx(z,{children:n.jsx(g,{to:"/docs",className:"text-doux hover:text-creme",children:"Plan de la documentation"})})]})})}function Y({chapitre:t,sens:e,seule:s}){const i=C(t.slug),r=e==="precedent"?ae:ne;return n.jsxs(g,{to:`/docs/${t.slug}`,"data-teinte":t.teinte,className:h("flex min-h-[104px] items-center gap-4 rounded-[26px] bg-[var(--teinte)] p-4 text-[var(--teinte-encre)] transition-transform active:scale-[0.98] sm:p-5",e==="suivant"&&"flex-row-reverse text-right",s&&"sm:col-span-2"),children:[n.jsx(r,{size:24,strokeWidth:2.5,"aria-hidden":!0,className:"shrink-0"}),n.jsxs("span",{className:"min-w-0 flex-1",children:[n.jsx("span",{className:"block text-[13px] font-bold",children:e==="precedent"?"Précédent":"Suivant"}),n.jsx("span",{className:"mt-0.5 block font-titre text-[18px] font-black leading-tight sm:text-[20px]",children:t.titre})]}),n.jsx(i,{size:30,strokeWidth:2,"aria-hidden":!0,className:"hidden shrink-0 sm:block"})]})}function Fn(){const t=jn();$({titre:`${(t==null?void 0:t.titre)??"Règlement d'ajout"} · GenZstream`,description:(t==null?void 0:t.description)??"Les règles à respecter pour ajouter un lien au catalogue GenZstream : qualité, langue, sources acceptées et vérifications.",chemin:"/rules/add",premid:(t==null?void 0:t.titre)??"Règlement d'ajout",donneesStructurees:I([["Règlement général","/rules"],[(t==null?void 0:t.titre)??"Règlement d'ajout","/rules/add"]])});const{preambule:e,sections:s}=x.useMemo(()=>oe((t==null?void 0:t.blocs)??[]),[t]);if(!t)return null;const i=me(t.majLe);return n.jsxs("div",{className:"equipe mx-auto max-w-4xl px-4 pb-10 pt-5 lg:pt-8",children:[n.jsx(g,{to:"/rules",className:"inline-flex rounded-full transition-opacity hover:opacity-80",children:n.jsxs(D,{className:"!gap-1.5 !px-3 !py-1.5 !text-[13px]",children:[n.jsx(ae,{size:13,"aria-hidden":!0})," Règlement"]})}),n.jsx("h1",{className:"eq-titre mt-3",children:t.titre}),n.jsx("p",{className:"mt-2 max-w-[70ch] text-base leading-relaxed text-creme sm:text-[17px]",children:t.description}),n.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.length>0&&(s.length===0?n.jsx(E,{as:"div",className:"sm:!p-6",children:n.jsx(A,{blocs:e})}):n.jsx("div",{className:"px-1 pb-2",children:n.jsx(A,{blocs:e})})),n.jsx(ge,{sections:s})]}),i&&n.jsxs("p",{className:"mt-4 px-1 text-[13px] text-doux",children:["Mis à jour le ",i,"."]}),n.jsx(z,{children:n.jsx(g,{to:"/docs/ajout",className:"text-doux hover:text-creme",children:"Comment ajouter un contenu"})})]})}export{zn as DocPage,Un as Docs,Fn as ReglementAjout};
