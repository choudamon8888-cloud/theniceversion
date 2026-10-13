// Shows what the computer thinks, as a frosted-glass panel over the camera.
// Beginner mode: a face and a friendly sentence.   Explorer mode: exact percentages.

import { h, announce } from '../dom.js';
import { SURE, THINK } from '../config.js';
import { chip } from './icons.js';

export function createConfidenceView() {
  const face = h('div', { class: 'face', 'aria-hidden': 'true' }, chip('robot'));
  const say = h('div', { class: 'say' }, 'Hold up a card to see what I think.');
  const sub = h('div', { class: 'sub' });
  const bars = h('div', { class: 'bars', 'aria-hidden': 'true' });
  const el = h('div', { class: 'glass' }, face, say, sub, bars);

  let rows = [];
  let signature = '';
  let lastSpoken = '';
  let lastSpokenAt = 0;

  function ensureRows(names, showPct) {
    const sig = names.join('|') + showPct;
    if (sig === signature) return;
    signature = sig;
    rows = names.map((name) => {
      const fill = h('div', { class: 'f' });
      const pct = h('span', { class: 'pct' });
      const row = h('div', { class: `bar${showPct ? '' : ' no-pct'}` },
        h('span', { class: 'l' }, name),
        h('div', { class: 't' }, fill),
        showPct ? pct : null,
      );
      return { row, fill, pct };
    });
    bars.replaceChildren(...rows.map((r) => r.row));
  }

  function update(names, conf, mode) {
    const explorer = mode === 'explorer';
    ensureRows(names, explorer);
    let top = 0;
    conf.forEach((c, i) => { if (c > conf[top]) top = i; });
    rows.forEach((r, i) => {
      r.fill.style.width = `${Math.round(conf[i] * 100)}%`;
      if (explorer) r.pct.textContent = `${Math.round(conf[i] * 100)}%`;
      r.row.classList.toggle('best', i === top);
    });

    const p = conf[top];
    let mood, state, text;
    if (p >= SURE) { mood = 'mood-happy'; state = 'sure'; text = `I’m sure! It’s ${names[top]}.`; }
    else if (p >= THINK) { mood = 'mood-smile'; state = 'think'; text = `I think it’s ${names[top]}.`; }
    else { mood = 'mood-puzzled'; state = 'unsure'; text = 'I’m not sure…'; }
    face.replaceChildren(chip(mood));
    el.className = `glass ${state}`; // green = sure, blue = thinks so, yellow = not sure
    say.textContent = explorer ? `Best guess: ${names[top]}` : text;
    sub.textContent = explorer ? `${Math.round(p * 100)}% sure` : '';

    // Tell screen readers about changes, but not too often.
    const now = Date.now();
    if (text !== lastSpoken && now - lastSpokenAt > 2000) {
      announce(text);
      lastSpoken = text;
      lastSpokenAt = now;
    }
  }

  return { el, update };
}
