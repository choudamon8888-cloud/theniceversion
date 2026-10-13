// Reflect: Model Card + every journal answer + the big questions. Prints on one Letter page.

import { h } from '../dom.js';
import { icon, chip } from '../ui/icons.js';
import { LEVELS } from '../levels.js';
import { getAnswer, getReflect, setReflect } from '../state.js';
import { buildModelCard } from '../ui/balance.js';

const BIG_QUESTIONS = [
  { key: 'learned', text: 'What did you learn about how a computer learns?' },
  { key: 'bias', text: 'Where could bias cause problems for real people?' },
  { key: 'human', text: 'If this AI was used in a real school, self-driving car, or hospital, why must a human expert always double-check its guesses before taking action?' },
];

export function render(root, { onStartOver }) {
  const levelCards = LEVELS.map((level) =>
    h('section', { class: 'panel white', 'aria-labelledby': `r-${level.id}` },
      h('h2', { id: `r-${level.id}`, class: 'hd' }, chip(level.icon), level.title),
      level.prompts.map((p) => {
        const text = getAnswer(level.id, p.id).trim();
        return h('div', { class: 'answer' },
          h('p', { class: 'q' }, p.text),
          h('p', { class: text ? 'a' : 'a empty' }, text || '(no answer yet)'));
      }),
    ));

  const questions = BIG_QUESTIONS.map(({ key, text }) => {
    const id = `reflect-${key}`;
    const area = h('textarea', { id, rows: '4' });
    area.value = getReflect(key);
    // On paper, a text box can't show long answers, so we mirror it into plain text.
    const printCopy = h('p', { class: 'print-answer' }, area.value);
    area.addEventListener('input', () => { setReflect(key, area.value); printCopy.textContent = area.value; });
    return h('div', { class: 'prompt' }, h('label', { for: id }, text), area, printCopy);
  });

  root.append(h('div', { class: 'page fade', id: 'reflect-container' },
    h('div', { class: 'eyebrow no-print' }, 'Step 6 of 6'),
    h('h1', { tabindex: '-1' }, 'Reflect'),
    h('p', { class: 'print-only' }, 'Name: ', h('span', { class: 'name-line' })),
    h('p', { class: 'lead' }, 'Here is everything you found out. Read it. What do you notice?'),
    h('div', { class: 'cta-row no-print' },
      h('button', { class: 'btn btn-big', type: 'button', onClick: () => window.print() }, [icon('printer'), ' Print']),
      h('button', { class: 'btn btn-ghost', type: 'button', onClick: onStartOver }, [icon('refresh'), ' Start over']),
    ),
    buildModelCard(),
    h('div', { class: 'journal-grid' }, levelCards),
    h('section', { class: 'panel', style: { 'margin-top': '20px' }, 'aria-labelledby': 'big-h' },
      h('h2', { id: 'big-h', class: 'hd' }, chip('bulb'), 'The big ideas'),
      questions,
    ),
  ));
  return { title: 'Reflect', focus: 'h1' };
}
