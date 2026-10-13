// A webcam picker + live video on a dark "stage". Used on the Teach page and every level page.
// Put things on top of the video (like the confidence panel) with box.stage.append(...).

import { h } from '../dom.js';
import { icon } from './icons.js';
import { openCamera, listCameras, stopStream, friendlyCameraError } from '../camera.js';

let uid = 0;

export function createCameraBox() {
  const selectId = `camera-select-${++uid}`;
  const video = h('video', { autoplay: true, playsinline: true, 'aria-label': 'Live view from your webcam' });
  video.muted = true;
  const select = h('select', { id: selectId, onChange: () => start() });
  const stage = h('div', { class: 'cam' }, video);
  const msg = h('p', { class: 'notice cam-msg', role: 'status', hidden: true });
  const retry = h('button', { class: 'btn btn-small', type: 'button', hidden: true, onClick: () => start() }, [icon('refresh'), ' Try again']);

  const el = h('div', { class: 'cam-wrap' },
    h('label', { class: 'field-label', for: selectId }, [icon('camera'), ' Webcam']),
    select,
    stage,
    msg,
    retry,
  );

  function say(text, canRetry) {
    msg.textContent = text;
    msg.hidden = !text;
    retry.hidden = !canRetry;
  }

  async function fillList(activeId) {
    try {
      const cams = await listCameras();
      select.replaceChildren(...cams.map((c, i) => {
        const o = h('option', { value: c.deviceId }, c.label || `Camera ${i + 1}`);
        if (c.deviceId === activeId) o.selected = true;
        return o;
      }));
    } catch { /* the list is a nice-to-have */ }
  }

  async function start() {
    say('Starting the camera…', false);
    try {
      const activeId = await openCamera(video, select.value || null);
      await fillList(activeId);
      say('', false);
    } catch (err) {
      say(friendlyCameraError(err), true);
    }
  }

  // If a USB webcam is plugged in later, update the list.
  const onDevices = () => fillList(video.srcObject?.getVideoTracks()[0]?.getSettings().deviceId);
  navigator.mediaDevices?.addEventListener?.('devicechange', onDevices);

  return {
    el,
    video,
    stage,
    start,
    isLive: () => video.readyState >= 2 && !!video.srcObject,
    stop() {
      navigator.mediaDevices?.removeEventListener?.('devicechange', onDevices);
      stopStream(video);
    },
  };
}
