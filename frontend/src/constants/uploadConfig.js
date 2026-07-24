export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.md'];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const MAX_FILES_PER_UPLOAD = 10;

export const FILE_SIZE_UNITS = [
  { unit: 'GB', threshold: 1073741824 },
  { unit: 'MB', threshold: 1048576 },
  { unit: 'KB', threshold: 1024 },
];

export const UPLOAD_RETRY = {
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
  MAX_DELAY_MS: 10000,
};

export const REQUEST_TIMEOUT_MS = 30000;

