import React, { useRef } from 'react';
import { CloudUpload, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function UploadZone({ isDragging, onDragEnter, onDragOver, onDragLeave, onDrop, onSelectFiles }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onSelectFiles(e.target.files);
    }
    e.target.value = '';
  };

  return (
    <div
      className={`w-full bg-surface-container-lowest border-2 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        isDragging ? 'drag-active' : 'border-outline-variant hover:border-primary'
      }`}
      tabIndex={0}
      role="button"
      aria-label="Upload Files"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.docx,.txt,.md"
      />
      <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-fixed transition-colors">
        <CloudUpload className="text-primary size-12 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
      </div>
      <h3 className="font-headline-lg text-headline-lg mb-2">Drag and drop files here</h3>
      <p className="text-on-surface-variant mb-8 text-center">Support for PDF, DOCX, TXT, and Markdown files (up to 50MB each)</p>

      <Button
        variant="primary"
        className="px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
        icon={Plus}
        onClick={(e) => { e.stopPropagation(); handleClick(); }}
      >
        Select Files
      </Button>
    </div>
  );
}
