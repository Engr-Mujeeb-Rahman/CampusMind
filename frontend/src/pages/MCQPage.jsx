import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, RefreshCw, History, ChevronRight, AlertTriangle, HelpCircle, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { apiClient, ApiError } from '../services/apiClient';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard', 'Mixed'];
const QUESTION_COUNT_OPTIONS = ['5', '10', '15', '20'];

export default function MCQPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const documentId = searchParams.get('document_id');

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
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState([]);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  useEffect(() => {
    if (documentId) {
      handleGenerateFromDoc();
    }
  }, [documentId]);

  const handleGenerateFromDoc = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/mcq/generate', {
        document_id: documentId,
        count: parseInt(questionCount, 10),
        difficulty: difficulty.toLowerCase(),
      });
      setQuestions(data.questions || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (index) => {
    if (!isChecked) setSelectedOption(index);
  };

  const handleCheck = () => {
    setIsChecked(true);
    const isCorrect = currentQuestion && selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setResults((prev) => [...prev, {
      question: currentQuestion.question,
      options: currentQuestion.options,
      selected: selectedOption,
      correct: currentQuestion.correctIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
    }]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsChecked(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
    setQuizComplete(false);
    setResults([]);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!topic.trim() && !documentId) return;
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
    setQuizComplete(false);
    setResults([]);
    try {
      const body = documentId
        ? { document_id: documentId, count: parseInt(questionCount, 10), difficulty: difficulty.toLowerCase() }
        : { topic: topic.trim(), count: parseInt(questionCount, 10), difficulty: difficulty.toLowerCase() };
      const data = await apiClient.post('/mcq/generate', body);
      setQuestions(data.questions || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const missedQuestions = results.filter((r) => !r.isCorrect);

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8 px-4 sm:px-0">
        <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
          <button onClick={() => documentId ? navigate(`/documents/${documentId}`) : navigate('/dashboard')} className="hover:text-primary text-xs font-medium">Back</button>
          <span className="text-xs" aria-hidden="true">�EUR~</span>
          <span className="text-xs font-medium text-primary">MCQ Quiz</span>
        </nav>

        {questions.length === 0 && !isLoading && !quizComplete && !documentId && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 mb-6">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Cognitive Psychology, Data Structures"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
            />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-white border border-outline-variant/40 rounded-lg px-3 py-2 text-sm">
                {DIFFICULTY_OPTIONS.map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
              <select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} className="bg-white border border-outline-variant/40 rounded-lg px-3 py-2 text-sm">
                {QUESTION_COUNT_OPTIONS.map((q) => (<option key={q} value={q}>{q}</option>))}
              </select>
            </div>
            <button onClick={handleGenerate} disabled={!topic.trim()} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-colors font-label-md disabled:opacity-30">
              <Sparkles className="size-4" /> Generate Quiz
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
            <button onClick={() => setError(null)} className="text-sm font-medium underline ml-auto">Dismiss</button>
          </div>
        )}

        {quizComplete && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-fixed mb-4">
                <Trophy className="size-10 text-primary" />
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface">Quiz Complete!</h2>
              <p className="font-headline-lg text-primary mt-2">{score} / {totalQuestions} correct</p>
              <p className="font-body-md text-on-surface-variant mt-1">
                {score === totalQuestions ? 'Perfect score! Excellent work!' : score >= totalQuestions * 0.7 ? 'Great job! Keep practicing.' : 'Review the missed questions below.'}
              </p>
              <button onClick={handleRestart} className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-colors font-label-md">
                <RotateCcw className="size-4" /> Try Again
              </button>
            </div>

            {missedQuestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-headline-lg text-on-surface flex items-center gap-2">
                  <XCircle className="size-5 text-red-500" /> Missed Questions ({missedQuestions.length})
                </h3>
                {missedQuestions.map((r, i) => (
                  <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
                    <p className="font-body-md text-on-surface font-medium mb-3">{r.question}</p>
                    <div className="space-y-2 mb-3">
                      {r.options.map((opt, oi) => (
                        <div key={oi} className={`flex items-center gap-3 p-3 rounded-lg border ${
                          oi === r.correct ? 'bg-green-50 border-green-500' : oi === r.selected ? 'bg-red-50 border-red-500' : 'bg-white border-outline-variant/30'
                        }`}>
                          <span className="text-xs font-bold text-on-surface-variant w-5">{String.fromCharCode(65 + oi)}</span>
                          <span className={`text-sm ${oi === r.correct ? 'text-green-800' : oi === r.selected ? 'text-red-800' : 'text-on-surface'}`}>{opt}</span>
                          {oi === r.correct && <CheckCircle2 className="size-4 text-green-600 ml-auto shrink-0" />}
                          {oi === r.selected && oi !== r.correct && <XCircle className="size-4 text-red-600 ml-auto shrink-0" />}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
                      <p className="font-label-md text-primary mb-1">Explanation</p>
                      <p className="font-body-sm text-on-surface-variant">{r.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentQuestion && !isLoading && !quizComplete && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">Quiz Session</h2>
              </div>
              <div className="flex items-center gap-3 bg-surface-container px-4 py-2 rounded-lg">
                <Trophy className="size-5 text-tertiary" />
                <span className="font-label-md text-on-surface">{score} pts</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-md text-on-surface-variant">Progress</span>
                <span className="font-label-md text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full bg-surface-container-higher rounded-full h-2 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-label-md">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>
              <h3 className="font-headline-md sm:font-headline-lg text-on-surface mb-6">{currentQuestion.question}</h3>
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  let optionClass = 'bg-white border-outline-variant/40 hover:bg-surface-bright';
                  if (selectedOption === index && isChecked) {
                    optionClass = index === currentQuestion.correctIndex ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
                  } else if (selectedOption === index) {
                    optionClass = 'border-primary bg-primary-fixed/20';
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-4 border rounded-xl text-left transition-all touch-manipulation ${optionClass}`}
                    >
                      <span className="shrink-0 w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center font-label-md bg-white text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-body-md text-on-surface flex-1 min-w-0">{option}</span>
                      {isChecked && index === currentQuestion.correctIndex && <CheckCircle2 className="size-5 text-green-600 ml-auto shrink-0" />}
                      {isChecked && selectedOption === index && index !== currentQuestion.correctIndex && <XCircle className="size-5 text-red-600 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3">
                {!isChecked ? (
                  <button onClick={handleCheck} disabled={selectedOption === null} className="px-6 py-3 sm:py-2.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-colors font-label-md disabled:opacity-30 touch-manipulation">
                    Check Answer
                  </button>
                ) : (
                  <button onClick={handleNext} className="px-6 py-3 sm:py-2.5 rounded-lg bg-primary text-on-primary hover:opacity-90 transition-colors font-label-md touch-manipulation">
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
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
      </div>
    </DashboardLayout>
  );
}
