import { useState, useRef, useCallback, useEffect } from 'react';
import { UPLOAD_STATUS } from '../constants/uploadStatus';
import { FileText } from 'lucide-react';
import { validateFiles } from '../utils/uploadValidation';
import { generateFileId, getFileExtension, formatFileSize } from '../utils/fileHelpers';
import { processFile } from '../services/uploadService';

export default function useUpload() {
  const [fileRecords, setFileRecords] = useState([]);
  const cancelRef = useRef({});

  const removeFile = useCallback((id) => {
    if (cancelRef.current[id]) {
      cancelRef.current[id]();
      delete cancelRef.current[id];
    }
    setFileRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addFiles = useCallback((fileList) => {
    const files = Array.from(fileList);
    const results = validateFiles(files);

    const newRecords = [];

    files.forEach((file, index) => {
      if (!results[index].valid) return;

      const id = generateFileId();
      const record = {
        id,
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        extension: getFileExtension(file.name),
        progress: 0,
        stage: null,
        status: UPLOAD_STATUS.QUEUED,
        error: null,
        icon: FileText,
      };

      newRecords.push(record);
    });

    if (newRecords.length === 0) return results;

    setFileRecords((prev) => [...prev, ...newRecords]);

    for (const record of newRecords) {
      setFileRecords((prev) =>
        prev.map((r) => (r.id === record.id ? { ...r, status: UPLOAD_STATUS.UPLOADING } : r))
      );

      const cancel = processFile(record, {
        onProgress: (progress, stage) => {
          setFileRecords((prev) =>
            prev.map((r) => (r.id === record.id ? { ...r, progress, stage } : r))
          );
        },
        onComplete: () => {
          setFileRecords((prev) =>
            prev.map((r) =>
              r.id === record.id
                ? { ...r, progress: 100, status: UPLOAD_STATUS.COMPLETED, stage: null }
                : r
            )
          );
        },
        onError: (error) => {
          setFileRecords((prev) =>
            prev.map((r) =>
              r.id === record.id
                ? { ...r, status: UPLOAD_STATUS.ERROR, error }
                : r
            )
          );
        },
      });

      cancelRef.current[record.id] = cancel;
    }

    return results;
  }, []);

  const clearFiles = useCallback(() => {
    for (const id of Object.keys(cancelRef.current)) {
      cancelRef.current[id]();
    }
    cancelRef.current = {};
    setFileRecords([]);
  }, []);

  useEffect(() => {
    return () => {
      for (const cancel of Object.values(cancelRef.current)) {
        cancel();
      }
    };
  }, []);

  const completedCount = fileRecords.filter((r) => r.status === UPLOAD_STATUS.COMPLETED).length;

  return { fileRecords, addFiles, removeFile, clearFiles, completedCount };
}
