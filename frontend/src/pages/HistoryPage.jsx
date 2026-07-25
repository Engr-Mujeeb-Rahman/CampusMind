import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, Clock, Filter } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { apiClient, ApiError } from '../services/apiClient';

const TYPE_LABELS = {
  summary: 'Summary',
  mcq: 'MCQ Quiz',
  flashcards: 'Flashcards',
  viva: 'Viva Questions',
  revision_notes: 'Revision Notes',
  study_plan: 'Study Plan',
};

const TYPE_COLORS = {
  summary: 'bg-blue-50 text-blue-700',
  mcq: 'bg-purple-50 text-purple-700',
  flashcards: 'bg-green-50 text-green-700',
  viva: 'bg-amber-50 text-amber-700',
  revision_notes: 'bg-rose-50 text-rose-700',
  study_plan: 'bg-teal-50 text-teal-700',
};

export default function HistoryPage() {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadArtifacts();
  }, []);

  async function loadArtifacts() {
    setIsLoading(true);
    try {
      const data = await apiClient.get('/artifacts');
      setArtifacts(data || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load history.');
    } finally {
      setIsLoading(false);
    }
  }

  const filtered = filterType === 'all' ? artifacts : artifacts.filter((a) => a.type === filterType);
  const types = ['all', ...new Set(artifacts.map((a) => a.type))];

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">History</h2>
            <p className="font-body-md text-on-surface-variant mt-1">All your generated study materials</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
          <Filter className="size-4 text-on-surface-variant" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-label-md whitespace-nowrap transition-colors ${
                filterType === t ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t] || t}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl mb-6">{error}</div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            <FileText className="size-16 mx-auto mb-4 opacity-30" />
            <p className="font-body-md">No generated content yet.</p>
            <p className="font-body-sm">Use the study tools on a document to create artifacts.</p>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className={`p-3 rounded-lg ${TYPE_COLORS[item.type] || 'bg-gray-50 text-gray-700'}`}>
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-md text-on-surface truncate">{item.title || TYPE_LABELS[item.type]}</h4>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[item.type] || ''}`}>
                      {TYPE_LABELS[item.type] || item.type}
                    </span>
                    <Clock className="size-3.5" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/documents/${item.document_id}`)}
                    className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    title="View document"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" title="Download">
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
