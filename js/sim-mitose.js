/* ============================================================
   SIM-MITOSE.JS — Simulation Canvas de la Mitose
   2n = 4 (simplifié pour la clarté visuelle)
   ============================================================ */

window.initMitoseCanvas = function () {
  const canvas = document.getElementById('canvas-mitose');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // ── PHASES ──────────────────────────────────────────────────
  const phases = [
    {
      name: 'Interphase',
      nbChr: '2n = 46',
      nbChrd: '2 (après duplication)',
      desc: "La cellule se prépare à la division. L'ADN se duplique : chaque chromosome passe de 1 à 2 chromatides sœurs.",
      draw: drawInterphase
    },
    {
      name: 'Prophase',
      nbChr: '2n = 46',
      nbChrd: '2',
      desc: 'Les chromosomes se condensent et deviennent visibles. Le fuseau achromatique se forme. La membrane nucléaire disparaît.',
      draw: drawProphase
    },
    {
      name: 'Métaphase',
      nbChr: '2n = 46',
      nbChrd: '2',
      desc: "Les chromosomes s'alignent sur la plaque équatoriale (plan médian de la cellule). Chaque chromosome est attaché au fuseau par son centromère.",
      draw: drawMetaphase
    },
    {
      name: 'Anaphase',
      nbChr: '2n = 46 (séparation)',
      nbChrd: '1',
      desc: "Les centromères se doublent. Les chromatides sœurs se séparent et migrent vers les pôles opposés.",
      draw: drawAnaphase
    },
    {
      name: 'Télophase',
      nbChr: '2n = 46',
      nbChrd: '1',
      desc: "Les chromosomes se décondensent. La membrane nucléaire se reforme. La cytokinèse divise la cellule en 2 cellules filles identiques.",
      draw: drawTelophase
    }
  ];

  let currentPhase = 0;
  let playing = false;
  let timer = null;
  let speed = 1800;
  let animFrame = null;
  let anim = 0; // animation progress 0-1

  // ── COULEURS CHROMOSOMES ─────────────────────────────────────
  const CHR_COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  // ── DESSINS ──────────────────────────────────────────────────

  function clear() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);
  }

  function drawCell(x, y, rx, ry, color = '#2d3561', borderColor = '#4f5d94') {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  function drawNucleus(x, y, r, color = '#3d2b6b', borderColor = '#7c5cbf') {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function drawChromosome(x, y, color, size = 12, rotation = 0, chromatides = 2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.lineWidth = size / 3;
    ctx.lineCap = 'round';

    if (chromatides === 2) {
      // Chromosome à 2 chromatides (forme de X)
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, -size); ctx.lineTo(0, 0); ctx.lineTo(size * 0.4, -size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, size); ctx.lineTo(0, 0); ctx.lineTo(size * 0.4, size);
      ctx.stroke();
      // centromère
      ctx.fillStyle = lighten(color, 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Chromosome à 1 chromatide (bâtonnet)
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.9);
      ctx.lineTo(0, size * 0.9);
      ctx.stroke();
      // centromère
      ctx.fillStyle = lighten(color, 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function lighten(hex, factor) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.round(r + (255 - r) * factor)},${Math.round(g + (255 - g) * factor)},${Math.round(b + (255 - b) * factor)})`;
  }

  function drawSpindle(x, y, rx, ry, topColor = '#7c5cbf') {
    // fuseau achromatique
    ctx.save();
    ctx.strokeStyle = topColor;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.globalAlpha = 0.5;
    const poles = [[x, y - ry * 0.85], [x, y + ry * 0.85]];
    const equator = [x - rx * 0.6, x, x + rx * 0.6];
    for (const px of equator) {
      ctx.beginPath();
      ctx.moveTo(poles[0][0], poles[0][1]);
      ctx.lineTo(px, y);
      ctx.lineTo(poles[1][0], poles[1][1]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawAster(x, y, r) {
    ctx.save();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawLabel(text, x, y, color = '#e2e8f0', size = 13) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawEquatorLine(x, y, w) {
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(x - w, y);
    ctx.lineTo(x + w, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // ── DESSINS PAR PHASE ─────────────────────────────────────────

  function drawInterphase() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 160, 140);
    // Noyau avec chromatine diffuse
    drawNucleus(cx, cy, 75);
    // Points de chromatine
    ctx.save();
    ctx.fillStyle = '#9f7aea';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 55;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    // Flèche duplication
    ctx.save();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ADN en duplication...', cx, cy + 110);
    ctx.restore();
    drawLabel('INTERPHASE', cx, cy - 165, '#94a3b8', 14);
  }

  function drawProphase() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 160, 140);
    // Chromosomes condensés mais encore dans le noyau fantôme
    ctx.save();
    ctx.strokeStyle = '#7c5cbf';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(cx, cy, 72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    // Asters
    drawAster(cx - 130, cy, 22);
    drawAster(cx + 130, cy, 22);
    // Chromosomes (4 chromosomes à 2 chromatides)
    const chrPositions = [
      { x: cx - 35, y: cy - 25 }, { x: cx + 35, y: cy - 25 },
      { x: cx - 35, y: cy + 25 }, { x: cx + 35, y: cy + 25 }
    ];
    chrPositions.forEach((pos, i) => {
      drawChromosome(pos.x, pos.y, CHR_COLORS[i], 14, Math.random() * 0.5 - 0.25, 2);
    });
    drawLabel('PROPHASE', cx, cy - 165, '#94a3b8', 14);
    drawLabel('Aster', cx - 130, cy - 28, '#c4b5fd', 11);
    drawLabel('Aster', cx + 130, cy - 28, '#c4b5fd', 11);
  }

  function drawMetaphase() {
    clear();
    const cx = W / 2, cy = H / 2;
    drawCell(cx, cy, 160, 140);
    drawSpindle(cx, cy, 160, 140);
    drawEquatorLine(cx, cy, 110);
    // Asters
    drawAster(cx, cy - 130, 22);
    drawAster(cx, cy + 130, 22);
    // 4 chromosomes alignés sur la plaque
    const positions = [
      { x: cx - 50, y: cy }, { x: cx - 17, y: cy },
      { x: cx + 17, y: cy }, { x: cx + 50, y: cy }
    ];
    positions.forEach((pos, i) => {
      drawChromosome(pos.x, pos.y, CHR_COLORS[i], 14, 0, 2);
    });
    drawLabel('Plaque équatoriale', cx, cy + 20, '#fbbf24', 11);
    drawLabel('MÉTAPHASE', cx, cy - 165, '#94a3b8', 14);
  }

  function drawAnaphase() {
    clear();
    const cx = W / 2, cy = H / 2;
    // Cellule s'allonge légèrement
    drawCell(cx, cy, 155, 155);
    drawSpindle(cx, cy, 155, 155, '#a78bfa');
    // Chromosomes à 1 chromatide migrant aux 2 pôles
    const topPositions = [
      { x: cx - 50, y: cy - 65 }, { x: cx - 17, y: cy - 65 },
      { x: cx + 17, y: cy - 65 }, { x: cx + 50, y: cy - 65 }
    ];
    const botPositions = [
      { x: cx - 50, y: cy + 65 }, { x: cx - 17, y: cy + 65 },
      { x: cx + 17, y: cy + 65 }, { x: cx + 50, y: cy + 65 }
    ];
    topPositions.forEach((pos, i) => drawChromosome(pos.x, pos.y, CHR_COLORS[i], 11, 0, 1));
    botPositions.forEach((pos, i) => drawChromosome(pos.x, pos.y, CHR_COLORS[i], 11, 0, 1));
    // Flèches
    ctx.save();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy - 90);
    ctx.moveTo(cx, cy + 20); ctx.lineTo(cx, cy + 90);
    ctx.stroke();
    ctx.restore();
    drawLabel('ANAPHASE', cx, cy - 165, '#94a3b8', 14);
    drawLabel('Pôle ↑', cx, cy - 148, '#c4b5fd', 11);
    drawLabel('Pôle ↓', cx, cy + 148, '#c4b5fd', 11);
  }

  function drawTelophase() {
    clear();
    const cy = H / 2;
    const gap = 90;
    // Deux cellules filles
    const cells = [{ cx: W / 2 - gap, cy }, { cx: W / 2 + gap, cy }];
    cells.forEach((cell, ci) => {
      drawCell(cell.cx, cell.cy, 80, 75, '#1e2a3a', '#4f5d94');
      drawNucleus(cell.cx, cell.cy, 38);
      // Chromatine diffuse dans chaque noyau
      ctx.save();
      ctx.fillStyle = '#9f7aea';
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 28;
        ctx.beginPath();
        ctx.arc(cell.cx + Math.cos(a) * r, cell.cy + Math.sin(a) * r, 2 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      drawLabel(ci === 0 ? 'Cellule fille 1' : 'Cellule fille 2', cell.cx, cell.cy + 90, '#94a3b8', 11);
    });
    // Ligne de division
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(W / 2, cy - 60);
    ctx.lineTo(W / 2, cy + 60);
    ctx.stroke();
    ctx.restore();
    drawLabel('TÉLOPHASE — Cytokinèse', W / 2, 30, '#94a3b8', 14);
    drawLabel('2n = 46 ✓', cells[0].cx, cells[0].cy - 88, '#34d399', 11);
    drawLabel('2n = 46 ✓', cells[1].cx, cells[1].cy - 88, '#34d399', 11);
  }

  // ── RENDU ────────────────────────────────────────────────────

  function render() {
    phases[currentPhase].draw();
  }

  function updateDisplay() {
    const p = phases[currentPhase];
    const nameEl = document.getElementById('mit-phase-name');
    const descEl = document.getElementById('mit-phase-desc');
    const chrEl = document.getElementById('mit-counter-chr');
    const chrdEl = document.getElementById('mit-counter-chrd');
    if (nameEl) nameEl.textContent = p.name;
    if (descEl) descEl.textContent = p.desc;
    if (chrEl) chrEl.textContent = 'Chromosomes : ' + p.nbChr;
    if (chrdEl) chrdEl.textContent = 'Chromatides/chr. : ' + p.nbChrd;
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
      if (currentPhase < phases.length - 1) {
        goToPhase(currentPhase + 1);
      } else {
        stopPlay();
      }
    }, speed);
  }

  function stopPlay() {
    playing = false;
    clearInterval(timer);
    timer = null;
  }

  // ── CONTRÔLES ────────────────────────────────────────────────
  function bindControls() {
    const play = document.getElementById('btn-mit-play');
    const pause = document.getElementById('btn-mit-pause');
    const prev = document.getElementById('btn-mit-prev');
    const next = document.getElementById('btn-mit-next');
    const sel = document.getElementById('sel-mit-speed');
    if (play) play.onclick = () => startPlay();
    if (pause) pause.onclick = () => stopPlay();
    if (prev) prev.onclick = () => { stopPlay(); goToPhase(currentPhase - 1); };
    if (next) next.onclick = () => { stopPlay(); goToPhase(currentPhase + 1); };
    if (sel) sel.onchange = (e) => { speed = parseInt(e.target.value); if (playing) { stopPlay(); startPlay(); } };
  }

  // ── INIT ─────────────────────────────────────────────────────
  render();
  updateDisplay();
  bindControls();
};
