import { processFile as simulateProcessFile } from './simulateAdapter';
import { UPLOAD_RETRY } from '../constants/uploadConfig';
import { UploadError } from '../utils/UploadError';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function processFile(fileRecord, callbacks) {
  let cancelCurrent = null;
  let cancelled = false;
  let attempt = 0;

  async function run() {
    while (attempt < UPLOAD_RETRY.MAX_RETRIES && !cancelled) {
      attempt++;

      try {
        await new Promise((resolve, reject) => {
          if (cancelled) {
            reject(new UploadError({ code: 'CANCELLED', message: 'Upload cancelled', retryable: false }));
            return;
          }

          cancelCurrent = simulateProcessFile(fileRecord, {
            onProgress: (progress, stage) => {
              if (!cancelled) callbacks.onProgress(progress, stage);
            },
            onComplete: (result) => {
              if (!cancelled) {
                callbacks.onComplete(result);
                resolve();
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return;
      } catch (error) {
        if (cancelled) return;

        if (error.retryable && attempt < UPLOAD_RETRY.MAX_RETRIES) {
          const backoff = Math.min(
            UPLOAD_RETRY.BASE_DELAY_MS * Math.pow(2, attempt - 1),
            UPLOAD_RETRY.MAX_DELAY_MS
          );
          await delay(backoff);
          continue;
        }

        callbacks.onError(error);
        return;
      }
    }
  }

  run();

  return function cancel() {
    cancelled = true;
    if (cancelCurrent) cancelCurrent();
  };
}
