import { hydrateIcons } from '../js/ui/icons.js';
import { SHEETS, busyBackground } from './cards.js';
const root = document.getElementById('sheets');
for (const sheet of SHEETS) {
  const sec = document.createElement('section');
  sec.className = 'sheet';
  sec.innerHTML = `<h2></h2><p class="note small"></p><div class="cards-grid"></div>`;
  sec.querySelector('h2').textContent = sheet.title;
  sec.querySelector('.note').textContent = sheet.note;
  const grid = sec.querySelector('.cards-grid');
  for (const c of sheet.cards) {
    const fig = document.createElement('figure');
    fig.innerHTML = `<div class="pcard">${c.art}</div><figcaption></figcaption>`;
    fig.querySelector('figcaption').textContent = c.label;
    grid.append(fig);
  }
  root.append(sec);
}
const bg = document.createElement('section');
bg.className = 'sheet bg-sheet';
bg.innerHTML = `<h2>Busy Background sheet (Level 3: Clutter)</h2><p class="note small">Hold this behind a card. It is full of colourful shapes.</p>${busyBackground()}`;
root.append(bg);
document.getElementById('print').addEventListener('click', () => window.print());
hydrateIcons();
