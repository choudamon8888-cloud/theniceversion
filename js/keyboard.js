// Keyboard-only recording for the Teach Station.
//
//   1, 2, 3   pick which card is "active"
//   Space or Enter (hold)   take pictures of the active card; let go to stop
//
// Why: trackpads on library laptops make "click and hold" hard.
// Space does NOT scroll the page while recording (we call preventDefault).
// If a button, link or text box has focus, we leave Space/Enter alone so those still work normally.

const INTERACTIVE = 'a, button, input, textarea, select, summary, [contenteditable="true"]';
const isHoldKey = (e) => e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter';
const noModifier = (e) => !(e.altKey || e.ctrlKey || e.metaKey);

export function installRecordKeys({ classCount, getActive, setActive, start, stop }) {
  let holding = false;

  function onKeyDown(e) {
    if (!noModifier(e)) return;
    const typing = e.target.closest?.('input, textarea, select');

    // Number keys choose the card.
    if (!typing && /^[1-9]$/.test(e.key)) {
      const i = Number(e.key) - 1;
      if (i < classCount()) setActive(i);
      return;
    }

    // Space / Enter record, but only when nothing interactive has focus.
    if (isHoldKey(e) && !e.target.closest?.(INTERACTIVE)) {
      e.preventDefault(); // stops Space from scrolling the page
      if (!e.repeat && !holding) { holding = true; start(getActive()); }
    }
  }

  function release(e) {
    if (e && isHoldKey(e) && e.target.closest?.(INTERACTIVE)) return;
    if (e) e.preventDefault();
    if (holding) { holding = false; stop(); }
  }

  const onKeyUp = (e) => { if (isHoldKey(e)) release(e); };
  const onBlur = () => release(null);

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  document.addEventListener('visibilitychange', onBlur);

  return function remove() {
    release(null);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', onBlur);
    document.removeEventListener('visibilitychange', onBlur);
  };
}
