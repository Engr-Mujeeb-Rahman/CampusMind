import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Lightbulb, Stars, AlertTriangle, ClipboardList, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { apiClient, ApiError } from '../services/apiClient';

export default function RevisionNotesPage() {
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('document_id');

  const [content, setContent] = useState('');
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (documentId) {
      handleGenerateFromDoc();
    }
  }, [documentId]);

  const handleGenerateFromDoc = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/notes/generate', {
        document_id: documentId,
      });
      setNotes(data.notes);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate revision notes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    setError(null);
    setNotes(null);
    try {
      const data = await apiClient.post('/notes/generate', {
        content: content.trim(),
        document_id: documentId,
      });
      setNotes(data.notes);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate revision notes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8">
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="text-xs font-medium">Study Tools</span>
            <span className="text-xs" aria-hidden="true">›</span>
            <span className="text-xs font-medium text-primary">Revision Notes</span>
          </nav>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Revision Notes</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            Generate concise, structured revision notes from your study material
          </p>
        </div>

        {!notes && !isLoading && !documentId && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 mb-6">
            <label className="font-label-md text-on-surface mb-2 block">Paste your study material to generate revision notes</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your notes, textbook content, or lecture material here..."
              rows={8}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
            />
            <Button
              variant="primary"
              size="md"
              className="mt-4"
              icon={Sparkles}
              onClick={handleGenerate}
              disabled={!content.trim()}
            >
              Generate Notes
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Generating revision notes...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {notes && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="col-span-1 md:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">{notes.title}</h2>
              {notes.subject && <p className="font-body-md text-on-surface-variant mb-4">{notes.subject}</p>}

              <div className="flex items-center gap-3 mb-4 mt-6">
                <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                  <Lightbulb className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-headline-lg">Key Concepts</h3>
              </div>
              <ul className="space-y-4 font-body-md text-on-surface-variant list-none">
                {notes.keyConcepts.map((concept, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary mt-1 select-none" aria-hidden="true">●</span>
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider px-2">Important Definitions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes.definitions.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-label-md text-primary block mb-1">{item.term}</span>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-surface-container border border-primary/20 rounded-xl p-6 relative overflow-hidden group md:col-span-1">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary opacity-5 rounded-full group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-4">
                <Stars className="text-primary size-5" aria-hidden="true" />
                <h3 className="font-label-md text-primary uppercase">Exam Tips</h3>
              </div>
              <div className="space-y-3 font-body-sm text-on-surface">
                {notes.examTips.map((tip, index) => (
                  <div key={index}>
                    <p className="font-bold">{index + 1}. {tip.title}:</p>
                    <p>{tip.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50 border border-error/20 rounded-xl p-6 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-error size-5" aria-hidden="true" />
                <h3 className="font-label-md text-error uppercase">Common Mistakes</h3>
              </div>
              <ul className="space-y-3 font-body-sm text-on-error-container list-disc list-inside">
                {notes.commonMistakes.map((mistake, index) => (
                  <li key={index}>{mistake}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
