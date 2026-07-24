import { UPLOAD_STAGE } from '../constants/uploadStage';

const STEPS = [
  { delay: 400, progress: 15, stage: UPLOAD_STAGE.UPLOAD },
  { delay: 1200, progress: 35, stage: UPLOAD_STAGE.UPLOAD },
  { delay: 2400, progress: 60, stage: UPLOAD_STAGE.EXTRACT },
  { delay: 3800, progress: 85, stage: UPLOAD_STAGE.PROCESS },
  { delay: 5500, progress: 100, stage: UPLOAD_STAGE.FINALIZE },
];

export function processFile(_fileRecord, { onProgress, onComplete, onError: _onError }) {
  const timers = [];
  let cancelled = false;

  for (const { delay, progress, stage } of STEPS) {
    const id = setTimeout(() => {
      if (cancelled) return;
      onProgress(progress, stage);
      if (progress === 100) {
        onComplete({ fileId: _fileRecord.id });
      }
    }, delay);
    timers.push(id);
  }

  return function cancel() {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}
