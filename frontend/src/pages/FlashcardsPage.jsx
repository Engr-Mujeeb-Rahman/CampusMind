import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Brain, Sparkles, Zap } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { apiClient, ApiError } from '../services/apiClient';

export default function FlashcardsPage() {
  const [content, setContent] = useState('');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  const total = cards.length;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;
  const currentCard = cards[currentIndex] || null;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleFlip]);

  const goPrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
  };

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    setError(null);
    setCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    try {
      const data = await apiClient.post('/flashcards/generate', { content });
      const parsed = JSON.parse(data.response);
      setCards(parsed);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate flashcards.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="text-xs font-medium">Study Tools</span>
            <span className="text-xs" aria-hidden="true">›</span>
            <span className="text-xs font-medium text-primary">Flashcards</span>
          </nav>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Study Flashcards</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            Master key concepts with active recall
          </p>
        </div>

        {cards.length === 0 && !isLoading && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 mb-6">
            <label className="font-label-md text-on-surface mb-2 block">Paste your study material to generate flashcards</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your notes, textbook excerpts, or any study material here..."
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
              Generate Flashcards
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Creating flashcards...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {cards.length > 0 && !isLoading && (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-on-surface-variant">
                  Card {currentIndex + 1} of {total}
                </span>
                <span className="font-label-md text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            <div
              ref={cardRef}
              className={`perspective-1000 w-full min-h-[320px] mb-6 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
              onClick={handleFlip}
              role="button"
              tabIndex={0}
              aria-label={isFlipped ? 'Click to see question' : 'Click to reveal answer'}
            >
              <div className="flip-card-inner preserve-3d relative w-full min-h-[320px]">
                <div className="backface-hidden absolute inset-0 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                  <Brain className="size-8 text-primary mb-4" aria-hidden="true" />
                  <p className="font-body-md text-on-surface-variant mb-2">Question</p>
                  <h3 className="font-headline-lg text-on-surface max-w-lg">{currentCard.question}</h3>
                  <p className="text-on-surface-variant font-body-sm mt-6">
                    Click to flip or press <kbd className="bg-surface-variant px-2 py-0.5 rounded text-xs font-mono">Space</kbd>
                  </p>
                </div>

                <div className="backface-hidden rotate-y-180 absolute inset-0 bg-primary-fixed border border-primary/20 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                  <Sparkles className="size-8 text-primary mb-4" aria-hidden="true" />
                  <p className="font-body-md text-on-surface-variant mb-2">Answer</p>
                  <p className="font-body-md text-on-surface max-w-lg leading-relaxed text-left">{currentCard.answer}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-label-md text-on-surface"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Previous
              </button>

              <button
                onClick={goNext}
                disabled={currentIndex >= total - 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-label-md"
              >
                Next
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mb-10">
              <button className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors font-label-md text-secondary" onClick={handleGenerate}>
                Regenerate
              </button>
            </div>

            <div className="bento-grid">
              <div className="col-span-1 md:col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-fixed rounded-lg">
                    <Brain className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-label-md text-primary">Review Tip</h3>
                </div>
                <p className="font-body-sm text-on-surface-variant">Consistent active recall is 300% more effective for long-term retention than re-reading notes.</p>
              </div>

              <div className="col-span-1 md:col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-fixed rounded-lg">
                    <Zap className="size-5 text-tertiary" aria-hidden="true" />
                  </div>
                  <h3 className="font-label-md text-tertiary">Current Streak</h3>
                </div>
                <p className="font-body-sm text-on-surface-variant">You've studied for 5 days straight. Only 2 days left to hit your weekly goal!</p>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
