import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { apiClient, ApiError } from '../services/apiClient';

const STATUS_ICONS = {
  ready: CheckCircle,
  processing: Clock,
  error: AlertCircle,
};

const STATUS_COLORS = {
  ready: 'text-green-600 bg-green-50',
  processing: 'text-amber-600 bg-amber-50',
  error: 'text-red-600 bg-red-50',
};

export default function LibraryPage() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.get('/documents');
      setDocuments(data || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load documents.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this document and all its generated content?')) return;
    try {
      await apiClient.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError('Failed to delete document.');
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">Document Library</h2>
            <p className="font-body-md text-on-surface-variant mt-1">All your uploaded notes and study materials</p>
          </div>
          <Button onClick={() => navigate('/upload')} icon={Upload}>
            Upload Notes
          </Button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Loading documents...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-sm font-medium underline">Dismiss</button>
          </div>
        )}

        {!isLoading && documents.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="size-16 text-on-surface-variant/30 mb-4" />
            <h3 className="font-headline-lg text-on-surface mb-2">No documents yet</h3>
            <p className="font-body-md text-on-surface-variant mb-6 max-w-md">
              Upload your lecture notes, PDFs, or study materials to get started.
            </p>
            <Button onClick={() => navigate('/upload')} icon={Upload}>Upload Your First Document</Button>
          </div>
        )}

        {!isLoading && documents.length > 0 && (
          <div className="space-y-3">
            {documents.map((doc) => {
              const StatusIcon = STATUS_ICONS[doc.status] || FileText;
              const statusColor = STATUS_COLORS[doc.status] || 'text-gray-600 bg-gray-50';
              return (
                <div
                  key={doc.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  <div className="p-3 bg-primary-fixed rounded-lg">
                    <FileText className="size-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-label-md text-on-surface truncate">{doc.title}</h4>
                    <p className="text-sm text-on-surface-variant">{formatDate(doc.created_at)}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-label-md ${statusColor}`}>
                    <StatusIcon className="size-3.5" />
                    <span className="capitalize">{doc.status}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                    className="p-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
