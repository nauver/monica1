/* ===========================================================================
   Built locally — app
   =========================================================================== */

const $  = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* -------------------- State -------------------- */
const state = {
  lang: localStorage.getItem('bl.lang') || (navigator.language.startsWith('fr') ? 'fr' : 'en'),
  audience: localStorage.getItem('bl.audience') || 'citizen',
  cluster: 'all',
  query: '',
  activeStory: null
};

const REPORT_CITE_LONG = {
  en: `European Committee of the Regions (2026). The state of regions and cities: EU annual report 2026. Brussels. CdR_0463/10-2026. ISBN 978-92-895-4140-4. DOI 10.2863/1166719. Licensed under CC BY 4.0.`,
  fr: `Comité européen des régions (2026). The state of regions and cities: EU annual report 2026. Bruxelles. CdR_0463/10-2026. ISBN 978-92-895-4140-4. DOI 10.2863/1166719. Sous licence CC BY 4.0.`
};

/* -------------------- i18n -------------------- */
const t = (key) => UI[state.lang][key] ?? UI.en[key] ?? key;
const tx = (obj) => (obj && obj[state.lang]) || (obj && obj.en) || '';

function applyLang() {
  document.documentElement.lang = state.lang;
  document.body.dataset.lang = state.lang;
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const val = t(el.dataset.i18nPh);
    if (val) el.setAttribute('placeholder', val);
  });
  $('#langSelect').value = state.lang;
  localStorage.setItem('bl.lang', state.lang);
}

/* -------------------- Toast -------------------- */
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}

/* -------------------- Icon helper -------------------- */
function icon(name, size = 20) {
  const path = ICONS[name] || ICONS.pilot;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${path}</svg>`;
}

/* -------------------- Signals -------------------- */
function renderSignals() {
  const rail = $('#signalRail');
  rail.innerHTML = SIGNALS.map((s, i) => {
    const cluster = CLUSTERS[s.cluster];
    const color = cluster.color;
    return `
      <article class="signal" data-cluster="${s.cluster}" style="--c:${color}">
        <span class="n">${String(i + 1).padStart(2, '0')} / 10</span>
        <span class="cluster-tag"><span class="cluster-dot" style="background:${color}"></span>${tx(cluster.label)}</span>
        <strong class="v">${s.value}</strong>
        <h3>${tx(s.label)}</h3>
        <div class="bar"><span style="width:${Math.min(100, s.weight)}%;background:${color}"></span></div>
        <small class="layer press">Source: ${s.source}</small>
        <button class="cite" data-cite="signal" data-id="${s.id}" aria-label="${t('pulse.cite')}">⎘ ${t('pulse.cite')}</button>
      </article>`;
  }).join('');
}

function bindSignals() {
  $('#signalRail').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-cite]');
    if (!btn) return;
    const s = SIGNALS.find(x => x.id === btn.dataset.id);
    const quote = `${s.value} ${tx(s.label)}. — ${REPORT_CITE_LONG[state.lang]} ${s.source}.`;
    await copy(quote);
    toast(t('pulse.cite.done'));
  });
}

/* -------------------- Map (projection + pins) -------------------- */
// Equirectangular projection for Europe within the viewBox 1000×720.
const MAP_BOUNDS = { lngMin: -11, lngMax: 29, latMin: 35, latMax: 66 };
function project([lat, lng]) {
  const x = (lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin) * 1000;
  const y = (MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin) * 720;
  return [x, y];
}

function renderMapChips() {
  const chipsBox = $('#mapChips');
  const list = [{ id: 'all', label: { en: 'All clusters', fr: 'Tous les clusters' }, color: '#999' },
                ...Object.entries(CLUSTERS).map(([id, c]) => ({ id, label: c.label, color: c.color }))];
  chipsBox.innerHTML = list.map(c =>
    `<button class="chip" role="radio" aria-checked="${c.id === state.cluster}" aria-pressed="${c.id === state.cluster}" data-filter="${c.id}">
       <span class="d" style="background:${c.color}"></span>${tx(c.label)}
     </button>`).join('');
}

function syncClusterChips() {
  $$('.chip[data-filter]').forEach(c => {
    const on = c.dataset.filter === state.cluster;
    c.setAttribute('aria-checked', on);
    c.setAttribute('aria-pressed', on);
  });
}

function bindClusterChips() {
  document.addEventListener('click', e => {
    const b = e.target.closest('#mapChips [data-filter], #storyChips [data-filter]');
    if (!b) return;
    state.cluster = b.dataset.filter;
    syncClusterChips();
    updatePins();
    renderStories();
  });
}

function renderPins() {
  const layer = $('#pinLayer');
  layer.innerHTML = STORIES.map(s => {
    const [x, y] = project(s.coords);
    const color = CLUSTERS[s.cluster].color;
    return `
      <g class="pin" tabindex="0" role="button"
         data-id="${s.id}" data-cluster="${s.cluster}"
         style="color:${color}" aria-label="${tx(s.place)}: ${tx(s.title)}">
        <circle class="pin-glow" cx="${x}" cy="${y}" r="22" fill="url(#pinGlow)"/>
        <circle class="pin-ring" cx="${x}" cy="${y}" r="14" stroke="${color}"/>
        <circle class="pin-core" cx="${x}" cy="${y}" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>
      </g>`;
  }).join('');
}

function bindPins() {
  const layer = $('#pinLayer');
  const tip = $('#mapTip');

  layer.addEventListener('click', e => {
    const g = e.target.closest('.pin');
    if (g) openStory(g.dataset.id);
  });
  layer.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const g = e.target.closest('.pin');
      if (g) { e.preventDefault(); openStory(g.dataset.id); }
    }
  });
  const showTip = (g) => {
    const s = STORIES.find(x => x.id === g.dataset.id);
    const [x, y] = project(s.coords);
    const rect = $('#europeMap').getBoundingClientRect();
    const sx = x / 1000 * rect.width;
    const sy = y / 720 * rect.height;
    tip.innerHTML = `<strong>${tx(s.place)}</strong><em>${tx(s.title)}</em>`;
    tip.style.left = sx + 'px';
    tip.style.top  = sy + 'px';
    tip.hidden = false;
  };
  layer.addEventListener('mouseover', e => {
    const g = e.target.closest('.pin'); if (g) showTip(g);
  });
  layer.addEventListener('mouseout', e => {
    if (e.target.closest('.pin')) tip.hidden = true;
  });
  layer.addEventListener('focusin', e => {
    const g = e.target.closest('.pin'); if (g) showTip(g);
  });
  layer.addEventListener('focusout', () => tip.hidden = true);
}

function updatePins() {
  $$('#pinLayer .pin').forEach(p => {
    p.classList.toggle('dim', state.cluster !== 'all' && p.dataset.cluster !== state.cluster);
  });
}

/* -------------------- Stories grid -------------------- */
function renderStoryChips() {
  const chipsBox = $('#storyChips');
  const list = [{ id: 'all', label: { en: 'All', fr: 'Tous' }, color: '#999' },
                ...Object.entries(CLUSTERS).map(([id, c]) => ({ id, label: c.label, color: c.color }))];
  chipsBox.innerHTML = list.map(c =>
    `<button class="chip" role="radio" aria-checked="${c.id === state.cluster}" aria-pressed="${c.id === state.cluster}" data-filter="${c.id}">
       <span class="d" style="background:${c.color}"></span>${tx(c.label)}
     </button>`).join('');
}

function renderStories() {
  const q = state.query.trim().toLowerCase();
  const rows = STORIES.filter(s => {
    if (state.cluster !== 'all' && s.cluster !== state.cluster) return false;
    if (!q) return true;
    const hay = [tx(s.place), tx(s.title), tx(s.problem), tx(s.action), tx(s.result), tx(CLUSTERS[s.cluster].label)].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const count = rows.length;
  $('#storyCount').textContent = (count === 1 ? t('stories.count.one') : t('stories.count.many')).replace('{n}', count);

  $('#storyGrid').innerHTML = rows.length ? rows.map(s => {
    const cluster = CLUSTERS[s.cluster];
    const color = cluster.color;
    return `
      <article class="story" data-id="${s.id}" style="--c:${color}" tabindex="0">
        <div class="story-top">
          <span class="cluster-tag"><span class="d"></span>${tx(cluster.label)}</span>
          <small>p. ${s.page}</small>
        </div>
        <h3>${tx(s.title)}</h3>
        <p class="place">${tx(s.place)}</p>
        <div class="metric-chip">
          ${icon(s.metric.kind, 20)}
          <strong>${s.metric.value}</strong>
          <span>${tx(s.metric.unit)}</span>
        </div>
        <p class="layer colleague press"><strong>${t('stories.challenge')}:</strong> ${tx(s.problem)}</p>
      </article>`;
  }).join('') : `<p>${t('stories.none')}</p>`;

  // Animate in
  requestAnimationFrame(() => $$('#storyGrid .story').forEach(c => c.classList.add('in')));
}

$('#storySearch')?.addEventListener('input', e => { state.query = e.target.value; renderStories(); });
$('#clearStories')?.addEventListener('click', () => {
  state.query = ''; state.cluster = 'all';
  $('#storySearch').value = '';
  $$('.chip').forEach(c => {
    const on = c.dataset.filter === 'all';
    c.setAttribute('aria-checked', on);
    c.setAttribute('aria-pressed', on);
  });
  updatePins(); renderStories();
});

// Delegate story-card clicks
$('#storyGrid')?.addEventListener('click', e => {
  const card = e.target.closest('.story');
  if (card) openStory(card.dataset.id);
});
$('#storyGrid')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.story');
    if (card) { e.preventDefault(); openStory(card.dataset.id); }
  }
});

/* -------------------- Themes -------------------- */
function showTheme(i) {
  const th = THEMES[i];
  const color = CLUSTERS[th.cluster].color;
  $$('#themeTabs [role=tab]').forEach((b, n) => {
    b.setAttribute('aria-selected', n === i);
    b.tabIndex = n === i ? 0 : -1;
  });
  const related = STORIES.filter(s => s.cluster === th.cluster).slice(0, 4);
  const panel = $('#themePanel');
  panel.style.setProperty('--c', color);
  panel.innerHTML = `
    <p class="kicker">${t('themes.kicker')} · ${String(i+1).padStart(2,'0')}</p>
    <strong class="theme-stat">${th.stat}</strong>
    <h3>${tx(th.line)}</h3>
    <p>${tx(th.context)}</p>
    <div class="asks-list layer colleague press">
      <h4>${t('themes.asks')}</h4>
      <ul>${tx(th.asks).map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    ${related.length ? `<div class="asks-list">
      <h4>${t('themes.related')}</h4>
      <div class="theme-related">
        ${related.map(s => `<button data-story="${s.id}">${tx(s.place)}</button>`).join('')}
      </div>
    </div>` : ''}`;
}

function renderThemes() {
  const tabs = $('#themeTabs');
  tabs.innerHTML = THEMES.map((th, i) => {
    const color = CLUSTERS[th.cluster].color;
    return `<button role="tab" id="tab-${th.id}" aria-controls="themePanel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-i="${i}" style="--c:${color}">
              ${String(i+1).padStart(2,'0')} ${tx(th.name)}
            </button>`;
  }).join('');
  showTheme(0);
}

function bindThemes() {
  const tabs = $('#themeTabs');
  tabs.addEventListener('click', e => {
    const b = e.target.closest('button[role=tab]');
    if (b) showTheme(+b.dataset.i);
  });
  tabs.addEventListener('keydown', e => {
    const current = +document.activeElement.dataset.i;
    if (Number.isNaN(current)) return;
    if (!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    e.preventDefault();
    let n = current;
    if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = THEMES.length - 1;
    else {
      const d = ['ArrowDown','ArrowRight'].includes(e.key) ? 1 : -1;
      n = (current + d + THEMES.length) % THEMES.length;
    }
    tabs.children[n].focus();
    showTheme(n);
  });

  // Delegated: related-story buttons in the panel
  $('#themePanel').addEventListener('click', e => {
    const b = e.target.closest('[data-story]');
    if (b) openStory(b.dataset.story);
  });
}

/* -------------------- Thermometer -------------------- */
function renderThermometer() {
  // Animate headline ring to 12%
  const ring = $('#headRing');
  const circumference = 2 * Math.PI * 86;
  ring.setAttribute('stroke-dasharray', circumference);
  requestAnimationFrame(() => {
    ring.setAttribute('stroke-dashoffset', circumference * (1 - 0.12));
    ring.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)';
  });

  const grid = $('#miniGauges');
  grid.innerHTML = THERMOMETER.map(x => {
    const c = x.dir === 'improved' ? 'var(--c-rural)' : x.dir === 'worsened' ? 'var(--c-demography)' : 'var(--c-finance)';
    const r = 28, circ = 2 * Math.PI * r;
    const dash = circ * (x.pct / 100);
    return `
      <div class="mini-gauge" data-dir="${x.dir}">
        <svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true">
          <circle cx="36" cy="36" r="${r}" fill="none" stroke="#eee" stroke-width="8"/>
          <circle cx="36" cy="36" r="${r}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"
                  stroke-dasharray="${dash} ${circ - dash}" transform="rotate(-90 36 36)"/>
        </svg>
        <div class="mini-gauge-copy">
          <strong>${x.pct}%</strong>
          <span>${tx(x.label)} · ${t('thermo.' + x.dir)}</span>
        </div>
      </div>`;
  }).join('');
}

/* -------------------- Dossiers -------------------- */
function renderDossiers() {
  const box = $('#dossiers');
  box.innerHTML = THEMES.map((th, i) => {
    const related = STORIES.filter(s => s.cluster === th.cluster).slice(0, 3);
    return `<details>
      <summary><span class="n">${String(i+1).padStart(2,'0')}</span>${tx(th.name)}<b>${th.stat}</b></summary>
      <div class="dossier">
        <p>${tx(th.context)}</p>
        <h4>${t('evidence.framing')}</h4>
        <p>${th.stat} ${tx(th.line)}. — ${REPORT_CITE_LONG[state.lang]}</p>
        ${related.length ? `<h4>${t('evidence.related')}</h4>
          <ul>${related.map(s => `<li><strong>${tx(s.place)}</strong>: ${tx(s.result)} (p. ${s.page})</li>`).join('')}</ul>` : ''}
        <button class="cite" data-cite-theme="${th.id}">⎘ ${t('pulse.cite')}</button>
      </div>
    </details>`;
  }).join('');
}

function bindDossiers() {
  $('#dossiers').addEventListener('click', async e => {
    const b = e.target.closest('[data-cite-theme]');
    if (!b) return;
    const th = THEMES.find(x => x.id === b.dataset.citeTheme);
    const quote = `${th.stat} ${tx(th.line)}. — ${REPORT_CITE_LONG[state.lang]}`;
    await copy(quote);
    toast(t('pulse.cite.done'));
  });
}

/* -------------------- Story modal + routing -------------------- */
const modal = $('#storyModal');

function openStory(id) {
  const s = STORIES.find(x => x.id === id);
  if (!s) return;
  state.activeStory = s;

  const cluster = CLUSTERS[s.cluster];
  const color = cluster.color;

  modal.querySelector('article').style.setProperty('--c', color);
  $('#modalCluster').innerHTML = `<span class="d"></span>${tx(cluster.label)}`;
  $('#modalTitle').textContent = tx(s.title);
  $('#modalPlace').textContent = tx(s.place);
  $('#modalChallenge').textContent = tx(s.problem);
  $('#modalAction').textContent = tx(s.action);
  $('#modalResult').textContent = tx(s.result);
  $('#modalPage').textContent = s.page;
  $('#modalMetric').innerHTML = `${icon(s.metric.kind, 32)}<strong>${s.metric.value}</strong><span>${tx(s.metric.unit)}</span>`;

  if (!modal.open) modal.showModal();
  history.replaceState(null, '', `#story/${s.id}`);
}

function closeStory() {
  if (modal.open) modal.close();
  state.activeStory = null;
  if (location.hash.startsWith('#story/')) history.replaceState(null, '', '#stories');
}

function siblingStory(dir) {
  if (!state.activeStory) return;
  const list = STORIES;
  const idx = list.findIndex(x => x.id === state.activeStory.id);
  const next = list[(idx + dir + list.length) % list.length];
  openStory(next.id);
}

$('#modalClose')?.addEventListener('click', closeStory);
$('#modalPrev')?.addEventListener('click', () => siblingStory(-1));
$('#modalNext')?.addEventListener('click', () => siblingStory(1));
modal?.addEventListener('click', e => { if (e.target === modal) closeStory(); });
modal?.addEventListener('close', () => { if (location.hash.startsWith('#story/')) history.replaceState(null, '', '#stories'); });

$('#modalCite')?.addEventListener('click', async () => {
  const s = state.activeStory; if (!s) return;
  const quote = `${tx(s.place)} — ${tx(s.title)}. ${tx(s.result)} — ${REPORT_CITE_LONG[state.lang]} ${t('stories.page')} ${s.page}.`;
  await copy(quote);
  toast(t('pulse.cite.done'));
});
$('#modalShare')?.addEventListener('click', async () => {
  const s = state.activeStory; if (!s) return;
  const url = `${location.origin}${location.pathname}#story/${s.id}`;
  await copy(url);
  toast(t('stories.share.done'));
});

function handleHash() {
  const m = location.hash.match(/^#story\/(.+)$/);
  if (m) openStory(m[1]);
}

/* -------------------- Mix slider -------------------- */
function applyMix(v) {
  document.body.dataset.mix = v;
  const slider = $('#mixSlider');
  slider.style.setProperty('--p', v + '%');
  $('#mixValue').textContent = v;
  const side = v < 40 ? 'central' : v > 60 ? 'place' : 'balanced';
  document.body.dataset.mixSide = side;
}
$('#mixSlider')?.addEventListener('input', e => applyMix(e.target.value));

/* -------------------- Reading mode / audience -------------------- */
function applyAudience(a) {
  state.audience = a;
  document.body.dataset.audience = a;
  localStorage.setItem('bl.audience', a);
  $$('[data-audience]').forEach(b => b.classList.toggle('selected', b.dataset.audience === a));
}
$$('.journey [data-audience]').forEach(b => b.addEventListener('click', () => applyAudience(b.dataset.audience)));

$('#menu')?.addEventListener('click', e => {
  const j = $('#journey');
  const open = j.hidden;
  j.hidden = !open;
  e.currentTarget.setAttribute('aria-expanded', open);
});

$('#motion')?.addEventListener('click', e => {
  const v = document.body.classList.toggle('reduce-motion');
  e.currentTarget.setAttribute('aria-pressed', v);
  e.currentTarget.textContent = v ? t('a11y.motionOn') : t('a11y.motion');
});
$('#contrast')?.addEventListener('click', e => {
  const v = document.body.classList.toggle('high-contrast');
  e.currentTarget.setAttribute('aria-pressed', v);
});

/* -------------------- Random story -------------------- */
$('#randomStory')?.addEventListener('click', () => {
  const s = STORIES[Math.floor(Math.random() * STORIES.length)];
  openStory(s.id);
});

/* -------------------- Language picker -------------------- */
$('#langSelect')?.addEventListener('change', e => {
  state.lang = e.target.value;
  applyLang();
  rerender();
});

/* -------------------- Progress bar + scroll animations -------------------- */
const progressBar = $('#progressBar');
function onScroll() {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = (pct * 100) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });

const io = new IntersectionObserver(
  es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)),
  { threshold: 0.12 }
);

/* -------------------- Full rerender (used on language change) -------------------- */
function rerender() {
  renderSignals();
  renderMapChips();
  renderPins();
  updatePins();
  renderStoryChips();
  renderStories();
  renderThemes();
  renderThermometer();
  renderDossiers();
  // Re-observe
  $$('.signal,.story,.manifesto p').forEach(x => io.observe(x));
  if (state.activeStory) openStory(state.activeStory.id);
}

/* -------------------- Init -------------------- */
function init() {
  applyLang();
  applyAudience(state.audience);
  applyMix(60);
  rerender();

  // Bind event listeners ONCE on the stable parent containers
  bindSignals();
  bindClusterChips();
  bindPins();
  bindThemes();
  bindDossiers();

  handleHash();
  window.addEventListener('hashchange', handleHash);

  // Esc closes modal (dialog handles it, but we also sync hash)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.open) closeStory();
  });

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
    const btn = $('#motion');
    if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.textContent = t('a11y.motionOn'); }
  }
}

init();
