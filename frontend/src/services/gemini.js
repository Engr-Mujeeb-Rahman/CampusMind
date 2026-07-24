import { UploadError } from '../utils/UploadError';
import { REQUEST_TIMEOUT_MS } from '../constants/uploadConfig';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateContent(prompt, options = {}) {
  if (!GEMINI_API_KEY) {
    throw new UploadError({
      code: 'AUTH_ERROR',
      stage: options.stage || 'process',
      message: 'VITE_GEMINI_API_KEY is not configured',
      retryable: false,
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        ...options,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        throw new UploadError({
          code: 'RATE_LIMITED',
          stage: options.stage || 'process',
          message: 'Gemini API rate limit exceeded',
          retryable: true,
        });
      }

      if (response.status === 403 || response.status === 401) {
        throw new UploadError({
          code: 'AUTH_ERROR',
          stage: options.stage || 'process',
          message: 'Gemini API authentication failed',
          retryable: false,
        });
      }

      throw new UploadError({
        code: 'API_ERROR',
        stage: options.stage || 'process',
        message: `Gemini API error: ${response.status} ${response.statusText}`,
        retryable: response.status >= 500,
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return text;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof UploadError) throw error;

    if (error.name === 'AbortError') {
      throw new UploadError({
        code: 'TIMEOUT',
        stage: options.stage || 'process',
        message: 'Gemini API request timed out',
        retryable: true,
      });
    }

    throw new UploadError({
      code: 'NETWORK_ERROR',
      stage: options.stage || 'process',
      message: error.message || 'Gemini API request failed',
      retryable: true,
    });
  }
}

export default { generateContent };
