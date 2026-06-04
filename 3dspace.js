(() => {

  // ─────────────────────────────────────────────────────────────
  // CSS
  // ─────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    .ax3-shell {
      width: 100%; height: 100%;
      background: #07080d;
      position: relative;
      overflow: hidden;
      font-family: 'Share Tech Mono', monospace;
      cursor: crosshair;
    }

    .ax3-canvas {
      display: block;
      width: 100%; height: 100%;
      position: absolute; inset: 0;
    }

    /* HUD */
    .ax3-hud {
      position: absolute; inset: 0;
      pointer-events: none;
    }

    .ax3-label {
      position: absolute;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .ax3-label.x { color: #ff4d6a; }
    .ax3-label.y { color: #4dffb4; }
    .ax3-label.z { color: #4db8ff; }

    .ax3-coords {
      position: absolute;
      bottom: 18px; left: 20px;
      font-size: 10px;
      color: #2a5f8f;
      letter-spacing: 0.1em;
      line-height: 1.8;
    }

    .ax3-hint {
      position: absolute;
      bottom: 18px; right: 20px;
      font-size: 10px;
      color: #1a3a5a;
      letter-spacing: 0.08em;
      line-height: 2;
      text-align: right;
    }

    .ax3-crosshair {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 14px; height: 14px;
      opacity: 0.15;
    }
    .ax3-crosshair::before,
    .ax3-crosshair::after {
      content: '';
      position: absolute;
      background: #4db8ff;
    }
    .ax3-crosshair::before { width: 1px; height: 100%; left: 50%; transform: translateX(-50%); }
    .ax3-crosshair::after  { height: 1px; width: 100%; top: 50%; transform: translateY(-50%); }

    /* ── SIDE TAB ── */
    .ax3-tab-trigger {
      position: absolute;
      top: 0; right: 0;
      width: 40px; height: 100%;
      z-index: 8;
      cursor: pointer;
    }

    .ax3-tab {
      position: absolute;
      top: 0; right: 0;
      width: 300px; height: 100%;
      background: rgba(10, 16, 28, 0.92);
      border-left: 1px solid rgba(77, 184, 255, 0.1);
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      z-index: 9;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    .ax3-tab.open {
      transform: translateX(0);
      pointer-events: auto;
    }

    /* thin glowing edge when closed */
    .ax3-tab::before {
      content: '';
      position: absolute;
      left: -1px; top: 20%; bottom: 20%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(77,184,255,0.4), transparent);
      transition: opacity 0.3s;
    }

    .ax3-tab-header {
      padding: 16px 16px 10px;
      font-size: 10px;
      letter-spacing: 0.18em;
      color: rgba(77,184,255,0.5);
      text-transform: uppercase;
      border-bottom: 1px solid rgba(77,184,255,0.07);
      flex-shrink: 0;
    }

    .ax3-tab-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .ax3-tab-body::-webkit-scrollbar { width: 3px; }
    .ax3-tab-body::-webkit-scrollbar-track { background: transparent; }
    .ax3-tab-body::-webkit-scrollbar-thumb { background: rgba(77,184,255,0.2); border-radius: 2px; }

    /* Create point button */
    .ax3-tab-footer {
      padding: 10px;
      border-top: 1px solid rgba(77,184,255,0.07);
      flex-shrink: 0;
    }
    .ax3-create-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 10px;
      background: rgba(77,184,255,0.05);
      border: 1px solid rgba(77,184,255,0.15);
      border-radius: 3px;
      color: rgba(77,184,255,0.7);
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      flex-shrink: 0;
      width: 100%;
      text-align: center;
    }
    .ax3-create-btn:hover {
      background: rgba(77,184,255,0.1);
      border-color: rgba(77,184,255,0.3);
      color: rgba(77,184,255,1);
    }
    .ax3-create-btn-plus {
      font-size: 15px;
      line-height: 1;
      color: rgba(77,184,255,0.9);
    }
    .ax3-create-btn-divider {
      width: 1px; height: 12px;
      background: rgba(77,184,255,0.2);
      flex-shrink: 0;
    }

    /* Point list items */
    .ax3-point-item {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 3px;
      padding: 8px 10px;
      animation: ax3-fadein 0.2s ease;
    }
    @keyframes ax3-fadein {
      from { opacity: 0; transform: translateX(8px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .ax3-point-name {
      font-size: 11px;
      color: #b0b8c8;
      letter-spacing: 0.1em;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ax3-point-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #7a8a9a;
      flex-shrink: 0;
      box-shadow: 0 0 4px rgba(180,200,220,0.3);
    }
    .ax3-point-fields {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-left: 13px;
      margin-top: 4px;
    }
    .ax3-point-field-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .ax3-point-field-label {
      font-size: 10px;
      color: #3a6a8a;
      letter-spacing: 0.1em;
      width: 10px;
      flex-shrink: 0;
    }
    .ax3-point-field-input {
      flex: 1;
      background: #0e1520;
      border: 1px solid #1e3a52;
      border-radius: 3px;
      color: #6aa8cc;
      font-size: 10px;
      font-family: 'Share Tech Mono', monospace;
      text-align: center;
      padding: 2px 4px;
      outline: none;
      cursor: ew-resize;
      min-width: 0;
    }
    .ax3-point-field-input:focus { border-color: #4db8ff; color: #a0d8f0; cursor: text; }
    .ax3-point-field-input::-webkit-inner-spin-button,
    .ax3-point-field-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

    /* RESET BUTTON */
    .ax3-point-reset {
      appearance: none;
      background: transparent;
      border: 0;
      padding: 0;
      color: rgba(77,184,255,0.4);
      cursor: pointer;
      width: 16px; height: 16px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: color 0.15s;
    }
    .ax3-point-reset:hover { color: rgba(77,184,255,1); }
    /* pointer-events: none ensures the user clicks the div handler, not the svg itself */
    .ax3-point-reset svg { width: 11px; height: 11px; fill: currentColor; pointer-events: none; }

    .ax3-point-reset-all {
      appearance: none; background: transparent; border: 0; padding: 0;
      color: rgba(77,184,255,0.55); cursor: pointer;
      width: 18px; height: 18px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: color 0.15s; margin-left: auto;
    }
    .ax3-point-reset-all:hover { color: rgba(77,184,255,1); }
    .ax3-point-reset-all svg { width: 14px; height: 14px; fill: currentColor; pointer-events: none; stroke: currentColor; stroke-width: 0.5; }

    /* GEM LINK BUTTON */
    .ax3-gem-btn {
      appearance: none;
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      width: 16px; height: 16px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      margin-left: 4px;
      transition: filter 0.15s;
    }
    .ax3-gem-btn svg { width: 12px; height: 12px; pointer-events: none; }
    .ax3-gem-btn:hover { filter: brightness(1.4); }
    .ax3-gem-btn.active svg .gem-fill { fill: #e03030; }

    /* SVG wire overlay — covers whole tab, paths are individually clickable */
    .ax3-wire-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 20;
      overflow: visible;
    }
    .ax3-wire-overlay .seg-path {
      pointer-events: stroke;
      cursor: pointer;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const RESET_SVG = `<svg viewBox="0 0 16 16"><path d="M8 2a6 6 0 1 0 5.66 4H12.1A4.5 4.5 0 1 1 8 3.5V2z"/><path d="M7 0l3 3-3 3V0z"/></svg>`;
  const GEM_SVG_DEFAULT = `<svg viewBox="0 0 12 12"><polygon class="gem-fill" points="6,0 10,3 10,8 6,12 2,8 2,3" fill="rgba(180,200,220,0.5)" stroke="rgba(140,180,210,0.7)" stroke-width="0.8"/><line x1="2" y1="3" x2="10" y2="3" stroke="rgba(200,220,240,0.4)" stroke-width="0.6"/><line x1="6" y1="0" x2="6" y2="12" stroke="rgba(200,220,240,0.25)" stroke-width="0.5"/></svg>`;
  const GEM_SVG_ACTIVE  = `<svg viewBox="0 0 12 12"><polygon class="gem-fill" points="6,0 10,3 10,8 6,12 2,8 2,3" fill="rgba(200,50,50,0.85)" stroke="rgba(240,80,80,0.9)" stroke-width="0.8"/><line x1="2" y1="3" x2="10" y2="3" stroke="rgba(255,160,160,0.5)" stroke-width="0.6"/><line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,160,160,0.3)" stroke-width="0.5"/></svg>`;

  // ─────────────────────────────────────────────────────────────
  // MATH HELPERS
  // ─────────────────────────────────────────────────────────────
  function vec3(x, y, z) { return { x, y, z }; }

  function rotY(v, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
  }
  function rotZ(v, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return vec3(c * v.x - s * v.y, s * v.x + c * v.y, v.z);
  }
  function applyRot(v, ry, rz) { return rotZ(rotY(v, ry), rz); }

  function project(v, camX, fov, cx, cy) {
    const dx = v.x - camX;
    if (dx <= 0.01) return null;
    const scale = fov / dx;
    return { sx: cx + v.z * scale, sy: cy - v.y * scale, scale };
  }

  // ─────────────────────────────────────────────────────────────
  // MOUNT
  // ─────────────────────────────────────────────────────────────
  function mount(id = '3dspace-mount') {
    const target = document.getElementById(id);
    if (!target) { console.warn('3dspace.js: mount target not found'); return; }

    const shell = document.createElement('div');
    shell.className = 'ax3-shell';
    target.appendChild(shell);

    const canvas = document.createElement('canvas');
    canvas.className = 'ax3-canvas';
    shell.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // HUD
    const hud = document.createElement('div'); hud.className = 'ax3-hud';
    shell.appendChild(hud);

    const labelX = document.createElement('div'); labelX.className = 'ax3-label x'; labelX.textContent = 'X';
    const labelY = document.createElement('div'); labelY.className = 'ax3-label y'; labelY.textContent = 'Y';
    const labelZ = document.createElement('div'); labelZ.className = 'ax3-label z'; labelZ.textContent = 'Z';
    hud.append(labelX, labelY, labelZ);

    const coords = document.createElement('div'); coords.className = 'ax3-coords';
    hud.appendChild(coords);

    const hint = document.createElement('div'); hint.className = 'ax3-hint';
    hint.innerHTML = 'LMB &nbsp;orbit<br>MMB &nbsp;pan<br>SCROLL &nbsp;dolly';
    hud.appendChild(hint);

    const crosshair = document.createElement('div'); crosshair.className = 'ax3-crosshair';
    hud.appendChild(crosshair);

    // ── INTERACTION STATE ──
    let isScrubbing = false;
    let isTabHovered = false;

    // ── SIDE TAB ──
    const tabTrigger = document.createElement('div'); tabTrigger.className = 'ax3-tab-trigger';
    shell.appendChild(tabTrigger);

    const tab = document.createElement('div'); tab.className = 'ax3-tab';
    shell.appendChild(tab);

    const tabHeader = document.createElement('div'); tabHeader.className = 'ax3-tab-header';
    tabHeader.textContent = 'Elements';
    tab.appendChild(tabHeader);

    const tabBody = document.createElement('div'); tabBody.className = 'ax3-tab-body';
    tab.appendChild(tabBody);

    const tabFooter = document.createElement('div'); tabFooter.className = 'ax3-tab-footer';
    tab.appendChild(tabFooter);

    const createBtn = document.createElement('button'); createBtn.className = 'ax3-create-btn';
    createBtn.innerHTML = `
      <span class="ax3-create-btn-plus">+</span>
      <span class="ax3-create-btn-divider"></span>
      <span>Add point</span>
    `;
    tabFooter.appendChild(createBtn);

    // Hover to open/close tab
    tabTrigger.addEventListener('mouseenter', () => { tab.classList.add('open'); });
    tab.addEventListener('mouseenter', () => { isTabHovered = true; });
    tab.addEventListener('mouseleave', () => { 
      isTabHovered = false; 
      if (!isScrubbing) {
        tab.classList.remove('open'); 
      }
    });
    tab.addEventListener('mousedown', e => { e.stopPropagation(); });
    tab.addEventListener('wheel', e => { e.stopPropagation(); });

    // ── Wire drag: update live line on mousemove, complete or cancel on mouseup ──
    window.addEventListener('mousemove', e => {
      if (!dragWire) return;
      const tx = e.clientX - dragWire.tabRect.left;
      const ty = e.clientY - dragWire.tabRect.top;
      wireLine.setAttribute('x2', tx);
      wireLine.setAttribute('y2', ty);
    });

    window.addEventListener('mouseup', e => {
      if (!dragWire) return;
      const from = dragWire.fromPt;
      const wasDrag = dragWire.didDragRef();

      wireLine.style.display = 'none';
      tab.style.cursor = '';
      dragWire = null;

      if (!wasDrag) return; // was a click, handled by the per-gem onUp

      // Check if released over a point item (anywhere in the box, not just the gem)
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const targetItem = target && target.closest('.ax3-point-item');
      const toPt = targetItem ? points.find(p => p._item === targetItem) : null;

      if (toPt && toPt !== from) {
        const already = segments.some(s =>
          (s.a === from && s.b === toPt) || (s.a === toPt && s.b === from)
        );
        if (!already) {
          const seg = { a: from, b: toPt, path: null };
          segments.push(seg);

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('class', 'seg-path');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'rgba(50,180,80,0.75)');
          path.setAttribute('stroke-width', '2');
          wireOverlaySvg.insertBefore(path, wireLine); // keep drag wire on top
          seg.path = path;

          // Click path to delete segment
          path.addEventListener('click', e => {
            e.stopPropagation();
            const idx = segments.indexOf(seg);
            if (idx !== -1) segments.splice(idx, 1);
            if (path.parentNode) path.parentNode.removeChild(path);
            updatePointLinkState(from);
            updatePointLinkState(toPt);
          });
          path.addEventListener('mouseenter', () => path.setAttribute('stroke', 'rgba(220,60,60,0.85)'));
          path.addEventListener('mouseleave', () => path.setAttribute('stroke', 'rgba(50,180,80,0.75)'));

          from._gemBtn.innerHTML = GEM_SVG_ACTIVE;
          from._gemBtn.dataset.linked = 'true';
          toPt._gemBtn.innerHTML = GEM_SVG_ACTIVE;
          toPt._gemBtn.dataset.linked = 'true';
          updatePointLinkState(from);
          updatePointLinkState(toPt);
          redrawSegmentPaths();
        }
      }
    });

    // ── Points state ──
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVW';
    const points = [];
    const segments = []; // { a: ptRef, b: ptRef, linkEl: div }

    // ── Drag-wire state ──
    let dragWire = null; // { fromPt, fromGemBtn, svgLine, startX, startY }

    // SVG overlay for the live wire while dragging
    const wireOverlaySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wireOverlaySvg.setAttribute('class', 'ax3-wire-overlay');
    tab.appendChild(wireOverlaySvg);

    const wireLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    wireLine.setAttribute('stroke', 'rgba(40,160,70,0.7)');
    wireLine.setAttribute('stroke-width', '1.5');
    wireLine.setAttribute('stroke-dasharray', '4 3');
    wireLine.style.display = 'none';
    wireOverlaySvg.appendChild(wireLine);

    function updatePointLinkState(pt) {
      const count = segments.filter(s => s.a === pt || s.b === pt).length;
      if (count === 0) {
        pt._gemBtn.innerHTML = GEM_SVG_DEFAULT;
        pt._gemBtn.dataset.linked = 'false';
      } else {
        pt._gemBtn.innerHTML = GEM_SVG_ACTIVE;
        pt._gemBtn.dataset.linked = 'true';
      }
    }

    function gemCenter(pt) {
      const tabRect = tab.getBoundingClientRect();
      const btnRect = pt._gemBtn.getBoundingClientRect();
      return {
        x: btnRect.left + btnRect.width / 2 - tabRect.left,
        y: btnRect.top  + btnRect.height / 2 - tabRect.top,
      };
    }

    function redrawSegmentPaths() {
      // Group segments by shared point to offset curves when multiple wires meet
      segments.forEach((seg, i) => {
        if (!seg.path) return;
        const a = gemCenter(seg.a);
        const b = gemCenter(seg.b);

        // Count how many segments involve each endpoint to compute a curve offset
        const aIdx = segments.filter(s => s.a === seg.a || s.b === seg.a).indexOf(seg);
        const bIdx = segments.filter(s => s.a === seg.b || s.b === seg.b).indexOf(seg);
        // Offset horizontally — alternate left/right so wires fan out
        const offset = (aIdx % 2 === 0 ? 1 : -1) * (Math.floor(aIdx / 2) + 1) * 14;

        // Cubic bezier: control points pulled sideways to create a visible curve
        const mx = (a.x + b.x) / 2 + offset;
        const d = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
        seg.path.setAttribute('d', d);
      });
    }

    // Redraw on tab scroll and window resize
    tabBody.addEventListener('scroll', redrawSegmentPaths);
    window.addEventListener('resize', redrawSegmentPaths);

    function rndCoord() { return parseFloat(((Math.random() - 0.5) * 4).toFixed(2)); }

    createBtn.addEventListener('click', () => {
      if (points.length >= LETTERS.length) return;
      const letter = LETTERS[points.length];
      
      const pX = rndCoord();
      const pY = rndCoord();
      const pZ = rndCoord();

      const pt = { 
        letter, 
        x: pX, y: pY, z: pZ,
        _initX: pX, _initY: pY, _initZ: pZ
      };
      points.push(pt);

      // Build list item
      const item = document.createElement('div'); item.className = 'ax3-point-item';

      const nameRow = document.createElement('div'); nameRow.className = 'ax3-point-name';
      const dot = document.createElement('div'); dot.className = 'ax3-point-dot';

      const gemBtn = document.createElement('button');
      gemBtn.className = 'ax3-gem-btn';
      gemBtn.type = 'button';
      gemBtn.title = 'Drag to link to another point';
      gemBtn.innerHTML = GEM_SVG_DEFAULT;

      gemBtn.addEventListener('mousedown', e => {
        e.stopPropagation();
        e.preventDefault();

        const downX = e.clientX, downY = e.clientY;
        let didDrag = false;

        const onMove = e2 => {
          if (Math.abs(e2.clientX - downX) > 4 || Math.abs(e2.clientY - downY) > 4) {
            didDrag = true;
            window.removeEventListener('mousemove', onMove);
          }
        };

        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);

        // Start drag-wire immediately (will be cancelled on mouseup if not dragged)
        const rect = gemBtn.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();
        const sx = rect.left + rect.width / 2 - tabRect.left;
        const sy = rect.top  + rect.height / 2 - tabRect.top;

        wireLine.setAttribute('x1', sx);
        wireLine.setAttribute('y1', sy);
        wireLine.setAttribute('x2', sx);
        wireLine.setAttribute('y2', sy);
        wireLine.style.display = '';

        dragWire = { fromPt: pt, fromGemBtn: gemBtn, tabRect, sx, sy, didDragRef: () => didDrag };
        tab.style.cursor = 'crosshair';
      });

      // Botón de reset general — resetea x, y, z a sus valores iniciales
      const resetAllBtn = document.createElement('button');
      resetAllBtn.className = 'ax3-point-reset-all';
      resetAllBtn.type = 'button';
      resetAllBtn.title = 'Reset all axes to initial values';
      resetAllBtn.innerHTML = RESET_SVG;
      resetAllBtn.addEventListener('mousedown', e => { e.stopPropagation(); e.preventDefault(); });
      resetAllBtn.addEventListener('click', e => {
        e.stopPropagation();
        pt.x = pt._initX; pt.y = pt._initY; pt.z = pt._initZ;
        fields.querySelectorAll('.ax3-point-field-input').forEach((inp, i) => {
          const ax = ['x','y','z'][i];
          inp.value = pt[ax].toFixed(2);
        });
      });

      nameRow.append(dot, document.createTextNode('Point ' + letter), resetAllBtn, gemBtn);

      item.appendChild(nameRow);

      // Store references on pt for cross-item access
      pt._item = item;
      pt._gemBtn = gemBtn;

      const fields = document.createElement('div'); fields.className = 'ax3-point-fields';
      item.appendChild(fields);

      ['x','y','z'].forEach(axis => {
        const fieldRow = document.createElement('div'); fieldRow.className = 'ax3-point-field-row';
        const lbl = document.createElement('span'); lbl.className = 'ax3-point-field-label'; lbl.textContent = axis;
        const inp = document.createElement('input'); inp.className = 'ax3-point-field-input';
        inp.type = 'number'; inp.value = pt[axis].toFixed(2); inp.step = '0.01';

        const initialVal = pt[axis];

        // Scrub: drag left/right to change value
        let dragging = false, maybeDragging = false, startX = 0, startVal = 0;
        let editing = false;

        function stopScrub() {
          dragging = false;
          maybeDragging = false;
          isScrubbing = false;
          inp.style.cursor = '';
          document.body.style.cursor = '';
          if (document.pointerLockElement) document.exitPointerLock();
        }

        function resetCoordinate(e) {
          e.preventDefault();
          e.stopPropagation();
          editing = false;
          stopScrub();
          pt[axis] = initialVal;
          inp.value = initialVal.toFixed(2);
        }

        const resetBtn = document.createElement('button'); 
        resetBtn.className = 'ax3-point-reset';
        resetBtn.type = 'button';
        resetBtn.innerHTML = RESET_SVG;
        resetBtn.title = 'Reset to initial value';
        resetBtn.addEventListener('mousedown', resetCoordinate);

        inp.addEventListener('mousedown', e => {
          e.stopPropagation();
          if (document.activeElement === inp) return;
          maybeDragging = true; 
          startX = e.clientX;
          startVal = parseFloat(inp.value) || 0;
        });

        window.addEventListener('mousemove', e => {
          if (maybeDragging && !dragging) {
             if (Math.abs(e.clientX - startX) > 3) {
                 dragging = true;
                 isScrubbing = true;
                 inp.style.cursor = 'ew-resize';
                 document.body.style.cursor = 'ew-resize';
                 inp.requestPointerLock(); 
             }
          }
          if (!dragging) return;

          if (Math.abs(e.movementX) > 50) return;
          
          startVal += e.movementX * 0.02;
          const v = parseFloat(startVal.toFixed(2));
          inp.value = v.toFixed(2);
          pt[axis] = v;
        });

        window.addEventListener('mouseup', () => { 
          maybeDragging = false;
          if (!dragging) return; 
          stopScrub();
          
          if (!isTabHovered) {
            tab.classList.remove('open');
          }
        });

        // Double-click to type
        inp.addEventListener('dblclick', e => { 
          e.stopPropagation(); 
          editing = true; 
          inp.style.cursor = 'text'; 
          inp.focus();
          inp.select(); 
        });
        function commit() {
          if (!editing) return; editing = false; inp.style.cursor = '';
          const v = parseFloat(inp.value);
          if (isNaN(v)) { inp.value = pt[axis].toFixed(2); return; }
          pt[axis] = parseFloat(v.toFixed(2)); inp.value = pt[axis].toFixed(2);
        }
        inp.addEventListener('blur', commit);
        inp.addEventListener('keydown', e => {
          if (!editing) return;
          if (e.key === 'Enter') inp.blur();
          if (e.key === 'Escape') { editing = false; inp.value = pt[axis].toFixed(2); inp.blur(); }
        });

        fieldRow.append(lbl, inp, resetBtn); 
        fields.appendChild(fieldRow);
      });

      tabBody.appendChild(item);
    });

    // ── Camera ──
    const cam = { x: -5.5, panX: -90.0, panY: 30.0, ry: 250.0 * Math.PI / 180, rz: 20.0 * Math.PI / 180 };
    const FOV = 400;

    // ── Particles ──
    const NUM_PARTICLES = 120, SPREAD = 6;
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      pos: vec3((Math.random()-0.5)*SPREAD*2, (Math.random()-0.5)*SPREAD*2, (Math.random()-0.5)*SPREAD*2),
      r: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.15 + 0.03,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.005 + Math.random() * 0.015,
    }));

    // ── Axes ──
    const AXIS_LEN = 3;
    const axes = [
      { dir: vec3(1,0,0), neg: vec3(-1,0,0), color: '#ff4d6a', label: labelX },
      { dir: vec3(0,0,1), neg: vec3(0,0,-1), color: '#4dffb4', label: labelY },
      { dir: vec3(0,1,0), neg: vec3(0,-1,0), color: '#4db8ff', label: labelZ },
    ];

    function resize() { canvas.width = shell.clientWidth; canvas.height = shell.clientHeight; }
    resize();
    window.addEventListener('resize', () => { resize(); });

    function draw() {
      const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2;
      ctx.clearRect(0, 0, W, H);

      const vg = ctx.createRadialGradient(cx, cy, H*0.1, cx, cy, H*0.75);
      vg.addColorStop(0, 'rgba(10,14,26,0)');
      vg.addColorStop(1, 'rgba(4,5,10,0.6)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

      function ws(v) {
        const p = project(applyRot(v, cam.ry, cam.rz), cam.x, FOV, cx, cy);
        if (!p) return null;
        return { sx: p.sx + cam.panX, sy: p.sy + cam.panY, scale: p.scale };
      }

      // Particles
      particles.forEach(p => {
        p.twinkle += p.twinkleSpeed;
        const twink = Math.sin(p.twinkle) * 0.3 + 0.7;
        const pt = ws(p.pos); if (!pt) return;
        const r = p.r * pt.scale * 0.12; if (r < 0.2) return;
        const grad = ctx.createRadialGradient(pt.sx, pt.sy, 0, pt.sx, pt.sy, r*2.5);
        grad.addColorStop(0, `rgba(100,200,255,${p.opacity*twink})`);
        grad.addColorStop(0.4, `rgba(60,140,220,${p.opacity*twink*0.4})`);
        grad.addColorStop(1, `rgba(20,60,120,0)`);
        ctx.beginPath(); ctx.arc(pt.sx, pt.sy, r*2.5, 0, Math.PI*2);
        ctx.fillStyle = grad; ctx.fill();
      });

      // Origin
      const origin = ws(vec3(0,0,0));
      if (origin) {
        ctx.beginPath(); ctx.arc(origin.sx, origin.sy, 3, 0, Math.PI*2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(origin.sx, origin.sy, 6, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fill();
      }

      // Axes
      axes.forEach(axis => {
        const tip  = ws(vec3(axis.dir.x*AXIS_LEN, axis.dir.y*AXIS_LEN, axis.dir.z*AXIS_LEN));
        const neg  = ws(vec3(axis.neg.x*AXIS_LEN*0.4, axis.neg.y*AXIS_LEN*0.4, axis.neg.z*AXIS_LEN*0.4));
        const orig = ws(vec3(0,0,0));
        if (!tip || !orig || !neg) return;

        ctx.save(); ctx.setLineDash([4,6]);
        ctx.beginPath(); ctx.moveTo(orig.sx, orig.sy); ctx.lineTo(neg.sx, neg.sy);
        ctx.strokeStyle = axis.color+'66'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

        ctx.save(); ctx.shadowColor = axis.color; ctx.shadowBlur = 24;
        ctx.beginPath(); ctx.moveTo(orig.sx, orig.sy); ctx.lineTo(tip.sx, tip.sy);
        ctx.strokeStyle = axis.color; ctx.lineWidth = 3; ctx.stroke();
        ctx.shadowBlur = 6; ctx.lineWidth = 1.2; ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 0.25; ctx.stroke(); ctx.restore();

        const dx = tip.sx-orig.sx, dy = tip.sy-orig.sy, len = Math.sqrt(dx*dx+dy*dy)||1;
        const ux = dx/len, uy = dy/len, ar = 10, aw = 4.5;
        ctx.beginPath(); ctx.moveTo(tip.sx, tip.sy);
        ctx.lineTo(tip.sx-ux*ar-uy*aw, tip.sy-uy*ar+ux*aw);
        ctx.lineTo(tip.sx-ux*ar+uy*aw, tip.sy-uy*ar-ux*aw);
        ctx.closePath(); ctx.fillStyle = axis.color; ctx.fill();

        const dx2 = tip.sx-cx, dy2 = tip.sy-cy, ln = Math.sqrt(dx2*dx2+dy2*dy2)||1;
        axis.label.style.left = (tip.sx+dx2/ln*16-6)+'px';
        axis.label.style.top  = (tip.sy+dy2/ln*16-7)+'px';
      });

      // Tick marks
      axes.forEach(axis => {
        for (let t = 1; t <= AXIS_LEN; t++) {
          const tp = ws(vec3(axis.dir.x*t, axis.dir.y*t, axis.dir.z*t));
          const tn = ws(vec3(axis.neg.x*t, axis.neg.y*t, axis.neg.z*t));
          [tp, tn].forEach((pt, i) => {
            if (!pt || !origin) return;
            const dx = pt.sx-origin.sx, dy = pt.sy-origin.sy, len = Math.sqrt(dx*dx+dy*dy)||1;
            const px = -dy/len*4, py = dx/len*4;
            ctx.beginPath(); ctx.moveTo(pt.sx-px, pt.sy-py); ctx.lineTo(pt.sx+px, pt.sy+py);
            ctx.strokeStyle = axis.color+(i===0?'99':'33'); ctx.lineWidth = 1; ctx.stroke();
          });
        }
      });

      // ── Segments ──
      segments.forEach(seg => {
        const pA = ws(vec3(seg.a.x, seg.a.z, seg.a.y));
        const pB = ws(vec3(seg.b.x, seg.b.z, seg.b.y));
        if (!pA || !pB) return;
        ctx.save();
        ctx.beginPath(); ctx.moveTo(pA.sx, pA.sy); ctx.lineTo(pB.sx, pB.sy);
        ctx.strokeStyle = 'rgba(160,170,180,0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      // ── User points ──
      const linkedPts = new Set(segments.flatMap(s => [s.a, s.b]));
      points.forEach(pt => {
        const p = ws(vec3(pt.x, pt.z, pt.y)); if (!p) return;
        const r = Math.max(2, Math.min(5, p.scale * 1.2));
        const isLinked = linkedPts.has(pt);

        const dotColor  = isLinked ? 'rgba(80,180,255,0.9)'  : 'rgba(160,180,200,0.35)';
        const glowColor = isLinked ? 'rgba(60,160,255,0)'    : 'rgba(100,140,180,0)';
        const glowStart = isLinked ? 'rgba(80,180,255,0.4)'  : 'rgba(160,180,200,0.35)';
        const solidFill = isLinked ? '#4ab4f0'               : '#8a9aaa';
        const strokeCol = isLinked ? 'rgba(120,210,255,0.6)' : 'rgba(200,220,240,0.4)';
        const labelCol  = isLinked ? 'rgba(100,200,255,0.95)': 'rgba(180,210,235,0.9)';

        // Outer glow
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r*3);
        grad.addColorStop(0, glowStart);
        grad.addColorStop(1, glowColor);
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r*3, 0, Math.PI*2);
        ctx.fillStyle = grad; ctx.fill();

        // Solid dot
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI*2);
        ctx.fillStyle = solidFill; ctx.fill();
        ctx.strokeStyle = strokeCol; ctx.lineWidth = 1; ctx.stroke();

        // Letter label
        ctx.font = "bold 10px 'Share Tech Mono', monospace";
        ctx.fillStyle = labelCol;
        ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
        ctx.fillText(pt.letter, p.sx + r + 3, p.sy - 2);
      });

      // HUD
      coords.innerHTML =
        `ry <span style="color:#4db8ff">${(cam.ry*180/Math.PI).toFixed(1)}°</span><br>` +
        `rz <span style="color:#4db8ff">${(cam.rz*180/Math.PI).toFixed(1)}°</span><br>` +
        `cam.x <span style="color:#4db8ff">${cam.x.toFixed(2)}</span><br>` +
        `pan.x <span style="color:#4db8ff">${cam.panX.toFixed(1)}</span><br>` +
        `pan.y <span style="color:#4db8ff">${cam.panY.toFixed(1)}</span>`;
    }

    function loop() { draw(); requestAnimationFrame(loop); }
    loop();

    // ─────────────────────────────────────────────────────────────
    // INTERACTION
    // ─────────────────────────────────────────────────────────────
    let mouse = { down: false, mid: false, x: 0, y: 0 };

    shell.addEventListener('mousedown', e => {
      if (isScrubbing) return; // Prevent camera rotation when scrubbing a value
      if (tab.classList.contains('open')) return; // Sidebar interactions should not move the 3D space
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (e.button === 0) { mouse.down = true; shell.style.cursor = 'grabbing'; }
      if (e.button === 1) { e.preventDefault(); mouse.mid = true; shell.style.cursor = 'move'; }
    });

    window.addEventListener('mousemove', e => {
      if (!mouse.down && !mouse.mid) return;
      const dx = e.clientX - mouse.x, dy = e.clientY - mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (mouse.down) {
        cam.ry += dx * 0.005; cam.rz += dy * 0.005;
        cam.rz = Math.max(-Math.PI/2+0.05, Math.min(Math.PI/2-0.05, cam.rz));
      }
      if (mouse.mid) {
        cam.panX += dx;
        cam.panY += dy;
      }
    });

    window.addEventListener('mouseup', e => {
      if (e.button === 0) { mouse.down = false; shell.style.cursor = 'crosshair'; }
      if (e.button === 1) { mouse.mid = false; shell.style.cursor = 'crosshair'; }
    });

    shell.addEventListener('wheel', e => {
      if (isScrubbing) return; // Prevent zooming when scrubbing a value
      if (tab.classList.contains('open')) return; // Sidebar scroll should not zoom the 3D space
      e.preventDefault();
      cam.x -= e.deltaY * 0.005;
      cam.x = Math.max(-20, Math.min(20, cam.x));
    }, { passive: false });

    shell.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mount());
  } else {
    mount();
  }

})();
