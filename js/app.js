// Router: reads the #/page in the web address and shows the right page.

import { h, announce } from './dom.js';
import { renderProgress } from './ui/progress.js';
import { askConfirm } from './ui/confirm.js';
import { icon, hydrateIcons } from './ui/icons.js';
import { isUnlocked, currentStep, steps } from './flow.js';
import { getMode, setMode, resetAll, setClassCounts } from './state.js';
import * as ai from './classifier.js';
import { CLASSES_BEGINNER } from './config.js';

import * as home from './pages/home.js';
import * as teach from './pages/teach.js';
import * as level from './pages/level.js';
import * as reflect from './pages/reflect.js';
import * as educator from './pages/educator.js';

const main = document.getElementById('main');
const nav = document.getElementById('progress');
const modeButtons = document.querySelectorAll('.seg button');
let cleanup = null;

function parseRoute() {
  const [page, arg] = (location.hash || '#/home').replace(/^#\//, '').split('/');
  return { page: page || 'home', arg };
}

function lockedPage(stepKey) {
  const want = steps().find((s) => s.key === stepKey);
  const go = currentStep();
  main.append(h('div', { class: 'page' },
    h('h1', { tabindex: '-1' }, 'Not yet!'),
    h('p', { class: 'lead' }, `${want?.label ?? 'This step'} opens after you finish the step before it.`),
    h('p', null, h('a', { class: 'btn', href: go.href }, [icon(go.icon), ` Go to ${go.label}`])),
  ));
  return { title: 'Locked', focus: 'h1' };
}

function show() {
  if (cleanup) { cleanup(); cleanup = null; }
  const { page, arg } = parseRoute();
  main.replaceChildren();

  let result;
  let stepKey = null;
  if (page === 'teach') { stepKey = 'teach'; result = teach.render(main); }
  else if (page === 'level') { stepKey = arg; result = isUnlocked(arg) ? level.render(main, { levelId: arg }) : lockedPage(arg); }
  else if (page === 'reflect') { stepKey = 'reflect'; result = isUnlocked('reflect') ? reflect.render(main, { onStartOver: startOver }) : lockedPage('reflect'); }
  else if (page === 'educator') result = educator.render(main);
  else result = home.render(main);

  cleanup = result.cleanup || null;
  renderProgress(nav, stepKey);
  document.title = result.title === 'How AI Sees' ? result.title : `${result.title} — How AI Sees`;
  const target = main.querySelector(result.focus || 'h1');
  (target || main).focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function applyMode() {
  const mode = getMode();
  document.body.dataset.mode = mode;
  modeButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
}

modeButtons.forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.mode === getMode()) return;
  setMode(b.dataset.mode);
  if (b.dataset.mode === 'beginner') {
    ai.clearClass(CLASSES_BEGINNER); // Explorer's 3rd card is dropped
    if (ai.isLoaded()) setClassCounts(ai.counts(3));
  }
  applyMode();
  show();
  announce(b.dataset.mode === 'explorer' ? 'Explorer mode on.' : 'Beginner mode on.');
}));

async function startOver() {
  const yes = await askConfirm('Start over? This erases your journal and the computer’s training on this computer.', [icon('refresh'), ' Yes, start over']);
  if (!yes) return;
  if (cleanup) { cleanup(); cleanup = null; }
  resetAll();
  ai.reset();
  applyMode();
  if (location.hash === '#/home') show(); else location.hash = '#/home';
  announce('Everything was erased. You can start fresh.');
}
document.getElementById('start-over').addEventListener('click', startOver);

document.addEventListener('progress-changed', () => renderProgress(nav, parseRoute().arg || parseRoute().page));
window.addEventListener('hashchange', show);
hydrateIcons();
applyMode();
show();
