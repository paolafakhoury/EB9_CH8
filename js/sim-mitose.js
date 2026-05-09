/* ============================================================
   SIM-MITOSE.JS — Simulation Mitose (vidéo issue du PPT)
   ============================================================ */

window.initMitoseVideo = function () {
  const vid = document.getElementById('vid-mitose');
  if (!vid) return;

  /* Vitesse */
  const speedSel = document.getElementById('mit-speed');
  if (speedSel) {
    speedSel.addEventListener('change', () => {
      vid.playbackRate = parseFloat(speedSel.value);
    });
  }

  /* Bouton Recommencer */
  const btnReset = document.getElementById('mit-btn-reset');
  if (btnReset) btnReset.addEventListener('click', () => { vid.currentTime = 0; vid.play(); });

  /* Phases avec seuils temporels relatifs (0 à 1) */
  const phases = [
    {
      name: 'Interphase',
      desc: "Duplication de l'ADN. Le centrosome se dédouble. La chromatine reste sous forme filamenteuse dans le noyau.",
      chrom: '2n = 46', chrd: '2 par chromosome', t: 0.0
    },
    {
      name: 'Prophase',
      desc: "Condensation de la chromatine en chromosomes doubles visibles. Migration des asters vers les pôles opposés. Formation du fuseau achromatique.",
      chrom: '2n = 46', chrd: '2 par chromosome', t: 0.2
    },
    {
      name: 'Métaphase',
      desc: "Alignement des chromosomes sur la plaque équatoriale. Le fuseau achromatique relie les centromères aux asters.",
      chrom: '2n = 46', chrd: '2 par chromosome', t: 0.42
    },
    {
      name: 'Anaphase',
      desc: "Dédoublement des centromères. Les chromatides migrent vers les pôles opposés (ascension polaire).",
      chrom: '2n = 92 (chromatides)', chrd: '1 (chromatide libre)', t: 0.62
    },
    {
      name: 'Télophase',
      desc: "Décondensation des chromosomes. Reformation des membranes nucléaires. Étranglement cytoplasmique → 2 cellules filles identiques.",
      chrom: '2n = 46', chrd: '1 par chromosome', t: 0.80
    },
  ];

  function updatePhaseInfo(progress) {
    let current = phases[0];
    for (const p of phases) { if (progress >= p.t) current = p; }

    const nameEl = document.getElementById('mit-phase-name');
    const descEl = document.getElementById('mit-phase-desc');
    const chrEl  = document.getElementById('mit-chr');
    const chrdEl = document.getElementById('mit-chrd');
    if (nameEl)  nameEl.textContent = current.name;
    if (descEl)  descEl.textContent = current.desc;
    if (chrEl)   chrEl.textContent  = 'Chromosomes : ' + current.chrom;
    if (chrdEl)  chrdEl.textContent = 'Chromatides/chr : ' + current.chrd;

    /* Surbrillance de la vignette de phase active */
    const idx = phases.indexOf(current);
    document.querySelectorAll('.mit-thumb').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }

  vid.addEventListener('timeupdate', () => {
    if (vid.duration) updatePhaseInfo(vid.currentTime / vid.duration);
  });

  vid.addEventListener('ended', () => {
    document.querySelectorAll('.mit-thumb').forEach((el, i, arr) => {
      el.classList.toggle('active', i === arr.length - 1);
    });
  });

  /* État initial */
  updatePhaseInfo(0);
};

/* Compatibilité avec l'ancien nom d'appel */
window.initMitoseCanvas = window.initMitoseVideo;
