/* ============================================================
   SIM-MEIOSE.JS — Simulation Canvas de la Méiose
   Simplifié à 2n=4 (2 paires) pour la clarté pédagogique
   ============================================================ */

window.initMeioseCanvas = function () {
  const canvas = document.getElementById('canvas-meiose');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Couleurs par paire (paire 1 = bleu/rouge, paire 2 = vert/orange)
  const PAIR_COLORS = [
    { a: '#3B82F6', b: '#EF4444' }, // Paire 1 : maternel=bleu, paternel=rouge
    { a: '#10B981', b: '#F59E0B' }  // Paire 2 : maternel=vert, paternel=jaune
  ];

  const phases = [
    {
      name: 'Interphase (avant méiose)',
      nbChr: '2n = 46',
      div: '—',
      desc: "La cellule se prépare à la méiose. L'ADN se duplique : les chromosomes passent à 2 chromatides. La cellule reste diploïde.",
      draw: drawInterphase
    },
    {
      name: 'Prophase I — 1ère division réductionnelle',
      nbChr: '2n = 46',
      div: 'Division I',
      desc: "Les chromosomes homologues s'apparient (synapse). Chaque bivalent forme une tétrade de 4 chromatides. La membrane nucléaire disparaît.",
      draw: drawProphaseI
    },
    {
      name: 'Métaphase I — Bivalents sur la plaque',
      nbChr: '2n = 46 (bivalents)',
      div: 'Division I',
      desc: "Les bivalents (tétrades) s'alignent sur la plaque équatoriale. Les homologues sont encore associés.",
      draw: drawMetaphaseI
    },
    {
      name: 'Anaphase I — Séparation des homologues',
      nbChr: 'n = 23 (migration)',
      div: 'Division I',
      desc: "Les chromosomes HOMOLOGUES se séparent et migrent vers les pôles opposés. Chaque chromosome garde ses 2 chromatides.",
      draw: drawAnaphaseI
    },
    {
      name: 'Télophase I — 2 cellules haploïdes',
      nbChr: 'n = 23',
      div: 'Fin Division I',
      desc: "La cellule se divise. On obtient 2 cellules filles haploïdes (n = 23), chacune avec des chromosomes à 2 chromatides.",
      draw: drawTelophaseI
    },
    {
      name: 'Métaphase II — 2ème division équationnelle',
      nbChr: 'n = 23',
      div: 'Division II',
      desc: "Les chromosomes individuels (à 2 chromatides) s'alignent sur la plaque dans chaque cellule, comme en mitose.",
      draw: drawMetaphaseII
    },
    {
      name: 'Anaphase II — Séparation des chromatides',
      nbChr: 'n = 23',
      div: 'Division II',
      desc: "Les chromatides sœurs se séparent dans chaque cellule (comme en anaphase de mitose).",
      draw: drawAnaphaseII
    },
    {
      name: 'Télophase II — 4 gamètes haploïdes',
      nbChr: 'n = 23',
      div: 'Fin Division II',
      desc: "Résultat final : 4 cellules haploïdes (gamètes). Chaque gamète possède n chromosomes à 1 chromatide.",
      draw: drawTelophaseII
    }
  ];

  let currentPhase = 0;
  let playing = false;
  let timer = null;
  let speed = 1800;

  // ── UTILITAIRES ───────────────────────────────────────────────

  function clear() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);
  }

  function drawCell(x, y, rx, ry, fill = '#1e2a3a', border = '#4f5d94', lw = 2.5) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = border;
    ctx.lineWidth = lw;
    ctx.stroke();
    ctx.restore();
  }

  function drawNucleus(x, y, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#2d1b6e';
    ctx.fill();
    ctx.strokeStyle = '#6d5ace';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawChromatide(x, y, color, size, rotation, twoArms) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.lineWidth = size / 2.8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    if (twoArms) {
      // Chromosome à 2 chromatides (X)
      const s = size;
      ctx.beginPath(); ctx.moveTo(-s * 0.35, -s); ctx.lineTo(0, 0); ctx.lineTo(s * 0.35, -s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s * 0.35, s); ctx.lineTo(0, 0); ctx.lineTo(s * 0.35, s); ctx.stroke();
    } else {
      // 1 chromatide
      ctx.beginPath(); ctx.moveTo(0, -size * 0.85); ctx.lineTo(0, size * 0.85); ctx.stroke();
    }
    // centromère
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBivalent(x, y, colorA, colorB, size = 13) {
    // Deux chromosomes à 2 chromatides côte à côte (tétrade)
    drawChromatide(x - size * 0.6, y, colorA, size, 0, true);
    drawChromatide(x + size * 0.6, y, colorB, size, 0, true);
  }

  function drawLabel(text, x, y, color = '#94a3b8', size = 12) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawEquator(x, y, w) {
    ctx.save();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(x - w, y); ctx.lineTo(x + w, y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawArrow(x1, y1, x2, y2, color = '#fbbf24') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    // arrowhead
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // ── PHASES ────────────────────────────────────────────────────

  function drawInterphase() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 150, 130);
    drawNucleus(cx, cy, 68);
    // Chromatine diffuse
    ctx.save();
    ctx.globalAlpha = 0.55;
    [[PAIR_COLORS[0].a, PAIR_COLORS[0].b], [PAIR_COLORS[1].a, PAIR_COLORS[1].b]].flat().forEach((c, i) => {
      ctx.fillStyle = c;
      const a = (i / 4) * Math.PI * 2 + 0.3;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * 30, cy + Math.sin(a) * 30, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    drawLabel('INTERPHASE', cx, 25, '#94a3b8', 13);
    drawLabel('2n = 46 chromosomes', cx, H - 20, '#6ee7b7', 12);
    drawLabel('ADN en duplication ➜ 2 chromatides / chromosome', cx, cy + 100, '#fbbf24', 11);
  }

  function drawProphaseI() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 150, 130);
    // Bivalents en cours de formation
    [PAIR_COLORS[0], PAIR_COLORS[1]].forEach((pair, i) => {
      const offset = (i === 0 ? -1 : 1) * 35;
      drawBivalent(cx + offset, cy, pair.a, pair.b, 14);
    });
    drawLabel('PROPHASE I', cx, 25, '#94a3b8', 13);
    drawLabel('Appariement des homologues (synapse)', cx, cy - 100, '#c4b5fd', 12);
    drawLabel('Tétrades formées (4 chromatides/paire)', cx, H - 20, '#f9a8d4', 12);
  }

  function drawMetaphaseI() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 150, 130);
    drawEquator(cx, cy, 120);
    // Bivalents sur la plaque
    [PAIR_COLORS[0], PAIR_COLORS[1]].forEach((pair, i) => {
      const offset = (i === 0 ? -1 : 1) * 38;
      drawBivalent(cx + offset, cy, pair.a, pair.b, 14);
    });
    drawLabel('MÉTAPHASE I', cx, 25, '#94a3b8', 13);
    drawLabel('Bivalents (tétrades) sur la plaque', cx, cy + 20, '#fbbf24', 11);
    drawLabel('4 chromatides par tétrade', cx, H - 20, '#f9a8d4', 12);
  }

  function drawAnaphaseI() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 145, 145);
    // Homologues migrant : chromatides à 2 vers les pôles
    // Pôle haut : chr. maternels (a), Pôle bas : chr. paternels (b)
    [0, 1].forEach(i => {
      const offX = (i === 0 ? -28 : 28);
      drawChromatide(cx + offX, cy - 65, PAIR_COLORS[i].a, 12, 0, true);
      drawChromatide(cx + offX, cy + 65, PAIR_COLORS[i].b, 12, 0, true);
    });
    drawArrow(cx, cy - 20, cx, cy - 100);
    drawArrow(cx, cy + 20, cx, cy + 100);
    drawLabel('ANAPHASE I', cx, 25, '#94a3b8', 13);
    drawLabel('Homologues → pôles opposés', cx, H - 20, '#fbbf24', 12);
    drawLabel('Chaque chr. garde ses 2 chromatides', cx, H - 7, '#94a3b8', 10);
  }

  function drawTelophaseI() {
    clear();
    const gap = 90;
    const cy = H / 2;
    // Cellule 1 (gauche) - chr. maternels
    drawCell(W / 2 - gap, cy, 80, 72, '#152238', '#3b82f6', 2);
    [0, 1].forEach(i => {
      drawChromatide(W / 2 - gap + (i === 0 ? -18 : 18), cy, PAIR_COLORS[i].a, 12, 0, true);
    });
    // Cellule 2 (droite) - chr. paternels
    drawCell(W / 2 + gap, cy, 80, 72, '#1a1a38', '#ef4444', 2);
    [0, 1].forEach(i => {
      drawChromatide(W / 2 + gap + (i === 0 ? -18 : 18), cy, PAIR_COLORS[i].b, 12, 0, true);
    });
    // Ligne de division
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(W / 2, cy - 60); ctx.lineTo(W / 2, cy + 60); ctx.stroke();
    ctx.restore();
    drawLabel('TÉLOPHASE I', W / 2, 25, '#94a3b8', 13);
    drawLabel('n = 23 ✓', W / 2 - gap, cy - 82, '#34d399', 11);
    drawLabel('n = 23 ✓', W / 2 + gap, cy - 82, '#34d399', 11);
    drawLabel('2 cellules haploïdes (chr. à 2 chromatides)', W / 2, H - 15, '#f9a8d4', 12);
  }

  function drawMetaphaseII() {
    clear();
    const gap = 90;
    const cy = H / 2;
    const cells = [{ cx: W / 2 - gap, colors: [PAIR_COLORS[0].a, PAIR_COLORS[1].a] },
                   { cx: W / 2 + gap, colors: [PAIR_COLORS[0].b, PAIR_COLORS[1].b] }];
    cells.forEach(cell => {
      drawCell(cell.cx, cy, 78, 70);
      drawEquator(cell.cx, cy, 60);
      cell.colors.forEach((c, i) => {
        drawChromatide(cell.cx + (i === 0 ? -18 : 18), cy, c, 12, 0, true);
      });
    });
    drawLabel('MÉTAPHASE II', W / 2, 25, '#94a3b8', 13);
    drawLabel('Chr. individuels sur la plaque (comme en mitose)', W / 2, H - 15, '#fbbf24', 12);
  }

  function drawAnaphaseII() {
    clear();
    const gap = 90;
    const cy = H / 2;
    const cells = [{ cx: W / 2 - gap, colors: [PAIR_COLORS[0].a, PAIR_COLORS[1].a] },
                   { cx: W / 2 + gap, colors: [PAIR_COLORS[0].b, PAIR_COLORS[1].b] }];
    cells.forEach(cell => {
      drawCell(cell.cx, cy, 75, 75);
      cell.colors.forEach((c, i) => {
        const offX = (i === 0 ? -15 : 15);
        drawChromatide(cell.cx + offX, cy - 38, c, 10, 0, false);
        drawChromatide(cell.cx + offX, cy + 38, c, 10, 0, false);
      });
      drawArrow(cell.cx, cy - 12, cell.cx, cy - 60, '#fbbf24');
      drawArrow(cell.cx, cy + 12, cell.cx, cy + 60, '#fbbf24');
    });
    drawLabel('ANAPHASE II', W / 2, 25, '#94a3b8', 13);
    drawLabel('Chromatides sœurs séparées → 1 chromatide/chr.', W / 2, H - 15, '#fbbf24', 12);
  }

  function drawTelophaseII() {
    clear();
    const positions = [
      { cx: W / 2 - 165, cy: H / 2 - 95 },
      { cx: W / 2 + 165, cy: H / 2 - 95 },
      { cx: W / 2 - 165, cy: H / 2 + 95 },
      { cx: W / 2 + 165, cy: H / 2 + 95 }
    ];
    const cellColors = [PAIR_COLORS[0].a, PAIR_COLORS[0].b, PAIR_COLORS[1].a, PAIR_COLORS[1].b];
    const borders = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

    positions.forEach((pos, ci) => {
      drawCell(pos.cx, pos.cy, 62, 58, '#12203a', borders[ci], 2.5);
      // 1 chr de chaque paire à 1 chromatide
      drawChromatide(pos.cx - 14, pos.cy, PAIR_COLORS[0][ci < 2 ? (ci === 0 ? 'a' : 'b') : (ci === 2 ? 'a' : 'b')], 10, 0, false);
      drawChromatide(pos.cx + 14, pos.cy, PAIR_COLORS[1][ci % 2 === 0 ? 'a' : 'b'], 10, 0, false);
      drawLabel('n = 23', pos.cx, pos.cy + 68, '#34d399', 11);
      drawLabel(`Gamète ${ci + 1}`, pos.cx, pos.cy + 80, '#94a3b8', 10);
    });

    // Étiquettes divisions
    drawLabel('TÉLOPHASE II — Résultat final', W / 2, 22, '#94a3b8', 13);
    drawLabel('4 gamètes haploïdes (n = 23, 1 chromatide/chr.)', W / 2, H - 15, '#34d399', 12);

    // Lignes séparatrices stylisées
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.globalAlpha = 0.3;
    ctx.beginPath(); ctx.moveTo(W / 2, 50); ctx.lineTo(W / 2, H - 35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(100, H / 2); ctx.lineTo(W - 100, H / 2); ctx.stroke();
    ctx.restore();
  }

  // ── CONTRÔLE ──────────────────────────────────────────────────

  function render() {
    phases[currentPhase].draw();
  }

  function updateDisplay() {
    const p = phases[currentPhase];
    const nameEl = document.getElementById('mei-phase-name');
    const descEl = document.getElementById('mei-phase-desc');
    const chrEl = document.getElementById('mei-counter-chr');
    const divEl = document.getElementById('mei-counter-div');
    if (nameEl) nameEl.textContent = p.name;
    if (descEl) descEl.textContent = p.desc;
    if (chrEl) chrEl.textContent = 'Chromosomes : ' + p.nbChr;
    if (divEl) divEl.textContent = 'Division : ' + p.div;
  }

  function goToPhase(n) {
    currentPhase = Math.max(0, Math.min(phases.length - 1, n));
    render();
    updateDisplay();
  }

  function startPlay() {
    if (playing) return;
    playing = true;
    timer = setInterval(() => {
      if (currentPhase < phases.length - 1) goToPhase(currentPhase + 1);
      else stopPlay();
    }, speed);
  }

  function stopPlay() {
    playing = false;
    clearInterval(timer);
    timer = null;
  }

  function bindControls() {
    const play  = document.getElementById('btn-mei-play');
    const pause = document.getElementById('btn-mei-pause');
    const prev  = document.getElementById('btn-mei-prev');
    const next  = document.getElementById('btn-mei-next');
    const sel   = document.getElementById('sel-mei-speed');
    if (play)  play.onclick  = () => startPlay();
    if (pause) pause.onclick = () => stopPlay();
    if (prev)  prev.onclick  = () => { stopPlay(); goToPhase(currentPhase - 1); };
    if (next)  next.onclick  = () => { stopPlay(); goToPhase(currentPhase + 1); };
    if (sel)   sel.onchange  = (e) => { speed = parseInt(e.target.value); if (playing) { stopPlay(); startPlay(); } };
  }

  render();
  updateDisplay();
  bindControls();
};
