import { hydrateIcons } from '../js/ui/icons.js';
document.getElementById('print').addEventListener('click', (e) => { e.preventDefault(); window.print(); });
hydrateIcons();
