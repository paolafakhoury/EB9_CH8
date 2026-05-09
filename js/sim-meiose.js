/* ============================================================
   SIM-MEIOSE.JS — Simulation Méiose (vidéos issues du PPT)
   Division I (réductionnelle) + Division II (équationnelle)
   ============================================================ */

window.initMeioseVideo = function () {
  /* ---- Basculement Division I / II ---- */
  window.meiShowDiv = function (div, btn) {
    document.getElementById('mei-div1').style.display = div === 1 ? '' : 'none';
    document.getElementById('mei-div2').style.display = div === 2 ? '' : 'none';
    document.querySelectorAll('.mei-divtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    /* Pause l'autre vidéo */
    const other = document.getElementById(div === 1 ? 'vid-meiose2' : 'vid-meiose1');
    if (other) other.pause();
  };

  /* ---- Division I ---- */
  const vid1 = document.getElementById('vid-meiose1');
  const phases1 = [
    {
      name: 'Prophase I',
      desc: "Appariement des chromosomes homologues (formation des tétrades = bivalents). La cellule est encore diploïde.",
      chrom: '2n = 46', cells: '1 cellule diploïde', t: 0.0
    },
    {
      name: 'Métaphase I',
      desc: "Les bivalents (paires de chromosomes homologues) se disposent sur la plaque équatoriale.",
      chrom: '2n = 46', cells: '1 cellule diploïde', t: 0.28
    },
    {
      name: 'Anaphase I',
      desc: "Séparation des chromosomes homologues qui migrent vers les pôles opposés. Le centromère ne se divise PAS.",
      chrom: 'n = 23 par pôle', cells: '1 cellule (en division)', t: 0.55
    },
    {
      name: 'Télophase I',
      desc: "Formation de 2 cellules haploïdes à chromosomes doubles (2 chromatides). Fin de la division réductionnelle.",
      chrom: 'n = 23', cells: '2 cellules haploïdes', t: 0.78
    },
  ];

  if (vid1) {
    const sp1 = document.getElementById('mei-speed1');
    if (sp1) sp1.addEventListener('change', () => { vid1.playbackRate = parseFloat(sp1.value); });

    vid1.addEventListener('timeupdate', () => {
      if (vid1.duration) updateMeiPhase(vid1.currentTime / vid1.duration, phases1, 'mei1');
    });
    updateMeiPhase(0, phases1, 'mei1');
  }

  /* ---- Division II ---- */
  const vid2 = document.getElementById('vid-meiose2');
  const phases2 = [
    {
      name: 'Prophase II',
      desc: "Les 2 cellules haploïdes entrent en division équationnelle. Condensation des chromosomes (n=23, 2 chromatides chacun).",
      chrom: 'n = 23', cells: '2 cellules haploïdes', t: 0.0
    },
    {
      name: 'Métaphase II',
      desc: "Les chromosomes (à 2 chromatides) s'alignent sur la plaque équatoriale dans chacune des 2 cellules.",
      chrom: 'n = 23', cells: '2 cellules haploïdes', t: 0.28
    },
    {
      name: 'Anaphase II',
      desc: "Dédoublement des centromères. Les chromatides migrent vers les pôles (comme en mitose).",
      chrom: 'n = 23 (chromatides)', cells: '2 cellules (en division)', t: 0.55
    },
    {
      name: 'Télophase II',
      desc: "Formation de 4 cellules haploïdes (gamètes) à n=23 chromosomes simples. Fin de la méiose.",
      chrom: 'n = 23', cells: '4 gamètes haploïdes', t: 0.78
    },
  ];

  if (vid2) {
    const sp2 = document.getElementById('mei-speed2');
    if (sp2) sp2.addEventListener('change', () => { vid2.playbackRate = parseFloat(sp2.value); });

    vid2.addEventListener('timeupdate', () => {
      if (vid2.duration) updateMeiPhase(vid2.currentTime / vid2.duration, phases2, 'mei2');
    });
    updateMeiPhase(0, phases2, 'mei2');
  }

  function updateMeiPhase(progress, phases, prefix) {
    let current = phases[0];
    for (const p of phases) { if (progress >= p.t) current = p; }

    const nameEl  = document.getElementById(prefix + '-phase-name');
    const descEl  = document.getElementById(prefix + '-phase-desc');
    const chromEl = document.getElementById(prefix + '-chrom');
    const cellEl  = document.getElementById(prefix + '-cells');
    if (nameEl)  nameEl.textContent  = current.name;
    if (descEl)  descEl.textContent  = current.desc;
    if (chromEl) chromEl.textContent = 'Chromosomes : ' + current.chrom;
    if (cellEl)  cellEl.textContent  = 'Cellules : ' + current.cells;

    const idx = phases.indexOf(current);
    document.querySelectorAll('.' + prefix + '-thumb').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
};

/* Compatibilité avec l'ancien nom d'appel */
window.initMeioseCanvas = window.initMeioseVideo;
