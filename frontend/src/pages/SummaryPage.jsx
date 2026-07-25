import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Share2, Printer, FileText, Lightbulb, Book, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { apiClient, ApiError } from '../services/apiClient';

export default function SummaryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const documentId = searchParams.get('document_id');

  const [content, setContent] = useState('');
  const [summary, setSummary] = useState(null);
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
      const data = await apiClient.post('/summary/generate', { document_id: documentId });
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/summary/generate', { content });
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate summary.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-label-md text-on-surface-variant mb-2">
          <button onClick={() => documentId ? navigate(`/documents/${documentId}`) : navigate('/dashboard')} className="hover:text-primary transition-colors">Back</button>
          <span className="text-xs" aria-hidden="true">›</span>
          <span className="text-primary font-bold">Summary</span>
        </nav>

        {!summary && !documentId && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
            <label className="font-label-md text-on-surface mb-2 block">Paste your notes content below to generate a summary</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your study notes here..."
              rows={8}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
            />
            <Button
              variant="primary"
              size="md"
              className="mt-4"
              icon={Sparkles}
              onClick={handleGenerate}
              disabled={isLoading || !content.trim()}
            >
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Analyzing your notes...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
            <span className="text-sm">{error}</span>
            <button onClick={() => { setError(null); setSummary(null); }} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {summary && !isLoading && (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <span className="font-label-md text-primary uppercase tracking-wider">Document Summary</span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">{summary.title}</h2>
              </div>
              <div className="hidden sm:flex gap-2">
                <button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant" aria-label="Share">
                  <Share2 className="size-5" aria-hidden="true" />
                </button>
                <button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant" aria-label="Print">
                  <Printer className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <article className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 md:p-8 flex flex-col gap-6">
              <section className="border-b border-surface-variant pb-6">
                <p className="font-body-md text-on-surface-variant leading-relaxed">{summary.intro}</p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="text-primary size-6" aria-hidden="true" />
                  <h3 className="font-headline-lg text-on-surface">Key Takeaways</h3>
                </div>
                <ul className="space-y-4">
                  {summary.keyTakeaways.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="font-body-md text-on-surface-variant">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-surface-container-low rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Book className="text-primary size-6" aria-hidden="true" />
                  <h3 className="font-headline-lg text-on-surface">Definitions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summary.definitions.map((item, index) => (
                    <div key={index} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant hover:shadow-sm transition-all group">
                      <span className="font-label-md text-primary block mb-1 group-hover:underline">{item.term}</span>
                      <p className="font-body-sm text-on-surface-variant">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="md" icon={FileText} onClick={() => setSummary(null)}>
                Generate New
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
