// One page that can show ANY level from levels.js.

import { h, announce } from '../dom.js';
import { icon, chip } from '../ui/icons.js';
import * as ai from '../classifier.js';
import { createCameraBox } from '../ui/camerabox.js';
import { createConfidenceView } from '../ui/confidence.js';
import { LEVELS } from '../levels.js';
import { getMode, getClassNames, getAnswer, setAnswer, isLevelDone, setLevelDone } from '../state.js';
import { nextStep } from '../flow.js';
import { CLASSES_BEGINNER, CLASSES_EXPLORER } from '../config.js';

export function render(root, { levelId }) {
  const index = LEVELS.findIndex((l) => l.id === levelId);
  const level = LEVELS[index];
  if (!level) {
    root.append(h('div', { class: 'page' }, h('h1', { tabindex: '-1' }, 'Level not found'), h('p', null, h('a', { class: 'btn', href: '#/home' }, 'Home'))));
    return { title: 'Not found', focus: 'h1' };
  }

  const n = getMode() === 'explorer' ? CLASSES_EXPLORER : CLASSES_BEGINNER;
  const next = nextStep(level.id);
  let cleanup = () => {};

  // 1. Mission card
  const mission = h('article', { class: 'panel white', 'aria-labelledby': 'mission-h' },
    h('h2', { id: 'mission-h', class: 'hd' }, chip('target-arrow'), 'Your mission'),
    h('p', { style: { 'font-weight': '600', 'margin-bottom': '0' } }, level.mission),
    h('ol', { class: 'steps-n' }, level.steps.map((s) => h('li', null, s))),
    level.idea ? h('div', { class: 'callout' }, h('b', null, icon('brain'), ' Big idea'), level.idea) : null,
    h('div', { class: 'callout' }, h('b', null, icon('bulb'), ' Think about it'), level.think),
    h('p', { class: 'small', style: { 'margin-top': '16px', 'margin-bottom': '0' } }, icon('cards'), ' You need: ', level.cards, '. ',
      h('a', { href: 'printables/cards.html', target: '_blank', rel: 'noopener' }, 'Print the cards (opens a new tab)')),
  );

  // 2. Live test view
  let live;
  if (ai.isTrained()) {
    const cam = createCameraBox();
    const view = createConfidenceView();
    cam.stage.append(view.el);
    const stop = ai.startPredicting(cam.video, () => n, (conf) => view.update(getClassNames().slice(0, n), conf, getMode()));
    cam.start();
    cleanup = () => { stop(); cam.stop(); };
    live = h('div', { class: 'panel', role: 'region', 'aria-label': 'What the computer sees' }, cam.el);
  } else {
    live = h('div', { class: 'panel' },
      h('h2', { class: 'hd' }, chip('brain'), 'The computer forgot!'),
      h('p', null, 'The computer forgets everything when the page reloads. That keeps your pictures private. Please teach it again.'),
      h('a', { class: 'btn', href: '#/teach' }, [icon('school'), ' Go to Teach Station']),
    );
  }

  // 3. Journal
  const doneBtn = h('button', { class: 'btn btn-big', type: 'button', 'aria-describedby': 'done-hint', onClick: finish });
  const hint = h('span', { class: 'small', id: 'done-hint' });
  const fields = level.prompts.map((p) => {
    const id = `prompt-${p.id}`;
    const area = h('textarea', { id, rows: '3' });
    area.value = getAnswer(level.id, p.id);
    area.addEventListener('input', () => { setAnswer(level.id, p.id, area.value); refreshDone(); });
    return { p, area, el: h('div', { class: 'prompt' }, h('label', { for: id }, p.text), area) };
  });

  const allAnswered = () => fields.every((f) => f.area.value.trim());
  function refreshDone() {
    const ok = allAnswered() || isLevelDone(level.id);
    doneBtn.replaceChildren(...(isLevelDone(level.id) ? [`Go to ${next?.label ?? 'the end'} `, icon('arrow-right')] : next ? [`Done · Next: ${next.label} `, icon('arrow-right')] : [icon('circle-check'), ' Done!']));
    doneBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    hint.textContent = ok ? 'Saved only on this computer.' : 'Answer every question to open the next step.';
  }
  function finish() {
    if (doneBtn.getAttribute('aria-disabled') === 'true') { announce('Answer every question to open the next step.'); return; }
    setLevelDone(level.id);
    if (next) location.hash = next.href;
  }
  refreshDone();

  const journal = h('section', { class: 'panel white', style: { 'margin-top': '24px' }, 'aria-labelledby': 'journal-h' },
    h('h2', { id: 'journal-h', class: 'hd' }, chip('notebook'), 'My detective journal'),
    fields.map((f) => f.el),
    h('div', { class: 'done-row' }, doneBtn, hint),
  );

  root.append(h('div', { class: 'page fade' },
    h('div', { class: 'eyebrow' }, [`Level ${index + 1} of ${LEVELS.length} · `, icon(level.icon), ` ${level.short}`]),
    h('h1', { tabindex: '-1' }, level.title),
    h('div', { class: 'two' }, mission, live),
    journal,
  ));
  return { title: `Level ${index + 1}: ${level.title}`, focus: 'h1', cleanup: () => cleanup() };
}
