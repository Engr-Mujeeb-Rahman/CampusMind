import { UploadError } from '../utils/UploadError';
import { REQUEST_TIMEOUT_MS } from '../constants/uploadConfig';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export async function triggerWorkflow(workflowId, payload = {}, options = {}) {
  if (!N8N_WEBHOOK_URL) {
    throw new UploadError({
      code: 'AUTH_ERROR',
      stage: options.stage || 'finalize',
      message: 'VITE_N8N_WEBHOOK_URL is not configured',
      retryable: false,
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${N8N_WEBHOOK_URL}/${workflowId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new UploadError({
        code: 'WORKFLOW_FAILED',
        stage: options.stage || 'finalize',
        message: `n8n workflow failed: ${response.status} ${response.statusText}`,
        retryable: response.status >= 500,
      });
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof UploadError) throw error;

    if (error.name === 'AbortError') {
      throw new UploadError({
        code: 'TIMEOUT',
        stage: options.stage || 'finalize',
        message: 'n8n webhook request timed out',
        retryable: true,
      });
    }

    throw new UploadError({
      code: 'NETWORK_ERROR',
      stage: options.stage || 'finalize',
      message: error.message || 'n8n request failed',
      retryable: true,
    });
  }
}

export default { triggerWorkflow };
