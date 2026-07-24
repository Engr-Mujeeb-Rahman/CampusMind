import { FileText, CheckCircle2, RefreshCw, Circle } from 'lucide-react';

export const RECENT_UPLOADS = [
  {
    id: '1',
    filename: 'Psychology_Lecture_04.pdf',
    progress: 80,
    size: '2.4 MB',
    date: 'Oct 24, 2023',
    status: 'Processing',
    icon: FileText
  }
];

export const PROCESSING_STEPS = [
  { id: '1', label: 'Uploading...', status: 'complete', icon: CheckCircle2 },
  { id: '2', label: 'Extracting text...', status: 'complete', icon: CheckCircle2 },
  { id: '3', label: 'AI Processing...', status: 'active', icon: RefreshCw },
  { id: '4', label: 'Completed successfully', status: 'pending', icon: Circle }
];
