/* =========================================================================
   Pixel Lab · Aplicación (rutas, visor de viñetas, preguntas y progreso)
   ========================================================================= */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const main = $('#main');
  const BLOCKS = PL.blocks, CONCEPTS = PL.concepts;
  CONCEPTS.forEach((c, i) => { c.index = i; });

  /* ---------------- almacenamiento seguro ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('pl-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('pl-' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  let progress = store.get('progress', {});   // { conceptId: { seen: [panelIdx...], quiz: {qIdx: bool} } }
  const prog = id => (progress[id] = progress[id] || { seen: [], quiz: {} });
  const saveProgress = () => store.set('progress', progress);
  function conceptState(c) {
    const p = progress[c.id];
    if (!p || !p.seen.length) return 'todo';
    return p.seen.length >= c.panels.length ? 'done' : 'doing';
  }

  /* ---------------- tema ---------------- */
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('pl-theme', next); } catch (e) { /* nada */ }
  });

  /* ---------------- menú lateral ---------------- */
  const sidebar = $('#sidebar'), scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function setMenu(open) {
    sidebar.classList.toggle('open', open);
    scrim.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!sidebar.classList.contains('open')));
  scrim.addEventListener('click', () => setMenu(false));

  function renderSidebar(activeId) {
    const q = ($('#searchInput').value || '').trim().toLowerCase();
    const match = c => !q || [c.title, c.idea, ...(c.terms || []).map(t => t[0])].join(' ').toLowerCase().includes(q);
    const activeBlock = activeId ? CONCEPTS.find(c => c.id === activeId)?.block : null;
    $('#sideNav').innerHTML = BLOCKS.map(b => {
      const list = CONCEPTS.filter(c => c.block === b.id && match(c));
      if (!list.length) return '';
      const done = CONCEPTS.filter(c => c.block === b.id && conceptState(c) === 'done').length;
      const total = CONCEPTS.filter(c => c.block === b.id).length;
      const open = q || !activeId || b.id === activeBlock;
      return `<details class="nav-block" ${open ? 'open' : ''} style="--bc:${b.color}">
        <summary><span class="nb-num">${b.n}</span><span class="nb-title">${esc(b.short)}</span><span class="nb-count">${done}/${total}</span></summary>
        <ol>${list.map(c => `<li><a href="#/c/${c.id}" class="nav-item state-${conceptState(c)}" ${c.id === activeId ? 'aria-current="page"' : ''}><span class="dot" aria-hidden="true"></span><span>${esc(c.title)}</span></a></li>`).join('')}</ol>
        <a class="nav-review" href="#/repaso/${b.id}">Repaso del bloque ${b.n}</a>
      </details>`;
    }).join('') || '<p class="empty">Sin resultados. Prueba otra palabra.</p>';
    const done = CONCEPTS.filter(c => conceptState(c) === 'done').length;
    $('#topProgress').innerHTML = `<span class="tp-bar"><i style="width:${(done / CONCEPTS.length) * 100}%"></i></span><span class="tp-label">${done}/${CONCEPTS.length} conceptos</span>`;
  }
  $('#searchInput').addEventListener('input', () => renderSidebar(current.concept && current.concept.id));
  $('#resetProgress').addEventListener('click', () => {
    if (!confirm('¿Borrar tu progreso (viñetas vistas y resultados de los tests) en este navegador?')) return;
    progress = {}; saveProgress(); route();
  });

  /* ---------------- dibujo ---------------- */
  function drawStatic(canvas, panel, step) {
    const n = (panel.steps || []).length;
    PL.renderPanel(canvas.getContext('2d'), panel, step == null ? n - 1 : step, 1, 1.25);
  }
  function stepDuration(text, speed) { return (2600 + String(text).length * 42) * speed; }

  /* ---------------- visor ---------------- */
  class Viewer {
    constructor(root, concept, opts = {}) {
      this.root = root; this.concept = concept; this.opts = opts;
      this.canvas = $('canvas.stage', root);
      this.ctx = this.canvas.getContext('2d');
      this.panel = 0; this.step = 0; this.t0 = performance.now();
      this.playing = false; this.speed = store.get('speed', 1); this.nextAt = 0;
      this.alive = true;
      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }
    get panelObj() { return this.concept.panels[this.panel]; }
    get steps() { return this.panelObj.steps || ['']; }
    set(panel, step, keepPlaying) {
      this.panel = Math.max(0, Math.min(this.concept.panels.length - 1, panel));
      this.step = Math.max(0, Math.min(this.steps.length - 1, step));
      this.t0 = performance.now();
      if (!keepPlaying && this.opts.manualStops !== false) { /* mantener estado */ }
      this.scheduleNext();
      this.markSeen();
      this.updateUI();
    }
    markSeen() {
      if (this.opts.track === false) return;
      if (this.step === this.steps.length - 1) {
        const p = prog(this.concept.id);
        if (!p.seen.includes(this.panel)) { p.seen.push(this.panel); saveProgress(); renderSidebar(this.concept.id); updateConceptBadges(); }
      }
    }
    next(fromUser) {
      if (this.step < this.steps.length - 1) return this.set(this.panel, this.step + 1, true);
      if (this.panel < this.concept.panels.length - 1) return this.set(this.panel + 1, 0, true);
      if (fromUser && this.opts.onEnd) return this.opts.onEnd();
      this.setPlaying(false);
    }
    prev(fromUser) {
      if (this.step > 0) return this.set(this.panel, this.step - 1);
      if (this.panel > 0) { const pp = this.concept.panels[this.panel - 1]; return this.set(this.panel - 1, (pp.steps || ['']).length - 1); }
      if (fromUser && this.opts.onStart) this.opts.onStart();
    }
    setPlaying(v) {
      this.playing = v;
      this.scheduleNext();
      this.updateUI();
    }
    scheduleNext() { this.nextAt = performance.now() + stepDuration(this.steps[this.step], this.speed); }
    loop(now) {
      if (!this.alive) return;
      if (this.playing && now >= this.nextAt) {
        const last = this.step === this.steps.length - 1 && this.panel === this.concept.panels.length - 1;
        if (last && !this.opts.loopAll) this.setPlaying(false);
        else if (last) this.set(0, 0, true);
        else this.next(false);
      }
      if (!document.hidden) {
        const p = Math.min(1, (now - this.t0) / 750);
        PL.renderPanel(this.ctx, this.panelObj, this.step, p, now / 1000);
        if (this.playing) {
          const bar = $('.np-timer i', this.root);
          if (bar) bar.style.width = Math.max(0, Math.min(100, 100 - ((this.nextAt - now) / stepDuration(this.steps[this.step], this.speed)) * 100)) + '%';
        }
      }
      requestAnimationFrame(this.loop);
    }
    destroy() { this.alive = false; }
    updateUI() {
      const r = this.root, s = this.steps, pn = this.concept.panels.length;
      const set = (sel, fn) => { const el = $(sel, r); if (el) fn(el); };
      set('.np-text', el => { el.textContent = s[this.step]; });
      set('.np-count', el => { el.textContent = `Paso ${this.step + 1} de ${s.length}`; });
      set('.np-panel', el => { el.textContent = `Viñeta ${this.panel + 1} de ${pn} · ${this.panelObj.title}`; });
      set('.np-dots', el => {
        el.innerHTML = s.map((_, i) => `<button type="button" class="${i === this.step ? 'on' : i < this.step ? 'past' : ''}" data-step="${i}" aria-label="Ir al paso ${i + 1}"></button>`).join('');
      });
      set('.vw-caption', el => { el.textContent = this.panelObj.caption || ''; });
      set('.vw-title', el => { el.textContent = this.panelObj.title; });
      set('[data-act="play"]', el => { el.innerHTML = this.playing ? '<span aria-hidden="true">❚❚</span> Pausa' : '<span aria-hidden="true">▶</span> Reproducir'; el.setAttribute('aria-pressed', String(this.playing)); });
      set('.np-timer', el => { el.hidden = !this.playing; });
      $$('.strip-item', r).forEach((b, i) => { b.classList.toggle('on', i === this.panel); b.setAttribute('aria-current', i === this.panel ? 'true' : 'false'); });
      updateConceptBadges();
    }
  }

  function updateConceptBadges() {
    if (!current.concept) return;
    const p = progress[current.concept.id] || { seen: [] };
    $$('.strip-item').forEach((b, i) => b.classList.toggle('seen', p.seen.includes(i)));
  }

  /* ---------------- estado de la vista ---------------- */
  const current = { viewer: null, concept: null, hero: null };
  function cleanup() {
    if (current.viewer) current.viewer.destroy();
    if (current.hero) current.hero.destroy();
    current.viewer = null; current.hero = null; current.concept = null;
  }

  /* ---------------- vistas ---------------- */
  function viewHome() {
    const nPanels = CONCEPTS.reduce((a, c) => a + c.panels.length, 0);
    const nQ = CONCEPTS.reduce((a, c) => a + c.questions.length, 0);
    const nQuiz = CONCEPTS.reduce((a, c) => a + c.quiz.length, 0);
    const last = store.get('last', null);
    const lastC = last && CONCEPTS.find(c => c.id === last);
    const startHref = '#/c/' + (lastC ? lastC.id : CONCEPTS[0].id);
    main.innerHTML = `
      <section class="home-hero">
        <div class="hh-copy">
          <p class="eyebrow">Cámara de Comercio de Granada · NTT DATA · Máster en Inteligencia Artificial</p>
          <h1>Fundamentos de IA aplicada</h1>
          <p class="lead">Un laboratorio visual para entender, en clase y en casa, cómo funcionan las herramientas de IA, cómo pedirles las cosas y cómo comprobar lo que devuelven.</p>
          <div class="hh-actions">
            <a class="btn primary" href="${startHref}">${lastC ? 'Continuar: ' + esc(lastC.title) : 'Empezar por el bloque 1'} →</a>
            <a class="btn" href="#/glosario">Glosario</a>
          </div>
          <ul class="stats">
            <li><strong>${BLOCKS.length}</strong><span>bloques · 28 h</span></li>
            <li><strong>${CONCEPTS.length}</strong><span>conceptos</span></li>
            <li><strong>${nPanels}</strong><span>viñetas animadas</span></li>
            <li><strong>${nQ + nQuiz}</strong><span>preguntas</span></li>
          </ul>
        </div>
        <figure class="hh-art viewer mini-viewer">
          <div class="stage-wrap"><canvas class="stage" width="1920" height="1080" role="img" aria-label="Viñeta de ejemplo animada"></canvas></div>
          <figcaption class="hh-caption"><span class="vw-title"></span><span class="np-text"></span></figcaption>
        </figure>
      </section>

      <blockquote class="principle">
        <p><strong>Principio de toda la asignatura:</strong> la IA no elimina el juicio profesional. Reduce parte del trabajo de búsqueda, redacción, clasificación o prototipado; la responsabilidad de definir el problema, verificar lo relevante y decidir sigue siendo humana.</p>
      </blockquote>

      <section class="howto" aria-labelledby="howto-title">
        <h2 id="howto-title">Cómo usar Pixel Lab</h2>
        <div class="howto-grid">
          <article><h3><span class="tag">En clase</span> Proyecta y avanza paso a paso</h3><p>Abre un concepto y pulsa <kbd>F</kbd> para pantalla completa. Cada viñeta se construye paso a paso con <kbd>→</kbd> o con un mando de presentación; el texto narrado aparece bajo la imagen. Al terminar una viñeta se pasa a la siguiente.</p></article>
          <article><h3><span class="tag">Para estudiar</span> Mira, piensa y comprueba</h3><p>Reproduce las viñetas, lee la explicación y los ejemplos, intenta responder las preguntas de reflexión antes de abrir la respuesta y termina con el test. Tu progreso se guarda en este navegador.</p></article>
          <article><h3><span class="tag">Atajos</span> Teclado</h3><ul class="keys">
            <li><kbd>→</kbd> <kbd>←</kbd> paso siguiente / anterior</li>
            <li><kbd>Espacio</kbd> reproducir o pausar</li>
            <li><kbd>F</kbd> pantalla completa</li>
            <li><kbd>1</kbd>…<kbd>9</kbd> ir a la viñeta</li>
            <li><kbd>Mayús</kbd>+<kbd>→</kbd> siguiente concepto</li></ul></article>
        </div>
      </section>

      <section class="blocks" aria-labelledby="blocks-title">
        <h2 id="blocks-title">El temario en cinco bloques</h2>
        <div class="block-grid">
          ${BLOCKS.map(b => {
            const list = CONCEPTS.filter(c => c.block === b.id);
            const done = list.filter(c => conceptState(c) === 'done').length;
            const panels = list.reduce((a, c) => a + c.panels.length, 0);
            return `<article class="block-card" style="--bc:${b.color}">
              <header><span class="bk-num">${b.n}</span><div><p class="eyebrow">Bloque ${b.n} · ${b.hours} horas</p><h3>${esc(b.title)}</h3></div></header>
              <p class="bk-q">${esc(b.question)}</p>
              <p class="bk-idea">${esc(b.idea)}</p>
              <div class="bk-progress"><span><i style="width:${(done / list.length) * 100}%"></i></span><small>${done}/${list.length} conceptos · ${panels} viñetas</small></div>
              <ol class="bk-list">${list.map(c => `<li><a href="#/c/${c.id}" class="state-${conceptState(c)}"><span class="dot" aria-hidden="true"></span>${esc(c.title)}</a></li>`).join('')}</ol>
              <footer><a class="btn small primary" href="#/c/${list[0].id}">Empezar</a><a class="btn small" href="#/repaso/${b.id}">Repaso · ${list.reduce((a, c) => a + c.quiz.length, 0)} preguntas</a><span class="bk-ev">Evidencia: ${esc(b.evidence)}</span></footer>
            </article>`;
          }).join('')}
        </div>
      </section>`;

    // viñetas de muestra que van rotando
    const picks = [['mapa-ia', 0], ['siguiente-token', 0], ['anatomia-prompt', 0], ['flujo-sdd', 0], ['rag', 0], ['comparar', 0]]
      .map(([id, pi]) => { const c = CONCEPTS.find(x => x.id === id); return c && c.panels[pi] ? { title: c.title, panels: [c.panels[pi]], id } : null; })
      .filter(Boolean);
    const showcase = { id: 'showcase', title: 'Muestra', panels: picks.map(p => p.panels[0]) };
    if (showcase.panels.length) {
      const root = $('.hh-art');
      current.hero = new Viewer(root, showcase, { track: false, loopAll: true });
      current.hero.speed = 0.55;
      current.hero.set(0, 0);
      current.hero.setPlaying(true);
      root.addEventListener('click', () => { location.hash = '#/c/' + picks[current.hero.panel].id; });
      root.style.cursor = 'pointer';
    }
  }

  function viewConcept(c) {
    store.set('last', c.id);
    current.concept = c;
    const b = BLOCKS[c.blockIndex];
    const inBlock = CONCEPTS.filter(x => x.block === c.block);
    const pos = inBlock.indexOf(c) + 1;
    const prevC = CONCEPTS[c.index - 1], nextC = CONCEPTS[c.index + 1];
    const p = prog(c.id);
    main.innerHTML = `
      <article class="concept" style="--bc:${b.color}">
        <nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a><span aria-hidden="true">/</span><span>Bloque ${b.n} · ${esc(b.short)}</span><span aria-hidden="true">/</span><span>Concepto ${pos} de ${inBlock.length}</span></nav>
        <header class="concept-head">
          <div>
            <p class="eyebrow">Bloque ${b.n} · ${esc(b.title)}${c.slide ? ` <span class="slide-tag">Diapositiva ${esc(c.slide)}</span>` : ''}</p>
            <h1>${esc(c.title)}</h1>
          </div>
        </header>

        <section class="viewer" aria-label="Viñetas animadas">
          <div class="vw-head">
            <div><p class="vw-kicker np-panel"></p><h2 class="vw-title"></h2></div>
            <div class="vw-tools">
              <label class="speed" title="Velocidad de reproducción automática">Ritmo
                <select data-act="speed"><option value="1.5">pausado</option><option value="1">normal</option><option value="0.7">ágil</option></select>
              </label>
              <button type="button" class="btn small" data-act="fullscreen" title="Pantalla completa (F)"><span aria-hidden="true">⛶</span> Presentar</button>
            </div>
          </div>
          <div class="stage-wrap">
            <canvas class="stage" width="1920" height="1080" role="img" aria-label="Viñeta animada en pixel art. La narración de cada paso aparece debajo."></canvas>
            <button type="button" class="stage-hit prev" data-act="prev" aria-label="Paso anterior"></button>
            <button type="button" class="stage-hit next" data-act="next" aria-label="Paso siguiente"></button>
          </div>
          <div class="narration" aria-live="polite">
            <div class="np-meta"><span class="np-count"></span><span class="np-dots"></span><span class="np-timer" hidden><i></i></span></div>
            <p class="np-text"></p>
          </div>
          <div class="vw-controls">
            <button type="button" class="btn" data-act="prev"><span aria-hidden="true">←</span> Anterior</button>
            <button type="button" class="btn primary" data-act="play"></button>
            <button type="button" class="btn" data-act="next">Siguiente <span aria-hidden="true">→</span></button>
            <button type="button" class="btn ghost" data-act="restart" title="Volver al primer paso de la viñeta">↺ Reiniciar viñeta</button>
          </div>
          <p class="vw-caption"></p>
          <div class="strip" role="list" aria-label="Viñetas de este concepto">
            ${c.panels.map((pn, i) => `<button type="button" role="listitem" class="strip-item ${p.seen.includes(i) ? 'seen' : ''}" data-panel="${i}" title="${esc(pn.title)}">
              <canvas width="480" height="270" aria-hidden="true"></canvas>
              <span class="si-label"><b>${i + 1}</b> ${esc(pn.title)}</span>
            </button>`).join('')}
          </div>
        </section>

        <p class="idea idea-key"><span class="idea-label">Idea clave · en una frase</span>${esc(c.idea)}</p>

        <div class="study-grid">
          <section class="card explain"><h2><span class="h-icon" aria-hidden="true">i</span>Explicación</h2>${c.explain.map(t => `<p>${esc(t)}</p>`).join('')}</section>
          <section class="card examples"><h2><span class="h-icon" aria-hidden="true">★</span>Ejemplos</h2><ul>${c.examples.map(e => `<li><strong>${esc(e[0])}</strong><span>${esc(e[1])}</span></li>`).join('')}</ul></section>
          <section class="card mistakes"><h2><span class="h-icon" aria-hidden="true">!</span>Errores frecuentes</h2><ul>${c.mistakes.map(m => `<li>${esc(m)}</li>`).join('')}</ul></section>
          <section class="card terms"><h2><span class="h-icon" aria-hidden="true">#</span>Vocabulario</h2><dl>${c.terms.map(t => `<div><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join('')}</dl></section>
        </div>

        <section class="card reflect" aria-labelledby="reflect-title">
          <div class="sec-head"><h2 id="reflect-title"><span class="h-icon" aria-hidden="true">?</span>Reflexiona y debate</h2><button type="button" class="btn small ghost" id="toggleAll">Mostrar todas las respuestas</button></div>
          <p class="hint">Intenta responder antes de abrir la respuesta orientativa. En clase, úsalas para debatir en parejas.</p>
          <ol class="qa">${c.questions.map((q, i) => `<li><p class="q">${esc(q[0])}</p><button type="button" class="reveal" aria-expanded="false" aria-controls="ans-${i}">Ver respuesta orientativa</button><div class="a" id="ans-${i}" hidden><p>${esc(q[1])}</p></div></li>`).join('')}</ol>
        </section>

        <section class="card quiz" aria-labelledby="quiz-title">
          <div class="sec-head"><h2 id="quiz-title"><span class="h-icon" aria-hidden="true">✓</span>Ponte a prueba</h2><span class="quiz-score" id="quizScore"></span></div>
          <div id="quizBox"></div>
        </section>

        <nav class="pager" aria-label="Conceptos">
          ${prevC ? `<a class="pg prev" href="#/c/${prevC.id}"><small>← Anterior</small><span>${esc(prevC.title)}</span></a>` : '<span></span>'}
          ${nextC ? `<a class="pg next" href="#/c/${nextC.id}"><small>Siguiente →</small><span>${esc(nextC.title)}</span></a>` : `<a class="pg next" href="#/repaso/${c.block}"><small>Fin del temario →</small><span>Repaso del bloque ${b.n}</span></a>`}
        </nav>
      </article>`;

    // visor
    const root = $('.viewer', main);
    const v = new Viewer(root, c, {
      onEnd: () => { if (nextC) location.hash = '#/c/' + nextC.id; },
      onStart: () => { if (prevC) { pendingEnd = true; location.hash = '#/c/' + prevC.id; } }
    });
    current.viewer = v;
    $('[data-act="speed"]', root).value = String(v.speed);
    if (pendingEnd) { pendingEnd = false; const lp = c.panels.length - 1; v.set(lp, (c.panels[lp].steps || ['']).length - 1); }
    else v.set(0, 0);

    root.addEventListener('click', e => {
      const t = e.target.closest('[data-act],[data-step],[data-panel]');
      if (!t) return;
      if (t.dataset.step != null) return v.set(v.panel, Number(t.dataset.step));
      if (t.dataset.panel != null) return v.set(Number(t.dataset.panel), 0);
      const act = t.dataset.act;
      if (act === 'next') v.next(true);
      if (act === 'prev') v.prev(true);
      if (act === 'play') v.setPlaying(!v.playing);
      if (act === 'restart') v.set(v.panel, 0);
      if (act === 'fullscreen') toggleFullscreen(root);
    });
    $('[data-act="speed"]', root).addEventListener('change', e => { v.speed = Number(e.target.value); store.set('speed', v.speed); v.scheduleNext(); });

    // miniaturas
    $$('.strip-item canvas', root).forEach((cv, i) => drawStatic(cv, c.panels[i]));

    // preguntas
    $$('.reveal', main).forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'Ver respuesta orientativa' : 'Ocultar respuesta';
      $('#' + btn.getAttribute('aria-controls')).hidden = open;
    }));
    $('#toggleAll').addEventListener('click', e => {
      const anyClosed = $$('.reveal', main).some(b => b.getAttribute('aria-expanded') === 'false');
      $$('.reveal', main).forEach(b => { if ((b.getAttribute('aria-expanded') === 'false') === anyClosed) b.click(); });
      e.currentTarget.textContent = anyClosed ? 'Ocultar todas las respuestas' : 'Mostrar todas las respuestas';
    });

    renderQuiz($('#quizBox'), c.quiz.map((q, i) => ({ q, key: [c.id, i] })), $('#quizScore'));
  }
  let pendingEnd = false;

  function renderQuiz(box, items, scoreEl) {
    const answered = () => items.filter(it => prog(it.key[0]).quiz[it.key[1]] != null);
    const score = () => { const a = answered(); const ok = a.filter(it => prog(it.key[0]).quiz[it.key[1]].ok).length; if (scoreEl) scoreEl.textContent = a.length ? `${ok} de ${items.length} correctas` : `${items.length} preguntas`; };
    box.innerHTML = items.map((it, i) => {
      const saved = prog(it.key[0]).quiz[it.key[1]];
      return `<fieldset class="qz ${saved ? (saved.ok ? 'ok' : 'ko') : ''}" data-i="${i}">
        <legend>${it.label ? `<span class="qz-from">${esc(it.label)}</span>` : ''}${i + 1}. ${esc(it.q.q)}</legend>
        <div class="qz-opts">${it.q.o.map((o, j) => {
          const cls = saved ? (j === it.q.c ? 'correct' : j === saved.pick ? 'wrong' : '') : '';
          return `<button type="button" data-j="${j}" class="${cls}" ${saved ? 'disabled' : ''}><span class="qz-letter">${'ABCD'[j]}</span>${esc(o)}</button>`;
        }).join('')}</div>
        <p class="qz-why" ${saved ? '' : 'hidden'}><strong>${saved ? (saved.ok ? '¡Correcto!' : 'No exactamente.') : ''}</strong> ${esc(it.q.why)}</p>
      </fieldset>`;
    }).join('') + `<div class="qz-actions"><button type="button" class="btn small ghost" data-reset>Repetir el test</button></div>`;
    box.addEventListener('click', e => {
      if (e.target.closest('[data-reset]')) { items.forEach(it => { delete prog(it.key[0]).quiz[it.key[1]]; }); saveProgress(); renderQuiz(box, items, scoreEl); return; }
      const btn = e.target.closest('button[data-j]');
      if (!btn || btn.disabled) return;
      const fs = btn.closest('fieldset'), it = items[Number(fs.dataset.i)], j = Number(btn.dataset.j);
      const ok = j === it.q.c;
      prog(it.key[0]).quiz[it.key[1]] = { ok, pick: j }; saveProgress();
      $$('button', fs).forEach((b, k) => { b.disabled = true; if (k === it.q.c) b.classList.add('correct'); else if (k === j) b.classList.add('wrong'); });
      fs.classList.add(ok ? 'ok' : 'ko');
      const why = $('.qz-why', fs); why.hidden = false; why.querySelector('strong').textContent = ok ? '¡Correcto!' : 'No exactamente.';
      score();
    }, { once: false });
    score();
  }

  function viewReview(b) {
    const list = CONCEPTS.filter(c => c.block === b.id);
    const items = [];
    list.forEach(c => c.quiz.forEach((q, i) => items.push({ q, key: [c.id, i], label: c.title })));
    main.innerHTML = `<article class="concept review" style="--bc:${b.color}">
      <nav class="crumbs"><a href="#/">Inicio</a><span aria-hidden="true">/</span><span>Repaso</span></nav>
      <header class="concept-head"><div><p class="eyebrow">Repaso · Bloque ${b.n} · ${b.hours} horas</p><h1>${esc(b.title)}</h1><p class="idea"><span class="idea-label">Pregunta del bloque</span>${esc(b.question)}</p></div></header>
      <section class="card quiz"><div class="sec-head"><h2><span class="h-icon" aria-hidden="true">✓</span>Test de repaso</h2><span class="quiz-score" id="quizScore"></span></div><p class="hint">Reúne todas las preguntas de autoevaluación del bloque. Si fallas alguna, vuelve al concepto indicado.</p><div id="quizBox"></div></section>
      <section class="card"><h2><span class="h-icon" aria-hidden="true">?</span>Banco de preguntas para debate</h2><ol class="qa plain">${list.map(c => `<li><p class="q"><a href="#/c/${c.id}">${esc(c.title)}</a> · ${esc(c.questions[0][0])}</p></li>`).join('')}</ol></section>
      <nav class="pager">${BLOCKS[b.n - 2] ? `<a class="pg prev" href="#/repaso/${BLOCKS[b.n - 2].id}"><small>← Repaso anterior</small><span>Bloque ${b.n - 1}</span></a>` : '<span></span>'}${BLOCKS[b.n] ? `<a class="pg next" href="#/c/${CONCEPTS.find(c => c.block === BLOCKS[b.n].id).id}"><small>Siguiente bloque →</small><span>${esc(BLOCKS[b.n].title)}</span></a>` : '<a class="pg next" href="#/"><small>Fin →</small><span>Volver al inicio</span></a>'}</nav>
    </article>`;
    renderQuiz($('#quizBox'), items, $('#quizScore'));
  }

  function viewGlossary() {
    const terms = [];
    CONCEPTS.forEach(c => (c.terms || []).forEach(t => terms.push({ t: t[0], d: t[1], c })));
    terms.sort((a, b) => a.t.localeCompare(b.t, 'es', { sensitivity: 'base' }));
    main.innerHTML = `<article class="concept glossary">
      <nav class="crumbs"><a href="#/">Inicio</a><span aria-hidden="true">/</span><span>Glosario</span></nav>
      <header class="concept-head"><div><p class="eyebrow">Vocabulario mínimo de la asignatura</p><h1>Glosario</h1><p class="idea"><span class="idea-label">${terms.length} términos</span>Cada término enlaza con el concepto donde se explica con viñetas.</p></div></header>
      <div class="search inline"><label class="sr-only" for="glossFilter">Filtrar términos</label><input id="glossFilter" type="search" placeholder="Filtrar términos…" /></div>
      <dl class="gloss">${terms.map(x => `<div class="gl" data-k="${esc((x.t + ' ' + x.d).toLowerCase())}"><dt>${esc(x.t)}</dt><dd>${esc(x.d)} <a href="#/c/${x.c.id}">Ver «${esc(x.c.title)}» →</a></dd></div>`).join('')}</dl>
    </article>`;
    $('#glossFilter').addEventListener('input', e => { const q = e.target.value.toLowerCase().trim(); $$('.gl').forEach(el => { el.hidden = q && !el.dataset.k.includes(q); }); });
  }

  /* ---------------- pantalla completa ---------------- */
  function toggleFullscreen(el) {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => el.classList.toggle('pseudo-fs'));
    else el.classList.toggle('pseudo-fs');
  }

  /* ---------------- teclado ---------------- */
  window.addEventListener('keydown', e => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const v = current.viewer;
    if (!v) return;
    const onButton = tag === 'BUTTON' && !document.activeElement.classList.contains('stage-hit');
    if (e.shiftKey && e.key === 'ArrowRight') { const n = CONCEPTS[current.concept.index + 1]; if (n) location.hash = '#/c/' + n.id; e.preventDefault(); return; }
    if (e.shiftKey && e.key === 'ArrowLeft') { const n = CONCEPTS[current.concept.index - 1]; if (n) location.hash = '#/c/' + n.id; e.preventDefault(); return; }
    if (['ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); v.next(true); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); v.prev(true); }
    else if (e.key === ' ' && !onButton) { e.preventDefault(); v.setPlaying(!v.playing); }
    else if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen($('.viewer', main)); }
    else if (e.key === 'Home') { v.set(0, 0); }
    else if (/^[1-9]$/.test(e.key)) { const i = Number(e.key) - 1; if (i < v.concept.panels.length) v.set(i, 0); }
    else if (e.key === 'Escape') { $('.viewer.pseudo-fs') && $('.viewer.pseudo-fs').classList.remove('pseudo-fs'); }
  });

  /* ---------------- rutas ---------------- */
  function route() {
    cleanup();
    setMenu(false);
    const h = location.hash.replace(/^#\/?/, '');
    const [kind, id] = h.split('/');
    let activeId = null;
    $$('.topbar-links a').forEach(a => a.removeAttribute('aria-current'));
    if (kind === 'c' && CONCEPTS.find(c => c.id === id)) { const c = CONCEPTS.find(x => x.id === id); activeId = c.id; viewConcept(c); document.title = c.title + ' · Pixel Lab'; }
    else if (kind === 'repaso' && BLOCKS.find(b => b.id === id)) { const b = BLOCKS.find(x => x.id === id); viewReview(b); document.title = 'Repaso bloque ' + b.n + ' · Pixel Lab'; }
    else if (kind === 'glosario') { viewGlossary(); $('[data-nav="glossary"]').setAttribute('aria-current', 'page'); document.title = 'Glosario · Pixel Lab'; }
    else { viewHome(); $('[data-nav="home"]').setAttribute('aria-current', 'page'); document.title = 'Pixel Lab · Fundamentos de IA aplicada'; }
    renderSidebar(activeId);
    const act = $('.nav-item[aria-current="page"]');
    if (act) act.scrollIntoView({ block: 'nearest' });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();

  // Redibujar miniaturas cuando lleguen las fuentes
  if (document.fonts && document.fonts.load) {
    Promise.all(['400 10px "Tiny5"', '700 10px "Atkinson Hyperlegible"', '500 10px "JetBrains Mono"', '600 10px "Pixelify Sans"'].map(f => document.fonts.load(f).catch(() => null)))
      .then(() => { if (current.concept) $$('.strip-item canvas', main).forEach((cv, i) => drawStatic(cv, current.concept.panels[i])); });
  }

  PL.app = { drawStatic, current };
})();
