// Settings you can tweak. Everything is in one place on purpose.

export const MIN_EXAMPLES = 10;      // pictures needed per class before Train works
export const GOAL_EXAMPLES = 30;     // the meter is "full" at this many pictures
export const MAX_EXAMPLES = 300;     // stop recording a class after this many
export const K = 10;                 // KNN looks at this many closest pictures

export const CLASSES_BEGINNER = 2;
export const CLASSES_EXPLORER = 3;
export const DEFAULT_CLASS_NAMES = ['Sun', 'Fish', 'Tree'];

export const RECORD_EVERY_MS = 100;  // one picture every 0.1 seconds while held
export const PREDICT_EVERY_MS = 120; // how often the computer makes a guess

// Beginner mode face thresholds
export const SURE = 0.8;
export const THINK = 0.6;

// Reflect page "Model Card": warn when one class has this many times more pictures than another.
export const BALANCE_RATIO = 2;
