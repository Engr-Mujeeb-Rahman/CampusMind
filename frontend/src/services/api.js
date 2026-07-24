import { UploadError } from '../utils/UploadError';
import { REQUEST_TIMEOUT_MS } from '../constants/uploadConfig';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new UploadError({
        code: 'API_ERROR',
        stage: options.stage || 'upload',
        message: `Request failed: ${response.status} ${response.statusText}`,
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
        stage: options.stage || 'upload',
        message: 'Request timed out',
        retryable: true,
      });
    }

    throw new UploadError({
      code: 'NETWORK_ERROR',
      stage: options.stage || 'upload',
      message: error.message || 'Network request failed',
      retryable: true,
    });
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
