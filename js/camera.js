// Webcam helpers. The video stays on screen only. We never record or save it.

export async function listCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((d) => d.kind === 'videoinput');
}

export function stopStream(video) {
  const stream = video.srcObject;
  if (stream) stream.getTracks().forEach((t) => t.stop());
  video.srcObject = null;
}

export async function openCamera(video, deviceId) {
  if (!navigator.mediaDevices?.getUserMedia) {
    const err = new Error('insecure');
    err.name = 'InsecureContext';
    throw err;
  }
  stopStream(video);
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
    },
  });
  video.srcObject = stream;
  await video.play();
  return stream.getVideoTracks()[0].getSettings().deviceId;
}

// Kid-friendly words for camera problems.
export function friendlyCameraError(err) {
  switch (err?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'The browser blocked the camera. Click the camera icon next to the web address, choose “Allow”, then press Try again.';
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'I can’t find that camera. Plug in your USB webcam, pick it from the list, then press Try again.';
    case 'NotReadableError':
    case 'AbortError':
      return 'Another app may be using the camera. Close it, then press Try again.';
    case 'InsecureContext':
      return 'Cameras only work on a secure web address (https). Ask your educator for help.';
    default:
      return 'Something went wrong with the camera. Press Try again.';
  }
}
