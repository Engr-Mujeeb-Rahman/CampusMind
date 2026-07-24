import { FILE_SIZE_UNITS } from '../constants/uploadConfig';

let counter = 0;

export function generateFileId() {
  counter += 1;
  return `file_${Date.now()}_${counter}`;
}

export function getFileExtension(filename) {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) return '';
  return filename.slice(dotIndex).toLowerCase();
}

export function formatFileSize(bytes) {
  for (const { unit, threshold } of FILE_SIZE_UNITS) {
    if (bytes >= threshold) {
      const value = bytes / threshold;
      return `${value.toFixed(1)} ${unit}`;
    }
  }
  return `${bytes} B`;
}

const TYPE_LABELS = {
  '.pdf': 'PDF',
  '.docx': 'DOCX',
  '.txt': 'Text',
  '.md': 'Markdown',
};

export function humanReadableType(extension) {
  return TYPE_LABELS[extension] || extension.replace('.', '').toUpperCase();
}
