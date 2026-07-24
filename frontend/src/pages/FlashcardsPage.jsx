import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Brain, Sparkles, Zap } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FLASHCARDS_DATA, FLASHCARD_TIPS } from '../constants/flashcards';

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(FLASHCARDS_DATA.current - 1);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const currentCard = FLASHCARDS_DATA.cards[0];
  const progress = ((currentIndex + 1) / FLASHCARDS_DATA.total) * 100;

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
    setCurrentIndex((prev) => Math.min(FLASHCARDS_DATA.total - 1, prev + 1));
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
          <h2 className="font-headline-xl text-headline-xl text-on-surface">{FLASHCARDS_DATA.title}</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            Master key concepts with active recall
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-on-surface-variant">
              Card {currentIndex + 1} of {FLASHCARDS_DATA.total}
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
            disabled={currentIndex >= FLASHCARDS_DATA.total - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-label-md"
          >
            Next
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          <button className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors font-label-md text-secondary">
            Hard
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors font-label-md text-secondary">
            Medium
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors font-label-md text-secondary">
            Easy
          </button>
          <button className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors text-secondary" aria-label="Reset progress">
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="bento-grid">
          {FLASHCARD_TIPS.map((tip, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-fixed rounded-lg">
                  {index === 0 ? (
                    <Brain className={`size-5 ${tip.color}`} aria-hidden="true" />
                  ) : (
                    <Zap className={`size-5 ${tip.color}`} aria-hidden="true" />
                  )}
                </div>
                <h3 className={`font-label-md ${tip.color}`}>{tip.title}</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
