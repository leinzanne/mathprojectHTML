(() => {

  // ─────────────────────────────────────────────────────────────
  // 1. CSS
  // ─────────────────────────────────────────────────────────────
  const css = `
    .insp-shell {
      display: flex; flex-direction: column;
      width: 100%; height: 100%;
      font-family: 'Segoe UI', system-ui, sans-serif;
      user-select: none; overflow: hidden; background: #1a1a1a;
    }

    /* TOP BAR */
    .insp-topbar {
      display: flex; align-items: center; gap: 8px;
      padding: 0 12px; height: 28px;
      background: #111; border-bottom: 1px solid #0a0a0a; flex-shrink: 0;
    }
    .insp-topbar-dots { display: flex; align-items: center; gap: 6px; }
    .insp-topbar-dot  { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .insp-topbar-dot.red    { background: #ff5f57; }
    .insp-topbar-dot.yellow { background: #ffbd2e; }
    .insp-topbar-dot.green  { background: #28c840; }
    .insp-topbar-icon { width: 14px; height: 14px; margin-left: 8px; flex-shrink: 0; }
    .insp-topbar-title { font-size: 12px; color: #a0a0a0; letter-spacing: 0.01em; }

    /* BODY ROW */
    .insp-body-row { display: flex; flex: 1; min-height: 0; overflow: hidden; }

    /* CANVAS AREA */
    .insp-canvas-area {
      flex: 1; display: flex; align-items: center; justify-content: center;
      padding: 16px; min-width: 0; background: #1a1a1a; overflow: hidden;
    }
    .insp-viewport-outer {
      position: relative; overflow: hidden;
      width: 100%; max-width: 560px; aspect-ratio: 16 / 9;
      flex-shrink: 0; background: #000;
    }
    .insp-viewport-outer canvas {
      display: block; position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; cursor: crosshair;
    }

    /* INSPECTOR PANEL */
    .insp-panel {
      width: 380px; min-width: 320px; background: #2b2b2b;
      border-left: 1px solid #1a1a1a;
      display: flex; flex-direction: column; overflow: hidden; height: 100%;
    }
    .insp-panel-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px; border-bottom: 1px solid #1e1e1e; flex-shrink: 0;
    }
    .insp-panel-title { font-size: 13px; font-weight: 500; color: #c8c8c8; letter-spacing: 0.02em; }
    .insp-dots { display: flex; gap: 3px; padding: 2px 4px; border-radius: 3px; }
    .insp-dots span { width: 4px; height: 4px; border-radius: 50%; background: #888; display: block; }

    /* SCROLL */
    .insp-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; }
    .insp-scroll::-webkit-scrollbar { width: 6px; }
    .insp-scroll::-webkit-scrollbar-track { background: transparent; }
    .insp-scroll::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }

    /* SECTION */
    .insp-section { border-bottom: 1px solid #1e1e1e; }
    .insp-section-header {
      display: flex; align-items: center;
      padding: 9px 14px 9px 10px; cursor: pointer; gap: 8px;
    }
    .insp-section-header:hover { background: #303030; }
    
    /* TOGGLE SWITCHES */
    .insp-toggle {
      width: 26px; height: 14px; background: #c0392b;
      border-radius: 7px; position: relative; flex-shrink: 0; cursor: pointer;
      transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .insp-toggle::after {
      content: ''; position: absolute;
      width: 10px; height: 10px; background: #fff;
      border-radius: 50%; top: 2px; left: 14px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.4);
      transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s;
    }
    .insp-toggle.off { background: #444; }
    .insp-toggle.off::after { left: 2px; background: #999; box-shadow: none; }

    .insp-section-name { font-size: 13px; color: #d8d8d8; font-weight: 400; flex: 1; text-align: left; }
    .insp-section-name.open { color: #e07060; font-weight: 500; }
    .insp-divider { width: 1px; height: 18px; background: #444; flex-shrink: 0; }
    .insp-reset-btn {
      color: #666; cursor: pointer; padding: 2px 4px; border-radius: 3px;
      display: flex; align-items: center; margin-left: 6px; flex-shrink: 0;
    }
    .insp-reset-btn:hover { color: #aaa; }
    .insp-reset-btn svg { width: 14px; height: 14px; fill: currentColor; }

    .insp-section-content { overflow: hidden; max-height: 0; transition: max-height 0.25s cubic-bezier(0.4,0,0.2,1); }
    .insp-section-content.open { max-height: 700px; }
    .insp-section-inner { padding: 8px 14px 12px 14px; display: flex; flex-direction: column; gap: 8px; }

    /* ROWS */
    .insp-row { display: flex; align-items: center; gap: 8px; min-height: 22px; }
    .insp-label { font-size: 12px; color: #999; width: 90px; flex-shrink: 0; text-align: right; }

    /* SLIDER + reset dot */
    .insp-slider-wrap { flex: 1; height: 14px; display: flex; align-items: center; position: relative; }
    .insp-slider-wrap input[type=range] {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 3px; background: #444; border-radius: 2px; outline: none; cursor: pointer;
    }
    .insp-slider-wrap input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 10px; height: 10px;
      border-radius: 50%; background: #ccc; cursor: pointer; border: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
      position: relative; z-index: 3;
    }
    .insp-slider-wrap.scale-track input[type=range] { background: #555; }

    .insp-slider-dot {
      position: absolute; width: 6px; height: 6px;
      border-radius: 50%; background: #ff5f57;
      top: 50%; transform: translateY(-50%);
      cursor: pointer; display: none; z-index: 2;
      box-shadow: 0 0 0 1px #1a1a1a;
      pointer-events: auto;
    }
    .insp-slider-dot.visible { display: block; }

    /* NUMBER INPUT */
    .insp-num {
      background: #1e1e1e; border: 1px solid #3a3a3a; border-radius: 3px;
      color: #d0d0d0; font-size: 12px; text-align: center;
      padding: 2px 4px; outline: none; font-family: inherit;
      flex-shrink: 0; width: 52px; cursor: ew-resize;
    }
    .insp-num.wide { width: 70px; }
    .insp-num:focus { border-color: #5a8fc4; cursor: text; }
    
    .insp-num::-webkit-inner-spin-button, .insp-num::-webkit-outer-spin-button,
    .insp-picker-field-input::-webkit-inner-spin-button, .insp-picker-field-input::-webkit-outer-spin-button {
      -webkit-appearance: none; margin: 0;
    }

    /* CHECKBOX */
    .insp-checkbox-row { display: flex; align-items: center; gap: 6px; padding-left: 98px; }
    .insp-checkbox-row input[type=checkbox] { width: 13px; height: 13px; accent-color: #5a8fc4; cursor: pointer; }
    .insp-checkbox-row label { font-size: 12px; color: #999; cursor: pointer; }

    /* COLOR SWATCH */
    .insp-color-swatch-img {
      width: 90px; height: 65px;
      border-radius: 3px; border: 1px solid #555;
      flex-shrink: 0; cursor: pointer; display: block;
      object-fit: cover;
    }
    .insp-trash-btn {
      background: none; border: none; color: #777; cursor: pointer;
      display: flex; align-items: center; padding: 2px; border-radius: 3px;
      flex-shrink: 0;
    }
    .insp-trash-btn:hover { color: #e07060; }
    .insp-trash-btn svg { width: 14px; height: 14px; fill: currentColor; }
    .insp-file-input { display: none; }
    /* COLOR SWATCH */
    .insp-color-swatch {
      width: 70px; height: 20px; border-radius: 3px;
      border: 1px solid #555; background: #fff; flex-shrink: 0; cursor: pointer;
    }
    .insp-color-arrow { font-size: 10px; color: #666; }
    .insp-eyedropper { background: none; border: none; color: #777; cursor: pointer; display: flex; align-items: center; padding: 2px; border-radius: 3px; }
    .insp-eyedropper:hover { color: #bbb; }
    .insp-eyedropper svg { width: 14px; height: 14px; fill: currentColor; }
    
    /* EYEDROPPER TOOLTIP */
    body.insp-picking-color * { cursor: crosshair !important; }
    .insp-pipette-tooltip {
      position: fixed; z-index: 999999; pointer-events: none;
      display: flex; align-items: center; gap: 8px;
      background: #2b2b2b; border: 1px solid #1a1a1a; border-radius: 4px;
      padding: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    .insp-pipette-preview {
      width: 28px; height: 28px; border: 1px solid #111;
    }
    .insp-pipette-text {
      display: flex; flex-direction: column; gap: 2px;
      color: #d8d8d8; font-size: 11px; font-family: 'Segoe UI', sans-serif;
    }

    /* XY */
    .insp-xy { display: flex; align-items: center; gap: 4px; flex: 1; }
    .insp-xy-label { font-size: 12px; color: #666; }

    /* FLIP BUTTONS */
    .insp-flip-btn {
      background: #3a3a3a; border: 1px solid #4a4a4a; border-radius: 4px;
      color: #bbb; width: 28px; height: 22px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 13px;
    }
    .insp-flip-btn:hover { background: #484848; }
    .insp-flip-btn.active { background: #4a3a2a; border-color: #e07060; color: #e07060; }

    /* ROW RESET */
    .insp-row-reset { color: #555; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; border-radius: 3px; padding: 2px; }
    .insp-row-reset:hover { color: #999; }
    .insp-row-reset svg { width: 12px; height: 12px; fill: currentColor; }

    /* COLOR PICKER POPUP */
    .insp-picker-overlay { position: fixed; inset: 0; z-index: 999; }
    .insp-picker {
      position: fixed; z-index: 1000;
      width: 280px; background: #2e2e2e;
      border: 1px solid #1a1a1a; border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      padding: 10px; display: flex; flex-direction: column; gap: 8px;
    }
    .insp-picker-sv {
      width: 100%; aspect-ratio: 1.4;
      position: relative; border-radius: 3px; cursor: crosshair; flex-shrink: 0;
    }
    .insp-picker-sv canvas { display: block; width: 100%; height: 100%; border-radius: 3px; }
    .insp-picker-sv-thumb {
      position: absolute; width: 10px; height: 10px;
      border-radius: 50%; border: 2px solid #fff;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
      transform: translate(-50%, -50%); pointer-events: none;
    }
    .insp-picker-hue {
      width: 100%; height: 12px; border-radius: 6px; cursor: pointer;
      background: linear-gradient(to right,
        hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%),
        hsl(90,100%,50%), hsl(120,100%,50%), hsl(150,100%,50%),
        hsl(180,100%,50%), hsl(210,100%,50%), hsl(240,100%,50%),
        hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%), hsl(360,100%,50%)
      );
      position: relative;
    }
    .insp-picker-hue-thumb {
      position: absolute; top: 50%; width: 14px; height: 14px;
      border-radius: 50%; border: 2px solid #fff;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
      transform: translate(-50%, -50%); pointer-events: none;
    }
    .insp-picker-fields {
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px 8px; align-items: center;
    }
    .insp-picker-field-row { display: flex; align-items: center; gap: 4px; }
    .insp-picker-field-label { font-size: 11px; color: #999; width: 26px; text-align: right; flex-shrink: 0; }
    .insp-picker-field-input {
      flex: 1; min-width: 0; max-width: 52px; background: #1e1e1e; border: 1px solid #3a3a3a; border-radius: 3px;
      color: #d0d0d0; font-size: 11px; text-align: right;
      padding: 3px 5px; outline: none; font-family: inherit;
    }
    .insp-picker-field-input:focus { border-color: #5a8fc4; }
    
    .insp-picker-preview-row { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
    .insp-picker-preview { width: 40px; height: 22px; border-radius: 3px; border: 1px solid #555; flex-shrink: 0; }
    .insp-picker-html-row { display: flex; align-items: center; gap: 6px; flex: 1; }
    .insp-picker-html-label { font-size: 11px; color: #999; flex-shrink: 0; width: 34px; text-align: right; }
    .insp-picker-html-input {
      flex: 1; min-width: 0; background: #1e1e1e; border: 1px solid #3a3a3a; border-radius: 3px;
      color: #d0d0d0; font-size: 11px; padding: 3px 6px; outline: none; font-family: monospace;
    }
    .insp-picker-html-input:focus { border-color: #5a8fc4; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─────────────────────────────────────────────────────────────
  // 2. SHARED STATE
  // ─────────────────────────────────────────────────────────────
  const STATE = {
    // NGon Switch Status
    ngonEnabled: true,
    sides: 6,
    solid: true,
    borderWidth: 0.0,
    color: { r: 1, g: 1, b: 1, a: 1 },

    // Transform Switch Status
    transformEnabled: true,
    scale: 1,
    posX: 0, posY: 0,
    rotation: 0,
    pivX: 0, pivY: 0, 
    flipH: 1, flipV: 1,

    transformOpen: false,
    importedImage: null
  };

  let updaters = [];
  function addUpdater(fn) { updaters.push(fn); }
  function syncUI() { updaters.forEach(fn => fn()); }

  let _canvas = null, _outer = null;

  function redraw() {
    if (!_canvas || !_outer) return;
    const ctx = _canvas.getContext('2d');
    const w = _canvas.width, h = _canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // ── APPLY BYPASS RULES (If switch is toggled off, use default parameters) ──
    const drawSides  = STATE.ngonEnabled ? STATE.sides : 6;
    const drawSolid  = STATE.ngonEnabled ? STATE.solid : true;
    const drawBorder = STATE.ngonEnabled ? STATE.borderWidth : 0;
    const drawColor  = STATE.ngonEnabled ? STATE.color : { r: 1, g: 1, b: 1, a: 1 };

    const drawScale = STATE.transformEnabled ? STATE.scale : 1;
    const drawPosX  = STATE.transformEnabled ? STATE.posX  : 0;
    const drawPosY  = STATE.transformEnabled ? STATE.posY  : 0;
    const drawRot   = STATE.transformEnabled ? STATE.rotation : 0;
    const drawPivX  = STATE.transformEnabled ? STATE.pivX  : 0;
    const drawPivY  = STATE.transformEnabled ? STATE.pivY  : 0;
    const drawFlipH = STATE.transformEnabled ? STATE.flipH : 1;
    const drawFlipV = STATE.transformEnabled ? STATE.flipV : 1;

    // ── CORE MATH ──
    const baseR = Math.min(w, h) * 0.35;
    const r = baseR * Math.abs(drawScale); 

    const px = drawPosX * (w / 2);
    const py = drawPosY * (h / 2);
    
    const cx = w / 2 + px;
    const cy = h / 2 - py;

    const ax = drawPivX * r;
    const ay = -drawPivY * r;

    // ── DRAW SHAPE ──
    ctx.save();
    ctx.translate(cx, cy); 
    ctx.translate(ax, ay); 
    ctx.rotate(drawRot * Math.PI / 180);
    ctx.scale(drawFlipH * (drawScale < 0 ? -1 : 1), drawFlipV);
    ctx.translate(-ax, -ay);

    const pathRadius = baseR * drawScale; 

    ctx.beginPath();
    for (let i = 0; i < drawSides; i++) {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / drawSides;
      i === 0
        ? ctx.moveTo(Math.cos(a) * pathRadius, Math.sin(a) * pathRadius)
        : ctx.lineTo(Math.cos(a) * pathRadius, Math.sin(a) * pathRadius);
    }
    ctx.closePath();

    const { r: cr, g: cg, b: cb, a: ca } = drawColor;
    const rgbaStr = `rgba(${Math.round(cr*255)},${Math.round(cg*255)},${Math.round(cb*255)},${ca})`;

    if (STATE.importedImage) {
      // Use the ngon path as a clipping mask, then draw the image inside
      ctx.save();
      ctx.clip();
      const img = STATE.importedImage;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const shapeSize = Math.abs(pathRadius) * 2;
      let dw, dh;
      if (iw / ih > 1) {
        // wider than tall → match height
        dh = shapeSize; dw = iw / ih * dh;
      } else {
        // taller than wide → match width
        dw = shapeSize; dh = ih / iw * dw;
      }
      ctx.globalAlpha = ca;
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
      // Border on top if not solid
      if (!drawSolid && drawBorder > 0) {
        ctx.beginPath();
        for (let i = 0; i < drawSides; i++) {
          const a = -Math.PI / 2 + (2 * Math.PI * i) / drawSides;
          i === 0 ? ctx.moveTo(Math.cos(a) * pathRadius, Math.sin(a) * pathRadius)
                  : ctx.lineTo(Math.cos(a) * pathRadius, Math.sin(a) * pathRadius);
        }
        ctx.closePath();
        ctx.strokeStyle = rgbaStr; ctx.lineWidth = drawBorder; ctx.stroke();
      }
    } else if (drawSolid) {
      ctx.fillStyle = rgbaStr;
      ctx.fill();
    } else {
      if (drawBorder > 0) {
        ctx.strokeStyle = rgbaStr;
        ctx.lineWidth = drawBorder;
        ctx.stroke();
      }
    }
    ctx.restore();

    // ── DRAW VISUAL GUIDES ──
    // Note: Visual guides always use the REAL state values, not bypassed. 
    // This allows the user to see where the properties are adjusting even while disabled!
    if (STATE.transformOpen) {
      const realPx = STATE.posX * (w / 2);
      const realPy = STATE.posY * (h / 2);
      const realCx = w / 2 + realPx;
      const realCy = h / 2 - realPy;
      
      const realR  = baseR * Math.abs(STATE.scale);
      const realAx = STATE.pivX * realR;
      const realAy = -STATE.pivY * realR;

      ctx.save();
      ctx.translate(realCx, realCy);
      
      ctx.fillStyle = '#ff1a1a';
      ctx.fillRect(-3, -3, 6, 6);
      ctx.strokeStyle = '#222'; ctx.lineWidth = 1;
      ctx.strokeRect(-3, -3, 6, 6);

      ctx.beginPath();
      ctx.moveTo(3, 0); ctx.lineTo(35, 0);
      ctx.moveTo(30, -4); ctx.lineTo(35, 0); ctx.lineTo(30, 4);
      ctx.moveTo(0, -3); ctx.lineTo(0, -35);
      ctx.moveTo(-4, -30); ctx.lineTo(0, -35); ctx.lineTo(4, -30);
      ctx.strokeStyle = '#ff1a1a'; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(realCx + realAx, realCy + realAy); 
      
      const visualR = baseR * 0.5;

      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.arc(0, 0, visualR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 200, 100, 0.7)';
      ctx.lineWidth = 2; ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(-8, -8); ctx.lineTo(8, 8);
      ctx.moveTo(8, -8); ctx.lineTo(-8, 8);
      ctx.strokeStyle = 'rgba(100, 200, 100, 0.9)';
      ctx.lineWidth = 2; ctx.stroke();

      ctx.rotate(STATE.rotation * Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(visualR, 0);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 3. UI HELPERS
  // ─────────────────────────────────────────────────────────────
  const RESET_SVG   = `<svg viewBox="0 0 16 16"><path d="M8 2a6 6 0 1 0 5.66 4H12.1A4.5 4.5 0 1 1 8 3.5V2z"/><path d="M7 0l3 3-3 3V0z"/></svg>`;
  const EYEDROP_SVG = `<svg viewBox="0 0 16 16"><path d="M13.7 2.3a1 1 0 0 0-1.4 0l-1.5 1.5-.8-.8-1 1 .8.8-5.5 5.5a1 1 0 0 0-.3.7v2h2a1 1 0 0 0 .7-.3l5.5-5.5.8.8 1-1-.8-.8 1.5-1.5a1 1 0 0 0 0-1.4zM5.5 12H5v-.5l5.3-5.3.5.5L5.5 12z"/></svg>`;
  const TRASH_SVG = `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M6 2h4a1 1 0 0 0-2 0H6a1 1 0 0 0-2 0H2v1h12V2h-2a1 1 0 0 0-2 0zM3 5l1 9h8l1-9H3zm2 1h1l.5 7H6L5 6zm4 0h1l-.5 7H8.5L9 6z"/></svg>`;

  function el(tag, cls, extra = {}) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    Object.assign(e, extra);
    return e;
  }

  function resetBtn(cls = 'insp-reset-btn') {
    const b = el('div', cls); b.innerHTML = RESET_SVG; return b;
  }

  function labelEl(text) {
    const s = el('span', 'insp-label'); s.textContent = text; return s;
  }

  function row(...children) {
    const r = el('div', 'insp-row'); children.forEach(c => r.appendChild(c)); return r;
  }

  function makeScrubInput(opts) {
    const inp = el('input', 'insp-num' + (opts.wide ? ' wide' : ''));
    inp.type = 'number';
    inp.value = opts.value().toFixed(opts.decimals ?? 0);

    let dragging = false, startX = 0, startVal = 0;

    inp.addEventListener('mousedown', e => {
      if (document.activeElement === inp) return;
      e.preventDefault();
      dragging = true;
      startVal = opts.value();
      startX = 0; // reset — we'll use movementX instead
      inp.style.cursor = 'ew-resize';
      inp.requestPointerLock();
    });

    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const speed = opts.dragSpeed ?? (opts.step || 1);
      startVal += e.movementX * speed;

      let newVal = startVal;
      if (opts.min !== undefined) newVal = Math.max(opts.min, newVal);
      if (opts.max !== undefined) newVal = Math.min(opts.max, newVal);

      startVal = newVal; // keep startVal in sync so it doesn't drift past limits
      inp.value = newVal.toFixed(opts.decimals ?? 0);
      opts.onChange && opts.onChange(newVal);
    });

    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      inp.style.cursor = '';
      document.exitPointerLock();
    });

    // Double-click → focus for typing; validate on blur/Enter
    let editingMode = false;
    inp.addEventListener('dblclick', e => {
      e.stopPropagation();
      editingMode = true;
      inp.readOnly = false;
      inp.style.cursor = 'text';
      inp.select();
    });

    function commitEdit() {
      if (!editingMode) return;
      editingMode = false;
      inp.style.cursor = '';
      let v = parseFloat(inp.value);
      if (isNaN(v)) {
        // revert to current state value
        inp.value = opts.value().toFixed(opts.decimals ?? 0);
        return;
      }
      if (opts.min !== undefined) v = Math.max(opts.min, v);
      if (opts.max !== undefined) v = Math.min(opts.max, v);
      inp.value = v.toFixed(opts.decimals ?? 0);
      opts.onChange && opts.onChange(v);
    }

    inp.addEventListener('blur', commitEdit);
    inp.addEventListener('keydown', e => {
      if (!editingMode) return;
      if (e.key === 'Enter') { inp.blur(); }
      if (e.key === 'Escape') { editingMode = false; inp.value = opts.value().toFixed(opts.decimals ?? 0); inp.blur(); }
    });

    inp.addEventListener('change', () => {
      if (editingMode) return; // handled by commitEdit
      let v = parseFloat(inp.value);
      if (isNaN(v)) v = opts.defaultVal ?? 0;
      if (opts.min !== undefined) v = Math.max(opts.min, v);
      if (opts.max !== undefined) v = Math.min(opts.max, v);
      inp.value = v.toFixed(opts.decimals ?? 0);
      opts.onChange && opts.onChange(v);
    });

    addUpdater(() => { 
      if (document.activeElement !== inp && !dragging) {
        inp.value = opts.value().toFixed(opts.decimals ?? 0); 
      }
    });
    return inp;
  }

  function makeSliderWithDot(opts) {
    const wrap = el('div', 'insp-slider-wrap' + (opts.scaleTrack ? ' scale-track' : ''));
    const inp  = el('input');
    inp.type  = 'range'; inp.min = opts.min; inp.max = opts.max; inp.step = opts.step;
    inp.value = opts.value();

    const dot = el('div', 'insp-slider-dot');
    wrap.appendChild(inp); wrap.appendChild(dot);

    const defaultVal = opts.defaultVal ?? opts.value();

    function updateDot() {
      const cur = parseFloat(inp.value);
      const isDiff = Math.abs(cur - defaultVal) > parseFloat(opts.step) * 0.5;
      dot.classList.toggle('visible', isDiff);
      if (isDiff) {
        const pct = (defaultVal - parseFloat(opts.min)) / (parseFloat(opts.max) - parseFloat(opts.min));
        dot.style.left = `calc(${pct * 100}% - 3px)`; 
      }
    }

    inp.addEventListener('input', () => {
      updateDot(); opts.onChange && opts.onChange(parseFloat(inp.value));
    });

    dot.addEventListener('click', e => {
      e.stopPropagation(); inp.value = defaultVal; updateDot();
      opts.onChange && opts.onChange(defaultVal);
    });

    updateDot();
    addUpdater(() => { inp.value = opts.value(); updateDot(); });
    return { wrap, inp, dot, setValue(v) { inp.value = v; updateDot(); } };
  }

  // ─────────────────────────────────────────────────────────────
  // COLOR LOGIC & EYEDROPPER
  // ─────────────────────────────────────────────────────────────
  function hsvToRgb(h, s, v) { 
    let r, g, b; const i = Math.floor(h / 60) % 6; const f = h / 60 - Math.floor(h / 60);
    const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
    if (i === 0) { r=v; g=t; b=p; } else if (i===1) { r=q; g=v; b=p; } else if (i===2) { r=p; g=v; b=t; }
    else if (i===3) { r=p; g=q; b=v; } else if (i===4) { r=t; g=p; b=v; } else { r=v; g=p; b=q; }
    return { r, g, b };
  }
  function rgbToHsv(r, g, b) {
    const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
    let h = 0, s = max === 0 ? 0 : d / max, v = max;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d % 6) * 60; else if (max === g) h = ((b - r) / d + 2) * 60; else h = ((r - g) / d + 4) * 60;
      if (h < 0) h += 360;
    }
    return { h, s, v };
  }
  function toHex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
  }
  function hexToRgb(hex) {
    const m = hex.replace('#','').match(/.{2}/g);
    if (!m || m.length < 3) return null;
    return { r: parseInt(m[0],16)/255, g: parseInt(m[1],16)/255, b: parseInt(m[2],16)/255 };
  }

  function getColorAtCursor(e) {
    if (_canvas) {
      const rect = _canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const ctx = _canvas.getContext('2d');
        const scaleX = _canvas.width / rect.width;
        const scaleY = _canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const p = ctx.getImageData(x, y, 1, 1).data;
        return { r: p[0]/255, g: p[1]/255, b: p[2]/255 };
      }
    }
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    if (elem) {
      let target = elem;
      let bg = 'rgba(0, 0, 0, 0)';
      while (target && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
        bg = window.getComputedStyle(target).backgroundColor;
        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          target = target.parentElement;
        }
      }
      if (bg && bg.startsWith('rgb')) {
        const m = bg.match(/\d+(\.\d+)?/g);
        if (m && m.length >= 3) {
          return { r: parseInt(m[0])/255, g: parseInt(m[1])/255, b: parseInt(m[2])/255 };
        }
      }
    }
    return { r: 0, g: 0, b: 0 }; 
  }

  function openColorPicker(anchorEl, initialColor, onLiveChange) {
    document.querySelectorAll('.insp-picker-overlay, .insp-picker').forEach(e => e.remove());
    let hsv = rgbToHsv(initialColor.r, initialColor.g, initialColor.b);
    let tempColor = { ...initialColor };

    const overlay = el('div', 'insp-picker-overlay');
    document.body.appendChild(overlay);

    const picker = el('div', 'insp-picker');
    document.body.appendChild(picker);

    let isPickerOpen = true;
    function updatePosition() {
      if (!isPickerOpen) return;
      const rect = anchorEl.getBoundingClientRect();
      picker.style.left = rect.left + 'px';
      picker.style.top  = (rect.bottom + 6) + 'px';
      requestAnimationFrame(updatePosition);
    }
    requestAnimationFrame(updatePosition);

    const svWrap = el('div', 'insp-picker-sv');
    const svCanvas = el('canvas'); svWrap.appendChild(svCanvas);
    const svThumb = el('div', 'insp-picker-sv-thumb'); svWrap.appendChild(svThumb);
    picker.appendChild(svWrap);

    function drawSV() {
      const w = svCanvas.offsetWidth || 280, h = svCanvas.offsetHeight || 200;
      svCanvas.width = w; svCanvas.height = h;
      const ctx = svCanvas.getContext('2d');
      const gH = ctx.createLinearGradient(0, 0, w, 0);
      gH.addColorStop(0, `hsl(${hsv.h},100%,100%)`); gH.addColorStop(1, `hsl(${hsv.h},100%,50%)`);
      ctx.fillStyle = gH; ctx.fillRect(0, 0, w, h);
      const gV = ctx.createLinearGradient(0, 0, 0, h);
      gV.addColorStop(0, 'rgba(0,0,0,0)'); gV.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = gV; ctx.fillRect(0, 0, w, h);
      svThumb.style.left = (hsv.s * 100) + '%'; svThumb.style.top  = ((1 - hsv.v) * 100) + '%';
    }

    const hueBar  = el('div', 'insp-picker-hue');
    const hueThumb = el('div', 'insp-picker-hue-thumb');
    hueBar.appendChild(hueThumb); picker.appendChild(hueBar);
    function drawHue() { hueThumb.style.left = (hsv.h / 360 * 100) + '%'; }

    const fieldsWrap = el('div', 'insp-picker-fields'); picker.appendChild(fieldsWrap);
    function fieldRow(label, value, onchange) {
      const r = el('div', 'insp-picker-field-row');
      const l = el('span', 'insp-picker-field-label'); l.textContent = label;
      const i = el('input', 'insp-picker-field-input');
      i.type = 'number'; i.value = value;
      i.addEventListener('change', () => onchange(parseFloat(i.value) || 0));
      r.append(l, i); return { row: r, input: i };
    }

    const fHue = fieldRow('Hue:', Math.round(hsv.h), v => { hsv.h = Math.max(0, Math.min(360, v)); syncAll(); });
    const fSat = fieldRow('Sat:', Math.round(hsv.s * 100), v => { hsv.s = Math.max(0, Math.min(100, v)) / 100; syncAll(); });
    const fVal = fieldRow('Val:', Math.round(hsv.v * 100), v => { hsv.v = Math.max(0, Math.min(100, v)) / 100; syncAll(); });
    const fRed = fieldRow('Red:', Math.round(tempColor.r * 255), v => { tempColor.r = Math.max(0,Math.min(255,v))/255; hsv = rgbToHsv(tempColor.r,tempColor.g,tempColor.b); syncAll(); });
    const fGrn = fieldRow('Green:', Math.round(tempColor.g * 255), v => { tempColor.g = Math.max(0,Math.min(255,v))/255; hsv = rgbToHsv(tempColor.r,tempColor.g,tempColor.b); syncAll(); });
    const fBlu = fieldRow('Blue:', Math.round(tempColor.b * 255), v => { tempColor.b = Math.max(0,Math.min(255,v))/255; hsv = rgbToHsv(tempColor.r,tempColor.g,tempColor.b); syncAll(); });
    
    [fHue, fRed, fSat, fGrn, fVal, fBlu].forEach(f => fieldsWrap.appendChild(f.row));

    const prevRow = el('div', 'insp-picker-preview-row');
    const preview = el('div', 'insp-picker-preview');
    const htmlRow = el('div', 'insp-picker-html-row');
    const htmlLabel = el('span', 'insp-picker-html-label'); htmlLabel.textContent = 'HTML:';
    const htmlInput = el('input', 'insp-picker-html-input');
    htmlInput.addEventListener('change', () => {
      const c = hexToRgb(htmlInput.value);
      if (c) { tempColor = { ...c, a: tempColor.a }; hsv = rgbToHsv(c.r, c.g, c.b); syncAll(); }
    });
    htmlRow.append(htmlLabel, htmlInput); prevRow.append(preview, htmlRow); picker.appendChild(prevRow);

    function syncAll() {
      const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      tempColor = { r: rgb.r, g: rgb.g, b: rgb.b, a: tempColor.a };
      drawSV(); drawHue();
      preview.style.background = toHex(rgb.r, rgb.g, rgb.b);
      htmlInput.value = toHex(rgb.r, rgb.g, rgb.b);
      fHue.input.value = Math.round(hsv.h); fSat.input.value = Math.round(hsv.s * 100);
      fVal.input.value = Math.round(hsv.v * 100);
      fRed.input.value = Math.round(rgb.r * 255); fGrn.input.value = Math.round(rgb.g * 255); fBlu.input.value = Math.round(rgb.b * 255);

      onLiveChange(tempColor);
    }
    syncAll(); requestAnimationFrame(() => { drawSV(); drawHue(); });

    function svPick(e) {
      const r = svCanvas.getBoundingClientRect();
      hsv.s = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      hsv.v = Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height));
      syncAll();
    }
    let svDown = false;
    svCanvas.addEventListener('mousedown', e => { svDown = true; svPick(e); });
    window.addEventListener('mousemove', e => { if (svDown) svPick(e); });
    window.addEventListener('mouseup', () => { svDown = false; });

    function huePick(e) {
      const r = hueBar.getBoundingClientRect();
      hsv.h = Math.max(0, Math.min(360, (e.clientX - r.left) / r.width * 360));
      syncAll();
    }
    let hueDown = false;
    hueBar.addEventListener('mousedown', e => { hueDown = true; huePick(e); });
    window.addEventListener('mousemove', e => { if (hueDown) huePick(e); });
    window.addEventListener('mouseup', () => { hueDown = false; });

    overlay.addEventListener('click', () => {
      isPickerOpen = false; 
      overlay.remove(); picker.remove();
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 8. NGON SECTION
  // ─────────────────────────────────────────────────────────────
  function buildNgonContent() {
    const inner = el('div', 'insp-section-inner');

    const sidesSlider = makeSliderWithDot({
      min: 3, max: 12, step: 1, value: () => STATE.sides, defaultVal: 6,
      onChange(v) { STATE.sides = Math.round(v); syncUI(); redraw(); }
    });
    
    const sidesNum = makeScrubInput({
      value: () => STATE.sides, min: 3, max: 12, step: 1, dragSpeed: 0.1, decimals: 0,
      onChange(v) { STATE.sides = Math.round(v); sidesSlider.setValue(v); syncUI(); redraw(); }
    });
    
    inner.appendChild(row(labelEl('Sides'), sidesSlider.wrap, sidesNum));

    // Solid Checkbox
    const cbRow = el('div', 'insp-checkbox-row');
    const cb = el('input'); cb.type = 'checkbox'; cb.checked = STATE.solid; cb.id = 'insp-solid';
    const cbLabel = el('label', '', { htmlFor: 'insp-solid', textContent: 'Solid' });
    cbRow.append(cb, cbLabel);
    inner.appendChild(cbRow);

    // Border Width Slider
    const bwSlider = makeSliderWithDot({
      min: 0, max: 100, step: 0.1, value: () => STATE.borderWidth, defaultVal: 5,
      onChange(v) { STATE.borderWidth = v; syncUI(); redraw(); }
    });
    const bwNum = makeScrubInput({
      value: () => STATE.borderWidth, min: 0, max: 100, step: 0.1, dragSpeed: 0.5, decimals: 1, wide: true,
      onChange(v) { STATE.borderWidth = v; bwSlider.setValue(v); syncUI(); redraw(); }
    });
    const bwRow = row(labelEl('Border Width'), bwSlider.wrap, bwNum);
    inner.appendChild(bwRow);

    let colorRowsReady = false;
    let borderInitialized = false;
    function updateSolid() {
      STATE.solid = cb.checked;
      // First time user unchecks Solid and borderWidth is still 0, apply default of 5
      if (!STATE.solid && !borderInitialized && STATE.borderWidth === 0) {
        STATE.borderWidth = 5;
        borderInitialized = true;
        syncUI();
      }
      bwRow.style.display = STATE.solid ? 'none' : 'flex';
      if (colorRowsReady) refreshColorRows();
      redraw();
    }
    cb.addEventListener('change', updateSolid);
    updateSolid(); 
    addUpdater(() => { cb.checked = STATE.solid; updateSolid(); });


    // ── COLOR / IMAGE ROW (switches between two modes) ──
    const arrow = el('span', 'insp-color-arrow'); arrow.textContent = '›';

    // Color mode elements
    const swatch = el('div', 'insp-color-swatch');
    function updateSwatch() { swatch.style.background = toHex(STATE.color.r, STATE.color.g, STATE.color.b); }
    addUpdater(updateSwatch);
    swatch.addEventListener('click', () => {
      openColorPicker(swatch, STATE.color, (newColor) => {
        STATE.color = { ...newColor, a: STATE.color.a };
        updateSwatch(); redraw();
      });
    });

    const eyedrop = el('button', 'insp-eyedropper'); eyedrop.innerHTML = EYEDROP_SVG;
    let tt = null, pvBox = null, tr = null, tg = null, tb = null;
    let isPicking = false, pickedCol = null;
    eyedrop.addEventListener('mousedown', (e) => {
      e.preventDefault(); isPicking = true;
      document.body.classList.add('insp-picking-color');
      tt = el('div', 'insp-pipette-tooltip');
      pvBox = el('div', 'insp-pipette-preview');
      const tw = el('div', 'insp-pipette-text');
      tr = el('div'); tg = el('div'); tb = el('div');
      tw.append(tr, tg, tb); tt.append(pvBox, tw);
      document.body.appendChild(tt); updateTT(e);
    });
    window.addEventListener('mousemove', (e) => { if (!isPicking) return; updateTT(e); });
    window.addEventListener('mouseup', () => {
      if (!isPicking) return;
      isPicking = false; document.body.classList.remove('insp-picking-color');
      if (tt) tt.remove();
      if (pickedCol) { STATE.color = { ...pickedCol, a: STATE.color.a }; syncUI(); redraw(); }
    });
    function updateTT(e) {
      if (!tt) return;
      tt.style.left = (e.clientX + 15) + 'px'; tt.style.top = (e.clientY + 15) + 'px';
      const c = getColorAtCursor(e);
      if (c) {
        pickedCol = c;
        const r = Math.round(c.r*255), g = Math.round(c.g*255), b = Math.round(c.b*255);
        pvBox.style.background = `rgb(${r},${g},${b})`;
        tr.textContent = `R: ${r}`; tg.textContent = `G: ${g}`; tb.textContent = `B: ${b}`;
      }
    }
    const colorReset = resetBtn('insp-row-reset');
    colorReset.addEventListener('click', () => {
      STATE.color = { r: 1, g: 1, b: 1, a: STATE.color.a };
      updateSwatch(); redraw();
    });

    // Image mode elements
    const fileInput = el('input', 'insp-file-input');
    fileInput.type = 'file'; fileInput.accept = 'image/jpeg,image/png,image/webp';
    document.body.appendChild(fileInput);

    const imgSwatch = el('img', 'insp-color-swatch-img');
    imgSwatch.title = 'Click to change image';
    imgSwatch.alt = 'imported image';

    function drawImgSwatch() {
      if (!STATE.importedImage) return;
      // Set src from the object URL stored on the image
      imgSwatch.src = STATE.importedImage._url || STATE.importedImage.src;
      // Size: 1% of natural dimensions, clamped by CSS min/max
      const iw = STATE.importedImage.naturalWidth;
      const ih = STATE.importedImage.naturalHeight;
      imgSwatch.style.width  = '90px';
      imgSwatch.style.height = '65px';
    }

    imgSwatch.addEventListener('click', () => { fileInput.value = ''; fileInput.click(); });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        if (STATE.importedImage && STATE.importedImage._url) URL.revokeObjectURL(STATE.importedImage._url);
        img._url = url; STATE.importedImage = img;
        drawImgSwatch(); syncUI(); redraw();
      };
      img.src = url;
    });

    const trashBtn = el('button', 'insp-trash-btn'); trashBtn.innerHTML = TRASH_SVG; trashBtn.title = 'Remove image';
    trashBtn.addEventListener('click', () => {
      if (STATE.importedImage && STATE.importedImage._url) URL.revokeObjectURL(STATE.importedImage._url);
      STATE.importedImage = null;
      refreshColorRows();
      redraw();
    });

    // The label element — switches between "Color" / "Border Color" and "Image"
    const colorLabel = labelEl('Color');

    // The color row DOM node — we'll swap children
    const colorRow = row(colorLabel, arrow, swatch, eyedrop, colorReset);
    inner.appendChild(colorRow);

    // Separate Border Color row shown below Image row when solid is unchecked
    const borderColorLabel = labelEl('Border Color');
    const borderArrow = el('span', 'insp-color-arrow'); borderArrow.textContent = '\u203a';
    const borderSwatch = el('div', 'insp-color-swatch');
    function updateBorderSwatch() { borderSwatch.style.background = toHex(STATE.color.r, STATE.color.g, STATE.color.b); }
    addUpdater(updateBorderSwatch);
    borderSwatch.addEventListener('click', () => {
      openColorPicker(borderSwatch, STATE.color, (newColor) => {
        STATE.color = { ...newColor, a: STATE.color.a };
        updateSwatch(); updateBorderSwatch(); redraw();
      });
    });
    const borderColorReset = resetBtn('insp-row-reset');
    borderColorReset.addEventListener('click', () => {
      STATE.color = { r: 1, g: 1, b: 1, a: STATE.color.a };
      updateSwatch(); updateBorderSwatch(); redraw();
    });
    const borderEyedrop = el('button', 'insp-eyedropper'); borderEyedrop.innerHTML = EYEDROP_SVG;
    borderEyedrop.addEventListener('mousedown', (e) => {
      e.preventDefault(); isPicking = true;
      document.body.classList.add('insp-picking-color');
      tt = el('div', 'insp-pipette-tooltip');
      pvBox = el('div', 'insp-pipette-preview');
      const tw = el('div', 'insp-pipette-text');
      tr = el('div'); tg = el('div'); tb = el('div');
      tw.append(tr, tg, tb); tt.append(pvBox, tw);
      document.body.appendChild(tt); updateTT(e);
    });
    const borderColorRow = row(borderColorLabel, borderArrow, borderSwatch, borderEyedrop, borderColorReset);
    borderColorRow.style.display = 'none';
    inner.appendChild(borderColorRow);
    colorRowsReady = true;

    function refreshColorRows() {
      const hasImage = !!STATE.importedImage;
      const isSolid = STATE.solid;

      if (hasImage) {
        // Image row
        colorLabel.textContent = 'Image';
        while (colorRow.children.length > 2) colorRow.removeChild(colorRow.lastChild);
        colorRow.append(imgSwatch, trashBtn);
        drawImgSwatch();
        colorRow.style.display = 'flex';
        // Border Color row below, only when not solid
        updateBorderSwatch();
        borderColorRow.style.display = isSolid ? 'none' : 'flex';
      } else {
        // Color-only row — label changes based on solid state
        colorLabel.textContent = isSolid ? 'Color' : 'Border Color';
        while (colorRow.children.length > 2) colorRow.removeChild(colorRow.lastChild);
        colorRow.append(swatch, eyedrop, colorReset);
        updateSwatch();
        colorRow.style.display = 'flex';
        borderColorRow.style.display = 'none';
      }
    }

    // When an image is loaded via drag-drop from canvas area, refresh rows + expand NGon
    let _prevHasImage = false;
    addUpdater(() => {
      refreshColorRows();
      const hasImage = !!STATE.importedImage;
      if (hasImage && !_prevHasImage) {
        // Image just appeared — expand the NGon section
        const content = inner.closest('.insp-section')?.querySelector('.insp-section-content');
        const nameEl  = inner.closest('.insp-section')?.querySelector('.insp-section-name');
        if (content && !content.classList.contains('open')) {
          content.classList.add('open');
          if (nameEl) nameEl.classList.add('open');
        }
      }
      _prevHasImage = hasImage;
    });

    const opSlider = makeSliderWithDot({
      min: 0, max: 1, step: 0.01, value: () => STATE.color.a, defaultVal: 1,
      onChange(v) { STATE.color.a = v; syncUI(); redraw(); }
    });
    const opNum = makeScrubInput({
      value: () => STATE.color.a, min: 0, max: 1, step: 0.01, dragSpeed: 0.01, decimals: 3,
      onChange(v) { STATE.color.a = v; opSlider.setValue(v); syncUI(); redraw(); }
    });
    inner.appendChild(row(labelEl('Opacity'), opSlider.wrap, opNum));

    syncUI();
    return inner;
  }

  // ─────────────────────────────────────────────────────────────
  // 9. TRANSFORM SECTION
  // ─────────────────────────────────────────────────────────────
  function buildTransformContent() {
    const inner = el('div', 'insp-section-inner');

    const scaleSlider = makeSliderWithDot({
      min: -3, max: 5, step: 0.001, value: () => STATE.scale, defaultVal: 1, scaleTrack: true,
      onChange(v) { STATE.scale = v; syncUI(); redraw(); }
    });
    const scaleNum = makeScrubInput({
      value: () => STATE.scale, min: -3, max: 5, step: 0.001, dragSpeed: 0.01, decimals: 3, wide: true,
      onChange(v) { STATE.scale = v; scaleSlider.setValue(STATE.scale); syncUI(); redraw(); }
    });
    inner.appendChild(row(labelEl('Scale'), scaleSlider.wrap, scaleNum));

    let posXInput = makeScrubInput({
      value: () => STATE.posX, step: 0.01, dragSpeed: 0.005, decimals: 3, wide: true,
      onChange(v) { STATE.posX = v; syncUI(); redraw(); }
    });
    let posYInput = makeScrubInput({
      value: () => STATE.posY, step: 0.01, dragSpeed: 0.005, decimals: 3, wide: true,
      onChange(v) { STATE.posY = v; syncUI(); redraw(); }
    });

    const posReset = resetBtn('insp-row-reset');
    posReset.addEventListener('click', () => {
      STATE.posX = 0; STATE.posY = 0; syncUI(); redraw();
    });

    const posXY = el('div', 'insp-xy');
    posXY.append(el('span', 'insp-xy-label', {textContent:'X'}), posXInput, 
                 el('span', 'insp-xy-label', {textContent:'Y'}), posYInput);
    inner.appendChild(row(labelEl('Position'), posXY, posReset));

    const rotSlider = makeSliderWithDot({
      min: -180, max: 180, step: 0.1, value: () => STATE.rotation, defaultVal: 0,
      onChange(v) { STATE.rotation = v; syncUI(); redraw(); }
    });
    const rotNum = makeScrubInput({
      value: () => STATE.rotation, min: -180, max: 180, step: 0.1, dragSpeed: 0.5, decimals: 3, wide: true,
      onChange(v) { STATE.rotation = v; rotSlider.setValue(v); syncUI(); redraw(); }
    });
    inner.appendChild(row(labelEl('Rotation Angle'), rotSlider.wrap, rotNum));

    const pivXInput = makeScrubInput({
      value: () => STATE.pivX, step: 0.01, dragSpeed: 0.01, decimals: 3, wide: true,
      onChange(v) { STATE.pivX = v; redraw(); }
    });
    const pivYInput = makeScrubInput({
      value: () => STATE.pivY, step: 0.01, dragSpeed: 0.01, decimals: 3, wide: true,
      onChange(v) { STATE.pivY = v; redraw(); }
    });
    const pivReset = resetBtn('insp-row-reset');
    pivReset.addEventListener('click', () => {
      STATE.pivX = 0; STATE.pivY = 0; syncUI(); redraw();
    });
    const pivXY = el('div', 'insp-xy');
    pivXY.append(el('span', 'insp-xy-label', {textContent:'X'}), pivXInput, 
                 el('span', 'insp-xy-label', {textContent:'Y'}), pivYInput);
    inner.appendChild(row(labelEl('Pivot'), pivXY, pivReset));

    const flipWrap = el('div', 'insp-xy');
    const fh = el('button', 'insp-flip-btn'); fh.textContent = '⇔';
    fh.addEventListener('click', () => { STATE.flipH *= -1; syncUI(); redraw(); });

    const fv = el('button', 'insp-flip-btn'); fv.textContent = '⇕';
    fv.addEventListener('click', () => { STATE.flipV *= -1; syncUI(); redraw(); });

    addUpdater(() => {
      fh.classList.toggle('active', STATE.flipH === -1);
      fv.classList.toggle('active', STATE.flipV === -1);
    });
    
    flipWrap.append(fh, fv);
    
    const flipReset = resetBtn('insp-row-reset');
    flipReset.addEventListener('click', () => {
      STATE.flipH = 1; STATE.flipV = 1; redraw();
    });
    
    inner.appendChild(row(labelEl('Flip'), flipWrap, flipReset));

    return inner;
  }

  // ─────────────────────────────────────────────────────────────
  // 10. COLLAPSIBLE SECTION WRAPPER 
  // ─────────────────────────────────────────────────────────────
  function buildSection(name, contentBuilder, onReset, toggleKey, isTransform = false) {
    const section = el('div', 'insp-section');
    const header  = el('div', 'insp-section-header');
    const toggle  = el('div', 'insp-toggle');
    
    if (toggleKey && !STATE[toggleKey]) toggle.classList.add('off');

    const nameEl  = el('span', 'insp-section-name');
    nameEl.textContent = name;
    const divider = el('div', 'insp-divider');
    const reset   = resetBtn();

    if (onReset) {
      reset.addEventListener('click', (e) => {
        e.stopPropagation();
        onReset();
      });
    }

    header.append(toggle, nameEl, divider, reset);
    const content = el('div', 'insp-section-content');
    content.appendChild(contentBuilder());

    // Switch functionality
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents the accordion from opening/closing
      if (toggleKey) {
        STATE[toggleKey] = !STATE[toggleKey];
        toggle.classList.toggle('off', !STATE[toggleKey]);
        redraw();
      }
    });

    // Accordion functionality
    header.addEventListener('click', () => {
      const isOpen = content.classList.toggle('open');
      nameEl.classList.toggle('open', isOpen);
      
      if (isTransform) {
        STATE.transformOpen = isOpen;
        redraw();
      }
    });

    section.append(header, content);
    return section;
  }

  // ─────────────────────────────────────────────────────────────
  // 11. CANVAS AREA WITH ZOOM
  // ─────────────────────────────────────────────────────────────
  function buildCanvasArea() {
    const area  = el('div', 'insp-canvas-area');
    const outer = el('div', 'insp-viewport-outer');
    const canvas = el('canvas');
    outer.appendChild(canvas); area.appendChild(outer);
    _canvas = canvas; _outer = outer;

    let zoom = 1; const MIN_ZOOM = 0.2, MAX_ZOOM = 8;
    function applyZoom(originX, originY) {
      outer.style.transformOrigin = (originX || '50%') + ' ' + (originY || '50%');
      outer.style.transform = 'scale(' + zoom + ')';
    }

    function init() {
      canvas.width = outer.clientWidth; canvas.height = outer.clientHeight;
      redraw();
    }

    area.addEventListener('wheel', e => {
      if (!e.shiftKey) return; e.preventDefault();
      zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * (e.deltaY < 0 ? 1.1 : 0.9)));
      const rect = outer.getBoundingClientRect();
      applyZoom(((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    }, { passive: false });

    window.addEventListener('keydown', e => {
      if (!e.shiftKey) return;
      if (e.key === '+' || e.key === '=') { zoom = Math.min(MAX_ZOOM, zoom * 1.15); applyZoom('50%','50%'); }
      else if (e.key === '_' || e.key === '-') { zoom = Math.max(MIN_ZOOM, zoom / 1.15); applyZoom('50%','50%'); }
    });

    // ── DRAG & DROP IMAGE ──
    function setupDragDrop(target) {
      target.addEventListener('dragover', e => {
        e.preventDefault();
        const types = e.dataTransfer.types;
        if (types && (types.includes('Files') || types.includes('application/x-moz-file'))) {
          target.style.outline = '2px dashed #5a8fc4';
          target.style.outlineOffset = '-4px';
        }
      });
      target.addEventListener('dragleave', () => {
        target.style.outline = '';
        target.style.outlineOffset = '';
      });
      target.addEventListener('drop', e => {
        e.preventDefault();
        target.style.outline = '';
        target.style.outlineOffset = '';
        const file = e.dataTransfer.files[0];
        if (!file) return;
        const valid = ['image/jpeg','image/png','image/webp'];
        if (!valid.includes(file.type)) return;
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          if (STATE.importedImage && STATE.importedImage._url) URL.revokeObjectURL(STATE.importedImage._url);
          img._url = url;
          STATE.importedImage = img;
          syncUI(); redraw();
        };
        img.src = url;
      });
    }
    setupDragDrop(area);

    requestAnimationFrame(init);
    return { areaEl: area, setupDragDrop };
  }

  function buildTopBar() {
    const bar = el('div', 'insp-topbar');
    const dots = el('div', 'insp-topbar-dots');
    ['red','yellow','green'].forEach(color => dots.appendChild(el('div', `insp-topbar-dot ${color}`)));
    const icon = el('img', 'insp-topbar-icon'); icon.src = 'imagenes/davinci_resolve.png'; icon.alt = 'Resolve';
    const title = el('span', 'insp-topbar-title'); title.textContent = 'DaVinci Resolve';
    bar.append(dots, icon, title);
    return bar;
  }

  function mount(targetSelector = '#davinciresolve-mount') {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const shell = el('div', 'insp-shell');
    shell.appendChild(buildTopBar());

    const bodyRow = el('div', 'insp-body-row');
    const { areaEl, setupDragDrop } = buildCanvasArea();
    bodyRow.appendChild(areaEl);

    const panel = el('div', 'insp-panel');
    const panelHeader = el('div', 'insp-panel-header');
    const panelTitle  = el('span', 'insp-panel-title'); panelTitle.textContent = 'Inspector';
    const dots = el('div', 'insp-dots'); dots.innerHTML = '<span></span><span></span><span></span>';
    panelHeader.append(panelTitle, dots);

    const scroll = el('div', 'insp-scroll');
    
    // Passing 'ngonEnabled' as the toggle key
    scroll.appendChild(buildSection('NGon', buildNgonContent, () => {
      STATE.sides = 6;
      STATE.solid = true;
      STATE.borderWidth = 0.0;
      STATE.color = { r: 1, g: 1, b: 1, a: 1 };
      if (STATE.importedImage && STATE.importedImage._url) URL.revokeObjectURL(STATE.importedImage._url);
      STATE.importedImage = null;
      syncUI(); redraw();
    }, 'ngonEnabled'));

    // Passing 'transformEnabled' as the toggle key
    scroll.appendChild(buildSection('Transform', buildTransformContent, () => {
      STATE.scale = 1; STATE.posX = 0; STATE.posY = 0;
      STATE.rotation = 0; STATE.pivX = 0; STATE.pivY = 0;
      STATE.flipH = 1; STATE.flipV = 1;
      syncUI(); redraw();
    }, 'transformEnabled', true)); 

    panel.append(panelHeader, scroll);
    bodyRow.appendChild(panel); shell.appendChild(bodyRow);
    target.appendChild(shell);
    setupDragDrop(shell);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mount('#davinciresolve-mount'));
  else mount('#davinciresolve-mount');

})();