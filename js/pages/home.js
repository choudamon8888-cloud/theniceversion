import { h } from '../dom.js';
import { chip, icon } from '../ui/icons.js';

const SUN = '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#FF9800" stroke-width="6" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="4"/><line x1="50" y1="88" x2="50" y2="96"/><line x1="12" y1="50" x2="4" y2="50"/><line x1="88" y1="50" x2="96" y2="50"/><line x1="23" y1="23" x2="17" y2="17"/><line x1="77" y1="77" x2="83" y2="83"/><line x1="77" y1="23" x2="83" y2="17"/><line x1="23" y1="77" x2="17" y2="83"/></g><circle cx="50" cy="50" r="24" fill="#FFC400"/></svg>';
const FISH = '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="70,50 94,33 94,67" fill="#1E3A8A"/><ellipse cx="45" cy="50" rx="28" ry="18" fill="#2563EB"/><polygon points="40,36 52,22 60,37" fill="#1E3A8A"/><circle cx="31" cy="46" r="4.5" fill="#fff"/><circle cx="30" cy="46" r="2" fill="#111"/></svg>';
const ROCKET = '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="35,55 20,76 36,70" fill="#7C3AED"/><polygon points="65,55 80,76 64,70" fill="#7C3AED"/><path d="M42 72 Q50 98 58 72Z" fill="#F97316"/><path d="M50 9 C66 25 68 50 65 71 L35 71 C32 50 34 25 50 9Z" fill="#E5E7EB" stroke="#111" stroke-width="2"/><path d="M50 9 C58 17 62 27 64 38 L36 38 C38 27 42 17 50 9Z" fill="#7C3AED"/><circle cx="50" cy="53" r="7.5" fill="#fff" stroke="#111" stroke-width="2"/></svg>';

// The demo story: it knows Sun and Fish, then gets fooled by a rocket.
const SCENES = [
  { art: 'sun', face: 'mood-happy', say: 'I’m sure! It’s Sun.', sub: 'Trained on 30 pictures of each card.', conf: [96, 4] },
  { art: 'fish', face: 'mood-happy', say: 'I’m sure! It’s Fish.', sub: 'It knows this one too.', conf: [3, 97] },
  { art: 'rocket', face: 'mood-happy', say: 'I’m sure! It’s Fish.', sub: 'It has never seen a rocket. It still guessed.', conf: [8, 92] },
];

const WORDS = [
  ['Classifier', 'A program that sorts things into groups, like sorting socks by colour.'],
  ['Training data', 'The examples we show the computer so it can learn. Here, it is your camera pictures.'],
  ['Class', 'One group the computer can choose, like “Sun” or “Fish”.'],
  ['Confidence', 'How sure the computer is. 90% means “very sure”.'],
  ['Edge case', 'A tricky example that is not like the others, such as a card in the dark.'],
  ['Bias', 'When a computer is often wrong or unfair because the examples it learned from left some things out.'],
];

export function render(root) {
  const art = (name, svg) => { const d = h('div', { class: 'card-art', 'data-art': name }); d.innerHTML = svg; return d; };
  const arts = [art('sun', SUN), art('fish', FISH), art('rocket', ROCKET)];
  const face = h('div', { class: 'face', 'aria-hidden': 'true' });
  const say = h('div', { class: 'say' });
  const sub = h('div', { class: 'sub' });
  const bar = (name) => {
    const fill = h('div', { class: 'f' });
    const pct = h('span', { class: 'pct' });
    return { fill, pct, row: h('div', { class: 'bar' }, h('span', { class: 'l' }, name), h('div', { class: 't' }, fill), pct) };
  };
  const bars = [bar('Sun'), bar('Fish')];

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = reduce; // never auto-play for people who asked for less motion
  let k = 0;
  let timer = null;

  function scene(i) {
    const s = SCENES[i];
    arts.forEach((a) => a.classList.toggle('show', a.dataset.art === s.art));
    face.replaceChildren(chip(s.face));
    say.textContent = s.say;
    sub.textContent = s.sub;
    s.conf.forEach((c, n) => {
      bars[n].fill.style.width = `${c}%`;
      bars[n].pct.textContent = `${c}%`;
      bars[n].row.classList.toggle('best', c === Math.max(...s.conf));
    });
  }
  function tick() { k = (k + 1) % SCENES.length; scene(k); }
  const pauseBtn = h('button', { class: 'btn btn-small demo-pause', type: 'button', 'aria-pressed': String(paused), onClick: togglePause });
  function togglePause() {
    paused = !paused;
    pauseBtn.setAttribute('aria-pressed', String(paused));
    pauseBtn.replaceChildren(icon(paused ? 'player-play' : 'player-pause'), paused ? ' Play demo' : ' Pause demo');
    if (paused) { clearInterval(timer); timer = null; } else if (!timer) timer = setInterval(tick, 3800);
  }
  pauseBtn.replaceChildren(icon(paused ? 'player-play' : 'player-pause'), paused ? ' Play demo' : ' Pause demo');
  scene(0);
  if (!paused) timer = setInterval(tick, 3800);

  const stage = h('div', { class: 'stage', role: 'group', 'aria-label': 'Demo: the computer is sure about a Sun card and a Fish card. Then it sees a rocket it has never seen, and still guesses Fish.' },
    h('div', { class: 'scan' }, h('span', { class: 'corner tl' }), h('span', { class: 'corner tr' }), h('span', { class: 'corner bl' }), h('span', { class: 'corner br' }), arts),
    pauseBtn,
    h('div', { class: 'glass sure' }, face, say, sub, h('div', { class: 'bars' }, bars.map((b) => b.row))),
  );

  const tile = (name, title, text, cls = '') => h('div', { class: `tile ${cls}` }, h('div', { class: 'num', 'aria-hidden': 'true' }, chip(name, 'lg')), h('h3', null, title), h('p', null, text));

  root.append(
    h('section', { class: 'block center fade', style: { 'padding-bottom': '0' } },
      h('div', { class: 'wrap' },
        h('div', { class: 'eyebrow' }, 'AI Literacy Challenge · Ages 9–12'),
        h('h1', { tabindex: '-1' }, 'Teach a computer to see.', h('br'), h('span', { class: 'grad' }, 'Then try to fool it.')),
        h('p', { class: 'lead' }, 'Computers can look at pictures and guess what they are. But a computer only knows what it has been shown. Teach it with your webcam, then find out how easily it gets confused. When its examples are too few or too much alike, it makes mistakes and can be unfair. That is called bias.'),
        h('div', { class: 'cta-row' }, h('a', { class: 'btn btn-big', href: '#/teach' }, 'Start ▸'), h('a', { href: '#how' }, 'See how it works ›')),
      ),
      stage,
    ),
    h('section', { class: 'block alt', id: 'how', 'aria-labelledby': 'how-h' },
      h('div', { class: 'wrap' },
        h('div', { class: 'eyebrow' }, 'How it works'),
        h('h2', { id: 'how-h' }, 'Three steps. One big idea.'),
        h('div', { class: 'bento' },
          tile('school', '1. Teach', 'Hold a picture card up to your webcam. Press and hold to take pictures. That is how the computer learns.'),
          tile('search', '2. Test', 'Try to trick it! Change the light, tilt the card, add clutter, or show something totally new.', 'dark'),
          tile('pencil', '3. Think', 'Write down why it got confused. Then print your detective journal.', 'blue'),
        ),
      ),
    ),
    h('section', { class: 'block center', 'aria-labelledby': 'levels-h' },
      h('div', { class: 'wrap' },
        h('div', { class: 'eyebrow' }, 'The challenge'),
        h('h2', { id: 'levels-h' }, 'Four ways to trick a computer.'),
        h('p', { class: 'lead' }, 'Each level unlocks the next. Can you break them all?'),
        h('div', { class: 'grid4' },
          tile('bulb', 'Lighting', 'What happens in the dark?'),
          tile('rotate-2', 'Angles', 'Tilted? Upside down?'),
          tile('blocks', 'Clutter', 'A messy background.'),
          tile('rocket', 'Never Seen', 'Something brand new.', 'dark'),
        ),
      ),
    ),
    h('section', { class: 'block alt', 'aria-labelledby': 'words-h' },
      h('div', { class: 'wrap' },
        h('div', { class: 'eyebrow' }, 'Words to know'),
        h('h2', { id: 'words-h' }, 'Six words. That is all.'),
        h('dl', { class: 'words' }, WORDS.map(([w, m]) => h('div', { class: 'word' }, h('dt', null, w), h('dd', null, m)))),
      ),
    ),
    h('section', { class: 'block center' },
      h('div', { class: 'wrap' },
        h('h2', null, 'Ready to be a', h('br'), h('span', { class: 'grad' }, 'computer detective?')),
        h('div', { class: 'cta-row' }, h('a', { class: 'btn btn-big', href: '#/teach' }, 'Start ▸')),
      ),
    ),
  );

  return { title: 'How AI Sees', focus: 'h1', cleanup() { clearInterval(timer); } };
}
