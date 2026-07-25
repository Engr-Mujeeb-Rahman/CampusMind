import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import UploadHeader from '../components/upload/UploadHeader';
import UploadZone from '../components/upload/UploadZone';
import RecentUploads from '../components/upload/RecentUploads';
import ActionPrompt from '../components/upload/ActionPrompt';
import useUpload from '../hooks/useUpload';

export default function UploadPage() {
  const navigate = useNavigate();
  const { fileRecords, addFiles, removeFile, completedCount } = useUpload();
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  const handleSelectFiles = useCallback((files) => {
    addFiles(files);
  }, [addFiles]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">
        <UploadHeader />
        <UploadZone
          isDragging={isDragging}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onSelectFiles={handleSelectFiles}
        />
        <RecentUploads
          fileRecords={fileRecords}
          onCancel={removeFile}
        />
        {completedCount > 0 && (
          <div className="w-full mt-4 p-4 bg-primary-fixed/30 border border-primary/20 rounded-xl flex items-center justify-between">
            <p className="font-body-md text-on-surface">
              {completedCount} file{completedCount > 1 ? 's' : ''} uploaded successfully
            </p>
            <button
              onClick={() => navigate('/library')}
              className="flex items-center gap-2 text-primary font-label-md hover:underline"
            >
              View Library <ArrowRight className="size-4" />
            </button>
          </div>
        )}
        <ActionPrompt />
      </div>
    </DashboardLayout>
  );
}
