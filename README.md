# How AI Sees: the nice version

The Apple-style version of the project, with icon chips, ethics and accessibility features. It is a standalone site with its own code, AI files and printables.

If you turn on GitHub Pages for the repo, it lives at `https://choudamon8888-cloud.github.io/theniceversion/`.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>.

## What is new compared with v1

**Design:** big type, lots of space, frosted header, soft shadows, rounded icon chips (Tabler line icons, no emoji), and an animated home-page demo (with a pause button). The computer's answer panel is green when it is sure, blue when it thinks so, and yellow when it is not sure. Words and icons say the same thing, so colour is never the only clue.

**Accessibility (WCAG 2.1 AA)**
- Teach Station works with no mouse: `1` / `2` / `3` pick the active card, then hold `Space` or `Enter` to record. Space never scrolls the page. See `js/keyboard.js`.
- Blue focus outline (`3px solid #2563eb`, offset 2px) on every button, link, input, textarea and select.
- Skip link, labelled controls, screen-reader announcements, 44px+ targets, reduced-motion support, no horizontal scrolling on small screens.

**Ethics**
- Level 4 "Never Seen It": a "Big idea" box explaining that an AI does not know what it does not know, and a journal question about narrow examples being unfair or dangerous. Edit it in `js/levels.js` (the optional `idea` field works on any level).
- Reflect page **Model Card** (`js/ui/balance.js`): reads the saved picture counts and shows "Balanced Training Set" or an "Uneven Data" warning when one class has twice as many pictures as another (`BALANCE_RATIO` in `js/config.js`).
- Reflect page **human-in-the-loop** question.
- The Reflect page prints on one Letter sheet (see the `@media print` block at the end of `css/style.css`).

Only picture **counts** (numbers) are saved, in `localStorage` under a different key from v1. Pictures are never saved.

## Adding levels, cards

Same as v1: add an object to `js/levels.js`; add cards in `printables/cards.js`.
