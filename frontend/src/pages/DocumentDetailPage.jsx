import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, MessageCircle, Loader } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { apiClient, ApiError } from '../services/apiClient';

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await apiClient.get(`/documents/${id}`);
        setDoc(data);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Failed to load document.');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-[900px] mx-auto">
        <button
          onClick={() => navigate('/library')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body-md mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Library
        </button>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="size-8 animate-spin text-primary mb-4" />
            <p className="font-body-md text-on-surface-variant">Loading document...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl">
            <p>{error}</p>
          </div>
        )}

        {doc && !isLoading && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-fixed rounded-xl">
                <FileText className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-headline-xl text-headline-xl text-on-surface">{doc.title}</h2>
                <p className="font-body-md text-on-surface-variant">
                  {new Date(doc.created_at).toLocaleDateString()} &middot;{' '}
                  <span className="capitalize">{doc.status}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-outline-variant/30 pt-8">
              <h3 className="font-headline-lg text-on-surface mb-6">Study Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate(`/chat?document_id=${id}`)}
                  className="flex items-center gap-4 p-5 bg-surface-container-low rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm transition-all text-left"
                >
                  <div className="p-3 bg-primary-fixed rounded-xl">
                    <MessageCircle className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface">Chat</h4>
                    <p className="font-body-sm text-on-surface-variant">Ask questions about this document</p>
                  </div>
                </button>

                <ToolCard
                  label="Summary"
                  desc="Generate a concise summary"
                  onClick={() => navigate(`/summary?document_id=${id}`)}
                />
                <ToolCard
                  label="MCQ Quiz"
                  desc="Test your knowledge"
                  onClick={() => navigate(`/mcq?document_id=${id}`)}
                />
                <ToolCard
                  label="Flashcards"
                  desc="Review key concepts"
                  onClick={() => navigate(`/flashcards?document_id=${id}`)}
                />
                <ToolCard
                  label="Viva Questions"
                  desc="Prepare for oral exams"
                  onClick={() => navigate(`/viva?document_id=${id}`)}
                />
                <ToolCard
                  label="Revision Notes"
                  desc="Condensed study material"
                  onClick={() => navigate(`/revision?document_id=${id}`)}
                />
                <ToolCard
                  label="Study Planner"
                  desc="Plan your study schedule"
                  onClick={() => navigate(`/planner?document_id=${id}`)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function ToolCard({ label, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-5 bg-surface-container-low rounded-xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-sm transition-all text-left"
    >
      <div className="flex-1">
        <h4 className="font-label-md text-on-surface">{label}</h4>
        <p className="font-body-sm text-on-surface-variant">{desc}</p>
      </div>
    </button>
  );
}
