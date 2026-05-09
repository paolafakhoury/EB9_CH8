/* ============================================================
   APP.JS — EB9 Chapitre 8
   Shell : Alpine.js (header/sidebar/thème)
   Contenu dynamique : Vanilla JS pur (aucun Alpine dans innerHTML)
   ============================================================ */

// ── SHELL ALPINE (header, sidebar, thème) ────────────────────
function mainApp() {
  return {
    currentSection: 'dashboard',
    currentTheme: localStorage.getItem('eb9-theme') || 'ocean',
    sidebarOpen: false,
    loading: false,
    progress: 0,
    bestScore: parseInt(localStorage.getItem('eb9-best-score') || '0'),
    visitedSections: JSON.parse(localStorage.getItem('eb9-visited') || '[]'),

    themes: [
      { id: 'ocean',     name: 'Océan',           icon: '🌊' },
      { id: 'foret',     name: 'Forêt',            icon: '🌿' },
      { id: 'sunset',    name: 'Coucher de soleil', icon: '🌅' },
      { id: 'printemps', name: 'Printemps',         icon: '🌸' }
    ],

    init() {
      window.navigateTo = (s) => this.navigate(s);
      this.applyTheme(this.currentTheme);
      this.updateProgress();
      this.loadSection('dashboard');
    },

    setTheme(id) {
      this.currentTheme = id;
      localStorage.setItem('eb9-theme', id);
      this.applyTheme(id);
    },

    applyTheme(id) {
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add('theme-' + id);
    },

    navigate(section) {
      this.currentSection = section;
      this.markVisited(section);
      this.loadSection(section);
    },

    markVisited(s) {
      if (!this.visitedSections.includes(s)) {
        this.visitedSections.push(s);
        localStorage.setItem('eb9-visited', JSON.stringify(this.visitedSections));
        this.updateProgress();
      }
    },

    updateProgress() {
      this.progress = Math.round((this.visitedSections.length / 10) * 100);
    },

    loadSection(section) {
      this.loading = true;
      const area = document.getElementById('content-area');
      area.innerHTML = '';
      setTimeout(() => {
        area.innerHTML = renderSection(section);
        this.loading = false;
        afterRender(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    }
  };
}

// ── VANILLA JS : INTERACTIVITÉ GLOBALE ───────────────────────

/* Onglets */
function showTab(btn, panelId) {
  const bar = btn.closest('.tabs-bar');
  const wrapper = btn.closest('[data-tabs]');
  bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  wrapper.querySelectorAll('.tab-panel').forEach(p => { p.style.display = 'none'; });
  const panel = document.getElementById(panelId);
  if (panel) panel.style.display = '';
}

/* Accordéons */
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.accordion-icon');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : '';
  if (icon) icon.classList.toggle('open', !open);
}

/* Q&A révélation */
function toggleReveal(header) {
  const body = header.nextElementSibling;
  const toggle = header.querySelector('.qa-toggle');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : '';
  if (toggle) toggle.textContent = open ? '▼ Voir la correction' : '▲ Masquer';
}

/* Exercices sous-questions */
function toggleSQ(header) {
  const body = header.nextElementSibling;
  const toggle = header.querySelector('.sq-toggle');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : '';
  if (toggle) toggle.textContent = open ? '▼ Voir la réponse' : '▲ Masquer';
}

/* Résumés */
function toggleResume(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.resume-chevron');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : '';
  if (icon) icon.textContent = open ? '▼ Développer' : '▲ Réduire';
}

// ── DISPATCH POST-RENDU ──────────────────────────────────────
function afterRender(section) {
  if (section === 'vocabulaire') initVocabSearch();
  if (section === 'flashcards')  initFlashcardsApp();
  if (section === 'quiz')        initQuizApp();
  if (section === 'simulations') {
    setTimeout(() => {
      initSimTabs();
      if (window.initMitoseVideo) window.initMitoseVideo();
      if (window.initMeioseVideo) window.initMeioseVideo();
    }, 120);
  }
}

// ── ROUTEUR ──────────────────────────────────────────────────
function renderSection(s) {
  switch (s) {
    case 'dashboard':    return renderDashboard();
    case 'activite1':   return renderActivite(1);
    case 'activite2':   return renderActivite(2);
    case 'activite3':   return renderActivite(3);
    case 'resumes':     return renderResumes();
    case 'vocabulaire': return renderVocabulaire();
    case 'flashcards':  return renderFlashcards();
    case 'quiz':        return renderQuizSection();
    case 'simulations': return renderSimulations();
    case 'exercices':   return renderExercices();
    default: return '<p>Section introuvable.</p>';
  }
}

// ════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════
function renderDashboard() {
  const d = CHAPTER_DATA;
  const objsHtml = d.objectifs.map(o => `
    <li class="objective-item" onclick="navigateTo('activite${o.activite}')">
      <span class="objective-num">${o.id}</span>
      <span>${o.texte}</span>
    </li>`).join('');

  const cards = [
    { s:'activite1',   icon:'🔵', t:'Activité 1', d:'La Mitose' },
    { s:'activite2',   icon:'🟢', t:'Activité 2', d:'Conservation du Caryotype' },
    { s:'activite3',   icon:'🟣', t:'Activité 3', d:'La Méiose & les Gamètes' },
    { s:'simulations', icon:'🔬', t:'Simulations', d:'Mitose et Méiose animées' },
    { s:'resumes',     icon:'📝', t:'Résumés',     d:'Points essentiels' },
    { s:'vocabulaire', icon:'📖', t:'Vocabulaire', d:'25 termes définis' },
    { s:'flashcards',  icon:'🃏', t:'Flashcards',  d:'30 cartes à retourner' },
    { s:'quiz',        icon:'❓', t:'Quiz',         d:'50 questions interactives' },
    { s:'exercices',   icon:'✏️', t:'Exercices',   d:'5 exercices approfondis' },
  ].map(c => `
    <div class="nav-card" onclick="navigateTo('${c.s}')">
      <div class="nav-card-icon">${c.icon}</div>
      <div class="nav-card-title">${c.t}</div>
      <div class="nav-card-desc">${c.d}</div>
    </div>`).join('');

  return `
    <div class="dashboard-hero">
      <div class="hero-school">${d.ecole}</div>
      <div class="hero-title">${d.titre}</div>
      <div class="hero-teacher">👩‍🏫 ${d.enseignante} — Niveau ${d.niveau}</div>
    </div>
    <div class="grid-2" style="gap:1.5rem;margin-bottom:2rem;align-items:start">
      <div>
        <h2 class="section-title">Objectifs du Chapitre</h2>
        <p class="section-subtitle">Cliquez pour accéder à l'activité correspondante</p>
        <ul class="objective-list">${objsHtml}</ul>
      </div>
      <div>
        <h2 class="section-title">Accès Rapide</h2>
        <p class="section-subtitle">Naviguez dans les sections</p>
        <div class="grid-3" style="gap:0.75rem">${cards}</div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
// ACTIVITÉS (1, 2, 3)
// ════════════════════════════════════════════════════════════
function renderActivite(num) {
  const act = CHAPTER_DATA.activites[num];
  const id = `act${num}`;

  // ── Onglet Rubrique ──
  const rubriqueHtml = `
    <div class="info-box" style="margin-bottom:1rem">${act.rubrique.contexte}</div>
    <div class="card card-sm" style="margin-bottom:1rem">
      <strong style="color:var(--primary-dark)">❓ Question centrale :</strong>
      <p style="margin-top:0.4rem;font-style:italic">${act.rubrique.question}</p>
    </div>
    ${act.rubrique.observation ? `<div class="warning-box">👁️ <strong>Observation :</strong> ${act.rubrique.observation}</div>` : ''}`;

  // ── Onglet Objectifs ──
  const objectifsHtml = `<ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem">
    ${act.objectifs.map(o => `
      <li style="display:flex;gap:0.6rem;padding:0.65rem 1rem;background:var(--surface2);border-radius:10px;font-size:0.9rem;line-height:1.5">
        <span style="color:var(--primary);font-weight:800;flex-shrink:0">✓</span> ${o}
      </li>`).join('')}
  </ul>`;

  // ── Onglet Cours ──
  const coursHtml = buildCoursHtml(num, act, id);

  // ── Onglet Essentiel ──
  const essentielHtml = `
    <div class="card">
      <h3 style="font-size:1rem;font-weight:800;margin-bottom:1rem;color:var(--primary-dark)">⭐ Points essentiels à retenir</h3>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.25rem">
        ${act.essentiel.map(p => `
          <li style="display:flex;gap:0.6rem;font-size:0.875rem;line-height:1.6;padding:0.5rem 0.75rem;background:var(--surface2);border-radius:8px;border-left:3px solid var(--primary)">
            <span style="color:var(--primary);font-weight:800;flex-shrink:0">→</span> ${p}
          </li>`).join('')}
      </ul>
      <button class="btn btn-outline btn-sm" onclick="window.print()">🖨️ Imprimer cette fiche</button>
    </div>`;

  // ── Onglet Questions d'exploitation ──
  const questionsHtml = act.exploitation.map((qa, i) => `
    <div class="qa-item">
      <div class="qa-question" onclick="toggleReveal(this)">
        <span><strong>Q${i+1}.</strong> ${qa.question}</span>
        <span class="qa-toggle">▼ Voir la correction</span>
      </div>
      <div class="qa-answer" style="display:none">✅ ${qa.reponse}</div>
    </div>`).join('');

  const badgeClass = { 1:'act1-badge', 2:'act2-badge', 3:'act3-badge' }[num];
  const tabPrefix = id;

  return `
    <div class="activity-header">
      <div class="activity-badge ${badgeClass}">${act.icone}</div>
      <div>
        <h1 class="section-title" style="margin-bottom:0.1rem">${act.titre}</h1>
        <p class="section-subtitle" style="margin-bottom:0">${act.sousTitre}</p>
      </div>
    </div>

    <div data-tabs="true">
      <div class="tabs-bar">
        <button class="tab-btn" onclick="showTab(this,'${tabPrefix}-rubrique')">📋 Rubrique</button>
        <button class="tab-btn" onclick="showTab(this,'${tabPrefix}-objectifs')">🎯 Objectifs</button>
        <button class="tab-btn active" onclick="showTab(this,'${tabPrefix}-cours')">📚 Cours</button>
        <button class="tab-btn" onclick="showTab(this,'${tabPrefix}-essentiel')">⭐ Essentiel</button>
        <button class="tab-btn" onclick="showTab(this,'${tabPrefix}-questions')">✏️ Questions</button>
      </div>

      <div id="${tabPrefix}-rubrique" class="tab-panel" style="display:none">${rubriqueHtml}</div>
      <div id="${tabPrefix}-objectifs" class="tab-panel" style="display:none">${objectifsHtml}</div>
      <div id="${tabPrefix}-cours" class="tab-panel">${coursHtml}</div>
      <div id="${tabPrefix}-essentiel" class="tab-panel" style="display:none">${essentielHtml}</div>
      <div id="${tabPrefix}-questions" class="tab-panel" style="display:none">${questionsHtml}</div>
    </div>`;
}

// ── CONSTRUCTION DU COURS PAR ACTIVITÉ ──────────────────────
function buildCoursHtml(num, act, id) {
  if (num === 1) return buildCours1(act, id);
  if (num === 2) return buildCours2(act, id);
  if (num === 3) return buildCours3(act, id);
  return '';
}

// ── COURS ACTIVITÉ 1 — LA MITOSE ────────────────────────────
function buildCours1(act, id) {
  const sections = [
    {
      titre: '1. Les cellules somatiques',
      open: true,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Les <strong class="kw">cellules somatiques</strong> sont toutes les cellules de l'organisme à l'exception des cellules reproductrices (gamètes).</p>
          <p style="margin-top:0.75rem">Leur double rôle :</p>
          <ul style="margin:0.5rem 0 0.75rem 1.5rem;line-height:1.9">
            <li>Assurer la <strong class="kw">croissance</strong> de l'organisme</li>
            <li>Permettre la <strong class="kw">régénération des tissus</strong></li>
          </ul>
          <p>Pour ces fonctions, les cellules somatiques se divisent par <strong class="kw">mitose</strong> en distribuant l'information génétique de façon <strong class="kw">identique</strong> aux deux cellules filles.</p>
        </div>
        <div style="text-align:center;margin-top:1rem">
          <img src="images/Chapitre_8_Activité_1_Cours_image7.png" alt="Division cellulaire : cellule mère → 2 cellules filles"
               style="max-width:420px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">La cellule mère se divise pour donner deux cellules filles</p>
        </div>`
    },
    {
      titre: '2. Définition de la mitose',
      open: false,
      html: `
        <div class="info-box">
          <strong>Définition :</strong> La <strong class="kw">mitose</strong> est un processus de division cellulaire qui divise le noyau d'une cellule somatique en deux noyaux <strong class="kw">génétiquement identiques</strong>.
        </div>
        <div style="font-size:0.9rem;line-height:1.8;margin-top:0.75rem">
          <p>La mitose assure :</p>
          <ul style="margin:0.5rem 0 0 1.5rem;line-height:2">
            <li>✓ La <strong class="kw">conservation du nombre de chromosomes</strong> (2n → 2n)</li>
            <li>✓ La <strong class="kw">conservation de l'information génétique</strong></li>
            <li>✓ La production de <strong class="kw">2 cellules filles identiques</strong> à la cellule mère</li>
          </ul>
        </div>`
    },
    {
      titre: '3. Le cycle cellulaire & l\'interphase',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Le cycle cellulaire comprend deux grandes phases :</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.75rem">
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid var(--primary)">
              <strong style="color:var(--primary-dark)">1. L'Interphase</strong>
              <ul style="margin-top:0.5rem;padding-left:1.25rem;line-height:1.9;font-size:0.875rem">
                <li>L'ADN se <strong class="kw">duplique</strong></li>
                <li>Chromosomes sous forme de <strong class="kw">chromatine</strong> diffuse</li>
                <li>Chaque chromosome : 1 → <strong class="kw">2 chromatides</strong></li>
              </ul>
            </div>
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid var(--accent)">
              <strong style="color:var(--primary-dark)">2. La Mitose</strong>
              <ul style="margin-top:0.5rem;padding-left:1.25rem;line-height:1.9;font-size:0.875rem">
                <li>Prophase</li>
                <li>Métaphase</li>
                <li>Anaphase</li>
                <li>Télophase</li>
              </ul>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:1rem">
          <img src="images/Chapitre_8_Activité_1_Cours_image24.png" alt="Cellule en interphase — chromatine diffuse"
               style="max-width:220px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Cellule en interphase — chromosomes sous forme de chromatine</p>
        </div>`
    },
    {
      titre: '4. Les 4 phases de la mitose',
      open: false,
      html: `
        <div style="text-align:center;margin-bottom:1.25rem">
          <img src="images/Chapitre_8_Activité_1_image31.jpeg" alt="Les 4 phases de la mitose"
               style="max-width:380px;width:100%;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,0.15)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Schémas des étapes de la mitose</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.6rem">
          ${[
            { nom:'Prophase', couleur:'#3B82F6', chr:'2 chromatides', desc:'Les chromosomes se <strong>condensent</strong>. Le centrosome se duplique, les asters migrent aux pôles. Le <strong>fuseau achromatique</strong> se forme. La membrane nucléaire <strong>disparaît</strong>.' },
            { nom:'Métaphase', couleur:'#8B5CF6', chr:'2 chromatides', desc:'Les chromosomes s\'alignent sur la <strong>plaque équatoriale</strong>. Chaque chromosome est attaché au fuseau par son <strong>centromère</strong>. Les chromosomes sont au maximum de leur condensation.' },
            { nom:'Anaphase', couleur:'#10B981', chr:'1 chromatide', desc:'Les <strong>centromères se doublent</strong>. Les chromatides sœurs <strong>se séparent</strong> et migrent vers les pôles opposés. Chaque pôle reçoit un jeu complet de chromosomes à 1 chromatide.' },
            { nom:'Télophase', couleur:'#F59E0B', chr:'1 chromatide', desc:'Les chromosomes se <strong>décondensent</strong> → chromatine diffuse. La membrane nucléaire <strong>se reforme</strong>. La <strong>cytokinèse</strong> divise le cytoplasme → 2 cellules filles.' }
          ].map(p => `
            <div class="phase-card">
              <div class="phase-header">
                <div class="phase-dot" style="background:${p.couleur}"></div>
                <strong>${p.nom}</strong>
                <span class="badge badge-primary" style="margin-left:auto">${p.chr}/chromosome</span>
              </div>
              <div class="phase-body" style="font-size:0.875rem;line-height:1.7">${p.desc}</div>
            </div>`).join('')}
        </div>
        <div style="text-align:center;margin-top:1rem">
          <img src="images/Chapitre_8_Activité_1_Cours_image22.png" alt="Télophase — cytokinèse"
               style="max-width:380px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Télophase : la cytokinèse sépare les deux cellules filles</p>
        </div>`
    },
    {
      titre: '5. Tableau récapitulatif — Mitose',
      open: false,
      html: `
        <table class="data-table">
          <thead><tr><th>Phase</th><th>Chromosomes</th><th>Chromatides/chr.</th><th>Membrane nucléaire</th></tr></thead>
          <tbody>
            <tr><td>Interphase (début)</td><td>2n</td><td>1</td><td>Présente</td></tr>
            <tr><td>Interphase (fin)</td><td>2n</td><td>2</td><td>Présente</td></tr>
            <tr><td>Prophase</td><td>2n</td><td>2</td><td>Disparaît</td></tr>
            <tr><td>Métaphase</td><td>2n</td><td>2</td><td>Absente</td></tr>
            <tr><td>Anaphase</td><td>2n</td><td>1</td><td>Absente</td></tr>
            <tr><td>Télophase</td><td>2n</td><td>1</td><td>Se reforme</td></tr>
          </tbody>
        </table>
        <div class="info-box" style="margin-top:1rem">
          <strong>Règle fondamentale :</strong> Le nombre de chromosomes est <strong class="kw">conservé</strong> tout au long de la mitose (2n → 2n). C'est la propriété clé de la <em>reproduction conforme</em>.
        </div>`
    },
    {
      titre: '6. La cellule diploïde (2n)',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Une <strong class="kw">cellule diploïde (2n)</strong> possède deux assortiments complets de chromosomes homologues :</p>
          <ul style="margin:0.5rem 0 0.75rem 1.5rem;line-height:2">
            <li>Un jeu de chromosomes <strong>d'origine maternelle</strong></li>
            <li>Un jeu de chromosomes <strong>d'origine paternelle</strong></li>
          </ul>
          <div style="display:flex;gap:1rem;margin-top:0.75rem;flex-wrap:wrap">
            <div style="background:var(--primary-light);border-radius:12px;padding:0.75rem 1.25rem;text-align:center;flex:1;min-width:120px">
              <div style="font-size:1.5rem;font-weight:900;color:var(--primary-dark)">2n = 46</div>
              <div style="font-size:0.78rem;color:var(--text-muted)">Cellules somatiques humaines</div>
            </div>
            <div style="background:var(--accent-light);border-radius:12px;padding:0.75rem 1.25rem;text-align:center;flex:1;min-width:120px">
              <div style="font-size:1.5rem;font-weight:900;color:var(--primary-dark)">23 paires</div>
              <div style="font-size:0.78rem;color:var(--text-muted)">de chromosomes homologues</div>
            </div>
          </div>
        </div>`
    }
  ];
  return buildAccordions(sections, id + '-cours');
}

// ── COURS ACTIVITÉ 2 — CONSERVATION DU CARYOTYPE ────────────
function buildCours2(act, id) {
  const sections = [
    {
      titre: '1. Conservation du caryotype chez les cellules somatiques',
      open: true,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Le <strong class="kw">caryotype</strong> est l'ensemble des chromosomes d'une cellule, classés par paires homologues.</p>
          <p style="margin-top:0.75rem">La cellule-œuf, l'embryon à 8 cellules et les globules blancs d'un adulte ont <strong class="kw">tous le même caryotype</strong> (2n = 46). Cela est possible grâce aux <strong class="kw">divisions conformes</strong> (mitoses) qui distribuent fidèlement l'information génétique.</p>
        </div>
        <div style="display:flex;gap:1rem;margin-top:1rem;flex-wrap:wrap;justify-content:center">
          <div style="text-align:center">
            <img src="images/Chapitre_8_Activité_2_image11.png" alt="Caryotype cellule-œuf et embryon"
                 style="max-width:200px;width:100%;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.15)">
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem">Caryotype de la cellule-œuf et des cellules embryonnaires</p>
          </div>
          <div style="text-align:center">
            <img src="images/Chapitre_8_Activité_2_image12.png" alt="Caryotype globule blanc"
                 style="max-width:200px;width:100%;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.15)">
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.3rem">Caryotype du globule blanc adulte</p>
          </div>
        </div>
        <div class="info-box" style="margin-top:0.75rem">
          Les 3 caryotypes sont <strong>identiques</strong> → toutes les cellules somatiques ont le même patrimoine génétique.
        </div>`
    },
    {
      titre: '2. Divisions cellulaires successives',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>À partir d'une cellule-œuf, on applique la formule : <strong class="kw">Nombre de cellules = 2ⁿ</strong> (n = nombre de divisions).</p>
          <div style="background:var(--surface2);border-radius:12px;padding:1rem;margin:0.75rem 0">
            <table style="width:100%;text-align:center;border-collapse:collapse;font-size:0.875rem">
              <thead><tr style="color:var(--primary-dark);font-weight:700"><td>Divisions (n)</td><td>Cellules obtenues</td><td>Calcul</td></tr></thead>
              <tbody>
                <tr style="border-top:1px solid var(--border)"><td>1</td><td>2</td><td>2¹ = 2</td></tr>
                <tr style="border-top:1px solid var(--border)"><td>2</td><td>4</td><td>2² = 4</td></tr>
                <tr style="border-top:1px solid var(--border)"><td><strong>3</strong></td><td><strong>8</strong></td><td><strong>2³ = 8</strong></td></tr>
                <tr style="border-top:1px solid var(--border)"><td>4</td><td>16</td><td>2⁴ = 16</td></tr>
                <tr style="border-top:1px solid var(--border)"><td>5</td><td>32</td><td>2⁵ = 32</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="text-align:center;margin-top:1rem">
          <img src="images/Chapitre_8_Activité_2_image3.png" alt="Développement embryonnaire : 1 → 16 cellules"
               style="max-width:480px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">De l'ovule fécondé à l'embryon 16 cellules — 4 divisions</p>
        </div>`
    },
    {
      titre: '3. Évolution des chromatides au cours du cycle cellulaire',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid var(--primary)">
              <strong style="color:var(--primary-dark)">Pendant l'Interphase</strong>
              <ul style="margin-top:0.5rem;padding-left:1.25rem;font-size:0.875rem;line-height:2">
                <li>Début : 1 chromatide/chromosome</li>
                <li>Duplication de l'ADN</li>
                <li>Fin : <strong>2 chromatides</strong>/chromosome</li>
                <li>Quantité ADN : 1 u.a. → <strong>2 u.a.</strong></li>
              </ul>
            </div>
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid var(--accent)">
              <strong style="color:var(--primary-dark)">Pendant la Mitose</strong>
              <ul style="margin-top:0.5rem;padding-left:1.25rem;font-size:0.875rem;line-height:2">
                <li>Chromatides sœurs séparées (anaphase)</li>
                <li>Chaque cellule fille : 1 chromatide/chr.</li>
                <li>Quantité ADN : 2 u.a. → <strong>1 u.a.</strong></li>
              </ul>
            </div>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>Moment du cycle</th><th>Chromatides/chromosome</th><th>Quantité d'ADN</th></tr></thead>
          <tbody>
            <tr><td>Début interphase</td><td>1</td><td>1 u.a.</td></tr>
            <tr><td>Fin interphase (après duplication)</td><td>2</td><td>2 u.a.</td></tr>
            <tr><td>Prophase & Métaphase</td><td>2</td><td>2 u.a.</td></tr>
            <tr><td>Anaphase (séparation)</td><td>1</td><td>2 u.a. (total)</td></tr>
            <tr><td>Télophase / Cellule fille</td><td>1</td><td>1 u.a.</td></tr>
          </tbody>
        </table>`
    },
    {
      titre: '4. Les chromatides sœurs — Identité génétique',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Les deux <strong class="kw">chromatides sœurs</strong> d'un même chromosome portent une <strong class="kw">information génétique identique</strong>.</p>
          <div class="info-box" style="margin-top:0.75rem">
            <strong>Pourquoi ?</strong> Car elles résultent de la <strong>duplication</strong> du chromosome. Lors de la duplication, chaque brin d'ADN sert de matrice pour synthétiser un brin complémentaire → deux molécules d'ADN parfaitement identiques.
          </div>
          <p style="margin-top:0.75rem">C'est cette identité qui garantit la <strong class="kw">conservation de l'information génétique</strong> au cours des générations cellulaires.</p>
        </div>`
    }
  ];
  return buildAccordions(sections, id + '-cours');
}

// ── COURS ACTIVITÉ 3 — LA MÉIOSE ────────────────────────────
function buildCours3(act, id) {
  const sections = [
    {
      titre: '1. Les gamètes et la notion d\'haploïdie',
      open: true,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>Les <strong class="kw">gamètes</strong> sont les cellules reproductrices (spermatozoïdes et ovules). Ils sont <strong class="kw">haploïdes (n)</strong> : un seul exemplaire de chaque chromosome.</p>
          <div style="display:flex;gap:1rem;margin:0.75rem 0;flex-wrap:wrap">
            <div style="background:#DBEAFE;border-radius:12px;padding:0.75rem 1.25rem;text-align:center;flex:1;min-width:120px">
              <div style="font-size:1.4rem;font-weight:900;color:#1D4ED8">2n = 46</div>
              <div style="font-size:0.78rem;color:#1D4ED8">Cellule somatique (diploïde)</div>
            </div>
            <div style="background:#EDE9FE;border-radius:12px;padding:0.75rem 1.25rem;text-align:center;flex:1;min-width:120px">
              <div style="font-size:1.4rem;font-weight:900;color:#4C1D95">n = 23</div>
              <div style="font-size:0.78rem;color:#4C1D95">Gamète (haploïde)</div>
            </div>
            <div style="background:#D1FAE5;border-radius:12px;padding:0.75rem 1.25rem;text-align:center;flex:1;min-width:120px">
              <div style="font-size:1.4rem;font-weight:900;color:#065F46">2n = 46</div>
              <div style="font-size:0.78rem;color:#065F46">Zygote (n+n = 2n)</div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:1rem">
          <img src="images/Chapitre_8_Activité_3_image19.png" alt="Gamètes : ovocyte et spermatozoïdes avec caryotypes"
               style="max-width:380px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Ovocyte (n=23) et spermatozoïdes (n=23) avec leurs caryotypes haploïdes</p>
        </div>`
    },
    {
      titre: '2. Vue d\'ensemble de la méiose',
      open: false,
      html: `
        <div style="font-size:0.9rem;line-height:1.8">
          <p>La <strong class="kw">méiose</strong> est un processus de 2 divisions successives qui produit 4 cellules haploïdes à partir d'une cellule diploïde.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.75rem">
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid #8B5CF6">
              <strong style="color:#4C1D95">1ère division — Réductionnelle</strong>
              <p style="font-size:0.875rem;margin-top:0.4rem;line-height:1.7">Sépare les chromosomes <strong>homologues</strong>. Réduit le nombre de moitié : 2n → n.</p>
            </div>
            <div style="background:var(--surface2);border-radius:12px;padding:1rem;border-left:4px solid #EC4899">
              <strong style="color:#9D174D">2ème division — Équationnelle</strong>
              <p style="font-size:0.875rem;margin-top:0.4rem;line-height:1.7">Sépare les <strong>chromatides sœurs</strong> (comme une mitose). N ne change pas.</p>
            </div>
          </div>
          <div style="background:var(--primary-light);border-radius:12px;padding:1rem;margin-top:0.75rem;text-align:center">
            <strong style="color:var(--primary-dark)">1 cellule (2n) → 4 gamètes (n)</strong>
          </div>
        </div>`
    },
    {
      titre: '3. Première division — Division réductionnelle (2n → n)',
      open: false,
      html: `
        <div style="text-align:center;margin-bottom:1.25rem">
          <img src="images/Chapitre_8_Activité_3_image20.png" alt="1ère division méiotique — 4 phases"
               style="max-width:420px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Schéma de la division réductionnelle (cellule mère 2n=6 → 2 cellules n=3)</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.6rem">
          ${[
            { nom:'Prophase I', couleur:'#8B5CF6', desc:'La membrane nucléaire disparaît. Les <strong>chromosomes homologues s\'apparient</strong> (synapse). Le fuseau achromatique se forme. Chaque bivalent = 4 chromatides (<strong>tétrade</strong>).' },
            { nom:'Métaphase I', couleur:'#7C3AED', desc:'Les <strong>bivalents (tétrades)</strong> s\'alignent sur la plaque équatoriale. Les homologues sont encore associés (4 chromatides par bivalent).' },
            { nom:'Anaphase I', couleur:'#6D28D9', desc:'Les <strong>chromosomes homologues se séparent</strong> (pas les chromatides !) et migrent aux pôles. Chaque chromosome garde encore ses 2 chromatides.' },
            { nom:'Télophase I', couleur:'#5B21B6', desc:'La cellule se divise → <strong>2 cellules filles haploïdes</strong> (n chromosomes à 2 chromatides chacun). Le nombre est réduit de moitié : 2n → n.' }
          ].map(p => `
            <div class="phase-card">
              <div class="phase-header">
                <div class="phase-dot" style="background:${p.couleur}"></div>
                <strong>${p.nom}</strong>
              </div>
              <div class="phase-body" style="font-size:0.875rem;line-height:1.7">${p.desc}</div>
            </div>`).join('')}
        </div>`
    },
    {
      titre: '4. Deuxième division — Division équationnelle (n → n)',
      open: false,
      html: `
        <div style="text-align:center;margin-bottom:1.25rem">
          <img src="images/Chapitre_8_Activité_3_image21.png" alt="2ème division méiotique"
               style="max-width:420px;width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.12)">
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem">Division équationnelle → 4 cellules haploïdes à 1 chromatide</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.6rem">
          ${[
            { nom:'Prophase II', couleur:'#EC4899', desc:'Les chromosomes se condensent à nouveau dans chacune des 2 cellules. Similaire à la prophase de la mitose.' },
            { nom:'Métaphase II', couleur:'#DB2777', desc:'Les chromosomes individuels (à 2 chromatides) s\'alignent sur la plaque équatoriale. Pas de bivalents — chromosomes non appariés.' },
            { nom:'Anaphase II', couleur:'#BE185D', desc:'Les <strong>chromatides sœurs se séparent</strong> (comme en mitose). Chaque chromatide devient un chromosome à 1 chromatide.' },
            { nom:'Télophase II', couleur:'#9D174D', desc:'Chacune des 2 cellules se divise → <strong>4 cellules haploïdes</strong> au total (n chromosomes, 1 chromatide chacun). Ce sont les futurs gamètes.' }
          ].map(p => `
            <div class="phase-card">
              <div class="phase-header">
                <div class="phase-dot" style="background:${p.couleur}"></div>
                <strong>${p.nom}</strong>
              </div>
              <div class="phase-body" style="font-size:0.875rem;line-height:1.7">${p.desc}</div>
            </div>`).join('')}
        </div>`
    },
    {
      titre: '5. Tableau récapitulatif — Méiose complète',
      open: false,
      html: `
        <table class="data-table">
          <thead><tr><th>Phase</th><th>Nb chromosomes</th><th>Chromatides/chr.</th><th>Nb cellules</th></tr></thead>
          <tbody>
            <tr><td>Cellule initiale (2n)</td><td>46</td><td>2 (après duplic.)</td><td>1</td></tr>
            <tr><td>Télophase I</td><td>23</td><td>2</td><td>2</td></tr>
            <tr><td>Gamètes (Télophase II)</td><td>23</td><td>1</td><td>4</td></tr>
          </tbody>
        </table>
        <div class="info-box" style="margin-top:1rem">
          <strong>Différence clé :</strong><br>
          • <strong>Anaphase I</strong> → séparation des <em>homologues</em> (chr. à 2 chromatides)<br>
          • <strong>Anaphase II</strong> → séparation des <em>chromatides sœurs</em> (comme la mitose)
        </div>`
    }
  ];
  return buildAccordions(sections, id + '-cours');
}

// ── GÉNÉRATEUR D'ACCORDÉONS ──────────────────────────────────
function buildAccordions(sections, prefix) {
  return sections.map((s, i) => `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <span>${s.titre}</span>
        <span class="accordion-icon ${s.open ? 'open' : ''}">▼</span>
      </div>
      <div class="accordion-body" style="display:${s.open ? '' : 'none'}">${s.html}</div>
    </div>`).join('');
}

// ════════════════════════════════════════════════════════════
// RÉSUMÉS
// ════════════════════════════════════════════════════════════
function renderResumes() {
  const icons = ['🔵','🟢','🟣'];
  const items = [1,2,3].map(n => {
    const r = CHAPTER_DATA.resumes[n];
    const act = CHAPTER_DATA.activites[n];
    const points = r.points.map(p => `
      <li style="display:flex;gap:0.6rem;font-size:0.875rem;line-height:1.6;padding:0.4rem 0.5rem;border-radius:6px;background:var(--surface2);margin-bottom:0.4rem">
        <span style="color:var(--primary);font-weight:800;flex-shrink:0">→</span>
        <span>${p}</span>
      </li>`).join('');

    let tableHtml = '';
    if (n === 1 && r.tableau) {
      tableHtml = `<table class="data-table" style="margin-top:1rem">
        <thead><tr><th>Phase</th><th>Nb chr.</th><th>Chromatides/chr.</th><th>Membrane nucléaire</th></tr></thead>
        <tbody>${r.tableau.map(row=>`<tr><td>${row.phase}</td><td>${row.nbChr}</td><td>${row.chromatides}</td><td>${row.membrane}</td></tr>`).join('')}</tbody>
      </table>`;
    }

    return `
      <div class="resume-card">
        <div class="resume-header" onclick="toggleResume(this)">
          <div class="resume-header-left">
            <span style="font-size:1.5rem">${act.icone}</span>
            <span class="resume-title">${r.titre}</span>
          </div>
          <span class="resume-chevron" style="color:var(--primary-dark);font-size:0.85rem;font-weight:700">${n===1?'▲ Réduire':'▼ Développer'}</span>
        </div>
        <div class="resume-body" style="display:${n===1?'':'none'}">
          <ul style="list-style:none;margin-bottom:1rem">${points}</ul>
          ${tableHtml}
          <div style="margin-top:1rem">
            <button class="btn btn-outline btn-sm" onclick="window.print()">🖨️ Imprimer ce résumé</button>
          </div>
        </div>
      </div>`;
  }).join('');

  return `
    <h1 class="section-title">📝 Résumés</h1>
    <p class="section-subtitle">Points essentiels de chaque activité — idéal pour la révision finale</p>
    ${items}`;
}

// ════════════════════════════════════════════════════════════
// VOCABULAIRE
// ════════════════════════════════════════════════════════════
function renderVocabulaire() {
  return `
    <h1 class="section-title">📖 Vocabulaire</h1>
    <p class="section-subtitle">${CHAPTER_DATA.vocabulaire.length} termes clés du Chapitre 8</p>
    <input id="vocab-search" class="vocab-search" type="text" placeholder="🔍 Rechercher un terme...">
    <div class="vocab-filters">
      <button class="filter-btn active" data-filter="0" onclick="vocabFilter(this)">Tous</button>
      <button class="filter-btn" data-filter="1" onclick="vocabFilter(this)">🔵 Activité 1</button>
      <button class="filter-btn" data-filter="2" onclick="vocabFilter(this)">🟢 Activité 2</button>
      <button class="filter-btn" data-filter="3" onclick="vocabFilter(this)">🟣 Activité 3</button>
    </div>
    <div id="vocab-grid" class="grid-3" style="gap:0.75rem"></div>`;
}

function initVocabSearch() {
  let currentFilter = 0;
  const vocab = CHAPTER_DATA.vocabulaire;
  const search = document.getElementById('vocab-search');
  const grid = document.getElementById('vocab-grid');
  if (!search || !grid) return;

  function render() {
    const q = search.value.toLowerCase();
    const filtered = vocab.filter(v => {
      const matchQ = !q || v.terme.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q);
      const matchF = currentFilter === 0 || v.activite === currentFilter;
      return matchQ && matchF;
    });
    grid.innerHTML = filtered.length ? filtered.map(v => `
      <div class="vocab-card">
        <div class="vocab-term">${v.terme}</div>
        <div class="vocab-def">${v.definition}</div>
        <span class="badge badge-act${v.activite}" style="margin-top:0.5rem">Activité ${v.activite}</span>
      </div>`).join('') : `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem">Aucun terme trouvé.</p>`;
  }

  window.vocabFilter = function(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = parseInt(btn.dataset.filter);
    render();
  };

  search.addEventListener('input', render);
  render();
}

// ════════════════════════════════════════════════════════════
// FLASHCARDS
// ════════════════════════════════════════════════════════════
function renderFlashcards() {
  return `
    <h1 class="section-title">🃏 Flashcards</h1>
    <p class="section-subtitle">Cliquez sur la carte pour la retourner</p>

    <div id="fc-controls" style="display:flex;gap:0.5rem;margin-bottom:1.25rem;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" onclick="fcShuffle()">🔀 Mélanger</button>
      <button class="btn btn-ghost btn-sm" onclick="fcReset()">🔄 Recommencer</button>
      <button class="btn btn-ghost btn-sm active" id="fc-all-btn" onclick="fcShowAll()">📚 Toutes</button>
      <button class="btn btn-ghost btn-sm" id="fc-review-btn" onclick="fcShowMode('review')">🔁 À réviser</button>
      <button class="btn btn-ghost btn-sm" id="fc-known-btn" onclick="fcShowMode('known')">✅ Connues</button>
      <span style="margin-left:auto;align-self:center;font-size:0.85rem;font-weight:600;color:var(--text-muted)" id="fc-counter">Carte 1 / 30</span>
    </div>

    <div class="progress-bar-wrap" style="margin-bottom:1.5rem">
      <div class="progress-bar-fill" id="fc-progress" style="width:3%"></div>
    </div>

    <div class="flashcard-arena">
      <div class="flashcard-wrap" id="fc-card" onclick="fcFlip()">
        <div class="flashcard-inner" id="fc-inner">
          <div class="flashcard-face flashcard-front">
            <div class="flashcard-label" id="fc-type-label">Terme à définir</div>
            <div class="flashcard-text" id="fc-recto">Chargement...</div>
            <div class="flashcard-hint">Cliquez pour voir la réponse</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="flashcard-label">Réponse</div>
            <div class="flashcard-text" id="fc-verso" style="font-size:1rem;white-space:pre-line"></div>
          </div>
        </div>
      </div>

      <div class="flashcard-controls">
        <button class="btn btn-outline" onclick="fcPrev()" id="fc-prev">◀ Préc.</button>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-sm fc-review" onclick="fcTag('review')">🔁 À réviser</button>
          <button class="btn btn-sm fc-know" onclick="fcTag('known')">✅ Je connais</button>
        </div>
        <button class="btn btn-outline" onclick="fcNext()" id="fc-next">Suiv. ▶</button>
      </div>

      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
        <span class="badge badge-success">✅ Connues : <span id="fc-known-count">0</span></span>
        <span class="badge badge-warning">🔁 À réviser : <span id="fc-review-count">0</span></span>
      </div>
    </div>`;
}

function initFlashcardsApp() {
  const typeLabels = { terme: 'Terme à définir', phase: 'Identifiez la phase', concept: 'Question conceptuelle' };
  let allCards = [...CHAPTER_DATA.flashcards];
  let deck = [...allCards];
  let idx = 0;
  let tags = {};

  function update() {
    if (!deck.length) {
      document.getElementById('fc-recto').textContent = 'Aucune carte dans ce mode.';
      document.getElementById('fc-verso').textContent = '';
      document.getElementById('fc-counter').textContent = '0 / 0';
      return;
    }
    const card = deck[idx];
    document.getElementById('fc-inner').classList.remove('flipped');
    document.getElementById('fc-type-label').textContent = typeLabels[card.type] || 'Terme';
    document.getElementById('fc-recto').textContent = card.recto;
    document.getElementById('fc-verso').textContent = card.verso;
    document.getElementById('fc-counter').textContent = `Carte ${idx + 1} / ${deck.length}`;
    document.getElementById('fc-progress').style.width = `${((idx + 1) / deck.length) * 100}%`;
    document.getElementById('fc-prev').disabled = idx === 0;
    document.getElementById('fc-next').disabled = idx === deck.length - 1;
    document.getElementById('fc-known-count').textContent = Object.values(tags).filter(t => t === 'known').length;
    document.getElementById('fc-review-count').textContent = Object.values(tags).filter(t => t === 'review').length;
  }

  window.fcFlip = () => document.getElementById('fc-inner').classList.toggle('flipped');
  window.fcNext = () => { if (idx < deck.length - 1) { idx++; update(); } };
  window.fcPrev = () => { if (idx > 0) { idx--; update(); } };
  window.fcShuffle = () => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    idx = 0; update();
  };
  window.fcReset = () => { deck = [...allCards]; idx = 0; tags = {}; update(); };
  window.fcTag = (tag) => {
    tags[deck[idx].recto] = tag;
    if (idx < deck.length - 1) { idx++; }
    update();
  };
  window.fcShowAll = () => { deck = [...allCards]; idx = 0; update(); };
  window.fcShowMode = (mode) => {
    deck = allCards.filter(c => tags[c.recto] === mode);
    idx = 0; update();
  };

  update();
}

// ════════════════════════════════════════════════════════════
// QUIZ
// ════════════════════════════════════════════════════════════
function renderQuizSection() {
  return `
    <h1 class="section-title">❓ Quiz</h1>
    <p class="section-subtitle">Testez vos connaissances sur le Chapitre 8</p>

    <div id="quiz-selector">
      <div class="quiz-selector">
        ${[
          { key:'activite1', icon:'🔵', title:'Quiz Activité 1', count:'15', sub:'Mitose' },
          { key:'activite2', icon:'🟢', title:'Quiz Activité 2', count:'10', sub:'Caryotype' },
          { key:'activite3', icon:'🟣', title:'Quiz Activité 3', count:'15', sub:'Méiose' },
          { key:'complet',   icon:'🧬', title:'Quiz Complet',    count:'20', sub:'Tout le chapitre' }
        ].map(q => `
          <div class="quiz-select-card" onclick="quizSelect('${q.key}', this)">
            <div class="quiz-card-icon">${q.icon}</div>
            <div class="quiz-card-title">${q.title}</div>
            <div class="quiz-card-count">${q.sub} — ${q.count} questions</div>
          </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:1rem">
        <button class="btn btn-primary btn-lg" id="quiz-start-btn" onclick="quizStart()" disabled>🚀 Commencer le Quiz</button>
      </div>
    </div>

    <div id="quiz-arena" style="display:none;max-width:680px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
        <span id="quiz-counter" style="font-size:0.85rem;color:var(--text-muted);font-weight:600"></span>
        <span id="quiz-score-live" style="font-size:0.85rem;font-weight:700;color:var(--primary-dark)"></span>
      </div>
      <div class="progress-bar-wrap" style="margin-bottom:1.25rem">
        <div class="progress-bar-fill" id="quiz-progress" style="width:0%"></div>
      </div>
      <div class="quiz-question-card">
        <div id="quiz-type-badge" class="quiz-type-badge"></div>
        <div id="quiz-q-text" class="quiz-q-text"></div>
        <div id="quiz-choices" class="quiz-choices"></div>
      </div>
      <div id="quiz-feedback" style="display:none"></div>
      <div id="quiz-next-wrap" style="text-align:right;margin-top:0.5rem;display:none">
        <button class="btn btn-primary" onclick="quizNext()">
          <span id="quiz-next-label">Question suivante ▶</span>
        </button>
      </div>
    </div>

    <div id="quiz-result" style="display:none">
      <div class="quiz-result-card">
        <div class="result-emoji" id="res-emoji"></div>
        <div class="result-score" id="res-score"></div>
        <div class="result-label" id="res-pct"></div>
        <div class="result-message" id="res-msg"></div>
        <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="quizRestart()">🔄 Réessayer</button>
          <button class="btn btn-outline" onclick="quizBackToMenu()">← Choisir un quiz</button>
        </div>
        <div id="res-best" style="margin-top:1rem;font-size:0.8rem;color:var(--text-muted);display:none">🏆 Nouveau record personnel !</div>
      </div>
    </div>`;
}

function initQuizApp() {
  let selectedKey = null;
  let questions = [];
  let currentQ = 0;
  let score = 0;
  let answered = false;

  window.quizSelect = (key, el) => {
    selectedKey = key;
    document.querySelectorAll('.quiz-select-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('quiz-start-btn').disabled = false;
  };

  window.quizStart = () => {
    const src = CHAPTER_DATA.quiz[selectedKey] || [];
    questions = [...src].sort(() => Math.random() - 0.5);
    currentQ = 0; score = 0; answered = false;
    document.getElementById('quiz-selector').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-arena').style.display = '';
    renderQuestion();
  };

  window.quizRestart = () => { window.quizStart(); };
  window.quizBackToMenu = () => {
    document.getElementById('quiz-arena').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-selector').style.display = '';
  };

  function renderQuestion() {
    answered = false;
    const q = questions[currentQ];
    document.getElementById('quiz-counter').textContent = `Question ${currentQ + 1} / ${questions.length}`;
    document.getElementById('quiz-score-live').textContent = `Score : ${score} / ${currentQ}`;
    document.getElementById('quiz-progress').style.width = `${(currentQ / questions.length) * 100}%`;
    document.getElementById('quiz-type-badge').innerHTML = `<span class="badge ${q.type === 'vrai-faux' ? 'badge-warning' : 'badge-primary'}">${q.type === 'vrai-faux' ? 'Vrai / Faux' : 'QCM'}</span>`;
    document.getElementById('quiz-q-text').textContent = q.question;
    document.getElementById('quiz-choices').innerHTML = q.choix.map((c, i) => `
      <button class="quiz-choice" id="qc-${i}" onclick="quizAnswer(${i})">
        <span class="choice-letter">${['A','B','C','D'][i]}</span>
        <span>${c}</span>
      </button>`).join('');
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next-wrap').style.display = 'none';
  }

  window.quizAnswer = (idx) => {
    if (answered) return;
    answered = true;
    const q = questions[currentQ];
    const correct = q.reponse;
    if (idx === correct) score++;

    q.choix.forEach((_, i) => {
      const btn = document.getElementById(`qc-${i}`);
      if (btn) {
        btn.disabled = true;
        if (i === correct) btn.classList.add('correct');
        else if (i === idx && i !== correct) btn.classList.add('wrong');
      }
    });

    const fb = document.getElementById('quiz-feedback');
    fb.className = `quiz-feedback ${idx === correct ? 'correct' : 'wrong'}`;
    fb.innerHTML = `<strong>${idx === correct ? '✅ Bonne réponse !' : '❌ Pas tout à fait...'}</strong><p style="margin-top:0.4rem">${q.explication}</p>`;
    fb.style.display = '';

    document.getElementById('quiz-score-live').textContent = `Score : ${score} / ${currentQ + 1}`;
    const nextLabel = document.getElementById('quiz-next-label');
    if (nextLabel) nextLabel.textContent = currentQ < questions.length - 1 ? 'Question suivante ▶' : 'Voir les résultats 🏁';
    document.getElementById('quiz-next-wrap').style.display = '';
  };

  window.quizNext = () => {
    if (currentQ < questions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    document.getElementById('quiz-arena').style.display = 'none';
    document.getElementById('quiz-result').style.display = '';
    const pct = Math.round((score / questions.length) * 100);
    document.getElementById('res-emoji').textContent = pct >= 90 ? '🏆' : pct >= 70 ? '😊' : pct >= 50 ? '😐' : '📚';
    document.getElementById('res-score').textContent = `${score} / ${questions.length}`;
    document.getElementById('res-pct').textContent = `(${pct}%)`;
    document.getElementById('res-msg').textContent = pct >= 90 ? 'Excellent ! Tu maîtrises ce chapitre !' : pct >= 70 ? 'Très bien ! Revois les points manqués.' : pct >= 50 ? 'Pas mal ! Relis le cours et réessaie.' : 'Courage ! Revois le cours puis retente.';
    const prev = parseInt(localStorage.getItem('eb9-best-score') || '0');
    if (score > prev) {
      localStorage.setItem('eb9-best-score', score);
      document.getElementById('res-best').style.display = '';
    }
  }
}

// ════════════════════════════════════════════════════════════
// SIMULATIONS — basées sur les vidéos extraites du PPT
// ════════════════════════════════════════════════════════════
function renderSimulations() {
  return `
    <h1 class="section-title">🔬 Simulations</h1>
    <p class="section-subtitle">Animations interactives des divisions cellulaires — tirées directement du cours</p>

    <div id="sim-tabs-bar" class="tabs-bar" style="margin-bottom:1.5rem">
      <button class="tab-btn active" onclick="simShowTab('mitose',this)">🔵 Mitose</button>
      <button class="tab-btn" onclick="simShowTab('meiose',this)">🟣 Méiose</button>
    </div>

    <!-- ══════════ MITOSE ══════════ -->
    <div id="sim-mitose">

      <!-- Vidéo -->
      <div class="sim-video-block">
        <video id="vid-mitose" src="images/mitose_animation.mp4"
               class="sim-video" preload="auto" playsinline controls>
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <div class="sim-video-bar">
          <span class="speed-label">🎬 Vitesse de lecture :</span>
          <select id="mit-speed" class="speed-select">
            <option value="0.5">Lente (0.5×)</option>
            <option value="1" selected>Normale (1×)</option>
            <option value="1.5">Rapide (1.5×)</option>
            <option value="2">Très rapide (2×)</option>
          </select>
          <button class="btn btn-ghost btn-sm" id="mit-btn-reset" style="margin-left:auto">⏮ Recommencer</button>
        </div>
      </div>

      <!-- Infos phase courante -->
      <div class="sim-phase-display">
        <div class="sim-phase-name" id="mit-phase-name">Interphase</div>
        <div class="sim-phase-desc" id="mit-phase-desc">Duplication de l'ADN. Le centrosome se dédouble.</div>
        <div class="sim-counters">
          <div class="sim-counter-item" id="mit-chr">Chromosomes : 2n = 46</div>
          <div class="sim-counter-item" id="mit-chrd">Chromatides/chr : 2 par chromosome</div>
        </div>
      </div>

      <!-- Vignettes des 5 phases -->
      <h3 class="sim-strip-title">📸 Les phases de la Mitose</h3>
      <div class="sim-phase-strip">

        <div class="sim-phase-card mit-thumb active">
          <img src="images/Chapitre_8_Activité_1_image25.png" alt="Interphase">
          <div class="spc-label">Interphase</div>
          <div class="spc-detail">Chromatine filamenteuse<br>ADN en cours de duplication</div>
        </div>

        <div class="sim-phase-card mit-thumb">
          <img src="images/mit_phase_prophase.png" alt="Prophase">
          <div class="spc-label">Prophase</div>
          <div class="spc-detail">Condensation des chromosomes<br>Formation du fuseau achromatique</div>
        </div>

        <div class="sim-phase-card mit-thumb">
          <img src="images/mit_phase_metaphase.png" alt="Métaphase">
          <div class="spc-label">Métaphase</div>
          <div class="spc-detail">Plaque équatoriale<br>Fuseau achromatique étendu</div>
        </div>

        <div class="sim-phase-card mit-thumb">
          <img src="images/mit_phase_anaphase.png" alt="Anaphase">
          <div class="spc-label">Anaphase</div>
          <div class="spc-detail">Ascension polaire<br>Centromères dédoublés</div>
        </div>

        <div class="sim-phase-card mit-thumb">
          <img src="images/mit_phase_telophase.png" alt="Télophase">
          <div class="spc-label">Télophase</div>
          <div class="spc-detail">Étranglement cytoplasmique<br>→ 2 cellules filles</div>
        </div>

      </div>

      <!-- Schéma de référence -->
      <div class="sim-ref-block">
        <h3>📖 Schéma de référence — étapes de la Mitose</h3>
        <img src="images/mit_schema_reference.png"
             class="sim-ref-img" alt="Schéma des phases de la mitose">
      </div>

    </div><!-- /sim-mitose -->

    <!-- ══════════ MEIOSE ══════════ -->
    <div id="sim-meiose" style="display:none">

      <!-- Sous-onglets Division I / II -->
      <div class="tabs-bar" style="margin-bottom:1rem">
        <button class="tab-btn mei-divtab active" onclick="meiShowDiv(1,this)">
          Division I — Réductionnelle
        </button>
        <button class="tab-btn mei-divtab" onclick="meiShowDiv(2,this)">
          Division II — Équationnelle
        </button>
      </div>

      <!-- ── Division I ── -->
      <div id="mei-div1">
        <div class="sim-video-block">
          <video id="vid-meiose1" src="images/meiose_animation1.mp4"
                 class="sim-video" preload="auto" playsinline controls>
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
          <div class="sim-video-bar">
            <span class="speed-label">🎬 Vitesse de lecture :</span>
            <select id="mei-speed1" class="speed-select">
              <option value="0.5">Lente (0.5×)</option>
              <option value="1" selected>Normale (1×)</option>
              <option value="1.5">Rapide (1.5×)</option>
              <option value="2">Très rapide (2×)</option>
            </select>
          </div>
        </div>

        <div class="sim-phase-display">
          <div class="sim-phase-name" id="mei1-phase-name">Prophase I</div>
          <div class="sim-phase-desc" id="mei1-phase-desc">Appariement des chromosomes homologues — formation des tétrades.</div>
          <div class="sim-counters">
            <div class="sim-counter-item" id="mei1-chrom">Chromosomes : 2n = 46</div>
            <div class="sim-counter-item" id="mei1-cells">Cellules : 1 cellule diploïde</div>
          </div>
        </div>

        <h3 class="sim-strip-title">📸 Phases de la Division I (Réductionnelle)</h3>
        <div class="sim-phase-strip">
          <div class="sim-phase-card mei1-thumb active">
            <img src="images/mei_prophase1.png" alt="Prophase I">
            <div class="spc-label">Prophase I</div>
            <div class="spc-detail">Appariement des homologues<br>Formation des tétrades</div>
          </div>
          <div class="sim-phase-card mei1-thumb">
            <img src="images/mei_metaphase1.png" alt="Métaphase I">
            <div class="spc-label">Métaphase I</div>
            <div class="spc-detail">Tétrades sur la plaque<br>équatoriale</div>
          </div>
          <div class="sim-phase-card mei1-thumb">
            <img src="images/mei_anaphase1.png" alt="Anaphase I">
            <div class="spc-label">Anaphase I</div>
            <div class="spc-detail">Séparation des homologues<br>Centromère intact</div>
          </div>
          <div class="sim-phase-card mei1-thumb">
            <img src="images/mei_telophase1.png" alt="Télophase I">
            <div class="spc-label">Télophase I</div>
            <div class="spc-detail">2 cellules haploïdes<br>n = 23 chromosomes doubles</div>
          </div>
        </div>
      </div><!-- /mei-div1 -->

      <!-- ── Division II ── -->
      <div id="mei-div2" style="display:none">
        <div class="sim-video-block">
          <video id="vid-meiose2" src="images/meiose_animation2.mp4"
                 class="sim-video" preload="auto" playsinline controls>
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
          <div class="sim-video-bar">
            <span class="speed-label">🎬 Vitesse de lecture :</span>
            <select id="mei-speed2" class="speed-select">
              <option value="0.5">Lente (0.5×)</option>
              <option value="1" selected>Normale (1×)</option>
              <option value="1.5">Rapide (1.5×)</option>
              <option value="2">Très rapide (2×)</option>
            </select>
          </div>
        </div>

        <div class="sim-phase-display">
          <div class="sim-phase-name" id="mei2-phase-name">Prophase II</div>
          <div class="sim-phase-desc" id="mei2-phase-desc">Les 2 cellules haploïdes entrent en division équationnelle.</div>
          <div class="sim-counters">
            <div class="sim-counter-item" id="mei2-chrom">Chromosomes : n = 23</div>
            <div class="sim-counter-item" id="mei2-cells">Cellules : 2 cellules haploïdes</div>
          </div>
        </div>

        <h3 class="sim-strip-title">📸 Phases de la Division II (Équationnelle)</h3>
        <div class="sim-phase-strip">
          <div class="sim-phase-card mei2-thumb active">
            <img src="images/mei_prophase2.png" alt="Prophase II">
            <div class="spc-label">Prophase II</div>
            <div class="spc-detail">2 cellules haploïdes<br>Chromosomes à 2 chromatides</div>
          </div>
          <div class="sim-phase-card mei2-thumb">
            <img src="images/mei_metaphase2.png" alt="Métaphase II">
            <div class="spc-label">Métaphase II</div>
            <div class="spc-detail">Chromosomes sur la plaque<br>dans chaque cellule</div>
          </div>
          <div class="sim-phase-card mei2-thumb">
            <img src="images/mei_anaphase2.png" alt="Anaphase II">
            <div class="spc-label">Anaphase II</div>
            <div class="spc-detail">Dédoublement centromère<br>Chromatides → pôles</div>
          </div>
          <div class="sim-phase-card mei2-thumb">
            <img src="images/mei_telophase2.png" alt="Télophase II">
            <div class="spc-label">Télophase II</div>
            <div class="spc-detail">4 gamètes haploïdes<br>n = 23 chromosomes simples</div>
          </div>
        </div>
      </div><!-- /mei-div2 -->

      <!-- Résumé méiose -->
      <div class="sim-ref-block" style="margin-top:2rem">
        <h3>📋 Bilan de la Méiose</h3>
        <div class="meiose-bilan">
          <div class="bilan-card">
            <div class="bilan-num">2</div>
            <div class="bilan-label">Divisions successives</div>
          </div>
          <div class="bilan-card">
            <div class="bilan-num">4</div>
            <div class="bilan-label">Cellules filles (gamètes)</div>
          </div>
          <div class="bilan-card">
            <div class="bilan-num">n = 23</div>
            <div class="bilan-label">Chromosomes par gamète</div>
          </div>
          <div class="bilan-card">
            <div class="bilan-num">2n → n</div>
            <div class="bilan-label">Diploïde → Haploïde</div>
          </div>
        </div>
        <img src="images/Chapitre_8_Activité_3_image19.png"
             class="sim-ref-img" alt="Schéma méiose" style="margin-top:1.5rem">
      </div>

    </div><!-- /sim-meiose -->
  `;
}

function initSimTabs() {
  window.simShowTab = (tab, btn) => {
    const mitEl = document.getElementById('sim-mitose');
    const meiEl = document.getElementById('sim-meiose');
    if (mitEl) mitEl.style.display = tab === 'mitose' ? '' : 'none';
    if (meiEl) meiEl.style.display = tab === 'meiose' ? '' : 'none';
    document.querySelectorAll('#sim-tabs-bar .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    /* Pause l'autre video */
    const v1 = document.getElementById('vid-mitose');
    const v2 = document.getElementById('vid-meiose1');
    const v3 = document.getElementById('vid-meiose2');
    if (tab === 'mitose') { if (v2) v2.pause(); if (v3) v3.pause(); }
    if (tab === 'meiose') { if (v1) v1.pause(); }
  };
}

// ════════════════════════════════════════════════════════════
// EXERCICES
// ════════════════════════════════════════════════════════════
function renderExercices() {
  const html = CHAPTER_DATA.exercices.map(ex => {
    const qs = ex.questions.map((qa, i) => `
      <div class="sub-question">
        <div class="sq-header" onclick="toggleSQ(this)">
          <span><strong>${i+1}.</strong> ${qa.q}</span>
          <span class="sq-toggle">▼ Voir la réponse</span>
        </div>
        <div class="sq-answer" style="display:none">✅ ${qa.r}</div>
      </div>`).join('');
    return `
      <div class="exercice-card">
        <div class="exercice-header">
          <div class="exercice-num">Exercice ${ex.num}</div>
          <div class="exercice-title">${ex.titre}</div>
        </div>
        <div class="exercice-body">
          <div class="exercice-enonce">${ex.enonce}</div>
          ${qs}
        </div>
      </div>`;
  }).join('');

  return `
    <h1 class="section-title">✏️ Exercices Supplémentaires</h1>
    <p class="section-subtitle">5 exercices approfondis avec corrections détaillées</p>
    ${html}`;
}

// ── ALPINE : DONNÉES COMPOSANTS SHELL ───────────────────────
document.addEventListener('alpine:init', () => {
  // Pas de Alpine.data() pour les sections dynamiques
  // Alpine reste uniquement pour le shell (body x-data="mainApp()")
});
