export class UploadError extends Error {
  constructor({ code, stage, message, retryable = false }) {
    super(message);
    this.name = 'UploadError';
    this.code = code;
    this.stage = stage;
    this.retryable = retryable;
  }
}
