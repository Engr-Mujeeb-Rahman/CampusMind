import { Upload } from 'lucide-react';

export default function EmptyUploadState({ onUploadClick: _onUploadClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
        <Upload className="text-outline size-10" aria-hidden="true" />
      </div>
      <h4 className="font-headline-lg text-headline-lg text-on-surface mb-2">No files uploaded yet</h4>
      <p className="text-on-surface-variant max-w-sm">
        Upload your study materials above to get AI-powered summaries, flashcards, and quizzes.
      </p>
    </div>
  );
}
