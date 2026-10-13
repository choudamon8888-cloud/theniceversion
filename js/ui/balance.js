// The automatic "Model Card" on the Reflect page.
// It reads the picture COUNTS saved by the Teach station and tells learners if their data was balanced.

import { h } from '../dom.js';
import { icon, chip } from './icons.js';
import { getClassCounts, getClassNames, getMode, isLevelDone } from '../state.js';
import { LEVELS } from '../levels.js';
import { BALANCE_RATIO, CLASSES_BEGINNER, CLASSES_EXPLORER } from '../config.js';

// Pure function so it is easy to test: counts → { state, big, small }
export function checkBalance(counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return { state: 'empty' };
  let big = 0;
  let small = 0;
  counts.forEach((c, i) => { if (c > counts[big]) big = i; if (c < counts[small]) small = i; });
  const uneven = counts[small] === 0 || counts[big] / counts[small] >= BALANCE_RATIO;
  return { state: uneven ? 'uneven' : 'balanced', big, small, total };
}

export function buildModelCard() {
  const n = getMode() === 'explorer' ? CLASSES_EXPLORER : CLASSES_BEGINNER;
  const names = getClassNames().slice(0, n);
  const counts = getClassCounts().slice(0, n);
  const result = checkBalance(counts);
  const max = Math.max(...counts, 1);

  let badge;
  if (result.state === 'empty') {
    badge = h('p', { class: 'badge ok' }, icon('info-circle'), ' No training pictures yet. Go to the Teach Station and train the computer first.');
  } else if (result.state === 'uneven') {
    badge = h('p', { class: 'badge warn', role: 'status' },
      icon('alert-triangle'), ` Uneven Data! ${names[result.big]} has way more pictures than ${names[result.small]}. This can make the computer biased.`);
  } else {
    badge = h('p', { class: 'badge ok', role: 'status' }, icon('circle-check'), ' Balanced Training Set!');
  }

  const rows = names.map((name, i) => h('div', { class: 'mc-row' },
    h('span', null, name),
    h('div', { class: 't', 'aria-hidden': 'true' }, h('div', { class: 'f', style: { width: `${(counts[i] / max) * 100}%` } })),
    h('span', null, `${counts[i]} pictures`),
  ));

  const tested = LEVELS.filter((l) => isLevelDone(l.id)).map((l) => l.short).join(', ') || 'nothing yet';

  return h('section', { class: 'model-card', id: 'model-card', 'aria-labelledby': 'model-card-h' },
    h('header', null, h('h2', { id: 'model-card-h', class: 'hd' }, chip('id-badge-2'), 'Model Card'), h('span', { class: 'small', style: { color: '#d1d1d6' } }, 'About the computer you taught')),
    h('div', { class: 'body' },
      badge,
      h('p', { style: { 'font-weight': '600', 'margin-bottom': '10px' } }, 'What it learned from:'),
      rows,
      h('p', { class: 'tested' }, `I tried to fool it with: ${tested}.`),
    ),
  );
}
