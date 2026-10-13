// The order of the whole challenge: Teach → each level → Reflect.
// Built from LEVELS, so adding a level adds a step automatically.

import { LEVELS } from './levels.js';
import { isTeachDone, isLevelDone } from './state.js';

export function steps() {
  return [
    { key: 'teach', href: '#/teach', label: 'Teach', icon: 'school', isDone: isTeachDone },
    ...LEVELS.map((l) => ({
      key: l.id, href: `#/level/${l.id}`, label: l.short, icon: l.icon, isDone: () => isLevelDone(l.id),
    })),
    { key: 'reflect', href: '#/reflect', label: 'Reflect', icon: 'pencil', isDone: () => false },
  ];
}

// A step opens when the one before it is finished.
export function isUnlocked(key) {
  const list = steps();
  const i = list.findIndex((s) => s.key === key);
  return i <= 0 || list[i - 1].isDone();
}

export function nextStep(key) {
  const list = steps();
  return list[list.findIndex((s) => s.key === key) + 1] || null;
}

// The first step that is open but not finished.
export function currentStep() {
  const list = steps();
  return list.find((s) => isUnlocked(s.key) && !s.isDone()) || list[list.length - 1];
}
