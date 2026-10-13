// The progress steps in the top bar: Teach → Lighting → Angles → Clutter → Never Seen → Reflect

import { h } from '../dom.js';
import { icon } from './icons.js';
import { steps, isUnlocked } from '../flow.js';

export function renderProgress(nav, currentKey) {
  const items = steps().map((s) => {
    const unlocked = isUnlocked(s.key);
    const done = s.isDone();
    const current = s.key === currentKey;
    const cls = ['step', current && 'current', !unlocked && 'locked'].filter(Boolean).join(' ');
    const mark = !unlocked ? 'lock' : done && !current ? 'check' : null;
    const status = !unlocked ? ' (locked)' : done ? ' (finished)' : '';
    const kids = [mark && icon(mark, '1em'), h('span', null, s.label), h('span', { class: 'sr-only' }, status)];
    const el = unlocked
      ? h('a', { class: cls, href: s.href, 'aria-current': current ? 'step' : null }, kids)
      : h('span', { class: cls, 'aria-disabled': 'true' }, kids);
    return h('li', null, el);
  });
  nav.replaceChildren(h('ol', null, items));
}
