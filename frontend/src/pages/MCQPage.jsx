import { useState } from 'react';
import { BookOpen, Trophy, RefreshCw, History, ChevronRight, AlertTriangle, HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { apiClient, ApiError } from '../services/apiClient';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard', 'Mixed'];
const QUESTION_COUNT_OPTIONS = ['5', '10', '15', '20'];

export default function MCQPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  const handleSelectOption = (index) => {
    if (!isChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    setIsChecked(true);
    if (currentQuestion && selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsChecked(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
    try {
      const data = await apiClient.post('/mcq/generate', {
        topic: topic.trim(),
        count: parseInt(questionCount, 10),
        difficulty: difficulty.toLowerCase(),
      });
      const parsed = JSON.parse(data.response);
      setQuestions(parsed);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8">
        <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="text-xs font-medium">Study Tools</span>
          <span className="text-xs" aria-hidden="true">›</span>
          <span className="text-xs font-medium text-primary">MCQ Quiz</span>
        </nav>

        {questions.length === 0 && !isLoading && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 mb-6">
            <label className="font-label-md text-on-surface mb-2 block">Enter a topic to generate MCQs</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Cognitive Psychology, Data Structures, Thermodynamics"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
            />
            <div className="flex flex-wrap items-center gap-3 mb-4">
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
            </div>
            <button
              onClick={handleGenerate}
              disabled={!topic.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Sparkles className="size-4" />
              Generate Quiz
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Generating questions...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {currentQuestion && !isLoading && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">{topic}</h2>
                <p className="font-body-md text-on-surface-variant mt-1">Quiz Session</p>
              </div>
              <div className="hidden md:flex items-center gap-3 bg-surface-container px-4 py-2 rounded-lg">
                <Trophy className="size-5 text-tertiary" aria-hidden="true" />
                <span className="font-label-md text-on-surface">{score} pts</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="size-5 text-primary" aria-hidden="true" />
                  <span className="font-label-md text-on-surface-variant">Progress</span>
                </div>
                <span className="font-label-md text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full bg-surface-container-higher rounded-full h-2 overflow-hidden">
                <div
                  className="bg-tertiary h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-sm"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                New Quiz
              </button>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-label-md">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-label-md">
                    {difficulty}
                  </span>
                </div>
                <HelpCircle className="size-5 text-on-surface-variant" aria-hidden="true" />
              </div>

              <h3 className="font-headline-lg text-on-surface mb-6 leading-relaxed">{currentQuestion.question}</h3>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  let optionClass = 'bg-white border-outline-variant/40 hover:bg-surface-bright';
                  if (selectedOption === index && isChecked) {
                    optionClass = index === currentQuestion.correctIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
                  } else if (selectedOption === index) {
                    optionClass = 'option-selected';
                  }
                  const label = String.fromCharCode(65 + index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`w-full flex items-center gap-4 p-4 border rounded-xl text-left transition-all ${optionClass}`}
                    >
                      <span className="shrink-0 w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center font-label-md text-on-surface-variant bg-white">
                        {label}
                      </span>
                      <span className="font-body-md text-on-surface">{option}</span>
                      {isChecked && index === currentQuestion.correctIndex && (
                        <CheckCircle2 className="size-5 text-green-600 ml-auto shrink-0" />
                      )}
                      {isChecked && selectedOption === index && index !== currentQuestion.correctIndex && (
                        <XCircle className="size-5 text-red-600 ml-auto shrink-0" />
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
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md"
                  >
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Finish'}
                  </button>
                )}
              </div>

              {isChecked && currentQuestion.explanation && (
                <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <p className="font-label-md text-primary mb-1">Explanation</p>
                  <p className="font-body-sm text-on-surface-variant">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="bento-grid">
          <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-primary-fixed/60 to-primary-fixed border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-white rounded-full mb-4 shadow-sm">
              <RefreshCw className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-label-md text-primary mb-2">Generate More Questions</h3>
            <p className="font-body-sm text-on-surface-variant mb-4">Need extra practice? Enter a new topic above to create another quiz.</p>
            {questions.length > 0 && (
              <button onClick={() => { setQuestions([]); setTopic(''); }} className="flex items-center gap-1 text-primary font-label-md hover:underline">
                Start Fresh <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            )}
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
