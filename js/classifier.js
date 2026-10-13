// The "AI brain": MobileNet turns a picture into numbers, KNN remembers the numbers.
// Only numbers are kept (in memory). Pictures are never stored. Reload the page and it is all gone.

import { K, MAX_EXAMPLES, PREDICT_EVERY_MS } from './config.js';
import { sleep } from './dom.js';

const SCRIPTS = [
  '../vendor/tfjs/tf.min.js',
  '../vendor/tfjs/mobilenet.min.js',
  '../vendor/tfjs/knn-classifier.min.js',
];
const MODEL_URL = new URL('../models/mobilenet_v2/model.json', import.meta.url).href;

let loading = null;
let net = null;
let knn = null;
let trained = false;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = new URL(src, import.meta.url).href;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(s);
  });
}

// Loads TensorFlow.js + MobileNet from this site's own files (no other websites).
export function loadAI() {
  if (!loading) {
    loading = (async () => {
      // tf.min.js tries `Function(...)` if this global is missing. Defining it keeps our
      // strict security policy (no 'unsafe-eval') working.
      if (!('regeneratorRuntime' in window)) window.regeneratorRuntime = undefined;
      for (const src of SCRIPTS) await loadScript(src);
      await window.tf.ready();
      net = await window.mobilenet.load({ version: 2, alpha: 1.0, modelUrl: MODEL_URL });
      knn = window.knnClassifier.create();
    })();
    loading.catch(() => { loading = null; });
  }
  return loading;
}

export const isLoaded = () => !!knn;
export const isTrained = () => trained && !!knn;
export function markTrained() { trained = true; }

export function counts(n) {
  const raw = knn ? knn.getClassExampleCount() : {};
  return Array.from({ length: n }, (_, i) => raw[i] || 0);
}

// Takes one picture from the video and remembers its numbers. Returns false if the class is full.
export function addExample(video, classIndex) {
  if (!knn || video.readyState < 2) return false;
  if ((knn.getClassExampleCount()[classIndex] || 0) >= MAX_EXAMPLES) return false;
  const embedding = net.infer(video, true);
  knn.addExample(embedding, classIndex);
  embedding.dispose();
  return true;
}

export function clearClass(classIndex) {
  if (knn && (knn.getClassExampleCount()[classIndex] || 0) > 0) knn.clearClass(classIndex);
}

export function reset() {
  if (knn) knn.clearAllClasses();
  trained = false;
}

// Returns an array of n numbers (0 to 1) that add up to 1.
export async function predict(video, n) {
  if (!knn || knn.getNumClasses() === 0) return null;
  const embedding = net.infer(video, true);
  try {
    const result = await knn.predictClass(embedding, K);
    const conf = Array(n).fill(0);
    for (const [label, value] of Object.entries(result.confidences)) {
      if (+label < n) conf[+label] = value;
    }
    const total = conf.reduce((a, b) => a + b, 0);
    return total > 0 ? conf.map((c) => c / total) : conf;
  } finally {
    embedding.dispose();
  }
}

// Keeps guessing until the returned stop() function is called.
export function startPredicting(video, getN, onResult) {
  let stopped = false;
  (async () => {
    while (!stopped) {
      if (video.readyState >= 2) {
        try {
          const conf = await predict(video, getN());
          if (conf && !stopped) onResult(conf);
        } catch (err) { console.error(err); }
      }
      await sleep(PREDICT_EVERY_MS);
    }
  })();
  return () => { stopped = true; };
}
