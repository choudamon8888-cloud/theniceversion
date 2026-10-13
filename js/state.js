// Everything saved on this computer lives here, in localStorage.
// We only save: mode, card names, picture COUNTS (just numbers), progress and journal words.
// NEVER pictures.

import { DEFAULT_CLASS_NAMES } from './config.js';

const KEY = 'howaisees.restyle.v1'; // different from v1 so the two versions never mix

const defaults = () => ({
  mode: 'beginner',
  classNames: [...DEFAULT_CLASS_NAMES],
  classCounts: [0, 0, 0],         // how many pictures each class had when you last trained
  teachDone: false,
  levelsDone: {},                 // { lighting: true }
  journal: {},                    // { lighting: { changed: '...' } }
  reflect: { learned: '', bias: '', human: '' },
});

let data = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults(), ...JSON.parse(raw) };
  } catch { /* storage blocked: we just keep things in memory */ }
  return defaults();
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

export function notifyProgress() {
  document.dispatchEvent(new CustomEvent('progress-changed'));
}

export const getMode = () => data.mode;
export function setMode(mode) { data.mode = mode; save(); }

export const getClassNames = () => data.classNames;
export function setClassName(i, name) { data.classNames[i] = name; save(); }

export const getClassCounts = () => data.classCounts;
export function setClassCounts(counts) { data.classCounts = [0, 1, 2].map((i) => counts[i] || 0); save(); }

export const isTeachDone = () => data.teachDone;
export function setTeachDone() { data.teachDone = true; save(); notifyProgress(); }

export const isLevelDone = (id) => !!data.levelsDone[id];
export function setLevelDone(id) { data.levelsDone[id] = true; save(); notifyProgress(); }

export const getAnswer = (levelId, promptId) => data.journal[levelId]?.[promptId] ?? '';
export function setAnswer(levelId, promptId, text) {
  data.journal[levelId] = { ...data.journal[levelId], [promptId]: text };
  save();
}

export const getReflect = (key) => data.reflect[key] ?? '';
export function setReflect(key, text) { data.reflect = { ...data.reflect, [key]: text }; save(); }

// The "Start over" button. Wipes everything we ever saved.
export function resetAll() {
  data = defaults();
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  notifyProgress();
}
