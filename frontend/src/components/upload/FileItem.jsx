import { X } from 'lucide-react';
import UploadProgress from './UploadProgress';
import { UPLOAD_STATUS } from '../../constants/uploadStatus';

const STATUS_LABELS = {
  [UPLOAD_STATUS.QUEUED]: 'Queued',
  [UPLOAD_STATUS.UPLOADING]: 'Uploading',
  [UPLOAD_STATUS.PROCESSING]: 'Processing',
  [UPLOAD_STATUS.COMPLETED]: 'Completed',
  [UPLOAD_STATUS.ERROR]: 'Error',
  [UPLOAD_STATUS.CANCELLED]: 'Cancelled',
};

function getProgressVariant(status) {
  if (status === UPLOAD_STATUS.ERROR) return 'error';
  return 'determinate';
}

export default function FileItem({ file, onCancel }) {
  const IconComponent = file.icon;

  return (
    <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4 group">
      <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary shrink-0">
        <IconComponent className="size-6" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-on-surface truncate pr-2">{file.name}</span>
          <span className="text-xs font-bold text-primary shrink-0">{file.progress}%</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] text-on-surface-variant mb-2">
          <span>{file.size}</span>
          <span>•</span>
          <span className="text-primary font-bold">{STATUS_LABELS[file.status] || file.status}</span>
        </div>
        <UploadProgress value={file.progress} variant={getProgressVariant(file.status)} />
      </div>
      <button
        onClick={onCancel}
        className="text-on-surface-variant hover:text-error transition-colors p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error rounded-full shrink-0"
        aria-label="Cancel upload"
      >
        <X className="size-6" aria-hidden="true" />
      </button>
    </div>
  );
}
