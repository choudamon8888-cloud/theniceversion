import { h } from '../dom.js';
import { icon, chip } from '../ui/icons.js';

export function render(root) {
  const link = (href, text) => h('a', { href, target: '_blank', rel: 'noopener' }, text);
  const card = (id, name, title, ...body) => h('section', { class: 'panel', style: { 'margin-top': '20px' }, 'aria-labelledby': id }, h('h2', { id, class: 'hd' }, chip(name), title), body);
  root.append(h('div', { class: 'page fade' },
    h('div', { class: 'eyebrow' }, 'For educators'),
    h('h1', { tabindex: '-1' }, 'Run the workshop.'),
    h('p', { class: 'lead' }, 'How AI Sees is a 60–75 minute workshop for learners aged 9–12. Students teach a webcam classifier, then try to make it fail and explain why. The big idea: AI only learns from the examples it is given, so narrow examples cause errors and bias.'),
    card('print-h', 'printer', 'Printables',
      h('p', null, 'These open in a new tab. Print the cards in colour on Letter paper.'),
      h('ul', null,
        h('li', null, link('printables/guide.html', [icon('book'), ' Facilitator guide']), ' — setup, timing, questions, troubleshooting'),
        h('li', null, link('printables/cards.html', [icon('cards'), ' Picture cards']), ' — the training and mystery cards the webcam looks at, plus the Busy Background sheet'),
        h('li', null, link('printables/challenges.html', [icon('target-arrow'), ' Challenge cards']), ' — one per level, with lines to write answers on paper'),
      )),
    card('ethics-h', 'scale', 'Ethics built in',
      h('ul', null,
        h('li', null, h('strong', null, 'Never Seen It: '), 'learners see that an AI forces new things into the buckets it knows, then connect that to real-world sampling bias.'),
        h('li', null, h('strong', null, 'Model Card: '), 'the Reflect page checks whether the two (or three) classes had balanced pictures and warns when one has twice as many as another.'),
        h('li', null, h('strong', null, 'Human in the loop: '), 'a closing question asks why a human expert must double-check an AI’s guesses.'),
      )),
    card('access-h', 'accessible', 'Accessibility',
      h('ul', null,
        h('li', null, 'Everything works with a keyboard. On the Teach Station press 1, 2 or 3 to choose a card, then hold Space or Enter to record. No mouse or trackpad needed.'),
        h('li', null, 'Strong colour contrast, visible focus outlines, big targets, and no auto-moving content without a pause button.'),
        h('li', null, 'Results are announced to screen readers. Motion is switched off for people who ask their device for less motion.'),
      )),
    card('priv-h', 'shield-lock', 'Privacy',
      h('ul', null,
        h('li', null, 'Everything runs in the browser. There is no server, login or analytics.'),
        h('li', null, 'Webcam pictures are never uploaded or saved. The computer keeps only numbers about each picture, in memory, until the page is closed.'),
        h('li', null, 'Journal answers and picture counts (just numbers) are saved in this browser’s localStorage only. “Start over” erases them.'),
        h('li', null, 'The page’s security rules (Content-Security-Policy) block it from contacting any other website.'),
      ),
      h('p', null, h('strong', null, 'Shared laptops: '), 'ask each new group to press “Start over” before they begin.')),
    card('lic-h', 'file-text', 'License',
      h('p', null, 'The lesson text, cards and guide are licensed under ',
        h('a', { href: 'https://creativecommons.org/licenses/by/4.0/', target: '_blank', rel: 'noopener noreferrer' }, 'Creative Commons Attribution 4.0 (CC BY 4.0)'),
        '. You may share and adapt them, even commercially, if you give credit.'),
      h('p', null, h('strong', null, 'Suggested credit: '), '“How AI Sees” — Glocal Foundation of Canada AI Literacy Challenge, CC BY 4.0.'),
      h('p', { class: 'small' }, 'Built with TensorFlow.js, MobileNet and the KNN classifier (Apache 2.0).')),
  ));
  return { title: 'For Educators', focus: 'h1' };
}
