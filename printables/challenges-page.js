import { hydrateIcons, icon } from '../js/ui/icons.js';
import { LEVELS } from '../js/levels.js';
const root = document.getElementById('cards');
const el = (tag, text, cls) => { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; };
LEVELS.forEach((level, i) => {
  const card = el('article', null, 'challenge');
  const h2 = el('h2'); h2.append(icon(level.icon), ` Level ${i + 1}: ${level.title}`);
  card.append(h2, el('p', level.mission));
  const ol = el('ol'); level.steps.forEach((s) => ol.append(el('li', s)));
  card.append(ol, el('p', `Think about it: ${level.think}`), el('p', `You need: ${level.cards}`, 'small'));
  const lines = el('div', null, 'lines');
  level.prompts.forEach((p) => { lines.append(el('p', p.text), el('div', null, 'line'), el('div', null, 'line')); });
  card.append(lines);
  root.append(card);
});
document.getElementById('print').addEventListener('click', () => window.print());
hydrateIcons();
