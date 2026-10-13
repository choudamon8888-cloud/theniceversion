// Teach station: record pictures for each class, then press Train.

import { h, announce } from '../dom.js';
import { icon } from '../ui/icons.js';
import * as ai from '../classifier.js';
import { createCameraBox } from '../ui/camerabox.js';
import { createConfidenceView } from '../ui/confidence.js';
import { installRecordKeys } from '../keyboard.js';
import { getMode, getClassNames, setClassName, setTeachDone, setClassCounts } from '../state.js';
import { CLASSES_BEGINNER, CLASSES_EXPLORER, MIN_EXAMPLES, GOAL_EXAMPLES, RECORD_EVERY_MS } from '../config.js';
import { LEVELS } from '../levels.js';

export function render(root) {
  const mode = getMode();
  const n = mode === 'explorer' ? CLASSES_EXPLORER : CLASSES_BEGINNER;
  const cam = createCameraBox();
  const view = createConfidenceView();
  let stopPredicting = null;
  let active = 0;
  const recorders = [];

  const status = h('p', { class: 'notice', role: 'status' }, [icon('brain'), ' Loading the computer’s brain… (only the first time)']);
  const trainHint = h('p', { class: 'small center', id: 'train-hint', style: { 'margin-top': '10px' } }, `Take at least ${MIN_EXAMPLES} pictures of every card first.`);
  const trainBtn = h('button', { class: 'btn btn-big', type: 'button', style: { width: '100%' }, 'aria-describedby': 'train-hint', onClick: train }, [icon('brain'), ' Train']);
  const nextLink = h('a', { class: 'btn', href: `#/level/${LEVELS[0].id}`, hidden: !ai.isTrained() }, [`Go to ${LEVELS[0].short} `, icon('arrow-right')]);

  const classes = Array.from({ length: n }, (_, i) => buildClass(i));

  function buildClass(i) {
    const inputId = `class-name-${i}`;
    const input = h('input', {
      type: 'text', id: inputId, value: getClassNames()[i], maxlength: '14',
      onInput: (e) => { setClassName(i, e.target.value.trim() || `Card ${i + 1}`); refreshCounts(); },
    });
    const fill = h('i');
    const info = h('span', { class: 'cnt' });
    const rec = h('button', { class: 'btn dark rec record-btn', type: 'button', style: { 'touch-action': 'none' } }, h('span', { class: 'dot' }), 'Hold to record');
    const clear = h('button', { class: 'btn btn-ghost btn-small', type: 'button', 'aria-label': `Clear all ${getClassNames()[i]} pictures`, onClick: () => { ai.clearClass(i); saveCounts(); refreshCounts(); announce(`${getClassNames()[i]} pictures cleared.`); } }, [icon('trash')]);
    const recorder = makeRecorder(rec, i);
    recorders.push(recorder);
    const el = h('section', { class: 'cls', 'aria-labelledby': `h-class-${i}` },
      h('div', { class: 'row' },
        h('div', { class: 'name-wrap' },
          h('label', { class: 'field-label', id: `h-class-${i}`, for: inputId }, `Card ${i + 1} name`),
          input),
        info),
      h('div', { class: 'meter', 'aria-hidden': 'true' }, fill),
      h('div', { class: 'cls-actions' }, rec, clear),
    );
    el.addEventListener('focusin', () => setActive(i, false));
    el.addEventListener('pointerdown', () => setActive(i, false));
    return { el, fill, info, rec };
  }

  function setActive(i, speak = true) {
    if (i === active && !speak) return;
    active = i;
    classes.forEach((c, idx) => c.el.classList.toggle('active', idx === i));
    if (speak) announce(`${getClassNames()[i]} selected. Hold Space or Enter to take pictures.`);
  }

  function saveCounts() { setClassCounts(ai.counts(3)); }

  // One recorder per card. It is started by the mouse, a finger, OR the keyboard.
  function makeRecorder(btn, i) {
    let timer = null;
    const tick = () => {
      if (!cam.isLive() || !ai.addExample(cam.video, i)) { stop(); return; }
      refreshCounts();
    };
    function start() {
      if (timer || !ai.isLoaded()) return;
      btn.classList.add('live');
      tick();
      timer = setInterval(tick, RECORD_EVERY_MS);
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
      btn.classList.remove('live');
      saveCounts();
      announce(`${getClassNames()[i]} now has ${ai.counts(n)[i]} pictures.`);
    }
    // Mouse / touch
    btn.addEventListener('pointerdown', (e) => { e.preventDefault(); btn.setPointerCapture?.(e.pointerId); start(); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => btn.addEventListener(ev, stop));
    // Keyboard while this button has focus (the global listener below covers everything else)
    const isKey = (e) => e.key === ' ' || e.key === 'Enter';
    btn.addEventListener('keydown', (e) => { if (isKey(e)) { e.preventDefault(); if (!e.repeat) start(); } });
    btn.addEventListener('keyup', (e) => { if (isKey(e)) { e.preventDefault(); stop(); } });
    btn.addEventListener('blur', stop);
    return { start, stop };
  }

  // Space or Enter anywhere on the page records the active card. 1 / 2 / 3 choose the card.
  const removeKeys = installRecordKeys({
    classCount: () => n,
    getActive: () => active,
    setActive: (i) => setActive(i, true),
    start: (i) => recorders[i].start(),
    stop: () => recorders.forEach((r) => r.stop()),
  });

  function refreshCounts() {
    const counts = ai.counts(n);
    const names = getClassNames();
    classes.forEach((c, i) => {
      c.fill.style.width = `${Math.min(100, (counts[i] / GOAL_EXAMPLES) * 100)}%`;
      const [moodIcon, moodText] = counts[i] >= GOAL_EXAMPLES ? ['star', 'Great!'] : counts[i] >= MIN_EXAMPLES ? ['mood-smile', 'Good!'] : ['plant', 'Need more'];
      c.info.replaceChildren(...(mode === 'explorer' ? [icon('photo'), ` ${counts[i]} pictures`] : [icon(moodIcon), ` ${moodText}`]));
      c.rec.setAttribute('aria-label', `Hold to record ${names[i]}. ${counts[i]} pictures so far.`);
      c.rec.setAttribute('aria-disabled', ai.isLoaded() ? 'false' : 'true');
    });
    const ready = ai.isLoaded() && counts.every((c) => c >= MIN_EXAMPLES);
    trainBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
    trainBtn.replaceChildren(icon('brain'), ai.isTrained() ? ' Train again' : ' Train');
  }

  function train() {
    if (trainBtn.getAttribute('aria-disabled') === 'true') {
      announce(`Take at least ${MIN_EXAMPLES} pictures of every card first.`);
      return;
    }
    ai.markTrained();
    setTeachDone();
    saveCounts();
    cam.stage.append(view.el);
    nextLink.hidden = false;
    beginPredicting();
    refreshCounts();
    announce('Trained! Hold up a card to see what the computer thinks.');
  }

  function beginPredicting() {
    if (stopPredicting) return;
    if (!view.el.isConnected) cam.stage.append(view.el);
    stopPredicting = ai.startPredicting(cam.video, () => n, (conf) => view.update(getClassNames().slice(0, n), conf, getMode()));
  }

  root.append(h('div', { class: 'page fade' },
    h('div', { class: 'eyebrow' }, 'Step 1 of 6'),
    h('h1', { tabindex: '-1' }, 'Teach the computer.'),
    h('p', { class: 'lead' }, 'Hold a card straight in front of the camera, in normal room light, with a plain background. Press and hold the button while you take pictures.'),
    h('div', { style: { 'margin-top': '24px' } }, status),
    h('div', { class: 'two' },
      h('div', { class: 'panel' }, cam.el),
      h('div', null,
        h('div', { class: 'kbd-hint' },
          h('b', null, icon('keyboard'), ' No mouse? No problem.'),
          'Press ', h('kbd', null, '1'), ' ', h('kbd', null, '2'), n > 2 ? [' ', h('kbd', null, '3')] : null,
          ' to pick a card. Then hold ', h('kbd', null, 'Space'), ' or ', h('kbd', null, 'Enter'), ' to take pictures.'),
        classes.map((c) => c.el),
        trainBtn, trainHint,
        h('div', { class: 'center', style: { 'margin-top': '16px' } }, nextLink),
      ),
    ),
  ));

  setActive(0, false);
  refreshCounts();
  cam.start();
  ai.loadAI().then(() => {
    status.hidden = true;
    refreshCounts();
    if (ai.isTrained()) beginPredicting();
  }).catch(() => {
    status.textContent = 'I could not load the AI files. Please reload the page.';
  });

  return {
    title: 'Teach Station',
    focus: 'h1',
    cleanup() {
      removeKeys();
      recorders.forEach((r) => r.stop());
      if (stopPredicting) stopPredicting();
      cam.stop();
    },
  };
}
