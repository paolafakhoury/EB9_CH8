/* ============================================================
   DATA.JS — Contenu pédagogique complet du Chapitre 8 EB9
   Curriculum libanais — Collège des Sœurs du Rosaire
   ============================================================ */

const CHAPTER_DATA = {

  titre: "Chapitre 8 : Transmission de l'Information Génétique",
  enseignante: "Mme Paola Fakhoury",
  ecole: "Collège des Sœurs du Rosaire — Cornet el Hamra",
  niveau: "EB9",

  // ── OBJECTIFS GÉNÉRAUX ──────────────────────────────────────
  objectifs: [
    { id: 1, texte: "Identifier le processus par lequel le nombre de cellules augmente dans un organisme", activite: 1 },
    { id: 2, texte: "Comprendre comment l'information génétique est distribuée dans les cellules lors de la division cellulaire", activite: 1 },
    { id: 3, texte: "Apprendre les étapes du cycle cellulaire dans les cellules somatiques", activite: 1 },
    { id: 4, texte: "Définir et expliquer le terme « diploïde »", activite: 1 },
    { id: 5, texte: "Déterminer si toutes les cellules d'un organisme possèdent le même caryotype que la cellule-œuf", activite: 2 },
    { id: 6, texte: "Comprendre l'évolution des chromosomes au cours des divisions cellulaires successives", activite: 2 },
    { id: 7, texte: "Identifier les caryotypes des gamètes et distinguer cellule somatique et gamète", activite: 3 },
    { id: 8, texte: "Définir le terme « haploïde » et identifier les étapes de la méiose", activite: 3 },
  ],

  // ── ACTIVITÉS ───────────────────────────────────────────────
  activites: {

    // ════════════════════════════════════════════════
    // ACTIVITÉ 1 — LA MITOSE
    // ════════════════════════════════════════════════
    1: {
      titre: "Activité 1 — La Reproduction Conforme : La Mitose",
      sousTitre: "Comment les cellules somatiques se divisent-elles pour assurer la croissance de l'organisme ?",
      icone: "🔵",
      couleur: "act1",

      rubrique: {
        contexte: "Le corps humain est composé d'environ 37 000 milliards de cellules. Pourtant, chaque être humain commence sa vie comme une cellule unique : la cellule-œuf. Comment le nombre de cellules augmente-t-il autant ? Et surtout, comment l'information génétique est-elle transmise fidèlement à toutes ces cellules ?",
        question: "Comment l'information génétique est-elle distribuée de manière identique dans les cellules lors de la division cellulaire ?",
        observation: "On observe que toutes les cellules somatiques d'un organisme possèdent la même information génétique que la cellule-œuf dont elles sont issues."
      },

      objectifs: [
        "Identifier le processus d'augmentation du nombre de cellules somatiques",
        "Comprendre la distribution de l'information génétique lors de la division",
        "Connaître les étapes du cycle cellulaire",
        "Définir le terme « diploïde (2n) »"
      ],

      cours: [
        {
          titre: "Les cellules somatiques",
          contenu: `Les <span class="kw">cellules somatiques</span> sont toutes les cellules de l'organisme à l'exception des cellules reproductrices (gamètes).

Leur rôle est double :
• Assurer la <span class="kw">croissance</span> de l'organisme
• Permettre la <span class="kw">régénération des tissus</span>

Pour assurer ces fonctions, les cellules somatiques se divisent. Lors de cette division, l'information génétique de la cellule mère est distribuée de manière <span class="kw">identique</span> aux deux cellules filles. Ce processus s'appelle la <span class="kw">mitose</span>.`
        },
        {
          titre: "Définition de la mitose",
          contenu: `La <span class="kw">mitose</span> est un processus de division cellulaire qui permet de diviser le noyau d'une cellule somatique en deux noyaux <span class="kw">génétiquement identiques</span>.

La mitose assure :
✓ La conservation du nombre de chromosomes (2n → 2n)
✓ La conservation de l'information génétique
✓ La production de 2 cellules filles identiques à la cellule mère`
        },
        {
          titre: "Le cycle cellulaire",
          contenu: `Le cycle cellulaire comprend deux grandes phases :

<strong>1. L'Interphase</strong>
C'est la phase de préparation à la division. Pendant l'interphase :
• La cellule <span class="kw">double son matériel génétique</span> (duplication de l'ADN)
• Les chromosomes ne sont pas individualisés : ils se trouvent sous forme diffuse appelée <span class="kw">chromatine</span>
• Chaque chromosome passe de 1 chromatide à <span class="kw">2 chromatides</span>

<strong>2. La Mitose</strong>
C'est la phase de division proprement dite. Elle comprend 4 phases : Prophase, Métaphase, Anaphase, Télophase.`
        },
        {
          titre: "Les 4 phases de la mitose",
          phases: [
            {
              nom: "Prophase",
              couleur: "#3B82F6",
              description: "Les chromosomes se <span class=\"kw\">condensent</span> et deviennent individualisables. Le centrosome se duplique et les deux asters migrent vers les pôles opposés de la cellule. Le <span class=\"kw\">fuseau achromatique</span> se forme entre les asters. La membrane nucléaire disparaît.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "2n (= 46 chez l'Homme)"
            },
            {
              nom: "Métaphase",
              couleur: "#8B5CF6",
              description: "Les chromosomes se déplacent et s'alignent au centre de la cellule, formant la <span class=\"kw\">plaque équatoriale</span>. Chaque chromosome est attaché au fuseau achromatique par son centromère. C'est la phase où les chromosomes sont les plus visibles.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "2n (= 46 chez l'Homme)"
            },
            {
              nom: "Anaphase",
              couleur: "#10B981",
              description: "Les <span class=\"kw\">centromères se doublent</span>. Les deux chromatides sœurs de chaque chromosome se séparent et migrent vers les pôles opposés de la cellule. Chaque pôle reçoit ainsi un ensemble complet de chromosomes (à 1 chromatide).",
              chromatides: "1 chromatide par chromosome",
              nbChrom: "2 × 2n aux deux pôles"
            },
            {
              nom: "Télophase",
              couleur: "#F59E0B",
              description: "Les chromosomes se décondensent et retrouvent leur forme de <span class=\"kw\">chromatine</span> diffuse. La <span class=\"kw\">membrane nucléaire</span> se reconstitue autour de chaque groupe de chromosomes. La cellule se divise par <span class=\"kw\">cytokinèse</span> (étranglement du cytoplasme), donnant 2 cellules filles en interphase.",
              chromatides: "1 chromatide par chromosome",
              nbChrom: "2n dans chaque cellule fille"
            }
          ]
        },
        {
          titre: "Principes fondamentaux de la mitose",
          contenu: `• Le <span class="kw">nombre de chromosomes est conservé</span> : prophase = télophase = 2n
• En prophase et métaphase : les chromosomes ont <span class="kw">2 chromatides</span>
• En anaphase et télophase : les chromosomes ont <span class="kw">1 chromatide</span>
• La <span class="kw">duplication</span> (en interphase) crée des chromosomes à 2 chromatides
• La <span class="kw">séparation des chromatides</span> en anaphase garantit une distribution équitable
• L'information génétique est <span class="kw">conservée</span> : les chromatides identiques portent la même information

<strong>Tableau récapitulatif :</strong>
<table class="data-table" style="margin-top:0.75rem">
  <thead><tr><th>Phase</th><th>Chromosomes</th><th>Chromatides/chr.</th><th>Membrane nucléaire</th></tr></thead>
  <tbody>
    <tr><td>Interphase (début)</td><td>2n</td><td>1</td><td>Présente</td></tr>
    <tr><td>Interphase (fin)</td><td>2n</td><td>2</td><td>Présente</td></tr>
    <tr><td>Prophase</td><td>2n</td><td>2</td><td>Disparaît</td></tr>
    <tr><td>Métaphase</td><td>2n</td><td>2</td><td>Absente</td></tr>
    <tr><td>Anaphase</td><td>2n → 2×2n</td><td>1</td><td>Absente</td></tr>
    <tr><td>Télophase</td><td>2n</td><td>1</td><td>Se reforme</td></tr>
  </tbody>
</table>`,
          isHtml: true
        },
        {
          titre: "La cellule diploïde (2n)",
          contenu: `Une <span class="kw">cellule diploïde</span> est une cellule qui possède un double assortiment de chromosomes homologues.

• Chez l'Homme : 2n = 46 chromosomes (23 paires)
• Toutes les cellules somatiques sont <span class="kw">diploïdes</span>
• Chaque chromosome a son <span class="kw">homologue</span> (un chromosome venant du père, un de la mère)`
        }
      ],

      essentiel: [
        "Les cellules somatiques sont toutes les cellules sauf les gamètes.",
        "La mitose produit 2 cellules filles génétiquement identiques à la cellule mère.",
        "L'interphase précède la mitose : l'ADN se duplique → chromosomes à 2 chromatides.",
        "Prophase : condensation des chromosomes, formation du fuseau, disparition de la membrane nucléaire.",
        "Métaphase : alignement des chromosomes sur la plaque équatoriale.",
        "Anaphase : séparation des chromatides sœurs vers les pôles opposés.",
        "Télophase : décondensation, reformation des noyaux, cytokinèse.",
        "Le nombre de chromosomes est conservé : 2n → 2n.",
        "Une cellule diploïde (2n) possède 2 assortiments de chromosomes homologues."
      ],

      exploitation: [
        {
          question: "Qu'est-ce qu'une cellule somatique ? Donnez 3 exemples.",
          reponse: "Une cellule somatique est toute cellule de l'organisme à l'exception des cellules reproductrices (gamètes). Exemples : cellule musculaire, cellule hépatique (foie), globule blanc, neurone, cellule épithéliale."
        },
        {
          question: "Quel est le rôle de l'interphase dans le cycle cellulaire ?",
          reponse: "L'interphase est la phase de préparation à la division. Pendant cette phase, la cellule double son matériel génétique (duplication de l'ADN). Chaque chromosome passe de 1 chromatide à 2 chromatides sœurs identiques. La chromatine reste sous forme diffuse et non individualisée."
        },
        {
          question: "Décrivez ce qui se passe pendant la métaphase.",
          reponse: "Pendant la métaphase, les chromosomes (à 2 chromatides) se déplacent et s'alignent sur la plaque équatoriale (plan médian de la cellule). Chaque chromosome est attaché au fuseau achromatique par son centromère. Les chromosomes sont au maximum de leur condensation, ce qui les rend les plus visibles à cette phase."
        },
        {
          question: "Pourquoi l'anaphase est-elle une étape clé de la mitose ?",
          reponse: "L'anaphase est clé car c'est à cette phase que les centromères se doublent et que les chromatides sœurs se séparent. Chacune migre vers un pôle opposé de la cellule. Cette séparation équitable garantit que chaque cellule fille recevra exactement le même nombre et les mêmes chromosomes que la cellule mère, conservant ainsi l'information génétique."
        },
        {
          question: "Combien de chromosomes compte une cellule humaine en métaphase et en télophase ? Expliquez.",
          reponse: "En métaphase : 46 chromosomes (2n = 46), chacun à 2 chromatides. En télophase : 46 chromosomes (2n = 46), chacun à 1 chromatide. Le nombre de chromosomes est conservé tout au long de la mitose, car la séparation des chromatides en anaphase ne change pas le nombre de chromosomes — chaque chromatide devient un chromosome à part entière."
        }
      ]
    },

    // ════════════════════════════════════════════════
    // ACTIVITÉ 2 — CONSERVATION DU CARYOTYPE
    // ════════════════════════════════════════════════
    2: {
      titre: "Activité 2 — Conservation du Caryotype",
      sousTitre: "Toutes les cellules d'un organisme ont-elles le même caryotype ?",
      icone: "🟢",
      couleur: "act2",

      rubrique: {
        contexte: "En comparant le caryotype de la cellule-œuf (zygote) avec celui de cellules d'un embryon à 8 cellules et celui de globules blancs d'un adulte, on constate qu'ils sont identiques. Tous ont 2n = 46 chromosomes. Comment est-ce possible ?",
        question: "Comment le caryotype est-il conservé identiquement dans toutes les cellules somatiques de l'organisme au fil des générations cellulaires ?",
        observation: "Cellule-œuf, embryon à 8 cellules, globule blanc adulte → même caryotype 2n = 46."
      },

      objectifs: [
        "Déterminer si toutes les cellules d'un organisme ont le même caryotype",
        "Expliquer pourquoi le caryotype est conservé lors des divisions cellulaires",
        "Comprendre l'évolution du nombre de chromatides à travers le cycle cellulaire",
        "Calculer le nombre de divisions nécessaires pour obtenir un certain nombre de cellules"
      ],

      cours: [
        {
          titre: "Conservation du caryotype chez les cellules somatiques",
          contenu: `Le <span class="kw">caryotype</span> est l'ensemble des chromosomes d'une cellule, classés par paires.

La cellule-œuf, l'embryon à 8 cellules et les globules blancs d'un adulte ont <span class="kw">tous le même caryotype</span> (2n = 46 chez l'Homme). Cela est possible parce que toutes ces cellules sont issues de la même cellule-œuf par des <span class="kw">divisions conformes</span> (mitoses).

Lors de chaque mitose, l'information génétique est copiée fidèlement et distribuée de manière identique aux cellules filles.`
        },
        {
          titre: "Calcul du nombre de divisions cellulaires",
          contenu: `Pour obtenir 8 cellules à partir d'une cellule-œuf, on applique la formule : nombre de cellules = 2<sup>n</sup>, où n est le nombre de divisions.

• 1 cellule → 2 cellules (1<sup>ère</sup> division)
• 2 cellules → 4 cellules (2<sup>ème</sup> division)
• 4 cellules → 8 cellules (3<sup>ème</sup> division)

Il faut donc <span class="kw">3 divisions successives</span> pour passer d'une cellule à 8 cellules (2³ = 8).

<strong>Formule :</strong> Nombre de cellules = 2<sup>n</sup> → n = log₂(nombre de cellules)`
        },
        {
          titre: "Évolution des chromatides au cours du cycle cellulaire",
          contenu: `<strong>Pendant l'Interphase :</strong>
• Début d'interphase : chaque chromosome a <span class="kw">1 chromatide</span>, quantité d'ADN = 1 u.a. (unité arbitraire)
• L'ADN se <span class="kw">duplique</span> → chaque chromosome passe à <span class="kw">2 chromatides</span>
• Fin d'interphase : quantité d'ADN = <span class="kw">2 u.a.</span>

<strong>Pendant la Mitose :</strong>
• Les deux chromatides sœurs de chaque chromosome se séparent (anaphase)
• Chaque cellule fille reçoit 1 chromatide par chromosome
• Quantité d'ADN dans chaque cellule fille = <span class="kw">1 u.a.</span> (divisée par 2)

<strong>Résultat :</strong> La quantité d'ADN est restaurée au niveau initial dans chaque cellule fille.`
        },
        {
          titre: "Chromatides sœurs et identité génétique",
          contenu: `Les deux <span class="kw">chromatides sœurs</span> d'un même chromosome portent une <span class="kw">information génétique identique</span>.

Ceci s'explique car elles résultent de la <span class="kw">duplication</span> du chromosome. Lors de la duplication, chaque brin d'ADN sert de modèle pour synthétiser un brin complémentaire, produisant ainsi deux molécules d'ADN parfaitement identiques.

Cette identité est la base de la conservation de l'information génétique au cours des générations cellulaires.`
        },
        {
          titre: "Tableau récapitulatif — Chromatides à travers le cycle",
          contenu: `<table class="data-table" style="margin-top:0.5rem">
  <thead><tr><th>Moment du cycle</th><th>Chromatides/chromosome</th><th>Quantité ADN relative</th></tr></thead>
  <tbody>
    <tr><td>Début interphase</td><td>1</td><td>1 u.a.</td></tr>
    <tr><td>Fin interphase (après duplication)</td><td>2</td><td>2 u.a.</td></tr>
    <tr><td>Prophase</td><td>2</td><td>2 u.a.</td></tr>
    <tr><td>Métaphase</td><td>2</td><td>2 u.a.</td></tr>
    <tr><td>Anaphase</td><td>1 (séparation)</td><td>2 u.a. (total cellule)</td></tr>
    <tr><td>Télophase / cellule fille</td><td>1</td><td>1 u.a.</td></tr>
  </tbody>
</table>`,
          isHtml: true
        }
      ],

      essentiel: [
        "Toutes les cellules somatiques d'un organisme ont le même caryotype (2n = 46).",
        "Cette conservation est possible grâce aux divisions conformes (mitoses successives).",
        "Formule : nombre de cellules = 2ⁿ (n = nombre de divisions).",
        "Pour 8 cellules : 2³ = 8 → 3 divisions sont nécessaires.",
        "En début d'interphase : 1 chromatide/chromosome.",
        "En fin d'interphase (après duplication) : 2 chromatides/chromosome.",
        "Les deux chromatides sœurs portent une information génétique identique.",
        "Après la mitose, chaque cellule fille retrouve 1 chromatide/chromosome."
      ],

      exploitation: [
        {
          question: "Qu'est-ce que le caryotype ? Qu'observe-t-on si on compare le caryotype de la cellule-œuf avec celui d'un globule blanc ?",
          reponse: "Le caryotype est l'ensemble des chromosomes d'une cellule, organisés par paires homologues. En comparant le caryotype de la cellule-œuf avec celui d'un globule blanc, on observe qu'ils sont identiques (2n = 46 chez l'Homme). Cela démontre que toutes les cellules somatiques ont reçu la même information génétique par mitoses successives depuis la cellule-œuf."
        },
        {
          question: "Combien de divisions cellulaires sont nécessaires pour passer d'une cellule à 32 cellules ?",
          reponse: "On utilise la formule : nombre de cellules = 2ⁿ. On cherche n tel que 2ⁿ = 32. Comme 2⁵ = 32, il faut 5 divisions cellulaires successives pour passer d'une cellule à 32 cellules."
        },
        {
          question: "Expliquez pourquoi les deux chromatides sœurs d'un même chromosome portent une information identique.",
          reponse: "Les deux chromatides sœurs portent une information identique car elles résultent de la duplication du chromosome lors de l'interphase. Pendant la duplication, chaque brin d'ADN sert de matrice pour la synthèse d'un nouveau brin complémentaire. On obtient ainsi deux molécules d'ADN parfaitement identiques, formant les deux chromatides sœurs du chromosome."
        },
        {
          question: "Que se passe-t-il avec la quantité d'ADN entre le début et la fin d'une interphase ? Justifiez.",
          reponse: "La quantité d'ADN double entre le début et la fin de l'interphase. En début d'interphase, chaque chromosome possède 1 chromatide (1 molécule d'ADN). Lors de la duplication, chaque chromosome se duplique pour passer à 2 chromatides (2 molécules d'ADN identiques). La quantité d'ADN passe donc de 1 u.a. à 2 u.a. par chromosome."
        }
      ]
    },

    // ════════════════════════════════════════════════
    // ACTIVITÉ 3 — LA MÉIOSE ET LES GAMÈTES
    // ════════════════════════════════════════════════
    3: {
      titre: "Activité 3 — Formation des Gamètes : La Méiose",
      sousTitre: "Comment les cellules reproductrices sont-elles formées avec la moitié du patrimoine génétique ?",
      icone: "🟣",
      couleur: "act3",

      rubrique: {
        contexte: "Les gamètes (spermatozoïdes et ovules) ne contiennent que 23 chromosomes chez l'Homme, soit la moitié du nombre de chromosomes des cellules somatiques. Lors de la fécondation, la cellule-œuf retrouve 46 chromosomes (23 + 23). Comment se forme-t-on avec 23 chromosomes seulement ?",
        question: "Comment les gamètes sont-ils produits avec seulement la moitié de l'information génétique d'une cellule somatique ?",
        observation: "Spermatozoïde et ovule : n = 23 chromosomes. Cellule-œuf après fécondation : 2n = 46 chromosomes."
      },

      objectifs: [
        "Identifier les caryotypes des gamètes",
        "Distinguer une cellule somatique (2n) d'un gamète (n)",
        "Définir le terme « haploïde (n) »",
        "Identifier et décrire les étapes de la méiose"
      ],

      cours: [
        {
          titre: "Les gamètes et la notion d'haploïdie",
          contenu: `Les <span class="kw">gamètes</span> sont les cellules reproductrices (spermatozoïdes et ovules).

Contrairement aux cellules somatiques diploïdes (2n), les gamètes sont <span class="kw">haploïdes</span> :
• Ils ne possèdent qu'<span class="kw">un seul exemplaire</span> de chaque chromosome
• Chez l'Homme : n = <span class="kw">23 chromosomes</span>
• Lors de la fécondation : spermatozoïde (n=23) + ovule (n=23) → zygote (2n=46)

Cette réduction du nombre de chromosomes est indispensable pour maintenir le nombre chromosomique constant d'une génération à l'autre.`
        },
        {
          titre: "Vue d'ensemble de la méiose",
          contenu: `La <span class="kw">méiose</span> est un processus de division cellulaire permettant la formation des gamètes. Elle comprend <span class="kw">deux divisions successives</span> :

• <span class="kw">Première division (réductionnelle)</span> : réduit le nombre de chromosomes de moitié (2n → n)
• <span class="kw">Deuxième division (équationnelle)</span> : sépare les chromatides (comme une mitose)

<strong>Résultat final :</strong> 1 cellule mère (2n) → 4 cellules filles haploïdes (n), chacune avec 1 chromatide par chromosome.`
        },
        {
          titre: "Première division — Division réductionnelle",
          phases: [
            {
              nom: "Prophase I",
              couleur: "#8B5CF6",
              description: "La membrane nucléaire disparaît. Le centrosome se duplique, formant 2 asters qui migrent aux pôles. Le fuseau achromatique se met en place. <span class=\"kw\">Les chromosomes homologues s'apparient</span> (se rapprochent par paires). Chaque paire forme un bivalent.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "2n (non réduit encore)"
            },
            {
              nom: "Métaphase I",
              couleur: "#7C3AED",
              description: "Les paires de chromosomes homologues (bivalents) s'alignent sur la plaque équatoriale. Chaque bivalent est constitué de <span class=\"kw\">4 chromatides</span> → on parle de <span class=\"kw\">tétrade</span>. Les chromosomes homologues sont encore associés, non séparés.",
              chromatides: "2 chromatides par chromosome (tétrade = 4 chromatides)",
              nbChrom: "2n en bivalents"
            },
            {
              nom: "Anaphase I",
              couleur: "#6D28D9",
              description: "Les <span class=\"kw\">chromosomes homologues se séparent</span> : chaque chromosome (encore à 2 chromatides) migre vers un pôle opposé. Cette séparation des homologues est la caractéristique principale de la division réductionnelle.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "n aux deux pôles (23 chez l'Homme)"
            },
            {
              nom: "Télophase I",
              couleur: "#5B21B6",
              description: "La cellule se divise par cytokinèse, produisant <span class=\"kw\">2 cellules filles</span> chacune avec n chromosomes (à 2 chromatides). Le nombre de chromosomes a été réduit de moitié : 2n → n.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "n dans chaque cellule (23)"
            }
          ]
        },
        {
          titre: "Deuxième division — Division équationnelle",
          phases: [
            {
              nom: "Prophase II",
              couleur: "#EC4899",
              description: "Similaire à la prophase de la mitose. Les chromosomes se condensent à nouveau dans chacune des 2 cellules issues de la première division.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "n"
            },
            {
              nom: "Métaphase II",
              couleur: "#DB2777",
              description: "Les chromosomes (à 2 chromatides) s'alignent sur la plaque équatoriale de chaque cellule. Contrairement à la métaphase I, ce sont des chromosomes individuels (non appariés) qui s'alignent.",
              chromatides: "2 chromatides par chromosome",
              nbChrom: "n"
            },
            {
              nom: "Anaphase II",
              couleur: "#BE185D",
              description: "Les <span class=\"kw\">chromatides sœurs se séparent</span> (comme en mitose). Chaque chromatide devient un chromosome indépendant à 1 chromatide. Cette phase ressemble à l'anaphase de la mitose.",
              chromatides: "1 chromatide par chromosome",
              nbChrom: "n (séparation des chromatides)"
            },
            {
              nom: "Télophase II",
              couleur: "#9D174D",
              description: "Chacune des 2 cellules se divise, produisant au total <span class=\"kw\">4 cellules filles haploïdes</span> (n chromosomes, 1 chromatide chacun). Ces cellules deviendront les gamètes fonctionnels.",
              chromatides: "1 chromatide par chromosome",
              nbChrom: "n = 23 dans chaque gamète"
            }
          ]
        },
        {
          titre: "Récapitulatif complet de la méiose",
          contenu: `<table class="data-table" style="margin-top:0.5rem">
  <thead><tr><th>Phase</th><th>Chromosomes</th><th>Chromatides/chr.</th><th>Nb cellules</th></tr></thead>
  <tbody>
    <tr><td>Cellule initiale (2n)</td><td>46</td><td>2 (après duplic.)</td><td>1</td></tr>
    <tr><td>Télophase I</td><td>23</td><td>2</td><td>2</td></tr>
    <tr><td>Gamètes (Télophase II)</td><td>23</td><td>1</td><td>4</td></tr>
  </tbody>
</table>

<div class="info-box" style="margin-top:1rem">
  <strong>À retenir :</strong> La méiose = 2 divisions → 4 cellules haploïdes.<br>
  1ère division : réductionnelle (homologues séparés) → 2n devient n<br>
  2ème division : équationnelle (chromatides séparées) → chromosomes à 2 chromatides deviennent à 1 chromatide
</div>`,
          isHtml: true
        }
      ],

      essentiel: [
        "Les gamètes sont haploïdes (n) : ils ont la moitié des chromosomes des cellules somatiques.",
        "Chez l'Homme : n = 23 chromosomes dans les gamètes.",
        "La méiose comprend 2 divisions successives.",
        "1ère division (réductionnelle) : sépare les chromosomes homologues → 2n devient n.",
        "Métaphase I : bivalents sur la plaque équatoriale (tétrades de 4 chromatides).",
        "Anaphase I : séparation des chromosomes homologues (pas des chromatides).",
        "2ème division (équationnelle) : sépare les chromatides sœurs → comme une mitose.",
        "Résultat final : 4 cellules haploïdes (n) à 1 chromatide par chromosome."
      ],

      exploitation: [
        {
          question: "Quelle est la différence entre une cellule diploïde et une cellule haploïde ?",
          reponse: "Une cellule diploïde (2n) possède deux exemplaires de chaque chromosome (un d'origine maternelle, un d'origine paternelle), soit 46 chromosomes chez l'Homme. Une cellule haploïde (n) ne possède qu'un seul exemplaire de chaque chromosome, soit 23 chromosomes chez l'Homme. Les cellules somatiques sont diploïdes, les gamètes sont haploïdes."
        },
        {
          question: "Pourquoi dit-on que la première division de la méiose est « réductionnelle » ?",
          reponse: "La première division est dite « réductionnelle » car elle réduit de moitié le nombre de chromosomes : la cellule mère avec 2n=46 chromosomes produit 2 cellules filles avec n=23 chromosomes chacune. Cette réduction est due à la séparation des chromosomes homologues (et non des chromatides) lors de l'anaphase I."
        },
        {
          question: "Quelle est la différence entre la métaphase I et la métaphase II ?",
          reponse: "En métaphase I, ce sont les paires de chromosomes homologues (bivalents/tétrades) qui s'alignent sur la plaque équatoriale. Chaque bivalent comprend 4 chromatides. En métaphase II, ce sont les chromosomes individuels (à 2 chromatides chacun) qui s'alignent, comme en mitose. La métaphase II n'implique donc plus de chromosomes appariés."
        },
        {
          question: "Quelle est la différence entre la mitose et la méiose en termes de résultats ?",
          reponse: "La mitose produit 2 cellules filles diploïdes (2n) génétiquement identiques à la cellule mère. Elle assure la croissance et la régénération. La méiose produit 4 cellules filles haploïdes (n) génétiquement différentes. Elle assure la formation des gamètes et maintient le nombre chromosomique constant d'une génération à l'autre."
        }
      ]
    }
  },

  // ── VOCABULAIRE ─────────────────────────────────────────────
  vocabulaire: [
    { terme: "Cellule somatique", definition: "Toute cellule de l'organisme à l'exception des cellules reproductrices (gamètes). Assure la croissance et la régénération.", activite: 1 },
    { terme: "Mitose", definition: "Division cellulaire d'une cellule somatique produisant deux cellules filles diploïdes (2n) génétiquement identiques à la cellule mère.", activite: 1 },
    { terme: "Interphase", definition: "Phase du cycle cellulaire précédant la mitose. La cellule double son matériel génétique : les chromosomes passent de 1 à 2 chromatides.", activite: 1 },
    { terme: "Prophase", definition: "Première phase de la mitose (et de chaque division méiotique). Les chromosomes se condensent, le fuseau achromatique se forme, la membrane nucléaire disparaît.", activite: 1 },
    { terme: "Métaphase", definition: "Deuxième phase de la mitose. Les chromosomes s'alignent sur la plaque équatoriale de la cellule.", activite: 1 },
    { terme: "Anaphase", definition: "Troisième phase de la mitose. Les chromatides sœurs se séparent et migrent vers les pôles opposés de la cellule.", activite: 1 },
    { terme: "Télophase", definition: "Quatrième et dernière phase de la mitose. La membrane nucléaire se reforme, les chromosomes se décondensent, la cytokinèse divise la cellule.", activite: 1 },
    { terme: "Chromatide", definition: "Chacun des deux filaments d'ADN d'un chromosome dupliqué. Deux chromatides sœurs sont reliées par le centromère.", activite: 1 },
    { terme: "Centromère", definition: "Zone de constriction du chromosome qui relie les deux chromatides sœurs et s'attache aux fibres du fuseau achromatique.", activite: 1 },
    { terme: "Fuseau achromatique", definition: "Ensemble de fibres (microtubules) formées entre les asters lors de la division cellulaire. Permettent la migration des chromosomes vers les pôles.", activite: 1 },
    { terme: "Chromatine", definition: "Forme diffuse et non individualisée des chromosomes en interphase. Correspond à l'ADN associé à des protéines.", activite: 1 },
    { terme: "Cytokinèse", definition: "Division du cytoplasme qui se produit à la fin de la télophase, séparant physiquement les deux cellules filles.", activite: 1 },
    { terme: "Diploïde (2n)", definition: "Se dit d'une cellule possédant deux assortiments complets de chromosomes homologues. Chez l'Homme : 2n = 46 chromosomes.", activite: 1 },
    { terme: "Caryotype", definition: "Représentation photographique de l'ensemble des chromosomes d'une cellule, classés par paires homologues selon leur taille.", activite: 2 },
    { terme: "Duplication", definition: "Processus de copie de l'ADN en interphase. Chaque chromosome passe de 1 à 2 chromatides identiques (chromatides sœurs).", activite: 2 },
    { terme: "Chromatides sœurs", definition: "Les deux chromatides identiques formées par duplication d'un chromosome. Reliées par le centromère, elles portent la même information génétique.", activite: 2 },
    { terme: "Division conforme", definition: "Division cellulaire (mitose) qui produit des cellules filles génétiquement identiques à la cellule mère. Conserve le caryotype.", activite: 2 },
    { terme: "Haploïde (n)", definition: "Se dit d'une cellule ne possédant qu'un seul exemplaire de chaque chromosome. Chez l'Homme : n = 23 chromosomes. Caractéristique des gamètes.", activite: 3 },
    { terme: "Gamète", definition: "Cellule reproductrice haploïde (n). Le spermatozoïde est le gamète mâle, l'ovule est le gamète femelle.", activite: 3 },
    { terme: "Méiose", definition: "Processus de deux divisions successives (réductionnelle + équationnelle) produisant 4 cellules haploïdes (gamètes) à partir d'une cellule diploïde.", activite: 3 },
    { terme: "Division réductionnelle", definition: "Première division de la méiose. Sépare les chromosomes homologues, réduisant le nombre de chromosomes de 2n à n.", activite: 3 },
    { terme: "Division équationnelle", definition: "Deuxième division de la méiose. Sépare les chromatides sœurs comme une mitose. N'entraîne pas de réduction du nombre de chromosomes.", activite: 3 },
    { terme: "Tétrade", definition: "Ensemble de 4 chromatides résultant de l'association de 2 chromosomes homologues (chacun à 2 chromatides) lors de la métaphase I.", activite: 3 },
    { terme: "Bivalent", definition: "Paire de chromosomes homologues associés lors de la prophase I et métaphase I de la méiose.", activite: 3 },
    { terme: "Cellule germinale", definition: "Cellule qui subira la méiose pour donner les gamètes. Aussi appelée gonocyte ou cellule souche des gamètes.", activite: 3 }
  ],

  // ── FLASHCARDS ───────────────────────────────────────────────
  flashcards: [
    // Termes → Définitions
    { recto: "Mitose", verso: "Division cellulaire produisant 2 cellules filles diploïdes (2n) génétiquement identiques à la cellule mère.", type: "terme" },
    { recto: "Méiose", verso: "Processus de 2 divisions successives produisant 4 cellules haploïdes (n) à partir d'une cellule diploïde (2n).", type: "terme" },
    { recto: "Cellule diploïde (2n)", verso: "Cellule possédant 2 assortiments de chromosomes homologues. Chez l'Homme : 2n = 46 chromosomes.", type: "terme" },
    { recto: "Cellule haploïde (n)", verso: "Cellule ne possédant qu'un seul exemplaire de chaque chromosome. Chez l'Homme : n = 23 chromosomes.", type: "terme" },
    { recto: "Chromatide", verso: "L'un des deux filaments identiques d'un chromosome dupliqué, reliés par le centromère.", type: "terme" },
    { recto: "Interphase", verso: "Phase précédant la mitose où l'ADN se duplique : les chromosomes passent de 1 à 2 chromatides.", type: "terme" },
    { recto: "Centromère", verso: "Zone de constriction du chromosome reliant les 2 chromatides sœurs et s'attachant aux fibres du fuseau.", type: "terme" },
    { recto: "Fuseau achromatique", verso: "Ensemble de microtubules formés lors de la division qui guident la migration des chromosomes vers les pôles.", type: "terme" },
    { recto: "Caryotype", verso: "Représentation photographique de l'ensemble des chromosomes d'une cellule, classés par paires.", type: "terme" },
    { recto: "Tétrade", verso: "Ensemble de 4 chromatides = 2 chromosomes homologues appariés, visible en métaphase I de la méiose.", type: "terme" },
    { recto: "Division réductionnelle", verso: "1ère division de la méiose : sépare les chromosomes homologues → 2n devient n.", type: "terme" },
    { recto: "Division équationnelle", verso: "2ème division de la méiose : sépare les chromatides sœurs → ressemble à une mitose.", type: "terme" },
    { recto: "Cytokinèse", verso: "Division du cytoplasme en fin de télophase, qui sépare physiquement les deux cellules filles.", type: "terme" },
    { recto: "Chromatine", verso: "Forme diffuse et non individualisée des chromosomes pendant l'interphase.", type: "terme" },
    // Descriptions → Phases
    { recto: "Les chromosomes s'alignent sur la plaque équatoriale (mitose)", verso: "Métaphase", type: "phase" },
    { recto: "Les chromatides sœurs se séparent et migrent vers les pôles opposés", verso: "Anaphase (mitose ou méiose II)", type: "phase" },
    { recto: "La membrane nucléaire se reforme et la cellule se divise", verso: "Télophase", type: "phase" },
    { recto: "Les chromosomes se condensent, le fuseau se forme, la membrane nucléaire disparaît", verso: "Prophase", type: "phase" },
    { recto: "L'ADN se duplique : 1 chromatide → 2 chromatides par chromosome", verso: "Interphase", type: "phase" },
    { recto: "Les bivalents (tétrades) s'alignent sur la plaque équatoriale", verso: "Métaphase I (méiose)", type: "phase" },
    { recto: "Les chromosomes homologues se séparent et migrent aux pôles", verso: "Anaphase I (méiose)", type: "phase" },
    // Questions conceptuelles
    { recto: "Combien de chromosomes a un gamète humain ?", verso: "23 chromosomes (n = 23)\nC'est une cellule haploïde.", type: "concept" },
    { recto: "Combien de cellules filles produit la mitose ? Et la méiose ?", verso: "Mitose → 2 cellules filles (2n)\nMéiose → 4 cellules filles (n)", type: "concept" },
    { recto: "Quel est le nombre de chromatides par chromosome en métaphase de mitose ?", verso: "2 chromatides par chromosome\n(les chromatides sœurs ne sont pas encore séparées)", type: "concept" },
    { recto: "Pourquoi la 1ère division de la méiose est-elle « réductionnelle » ?", verso: "Car elle réduit de moitié le nombre de chromosomes : 2n=46 → n=23, en séparant les homologues.", type: "concept" },
    { recto: "Que se passe-t-il si on compare le caryotype d'un neurone et d'un globule blanc d'un même individu ?", verso: "Ils sont identiques (2n = 46). Toutes les cellules somatiques ont le même caryotype, car elles sont issues de la même cellule-œuf par mitoses.", type: "concept" },
    { recto: "Combien de divisions sont nécessaires pour obtenir 16 cellules à partir d'une cellule-œuf ?", verso: "4 divisions (2⁴ = 16)", type: "concept" },
    { recto: "En anaphase de mitose, combien de chromatides migrent vers chaque pôle ? (pour 2n=46)", verso: "46 chromatides vers chaque pôle (une chromatide par chromosome, soit 46 chromosomes à 1 chromatide chacun).", type: "concept" },
    { recto: "Quelle est la différence clé entre l'anaphase I et l'anaphase II de la méiose ?", verso: "Anaphase I : séparation des chromosomes HOMOLOGUES (chromosomes à 2 chromatides).\nAnaphase II : séparation des CHROMATIDES SŒURS (comme en mitose).", type: "concept" }
  ],

  // ── QUIZ ─────────────────────────────────────────────────────
  quiz: {
    activite1: [
      {
        question: "Quelle est la définition d'une cellule somatique ?",
        type: "qcm",
        choix: ["Toute cellule de l'organisme à l'exception des gamètes", "Un type de gamète mâle", "Une cellule présente uniquement dans le cerveau", "Une cellule qui ne se divise jamais"],
        reponse: 0,
        explication: "Les cellules somatiques sont toutes les cellules de l'organisme à l'exception des cellules reproductrices (gamètes). Elles comprennent les cellules musculaires, nerveuses, hépatiques, etc."
      },
      {
        question: "Pendant l'interphase, que se passe-t-il avec les chromosomes ?",
        type: "qcm",
        choix: ["Ils se condensent et deviennent visibles", "Ils se dupliquent : chaque chromosome passe de 1 à 2 chromatides", "Ils se séparent vers les pôles de la cellule", "Ils disparaissent temporairement"],
        reponse: 1,
        explication: "Pendant l'interphase, l'ADN se duplique. Chaque chromosome passe de 1 chromatide à 2 chromatides identiques (chromatides sœurs). Les chromosomes restent sous forme diffuse (chromatine)."
      },
      {
        question: "Pendant quelle phase de la mitose les chromosomes s'alignent-ils sur la plaque équatoriale ?",
        type: "qcm",
        choix: ["Prophase", "Métaphase", "Anaphase", "Télophase"],
        reponse: 1,
        explication: "C'est pendant la Métaphase que les chromosomes se déplacent et s'alignent sur la plaque équatoriale (plan médian de la cellule). C'est la phase où les chromosomes sont les plus condensés et donc les plus visibles."
      },
      {
        question: "La mitose conserve le nombre de chromosomes. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 0,
        explication: "VRAI. La mitose est une division conservative : les 2 cellules filles ont le même nombre de chromosomes (2n) que la cellule mère. C'est la caractéristique fondamentale de la reproduction conforme."
      },
      {
        question: "Pendant l'anaphase, les chromosomes migrant vers chaque pôle ont combien de chromatides ?",
        type: "qcm",
        choix: ["2 chromatides", "1 chromatide", "4 chromatides", "0 chromatide"],
        reponse: 1,
        explication: "En anaphase, les centromères se doublent et les chromatides sœurs se séparent. Chaque chromatide devient un chromosome indépendant à 1 seule chromatide. Ce sont ces chromosomes à 1 chromatide qui migrent vers les pôles."
      },
      {
        question: "Qu'est-ce qu'une cellule diploïde ?",
        type: "qcm",
        choix: ["Une cellule avec un seul chromosome", "Une cellule avec deux assortiments de chromosomes homologues", "Une cellule ayant subi la méiose", "Un gamète"],
        reponse: 1,
        explication: "Une cellule diploïde (2n) possède deux assortiments de chromosomes homologues : un jeu maternel et un jeu paternel. Chez l'Homme, 2n = 46 chromosomes (23 paires)."
      },
      {
        question: "Pendant quelle phase la membrane nucléaire disparaît-elle ?",
        type: "qcm",
        choix: ["Interphase", "Prophase", "Anaphase", "Télophase"],
        reponse: 1,
        explication: "La membrane nucléaire disparaît pendant la Prophase. Elle se reforme en Télophase. Son absence est nécessaire pour permettre au fuseau achromatique d'atteindre les chromosomes."
      },
      {
        question: "La mitose produit 4 cellules filles. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 1,
        explication: "FAUX. La mitose produit 2 cellules filles (pas 4). Ce sont la méiose et ses deux divisions successives qui produisent 4 cellules filles haploïdes."
      },
      {
        question: "À quelle phase du cycle cellulaire les chromosomes se trouvent-ils sous forme de chromatine diffuse ?",
        type: "qcm",
        choix: ["Prophase", "Métaphase", "Interphase", "Anaphase"],
        reponse: 2,
        explication: "Pendant l'interphase, l'ADN est sous forme décondensée appelée chromatine. Les chromosomes ne sont pas individualisables. C'est pendant cette phase que la duplication de l'ADN peut avoir lieu."
      },
      {
        question: "Quel est le rôle du fuseau achromatique dans la mitose ?",
        type: "qcm",
        choix: ["Protéger les chromosomes", "Guider la migration des chromosomes vers les pôles", "Dupliquer l'ADN", "Former la membrane nucléaire"],
        reponse: 1,
        explication: "Le fuseau achromatique est formé de microtubules. Il s'attache aux centromères des chromosomes et guide leur migration vers les pôles opposés lors de l'anaphase."
      },
      {
        question: "En métaphase, les chromosomes ont combien de chromatides ?",
        type: "qcm",
        choix: ["1", "2", "3", "4"],
        reponse: 1,
        explication: "En métaphase (comme en prophase), chaque chromosome possède 2 chromatides sœurs reliées par le centromère. La séparation des chromatides ne se fait qu'en anaphase."
      },
      {
        question: "La cytokinèse se produit lors de quelle phase ?",
        type: "qcm",
        choix: ["Prophase", "Métaphase", "Anaphase", "Télophase"],
        reponse: 3,
        explication: "La cytokinèse (division du cytoplasme) se produit à la fin de la Télophase. C'est l'étranglement progressif de la cellule qui aboutit à la formation de deux cellules filles distinctes."
      },
      {
        question: "Chez l'Homme, combien de chromosomes compte une cellule somatique ?",
        type: "qcm",
        choix: ["23", "46", "48", "44"],
        reponse: 1,
        explication: "Les cellules somatiques humaines sont diploïdes : 2n = 46 chromosomes (23 paires de chromosomes homologues). Les gamètes, eux, n'en ont que 23."
      },
      {
        question: "La duplication de l'ADN se produit pendant la mitose. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 1,
        explication: "FAUX. La duplication de l'ADN se produit pendant l'INTERPHASE, qui précède la mitose. Pendant la mitose elle-même (prophase, métaphase, anaphase, télophase), l'ADN ne se duplique pas, il se distribue."
      },
      {
        question: "Que sont les chromatides sœurs ?",
        type: "qcm",
        choix: ["Deux chromosomes homologues", "Les deux copies identiques d'un chromosome dupliqué", "Les chromosomes des deux cellules filles", "Des fragments d'ADN libres"],
        reponse: 1,
        explication: "Les chromatides sœurs sont les deux copies identiques d'un chromosome formées lors de la duplication de l'ADN en interphase. Elles sont reliées par le centromère et portent exactement la même information génétique."
      }
    ],

    activite2: [
      {
        question: "Toutes les cellules somatiques d'un organisme ont-elles le même caryotype ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 0,
        explication: "VRAI. Toutes les cellules somatiques d'un organisme ont le même caryotype (2n = 46 chez l'Homme). Elles dérivent toutes de la cellule-œuf par des mitoses successives, conservant le même patrimoine génétique."
      },
      {
        question: "Combien de divisions sont nécessaires pour passer d'une cellule à 8 cellules ?",
        type: "qcm",
        choix: ["2", "3", "4", "8"],
        reponse: 1,
        explication: "On utilise la formule 2ⁿ = nombre de cellules. Pour 8 cellules : 2³ = 8 → il faut 3 divisions. 1 → 2 → 4 → 8."
      },
      {
        question: "Combien de divisions sont nécessaires pour passer d'une cellule à 16 cellules ?",
        type: "qcm",
        choix: ["3", "4", "5", "16"],
        reponse: 1,
        explication: "2⁴ = 16 → il faut 4 divisions. 1 → 2 → 4 → 8 → 16."
      },
      {
        question: "Que se passe-t-il avec la quantité d'ADN lors de l'interphase ?",
        type: "qcm",
        choix: ["Elle diminue de moitié", "Elle reste constante", "Elle double", "Elle est nulle"],
        reponse: 2,
        explication: "Pendant l'interphase, la quantité d'ADN double car chaque chromosome se duplique (passe de 1 à 2 chromatides). La quantité d'ADN passe de 1 u.a. à 2 u.a. par chromosome."
      },
      {
        question: "Pourquoi les deux chromatides sœurs portent-elles une information identique ?",
        type: "qcm",
        choix: ["Par hasard", "Car elles résultent de la duplication du même chromosome", "Car elles viennent de cellules différentes", "Car elles sont fusionnées"],
        reponse: 1,
        explication: "Les chromatides sœurs sont formées par duplication : chaque brin d'ADN sert de matrice pour synthétiser un brin complémentaire. Les deux chromatides obtenues sont des copies parfaites l'une de l'autre."
      },
      {
        question: "En début d'interphase, combien de chromatides possède chaque chromosome ?",
        type: "qcm",
        choix: ["0", "1", "2", "4"],
        reponse: 1,
        explication: "En début d'interphase, chaque chromosome possède 1 seule chromatide. C'est pendant l'interphase que la duplication aura lieu, faisant passer chaque chromosome à 2 chromatides."
      },
      {
        question: "Le caryotype de la cellule-œuf est différent de celui d'une cellule somatique adulte. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 1,
        explication: "FAUX. Le caryotype est identique dans toutes les cellules somatiques d'un organisme (cellule-œuf, cellules embryonnaires, cellules adultes) car elles dérivent toutes de la même cellule-œuf par mitoses successives."
      },
      {
        question: "Après une mitose, quelle est la quantité d'ADN dans chaque cellule fille par rapport à la cellule mère (en début d'interphase) ?",
        type: "qcm",
        choix: ["Le double", "La même quantité (1 u.a.)", "La moitié", "Le quadruple"],
        reponse: 1,
        explication: "Après la mitose, chaque cellule fille retrouve la même quantité d'ADN que la cellule mère avait en début d'interphase (1 u.a. par chromosome). La duplication puis la séparation des chromatides maintiennent cette constance."
      },
      {
        question: "Combien de divisions cellulaires faut-il pour obtenir 64 cellules ?",
        type: "qcm",
        choix: ["5", "6", "7", "8"],
        reponse: 1,
        explication: "2⁶ = 64. Il faut donc 6 divisions cellulaires successives pour obtenir 64 cellules à partir d'une seule."
      },
      {
        question: "Quelle est la différence entre chromatide et chromosome ?",
        type: "qcm",
        choix: ["Ce sont des synonymes", "La chromatide est l'un des filaments d'un chromosome dupliqué", "Le chromosome est plus petit que la chromatide", "La chromatide est présente seulement dans les gamètes"],
        reponse: 1,
        explication: "Un chromosome peut avoir 1 ou 2 chromatides. La chromatide est l'un des deux filaments d'un chromosome dupliqué, reliés par le centromère. Avant duplication : 1 chromosome = 1 chromatide. Après duplication : 1 chromosome = 2 chromatides sœurs."
      }
    ],

    activite3: [
      {
        question: "Combien de chromosomes compte un gamète humain ?",
        type: "qcm",
        choix: ["46", "23", "48", "24"],
        reponse: 1,
        explication: "Les gamètes humains sont haploïdes : n = 23 chromosomes. Lors de la fécondation, spermatozoïde (23) + ovule (23) = cellule-œuf (46 = 2n)."
      },
      {
        question: "La méiose produit combien de cellules filles ?",
        type: "qcm",
        choix: ["2", "3", "4", "8"],
        reponse: 2,
        explication: "La méiose comprend 2 divisions successives. La 1ère produit 2 cellules, la 2ème divise chacune de ces 2 cellules → 4 cellules filles haploïdes au total."
      },
      {
        question: "Pourquoi la première division de la méiose est-elle dite 'réductionnelle' ?",
        type: "qcm",
        choix: ["Car elle réduit la taille de la cellule", "Car elle réduit de moitié le nombre de chromosomes", "Car elle réduit la quantité d'ARN", "Car elle réduit la durée du cycle"],
        reponse: 1,
        explication: "La 1ère division de la méiose est réductionnelle car elle réduit de moitié le nombre de chromosomes : 2n=46 → n=23. Cela se fait par la séparation des chromosomes homologues lors de l'anaphase I."
      },
      {
        question: "Qu'est-ce qu'une tétrade ?",
        type: "qcm",
        choix: ["4 chromosomes non appariés", "Un bivalent composé de 4 chromatides (2 chromosomes homologues × 2 chromatides)", "4 cellules issues de la méiose", "Un groupe de 4 gamètes"],
        reponse: 1,
        explication: "Une tétrade est une structure formée par l'association de 2 chromosomes homologues (chacun à 2 chromatides), visible lors de la métaphase I. Elle comprend donc 4 chromatides au total."
      },
      {
        question: "Quelle est la différence entre la métaphase I et la métaphase II ?",
        type: "qcm",
        choix: ["Il n'y a pas de différence", "En métaphase I : bivalents sur la plaque ; en métaphase II : chromosomes individuels sur la plaque", "En métaphase I : chromosomes individuels ; en métaphase II : bivalents", "La métaphase I est plus courte"],
        reponse: 1,
        explication: "En métaphase I, ce sont les paires de chromosomes homologues (bivalents/tétrades) qui s'alignent sur la plaque équatoriale. En métaphase II, ce sont les chromosomes individuels (à 2 chromatides) qui s'alignent, comme lors de la mitose."
      },
      {
        question: "Les gamètes sont des cellules diploïdes. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 1,
        explication: "FAUX. Les gamètes sont des cellules HAPLOÏDES (n), c'est-à-dire qu'ils ne possèdent qu'un seul exemplaire de chaque chromosome (n = 23 chez l'Homme). Ce sont les cellules somatiques qui sont diploïdes (2n = 46)."
      },
      {
        question: "En anaphase I de la méiose, que se passe-t-il ?",
        type: "qcm",
        choix: ["Les chromatides sœurs se séparent", "Les chromosomes homologues se séparent", "Les cellules se divisent en 4", "L'ADN se duplique"],
        reponse: 1,
        explication: "En anaphase I, ce sont les chromosomes HOMOLOGUES qui se séparent (et non les chromatides sœurs comme en mitose). Chaque chromosome (encore à 2 chromatides) migre vers un pôle. C'est cela qui réduit le nombre de chromosomes de 2n à n."
      },
      {
        question: "Que font les chromosomes en anaphase II de la méiose ?",
        type: "qcm",
        choix: ["Les homologues se séparent", "Les chromatides sœurs se séparent", "Les chromosomes s'alignent sur la plaque", "La cellule se divise"],
        reponse: 1,
        explication: "En anaphase II, les chromatides sœurs se séparent (comme en anaphase de mitose). Chaque chromatide devient un chromosome indépendant à 1 seule chromatide et migre vers un pôle."
      },
      {
        question: "Après la méiose complète, combien de chromatides possède chaque gamète par chromosome ?",
        type: "qcm",
        choix: ["4", "2", "1", "0"],
        reponse: 2,
        explication: "Après la méiose complète (2 divisions), chaque gamète possède n chromosomes à 1 chromatide chacun. La 2ème division équationnelle a séparé les chromatides sœurs."
      },
      {
        question: "Lors de la métaphase I, les chromosomes homologues forment des bivalents. Combien de chromatides comprend chaque bivalent ?",
        type: "qcm",
        choix: ["1", "2", "4", "8"],
        reponse: 2,
        explication: "Chaque bivalent comprend 4 chromatides. En effet : 2 chromosomes homologues (1 maternel + 1 paternel) × 2 chromatides chacun = 4 chromatides. C'est pourquoi on parle aussi de tétrade."
      },
      {
        question: "La méiose assure la conservation du caryotype comme la mitose. Vrai ou Faux ?",
        type: "vrai-faux",
        choix: ["Vrai", "Faux"],
        reponse: 1,
        explication: "FAUX. La mitose conserve le caryotype (2n → 2n). La méiose, au contraire, réduit le nombre de chromosomes (2n → n). Ce sont deux processus avec des objectifs différents : croissance/réparation pour la mitose, formation de gamètes pour la méiose."
      },
      {
        question: "Quel processus permet de maintenir le nombre de chromosomes constant de génération en génération ?",
        type: "qcm",
        choix: ["La mitose seule", "La méiose seule", "L'alternance méiose (n gamètes) + fécondation (2n zygote)", "L'interphase"],
        reponse: 2,
        explication: "C'est l'alternance entre la méiose (qui réduit 2n → n pour former les gamètes) et la fécondation (qui réunit deux gamètes n + n = 2n pour former le zygote) qui maintient le nombre chromosomique constant."
      },
      {
        question: "En Télophase I, combien de cellules existe-t-il et quel est leur contenu chromosomique ?",
        type: "qcm",
        choix: ["4 cellules à 2n chromosomes", "1 cellule à n chromosomes", "2 cellules à n chromosomes (2 chromatides chacun)", "2 cellules à 2n chromosomes"],
        reponse: 2,
        explication: "En Télophase I, la cellule se divise en 2 cellules filles, chacune possédant n chromosomes (23 chez l'Homme) avec 2 chromatides par chromosome. Le nombre a été réduit mais les chromatides ne sont pas encore séparées."
      },
      {
        question: "La 2ème division de la méiose ressemble à quelle autre processus ?",
        type: "qcm",
        choix: ["À l'interphase", "À la mitose", "À la cytokinèse", "À la duplication"],
        reponse: 1,
        explication: "La 2ème division de la méiose (division équationnelle) ressemble à une mitose : elle sépare les chromatides sœurs de la même façon. La différence est que les cellules de départ sont haploïdes (n)."
      },
      {
        question: "Dans un spermatozoïde humain, quel chromosome sexuel peut-il porter ?",
        type: "qcm",
        choix: ["Toujours X", "Toujours Y", "X ou Y selon la méiose", "X et Y en même temps"],
        reponse: 2,
        explication: "Lors de la méiose, les chromosomes sexuels X et Y (paire 23) se séparent. La moitié des spermatozoïdes reçoit le chromosome X, l'autre moitié reçoit le chromosome Y. C'est ce qui détermine le sexe de l'individu lors de la fécondation."
      }
    ],

    complet: [
      { question: "Quelle division produit des cellules génétiquement identiques à la cellule mère ?", type: "qcm", choix: ["La méiose", "La mitose", "L'interphase", "La cytokinèse"], reponse: 1, explication: "La mitose est la division conservative : les 2 cellules filles sont génétiquement identiques à la cellule mère (même caryotype 2n)." },
      { question: "Combien de divisions comprend la méiose ?", type: "qcm", choix: ["1", "2", "3", "4"], reponse: 1, explication: "La méiose comprend 2 divisions successives : la division réductionnelle (1ère) et la division équationnelle (2ème), produisant au total 4 cellules haploïdes." },
      { question: "Un gamète est une cellule diploïde. Vrai ou Faux ?", type: "vrai-faux", choix: ["Vrai", "Faux"], reponse: 1, explication: "FAUX. Les gamètes sont haploïdes (n). Les cellules diploïdes (2n) sont les cellules somatiques." },
      { question: "Que se passe-t-il lors de la prophase de la mitose ?", type: "qcm", choix: ["Les chromatides se séparent", "Les chromosomes se condensent et la membrane nucléaire disparaît", "Les chromosomes s'alignent sur la plaque équatoriale", "La cellule se divise"], reponse: 1, explication: "En prophase : condensation des chromosomes, duplication du centrosome, formation du fuseau achromatique et disparition de la membrane nucléaire." },
      { question: "Quel est le nombre de chromosomes dans une cellule humaine après la 1ère division méiotique ?", type: "qcm", choix: ["46", "23", "92", "12"], reponse: 1, explication: "Après la 1ère division méiotique (réductionnelle), chaque cellule fille possède n = 23 chromosomes (à 2 chromatides chacun). Le nombre de chromosomes a été réduit de moitié." },
      { question: "Pendant quelle phase les chromosomes homologues se séparent-ils ?", type: "qcm", choix: ["Anaphase de mitose", "Anaphase I de méiose", "Anaphase II de méiose", "Métaphase I"], reponse: 1, explication: "C'est en Anaphase I de la méiose que les chromosomes HOMOLOGUES se séparent (et non les chromatides sœurs). C'est la caractéristique de la division réductionnelle." },
      { question: "La conservation du caryotype dans les cellules somatiques est assurée par :", type: "qcm", choix: ["La méiose", "La mitose", "La fécondation", "L'interphase"], reponse: 1, explication: "La mitose assure la conservation du caryotype (2n → 2n) dans toutes les cellules somatiques. Chaque cellule fille reçoit exactement le même patrimoine génétique que la cellule mère." },
      { question: "En métaphase de mitose, chaque chromosome a combien de chromatides ?", type: "qcm", choix: ["1", "2", "4", "0"], reponse: 1, explication: "En métaphase, chaque chromosome possède 2 chromatides sœurs reliées par le centromère. La séparation ne se fait qu'en anaphase." },
      { question: "Quel processus réduit le nombre de chromosomes de 2n à n ?", type: "qcm", choix: ["La mitose", "L'interphase", "La 1ère division de la méiose", "La 2ème division de la méiose"], reponse: 2, explication: "La 1ère division de la méiose (réductionnelle) réduit le nombre de chromosomes de 2n à n en séparant les chromosomes homologues." },
      { question: "Combien de chromatides possède un gamète par chromosome ?", type: "qcm", choix: ["4", "2", "1", "0"], reponse: 2, explication: "Après la méiose complète, chaque gamète possède n chromosomes à 1 chromatide chacun. La 2ème division équationnelle a séparé les chromatides sœurs." },
      { question: "Pour passer d'une cellule à 32 cellules, combien de divisions sont nécessaires ?", type: "qcm", choix: ["4", "5", "6", "32"], reponse: 1, explication: "2⁵ = 32. Il faut 5 divisions cellulaires successives pour obtenir 32 cellules à partir d'une seule cellule." },
      { question: "Quelles cellules sont produites par la mitose ?", type: "qcm", choix: ["4 cellules haploïdes", "2 cellules diploïdes identiques", "2 cellules haploïdes", "1 cellule diploïde"], reponse: 1, explication: "La mitose produit 2 cellules filles diploïdes (2n) génétiquement identiques à la cellule mère." },
      { question: "La méiose permet de :", type: "qcm", choix: ["Réparer les tissus", "Former les gamètes", "Dupliquer l'ADN", "Digérer les protéines"], reponse: 1, explication: "La méiose est le processus de formation des gamètes. Elle permet de réduire de moitié le nombre de chromosomes pour maintenir le nombre chromosomique constant lors de la fécondation." },
      { question: "La phase S de l'interphase correspond à :", type: "qcm", choix: ["La séparation des chromatides", "La synthèse (duplication) de l'ADN", "La division du cytoplasme", "La dissolution de la membrane nucléaire"], reponse: 1, explication: "La phase S (Synthesis) de l'interphase correspond à la duplication (synthèse) de l'ADN. L'ADN est copié fidèlement avant la division." },
      { question: "Après la fécondation, le zygote est :", type: "qcm", choix: ["Haploïde (n)", "Diploïde (2n)", "Tétraploïde (4n)", "Sans chromosomes"], reponse: 1, explication: "Lors de la fécondation, un spermatozoïde (n=23) fusionne avec un ovule (n=23) → zygote diploïde (2n=46). La méiose et la fécondation maintiennent ensemble le nombre chromosomique constant." },
      { question: "Chez l'Homme, n = ?", type: "qcm", choix: ["23", "46", "48", "22"], reponse: 0, explication: "Chez l'Homme, le nombre haploïde n = 23 chromosomes. C'est le nombre de chromosomes dans les gamètes. Les cellules somatiques ont 2n = 46 chromosomes." },
      { question: "L'anaphase II de la méiose ressemble à l'anaphase de la mitose. Vrai ou Faux ?", type: "vrai-faux", choix: ["Vrai", "Faux"], reponse: 0, explication: "VRAI. En anaphase II (méiose) et en anaphase (mitose), ce sont les chromatides sœurs qui se séparent et migrent vers les pôles opposés. La différence est que la cellule de départ est haploïde en anaphase II." },
      { question: "Qu'est-ce que la plaque équatoriale ?", type: "qcm", choix: ["Une zone géographique", "Le plan médian de la cellule où s'alignent les chromosomes en métaphase", "Un organite cellulaire", "La membrane nucléaire"], reponse: 1, explication: "La plaque équatoriale est le plan médian de la cellule. En métaphase (mitose) ou métaphase I et II (méiose), les chromosomes s'y alignent sous l'action du fuseau achromatique." },
      { question: "En quoi la mitose et la méiose se différencient-elles principalement ?", type: "qcm", choix: ["La mitose ne touche pas les chromosomes", "La mitose conserve 2n, la méiose réduit à n", "La méiose se déroule plus vite", "La mitose produit 4 cellules"], reponse: 1, explication: "La différence principale : la mitose conserve le nombre diploïde (2n→2n, 2 cellules filles), tandis que la méiose réduit ce nombre (2n→n, 4 cellules filles). La mitose est pour la croissance, la méiose pour la reproduction." },
      { question: "Quelle est la propriété fondamentale de la mitose ?", type: "qcm", choix: ["Produire de la diversité génétique", "Conserver l'information génétique identique dans les cellules filles", "Réduire le nombre de chromosomes", "Former des gamètes"], reponse: 1, explication: "La propriété fondamentale de la mitose est la conservation de l'information génétique. Les 2 cellules filles sont génétiquement identiques à la cellule mère et entre elles. C'est ce qui permet le développement cohérent de l'organisme." }
    ]
  },

  // ── RÉSUMÉS ──────────────────────────────────────────────────
  resumes: {
    1: {
      titre: "Résumé — Activité 1 : La Mitose",
      points: [
        "Les <strong>cellules somatiques</strong> sont toutes les cellules du corps sauf les gamètes.",
        "La <strong>mitose</strong> produit 2 cellules filles diploïdes (2n) génétiquement identiques à la cellule mère.",
        "L'<strong>interphase</strong> précède la mitose : l'ADN se duplique, les chromosomes passent de 1 à 2 chromatides.",
        "<strong>Prophase</strong> : condensation des chromosomes, formation du fuseau, disparition de la membrane nucléaire.",
        "<strong>Métaphase</strong> : alignement des chromosomes sur la plaque équatoriale.",
        "<strong>Anaphase</strong> : séparation des chromatides sœurs vers les pôles opposés.",
        "<strong>Télophase</strong> : décondensation, reformation des noyaux, cytokinèse → 2 cellules filles.",
        "Le nombre de chromosomes est <strong>conservé</strong> tout au long de la mitose (2n → 2n).",
        "Une cellule <strong>diploïde (2n)</strong> possède deux assortiments de chromosomes homologues (2n = 46 chez l'Homme)."
      ],
      tableau: [
        { phase: "Interphase", nbChr: "2n", chromatides: "1→2", membrane: "Présente" },
        { phase: "Prophase", nbChr: "2n", chromatides: "2", membrane: "Disparaît" },
        { phase: "Métaphase", nbChr: "2n", chromatides: "2", membrane: "Absente" },
        { phase: "Anaphase", nbChr: "2n", chromatides: "1", membrane: "Absente" },
        { phase: "Télophase", nbChr: "2n", chromatides: "1", membrane: "Se reforme" }
      ]
    },
    2: {
      titre: "Résumé — Activité 2 : Conservation du Caryotype",
      points: [
        "Toutes les cellules somatiques d'un organisme ont le <strong>même caryotype</strong> (2n = 46).",
        "Cette conservation est assurée par les <strong>mitoses successives</strong> depuis la cellule-œuf.",
        "Formule : nombre de cellules = <strong>2ⁿ</strong> (n = nombre de divisions).",
        "Exemple : 3 divisions → 2³ = <strong>8 cellules</strong>.",
        "En début d'interphase : <strong>1 chromatide</strong> par chromosome.",
        "En fin d'interphase (après duplication) : <strong>2 chromatides</strong> par chromosome.",
        "Les deux <strong>chromatides sœurs</strong> portent une information génétique identique.",
        "Après la mitose, chaque cellule fille retrouve <strong>1 chromatide</strong> par chromosome."
      ]
    },
    3: {
      titre: "Résumé — Activité 3 : La Méiose",
      points: [
        "Les <strong>gamètes</strong> sont haploïdes (n = 23 chromosomes chez l'Homme).",
        "La <strong>méiose</strong> comprend 2 divisions successives → 4 cellules filles haploïdes.",
        "<strong>1ère division (réductionnelle)</strong> : sépare les chromosomes homologues (2n → n).",
        "Métaphase I : <strong>bivalents/tétrades</strong> (4 chromatides) sur la plaque équatoriale.",
        "Anaphase I : séparation des <strong>chromosomes homologues</strong> (pas des chromatides).",
        "Télophase I : 2 cellules à n chromosomes (2 chromatides chacun).",
        "<strong>2ème division (équationnelle)</strong> : sépare les chromatides sœurs (comme une mitose).",
        "Résultat final : <strong>4 gamètes</strong> à n chromosomes, 1 chromatide par chromosome."
      ]
    }
  },

  // ── EXERCICES ────────────────────────────────────────────────
  exercices: [
    {
      num: 1,
      titre: "Durée de l'interphase et nombre de chromatides",
      enonce: "Des cellules embryonnaires ont un cycle cellulaire de 20 heures. On observe que la mitose (les 4 phases) dure 2 heures au total. Une cellule embryonnaire en début d'interphase possède 46 chromosomes.",
      questions: [
        { q: "Quelle est la durée de l'interphase ?", r: "Durée interphase = Durée totale du cycle − Durée de la mitose = 20h − 2h = <strong>18 heures</strong>." },
        { q: "Combien de chromatides possède la cellule au début de l'interphase ?", r: "Au début de l'interphase, chaque chromosome possède <strong>1 chromatide</strong>. La cellule a 46 chromosomes × 1 = <strong>46 chromatides au total</strong>." },
        { q: "Combien de chromatides possède la cellule en fin d'interphase (juste avant la mitose) ?", r: "En fin d'interphase, après duplication, chaque chromosome possède <strong>2 chromatides</strong>. La cellule a 46 chromosomes × 2 = <strong>92 chromatides au total</strong>." }
      ]
    },
    {
      num: 2,
      titre: "Mitose : conservation de la masse ou du nombre de chromosomes ?",
      enonce: "On étudie une cellule (cellule E, 2n=6) qui entre en mitose et produit deux cellules filles (F et G). On mesure la masse des chromosomes dans chaque cellule : cellule E = 20 unités ; cellule F = 10 unités ; cellule G = 10 unités.",
      questions: [
        { q: "La masse des chromosomes est-elle conservée lors de la mitose ? Justifiez.", r: "Non, la masse n'est pas conservée pour chaque cellule fille. La cellule E avait 20 unités, mais chaque cellule fille (F et G) n'a que 10 unités. La masse est <strong>divisée par 2</strong> dans chaque cellule fille (mais la masse totale F+G = 20 = masse de E est conservée dans l'ensemble)." },
        { q: "Le nombre de chromosomes est-il conservé ? Justifiez.", r: "Oui, le nombre de chromosomes est conservé. La cellule E avait 2n = 6 chromosomes. Chaque cellule fille (F et G) a également <strong>2n = 6 chromosomes</strong>. C'est la propriété fondamentale de la mitose : conservation du caryotype." },
        { q: "Quelle propriété la mitose conserve-t-elle : la masse ou le nombre ?", r: "La mitose conserve le <strong>nombre de chromosomes</strong> (2n = 6 dans les 3 cellules), pas la masse chromosomique individuelle (qui est divisée par 2 dans chaque cellule fille car les chromatides se séparent)." }
      ]
    },
    {
      num: 3,
      titre: "Le cycle cellulaire des cellules cancéreuses",
      enonce: "Le cycle cellulaire d'une cellule normale dure 24 heures (dont 2h de mitose et 22h d'interphase). Celui d'une cellule cancéreuse dure 8 heures seulement. Les cellules cancéreuses se divisent donc beaucoup plus rapidement que les cellules normales.",
      questions: [
        { q: "Calculez le nombre de cellules obtenues à partir d'une cellule cancéreuse en 24 heures.", r: "En 24h, une cellule cancéreuse fait 24/8 = 3 cycles complets. Nombre de cellules = 2³ = <strong>8 cellules</strong> en 24h à partir d'une cellule cancéreuse." },
        { q: "Comparez avec une cellule normale sur 24h.", r: "Une cellule normale fait 1 cycle en 24h → <strong>2 cellules</strong>. La cellule cancéreuse produit 8 cellules dans le même temps. Le cancer se caractérise par une prolifération cellulaire incontrôlée." },
        { q: "Formulez une hypothèse pour expliquer la courte durée du cycle cellulaire des cellules cancéreuses.", r: "Hypothèse : les cellules cancéreuses ont subi des <strong>mutations génétiques</strong> qui désactivent les mécanismes de contrôle du cycle cellulaire (points de contrôle). L'interphase est raccourcie : la vérification normale de l'ADN avant la division ne se fait pas correctement, permettant des divisions plus rapides et potentiellement avec des erreurs." }
      ]
    },
    {
      num: 4,
      titre: "Transmission des allèles aux cellules reproductrices",
      enonce: "On s'intéresse à la paire de chromosomes n°9 chez un individu dont le groupe sanguin est hétérozygote BO. L'un des chromosomes 9 porte l'allèle B (groupe B), l'autre porte l'allèle O (groupe O). Cet individu possède 2n = 46 chromosomes. Sa cellule initiale entre en méiose.",
      questions: [
        { q: "Décrivez l'état de la paire de chromosomes 9 en fin d'interphase (avant méiose).", r: "En fin d'interphase, chaque chromosome s'est dupliqué. Le chromosome 9 portant l'allèle B est devenu un chromosome à <strong>2 chromatides B identiques</strong>. Le chromosome 9 portant l'allèle O est devenu un chromosome à <strong>2 chromatides O identiques</strong>. La cellule a toujours 46 chromosomes mais 92 chromatides." },
        { q: "Comparez le nombre de chromosomes en Métaphase I (cellule initiale), en Télophase I (2 cellules) et en Télophase II (4 cellules).", r: "Métaphase I : 1 cellule avec <strong>2n = 46 chromosomes</strong> (2 chromatides chacun). Télophase I : 2 cellules avec <strong>n = 23 chromosomes</strong> chacune (2 chromatides). Télophase II : 4 cellules avec <strong>n = 23 chromosomes</strong> chacune (1 chromatide)." },
        { q: "Quelle est la cause de la différence de nombre de chromosomes entre la cellule de Métaphase I et les cellules de Télophase I ?", r: "La différence est due à la <strong>séparation des chromosomes homologues</strong> en anaphase I. Les chromosomes de la paire 9 (un portant B, l'autre portant O) ont migré vers des pôles opposés, réduisant le nombre de chromosomes de 2n=46 à n=23 dans chaque cellule fille." },
        { q: "Les 4 gamètes obtenus portent-ils la même information génétique ? Justifiez.", r: "Non, les 4 gamètes ne portent pas la même information. 2 gamètes reçoivent le chromosome 9 avec l'allèle <strong>B</strong>, et 2 gamètes reçoivent le chromosome 9 avec l'allèle <strong>O</strong>. La séparation des homologues en anaphase I assure cette diversité : chaque gamète ne reçoit qu'un seul chromosome de chaque paire." }
      ]
    },
    {
      num: 5,
      titre: "Identification des phases de la méiose",
      enonce: "On observe des cellules d'un individu au cours de la méiose. On représente les chromosomes de façon simplifiée avec 3 paires (n=3, 2n=6). Figure (a) : 3 bivalents alignés sur la plaque équatoriale. Figure (b) : 3 chromosomes à 2 chromatides de chaque côté de la plaque.",
      questions: [
        { q: "Identifiez la phase méiotique de la figure (a).", r: "Figure (a) montre 3 bivalents (paires de chromosomes homologues) alignés sur la plaque équatoriale. Il s'agit de la <strong>Métaphase I</strong> de la 1ère division méiotique (réductionnelle). La présence de bivalents (tétrades) est caractéristique de la métaphase I." },
        { q: "Identifiez la phase méiotique de la figure (b).", r: "Figure (b) montre 3 chromosomes à 2 chromatides de chaque côté de la plaque équatoriale. C'est la <strong>Métaphase II</strong> de la 2ème division méiotique (équationnelle). Les chromosomes individuels s'alignent comme en mitose, sans être appariés." },
        { q: "En figure (b), les chromosomes sexuels montrent un X et un Y d'un côté. Quel est le sexe de l'individu ? Justifiez.", r: "L'individu est de sexe <strong>masculin (XY)</strong>. En effet, la présence d'un chromosome X et d'un chromosome Y dans la même cellule indique le génotype XY qui est le génotype mâle chez l'Homme. Les femmes ont le génotype XX (deux chromosomes X)." },
        { q: "Combien de cellules obtient-on à la fin de la méiose si on part de 1 cellule ?", r: "On obtient <strong>4 cellules</strong> haploïdes à la fin de la méiose. La 1ère division produit 2 cellules, et la 2ème division divise chacune de ces 2 cellules → 4 cellules haploïdes au total (n = 3 dans cet exemple)." },
        { q: "Justifiez l'affirmation : « La méiose est une division réductionnelle ».", r: "La méiose est dite « réductionnelle » car sa 1ère division réduit de moitié le nombre de chromosomes : on passe de 2n = 6 à n = 3 chromosomes dans les cellules filles. Cette réduction est due à la séparation des chromosomes homologues en anaphase I, sans duplication préalable des chromosomes entre les deux divisions." }
      ]
    }
  ]
}; // fin CHAPTER_DATA
