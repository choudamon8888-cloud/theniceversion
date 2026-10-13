// Icons from Tabler Icons (MIT licence, https://tabler.io/icons), bundled so the site never
// loads anything from another website. Each one is a small line drawing that takes the colour of its text.
// To add an icon: copy its <path> tags from a Tabler .svg file into the list below.

const ICONS = {
  "accessible": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1\" /><path d=\"M11.5 7.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0\" fill=\"currentColor\" />",
  "alert-circle": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /><path d=\"M12 8v4\" /><path d=\"M12 16h.01\" />",
  "alert-triangle": "<path d=\"M12 9v4\" /><path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /><path d=\"M12 16h.01\" />",
  "apple": "<path d=\"M4 11.319c0 3.102 .444 5.319 2.222 7.978c1.351 1.797 3.156 2.247 5.08 .988c.426 -.268 .97 -.268 1.397 0c1.923 1.26 3.728 .809 5.079 -.988c1.778 -2.66 2.222 -4.876 2.222 -7.977c0 -2.661 -1.99 -5.32 -4.444 -5.32c-1.267 0 -2.41 .693 -3.22 1.44a.5 .5 0 0 1 -.672 0c-.809 -.746 -1.953 -1.44 -3.22 -1.44c-2.454 0 -4.444 2.66 -4.444 5.319\" /><path d=\"M7 12c0 -1.47 .454 -2.34 1.5 -3\" /><path d=\"M12 7c0 -1.2 .867 -4 3 -4\" />",
  "arrow-right": "<path d=\"M5 12l14 0\" /><path d=\"M13 18l6 -6\" /><path d=\"M13 6l6 6\" />",
  "ban": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M5.7 5.7l12.6 12.6\" />",
  "blocks": "<path d=\"M14 4a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1l0 -5\" /><path d=\"M3 14h12a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h3a2 2 0 0 1 2 2v12\" />",
  "book": "<path d=\"M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0\" /><path d=\"M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0\" /><path d=\"M3 6l0 13\" /><path d=\"M12 6l0 13\" /><path d=\"M21 6l0 13\" />",
  "brain": "<path d=\"M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8\" /><path d=\"M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8\" /><path d=\"M17.5 16a3.5 3.5 0 0 0 0 -7h-.5\" /><path d=\"M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0\" /><path d=\"M6.5 16a3.5 3.5 0 0 1 0 -7h.5\" /><path d=\"M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10\" />",
  "bulb": "<path d=\"M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7\" /><path d=\"M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3\" /><path d=\"M9.7 17l4.6 0\" />",
  "camera": "<path d=\"M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2\" /><path d=\"M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" />",
  "cards": "<path d=\"M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304l0 .001\" /><path d=\"M15 4h1a1 1 0 0 1 1 1v3.5\" /><path d=\"M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374\" />",
  "check": "<path d=\"M5 12l5 5l10 -10\" />",
  "circle-check": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M9 12l2 2l4 -4\" />",
  "eye": "<path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /><path d=\"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6\" />",
  "file-text": "<path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /><path d=\"M9 9l1 0\" /><path d=\"M9 13l6 0\" /><path d=\"M9 17l6 0\" />",
  "id-badge-2": "<path d=\"M7 12h3v4h-3l0 -4\" /><path d=\"M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6\" /><path d=\"M10 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -3\" /><path d=\"M14 16h2\" /><path d=\"M14 12h4\" />",
  "info-circle": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /><path d=\"M12 9h.01\" /><path d=\"M11 12h1v4h1\" />",
  "keyboard": "<path d=\"M2 8a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2l0 -8\" /><path d=\"M6 10l0 .01\" /><path d=\"M10 10l0 .01\" /><path d=\"M14 10l0 .01\" /><path d=\"M18 10l0 .01\" /><path d=\"M6 14l0 .01\" /><path d=\"M18 14l0 .01\" /><path d=\"M10 14l4 .01\" />",
  "lock": "<path d=\"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6\" /><path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0\" /><path d=\"M8 11v-4a4 4 0 1 1 8 0v4\" />",
  "microscope": "<path d=\"M5 21h14\" /><path d=\"M6 18h2\" /><path d=\"M7 18v3\" /><path d=\"M9 11l3 3l6 -6l-3 -3l-6 6\" /><path d=\"M10.5 12.5l-1.5 1.5\" /><path d=\"M17 3l3 3\" /><path d=\"M12 21a6 6 0 0 0 3.715 -10.712\" />",
  "mood-confuzed": "",
  "mood-happy": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M9 9l.01 0\" /><path d=\"M15 9l.01 0\" /><path d=\"M8 13a4 4 0 1 0 8 0h-8\" />",
  "mood-neutral": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M9 10l.01 0\" /><path d=\"M15 10l.01 0\" />",
  "mood-puzzled": "<path d=\"M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794\" /><path d=\"M10 10h.01\" /><path d=\"M14 8h.01\" /><path d=\"M12 15c1 -1.333 2 -2 3 -2\" /><path d=\"M20 9v.01\" /><path d=\"M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483\" />",
  "mood-smile": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /><path d=\"M9 10l.01 0\" /><path d=\"M15 10l.01 0\" /><path d=\"M9.5 15a3.5 3.5 0 0 0 5 0\" />",
  "notebook": "<path d=\"M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18\" /><path d=\"M13 8l2 0\" /><path d=\"M13 12l2 0\" />",
  "pencil": "<path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\" /><path d=\"M13.5 6.5l4 4\" />",
  "photo": "<path d=\"M15 8h.01\" /><path d=\"M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12\" /><path d=\"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5\" /><path d=\"M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3\" />",
  "plant-2": "<path d=\"M2 9a10 10 0 1 0 20 0\" /><path d=\"M12 19a10 10 0 0 1 10 -10\" /><path d=\"M2 9a10 10 0 0 1 10 10\" /><path d=\"M12 4a9.7 9.7 0 0 1 2.99 7.5\" /><path d=\"M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5\" />",
  "plant": "<path d=\"M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4\" /><path d=\"M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3\" /><path d=\"M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3\" /><path d=\"M12 15l0 -6\" />",
  "player-pause": "<path d=\"M6 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12\" /><path d=\"M14 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12\" />",
  "player-play": "<path d=\"M7 4v16l13 -8l-13 -8\" />",
  "plug-connected": "<path d=\"M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5\" /><path d=\"M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5\" /><path d=\"M3 21l2.5 -2.5\" /><path d=\"M18.5 5.5l2.5 -2.5\" /><path d=\"M10 11l-2 2\" /><path d=\"M13 14l-2 2\" />",
  "printer": "<path d=\"M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2\" /><path d=\"M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4\" /><path d=\"M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4\" />",
  "refresh": "<path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\" /><path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\" />",
  "robot": "<path d=\"M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4\" /><path d=\"M12 2v2\" /><path d=\"M9 12v9\" /><path d=\"M15 12v9\" /><path d=\"M5 16l4 -2\" /><path d=\"M15 14l4 2\" /><path d=\"M9 18h6\" /><path d=\"M10 8v.01\" /><path d=\"M14 8v.01\" />",
  "rocket": "<path d=\"M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3\" /><path d=\"M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3\" /><path d=\"M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" />",
  "rotate-2": "<path d=\"M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5\" /><path d=\"M18.37 7.16l0 .01\" /><path d=\"M13 19.94l0 .01\" /><path d=\"M16.84 18.37l0 .01\" /><path d=\"M19.37 15.1l0 .01\" /><path d=\"M19.94 11l0 .01\" />",
  "scale": "<path d=\"M7 20l10 0\" /><path d=\"M6 6l6 -1l6 1\" /><path d=\"M12 3l0 17\" /><path d=\"M9 12l-3 -6l-3 6a3 3 0 0 0 6 0\" /><path d=\"M21 12l-3 -6l-3 6a3 3 0 0 0 6 0\" />",
  "school": "<path d=\"M22 9l-10 -4l-10 4l10 4l10 -4v6\" /><path d=\"M6 10.6v5.4a6 3 0 0 0 12 0v-5.4\" />",
  "search": "<path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /><path d=\"M21 21l-6 -6\" />",
  "seeding": "",
  "shield-lock": "<path d=\"M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3\" /><path d=\"M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M12 12l0 2.5\" />",
  "star": "<path d=\"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245\" />",
  "target-arrow": "<path d=\"M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M12 7a5 5 0 1 0 5 5\" /><path d=\"M13 3.055a9 9 0 1 0 7.941 7.945\" /><path d=\"M15 6v3h3l3 -3h-3v-3l-3 3\" /><path d=\"M15 9l-3 3\" />",
  "trash": "<path d=\"M4 7l16 0\" /><path d=\"M10 11l0 6\" /><path d=\"M14 11l0 6\" /><path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\" /><path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\" />",
};

const NS = 'http://www.w3.org/2000/svg';

// A small decorative icon. Screen readers skip it, because the words next to it say everything.
export function icon(name, size) {
  const inner = ICONS[name];
  if (!inner) throw new Error(`Unknown icon: ${name}`);
  const span = document.createElement('span');
  span.className = 'ico';
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  if (size) span.style.setProperty('--ico-size', size);
  return span;
}

// An icon on a soft rounded square (the "icon chip").
export function chip(name, extraClass = '') {
  const el = document.createElement('span');
  el.className = `chip ${extraClass}`.trim();
  el.setAttribute('aria-hidden', 'true');
  el.append(icon(name));
  return el;
}

// Fills in <span data-icon="name"> placeholders in static HTML.
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    if (el.firstChild) return;
    el.classList.add('ico');
    el.setAttribute('aria-hidden', 'true');
    el.append(icon(el.dataset.icon).firstChild);
  });
}
