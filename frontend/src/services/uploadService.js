import { UPLOAD_RETRY } from '../constants/uploadConfig';
import { UPLOAD_STAGE } from '../constants/uploadStage';
import { apiClient } from './apiClient';
import { extractTextFromFile } from '../utils/extractors';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function processFile(fileRecord, callbacks) {
  let cancelled = false;

  async function run() {
    let attempt = 0;

    while (attempt < UPLOAD_RETRY.MAX_RETRIES && !cancelled) {
      attempt++;
      const file = fileRecord.file;
      if (!file) {
        callbacks.onError(new Error('No file data available'));
        return;
      }

      try {
        callbacks.onProgress(20, UPLOAD_STAGE.UPLOAD);
        await delay(300);
        if (cancelled) return;

        callbacks.onProgress(40, UPLOAD_STAGE.UPLOAD);
        await delay(200);
        if (cancelled) return;

        callbacks.onProgress(55, UPLOAD_STAGE.EXTRACT);
        const content = await extractTextFromFile(file);
        if (cancelled) return;

        callbacks.onProgress(70, UPLOAD_STAGE.PROCESS);
        const body = {
          title: file.name,
          content,
          subject_id: fileRecord.subject_id || null,
        };
        const response = await apiClient.post('/upload', body);
        if (cancelled) return;

        callbacks.onProgress(100, UPLOAD_STAGE.FINALIZE);
        callbacks.onComplete({ documentId: response.id, title: file.name });
        return;
      } catch (error) {
        if (cancelled) return;

        const retryable = error.name === 'ApiError' ? error.status >= 500 : true;
        if (retryable && attempt < UPLOAD_RETRY.MAX_RETRIES) {
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
  };
}
