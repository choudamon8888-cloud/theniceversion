// A friendly "Are you sure?" box. We use this instead of window.confirm(),
// because browsers block confirm() inside embedded pages.

import { h } from '../dom.js';

export function askConfirm(message, yesText) {
  return new Promise((resolve) => {
    const finish = (answer) => { dialog.close(); dialog.remove(); resolve(answer); };
    const dialog = h('dialog', { class: 'dialog', 'aria-labelledby': 'dialog-message' },
      h('p', { id: 'dialog-message' }, message),
      h('div', { class: 'done-row' },
        h('button', { class: 'btn btn-ghost', type: 'button', autofocus: true, onClick: () => finish(false) }, 'Cancel'),
        h('button', { class: 'btn', type: 'button', onClick: () => finish(true) }, yesText),
      ),
    );
    dialog.addEventListener('cancel', (e) => { e.preventDefault(); finish(false); }); // Esc key
    document.body.append(dialog);
    dialog.showModal();
  });
}
