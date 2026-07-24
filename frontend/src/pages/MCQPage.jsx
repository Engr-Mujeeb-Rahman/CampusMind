import { useState } from 'react';
import { BookOpen, Trophy, RefreshCw, History, ChevronRight, AlertTriangle, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MCQ_DATA } from '../constants/mcq';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard', 'Mixed'];
const QUESTION_COUNT_OPTIONS = ['5', '10', '15', '20'];

export default function MCQPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState('10');

  const handleSelectOption = (index) => {
    if (!isChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const handleSkip = () => {
    setSelectedOption(null);
    setIsChecked(false);
  };

  const handleReport = () => {};

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8">
        <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="text-xs font-medium">Study Tools</span>
          <span className="text-xs" aria-hidden="true">›</span>
          <span className="text-xs font-medium text-primary">MCQ Quiz</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">{MCQ_DATA.module}</h2>
            <p className="font-body-md text-on-surface-variant mt-1">Quiz Session</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-surface-container px-4 py-2 rounded-lg">
            <Trophy className="size-5 text-tertiary" aria-hidden="true" />
            <span className="font-label-md text-on-surface">{MCQ_DATA.score} pts</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
              <span className="font-label-md text-on-surface-variant">Progress</span>
            </div>
            <span className="font-label-md text-primary">{MCQ_DATA.progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-container-higher rounded-full h-2 overflow-hidden">
            <div
              className="bg-tertiary h-full rounded-full transition-all duration-500"
              style={{ width: `${MCQ_DATA.progressPercent}%` }}
              role="progressbar"
              aria-valuenow={MCQ_DATA.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <label htmlFor="difficulty" className="font-label-md text-on-surface-variant text-sm">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-lg px-3 py-2 text-sm font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="questions" className="font-label-md text-on-surface-variant text-sm">Questions:</label>
            <select
              id="questions"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-lg px-3 py-2 text-sm font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {QUESTION_COUNT_OPTIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-sm">
            <RefreshCw className="size-4" aria-hidden="true" />
            Update Quiz
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-label-md">
                Question {MCQ_DATA.currentQuestion} of {MCQ_DATA.totalQuestions}
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-label-md">
                {MCQ_DATA.difficulty}
              </span>
            </div>
            <HelpCircle className="size-5 text-on-surface-variant" aria-hidden="true" />
          </div>

          <h3 className="font-headline-lg text-on-surface mb-6 leading-relaxed">{MCQ_DATA.question}</h3>

          <div className="space-y-3 mb-8">
            {MCQ_DATA.options.map((option, index) => {
              let optionClass = 'bg-white border-outline-variant/40 hover:bg-surface-bright';
              if (selectedOption === index && isChecked) {
                optionClass = index === 1 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
              } else if (selectedOption === index) {
                optionClass = 'option-selected';
              }
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full flex items-center gap-4 p-4 border rounded-xl text-left transition-all ${optionClass}`}
                >
                  <span className="shrink-0 w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center font-label-md text-on-surface-variant bg-white">
                    {option.label}
                  </span>
                  <span className="font-body-md text-on-surface">{option.text}</span>
                  {selectedOption === index && isChecked && (
                    index === 1
                      ? <CheckCircle2 className="size-5 text-green-600 ml-auto shrink-0" />
                      : <XCircle className="size-5 text-red-600 ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {!isChecked ? (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md"
              >
                Next Question
              </button>
            )}
            <button onClick={handleSkip} className="px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-bright transition-colors font-label-md text-on-surface-variant">
              Skip
            </button>
            <button onClick={handleReport} className="px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-bright transition-colors font-label-md text-on-surface-variant">
              Report
            </button>
          </div>
        </div>

        <div className="bento-grid">
          <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-primary-fixed/60 to-primary-fixed border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-white rounded-full mb-4 shadow-sm">
              <RefreshCw className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-label-md text-primary mb-2">Generate More Questions</h3>
            <p className="font-body-sm text-on-surface-variant mb-4">Need extra practice? Create an automatically tailored quiz from your topics.</p>
            <button className="flex items-center gap-1 text-primary font-label-md hover:underline">
              Generate Now <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="col-span-1 md:col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-fixed rounded-lg">
                <History className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-label-md text-on-surface">View History</h3>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Review your past quiz attempts and track your improvement over time.</p>
            <button className="flex items-center gap-1 text-primary font-label-md hover:underline mt-auto">
              Open History <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex items-center gap-4">
            <AlertTriangle className="size-6 text-tertiary shrink-0" aria-hidden="true" />
            <p className="font-body-sm text-on-surface-variant">
              You&apos;re making great progress! Consistent practice improves retention by up to 50%.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
