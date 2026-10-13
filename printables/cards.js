// Picture cards. Drawn as vector art so they print sharply on any printer.
// To add a card: write a small function that returns SVG shapes (200 × 200), then add it to a set below.

const wrap = (bg, shapes) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="200" fill="${bg}"/>${shapes}</svg>`;

function sun({ color = '#FFC400', ray = '#FF9800', rays = 8, face = false, bg = '#FFFFFF' } = {}) {
  const lines = Array.from({ length: rays }, (_, i) =>
    `<line x1="100" y1="30" x2="100" y2="10" transform="rotate(${(i * 360) / rays} 100 100)"/>`).join('');
  const smile = face
    ? '<circle cx="86" cy="92" r="5" fill="#111827"/><circle cx="114" cy="92" r="5" fill="#111827"/><path d="M82 110 Q100 128 118 110" fill="none" stroke="#111827" stroke-width="5" stroke-linecap="round"/>'
    : '';
  return wrap(bg, `<g stroke="${ray}" stroke-width="10" stroke-linecap="round">${lines}</g><circle cx="100" cy="100" r="46" fill="${color}"/>${smile}`);
}

function fish({ body = '#2563EB', fin = '#1E3A8A', flip = false, round = false, bubbles = false, bg = '#FFFFFF' } = {}) {
  const rx = round ? 50 : 56;
  const ry = round ? 46 : 36;
  const spots = round
    ? `<circle cx="95" cy="75" r="7" fill="${fin}"/><circle cx="115" cy="105" r="8" fill="${fin}"/><circle cx="88" cy="122" r="6" fill="${fin}"/>`
    : '';
  const bub = bubbles
    ? '<circle cx="40" cy="60" r="6" fill="none" stroke="#111827" stroke-width="3"/><circle cx="28" cy="42" r="4" fill="none" stroke="#111827" stroke-width="3"/>'
    : '';
  return wrap(bg, `<g transform="${flip ? 'translate(200 0) scale(-1 1)' : ''}">
    <polygon points="140,100 188,66 188,134" fill="${fin}"/>
    <ellipse cx="90" cy="100" rx="${rx}" ry="${ry}" fill="${body}"/>
    <polygon points="78,${100 - ry + 4} 104,${100 - ry - 26} 120,${100 - ry + 6}" fill="${fin}"/>
    ${spots}
    <circle cx="62" cy="92" r="9" fill="#FFFFFF"/><circle cx="60" cy="92" r="4" fill="#111827"/>${bub}
  </g>`);
}

function tree({ pine = false } = {}) {
  const trunk = '<rect x="88" y="120" width="24" height="64" fill="#8D5524"/>';
  const top = pine
    ? '<polygon points="100,18 150,92 50,92" fill="#1B7F3B"/><polygon points="100,50 162,128 38,128" fill="#1B7F3B"/>'
    : '<circle cx="100" cy="78" r="46" fill="#2E9E4F"/><circle cx="64" cy="106" r="32" fill="#2E9E4F"/><circle cx="136" cy="106" r="32" fill="#2E9E4F"/>';
  return wrap('#FFFFFF', trunk + top);
}

function rocket() {
  return wrap('#FFFFFF', `
    <polygon points="70,110 40,152 72,140" fill="#7C3AED"/><polygon points="130,110 160,152 128,140" fill="#7C3AED"/>
    <path d="M85 145 Q100 196 115 145Z" fill="#F97316"/>
    <path d="M100 18 C132 50 136 100 130 142 L70 142 C64 100 68 50 100 18Z" fill="#E5E7EB" stroke="#111827" stroke-width="4"/>
    <path d="M100 18 C116 34 124 54 128 76 L72 76 C76 54 84 34 100 18Z" fill="#7C3AED"/>
    <circle cx="100" cy="106" r="15" fill="#FFFFFF" stroke="#111827" stroke-width="4"/>`);
}

function moon() {
  const stars = [[40, 40, 3], [60, 150, 2.5], [165, 60, 3], [170, 140, 2.5], [150, 25, 2]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF"/>`).join('');
  return wrap('#0F172A', `${stars}<path d="M130 30 A76 76 0 1 0 130 170 A72 72 0 0 1 130 30Z" fill="#FFE08A"/>`);
}

// The messy "Busy Background" sheet: bright random shapes. A fixed seed means every print looks the same.
export function busyBackground() {
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const colours = ['#FFC400', '#2563EB', '#E11D48', '#16A34A', '#7C3AED', '#F97316', '#0EA5E9', '#111827'];
  const shapes = Array.from({ length: 110 }, () => {
    const x = rand() * 190, y = rand() * 250, s = 8 + rand() * 20;
    const c = colours[Math.floor(rand() * colours.length)];
    const kind = Math.floor(rand() * 4);
    if (kind === 0) return `<circle cx="${x}" cy="${y}" r="${s / 2}" fill="${c}"/>`;
    if (kind === 1) return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${c}" transform="rotate(${rand() * 90} ${x} ${y})"/>`;
    if (kind === 2) return `<polygon points="${x},${y - s / 2} ${x + s / 2},${y + s / 2} ${x - s / 2},${y + s / 2}" fill="${c}"/>`;
    return `<path d="M${x} ${y} q${s / 2} ${-s} ${s} 0" fill="none" stroke="${c}" stroke-width="3"/>`;
  }).join('');
  return `<svg viewBox="0 0 190 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="190" height="250" fill="#FFFFFF"/>${shapes}</svg>`;
}

export const SHEETS = [
  {
    title: 'Training cards: Sun and Fish',
    note: 'Use these in the Teach Station. Two different pictures of each, so you can choose how much variety to teach.',
    cards: [
      { label: 'Sun 1', art: sun() },
      { label: 'Sun 2', art: sun({ color: '#FFB300', ray: '#F57C00', rays: 12, face: true }) },
      { label: 'Fish 1', art: fish() },
      { label: 'Fish 2', art: fish({ body: '#0EA5E9', fin: '#0369A1', flip: true, bubbles: true }) },
    ],
  },
  {
    title: 'Extra cards: fix-it cards and the Tree card',
    note: 'Sun 3 and Fish 3 look different from the first ones. Use them to “fix” the computer. The Tree cards are the third class in Explorer mode.',
    cards: [
      { label: 'Sun 3', art: sun({ color: '#FF8F00', ray: '#E65100', rays: 10, bg: '#FFE0B2' }) },
      { label: 'Fish 3', art: fish({ body: '#1D4ED8', fin: '#1E3A8A', round: true }) },
      { label: 'Tree 1', art: tree() },
      { label: 'Tree 2', art: tree({ pine: true }) },
    ],
  },
  {
    title: 'Mystery cards (Level 4: Never Seen It)',
    note: 'Keep these hidden until Level 4. The computer has never seen them.',
    cards: [
      { label: 'Rocket', art: rocket() },
      { label: 'Moon', art: moon() },
      { label: 'Yellow Fish', art: fish({ body: '#FFC400', fin: '#FF9800' }) },
      { label: 'Blue Sun', art: sun({ color: '#2563EB', ray: '#1E3A8A' }) },
    ],
  },
];
