import ProcessingStatus from './ProcessingStatus';
import FileItem from './FileItem';
import EmptyUploadState from './EmptyUploadState';

export default function RecentUploads({ fileRecords = [], onCancel, onUploadClick }) {
  const hasUploads = fileRecords.length > 0;

  return (
    <div className="w-full mt-12">
      <ProcessingStatus />

      <div className="flex justify-between items-center mb-6 px-2">
        <h4 className="font-label-md text-on-surface-variant uppercase tracking-wider">Recently Uploaded</h4>
        <button className="text-primary font-label-md hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
          View All Library
        </button>
      </div>

      {hasUploads ? (
        <div className="space-y-4">
          {fileRecords.map((record) => (
            <FileItem key={record.id} file={record} onCancel={() => onCancel?.(record.id)} />
          ))}
        </div>
      ) : (
        <EmptyUploadState onUploadClick={onUploadClick} />
      )}
    </div>
  );
}
