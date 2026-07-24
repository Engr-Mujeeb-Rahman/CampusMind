import { ALLOWED_MIME_TYPES, ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from '../constants/uploadConfig';
import { getFileExtension } from './fileHelpers';

function validResult() {
  return { valid: true, errors: [], warnings: [] };
}

function invalidResult(errors, warnings = []) {
  return { valid: false, errors, warnings };
}

export function validateFileType(file) {
  const ext = getFileExtension(file.name);

  const typeOk = ALLOWED_MIME_TYPES.includes(file.type);
  const extOk = ALLOWED_EXTENSIONS.includes(ext);

  if (typeOk || extOk) {
    return validResult();
  }

  return invalidResult([
    { code: 'INVALID_TYPE', field: 'type', message: `"${ext}" files are not supported.` },
  ]);
}

export function validateFileSize(file) {
  if (file.size <= MAX_FILE_SIZE) {
    return validResult();
  }

  return invalidResult([
    { code: 'FILE_TOO_LARGE', field: 'size', message: `File exceeds the 50 MB limit.` },
  ]);
}

export function validateFile(file) {
  const typeResult = validateFileType(file);
  const sizeResult = validateFileSize(file);

  const errors = [...typeResult.errors, ...sizeResult.errors];
  const warnings = [...typeResult.warnings, ...sizeResult.warnings];

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateFiles(files) {
  return Array.from(files).map((file) => validateFile(file));
}
