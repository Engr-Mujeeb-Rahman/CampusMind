import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Play, Stars, FilterX, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { apiClient, ApiError } from '../services/apiClient';
import Button from '../components/ui/Button';

export default function VivaPage() {
  const [project, setProject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, answered: 0, proficiency: '0%' });
  const params = new URLSearchParams(window.location.search);
  const documentId = params.get('document_id');

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filtered = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filter === 'All' || q.level === filter;
    return matchesSearch && matchesLevel;
  });

  const handleGenerate = async () => {
    if (!project.trim()) return;
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setRevealedAnswers({});
    try {
      const data = await apiClient.post('/viva/generate', {
        project: project.trim(),
        count: 6,
        document_id: documentId,
      });
      const parsed = data.questions;
      if (!parsed || !Array.isArray(parsed)) {
        throw new Error('Invalid response format from server.');
      }
      const mapped = parsed.map((q, i) => ({
        id: `q${i}`,
        category: q.category,
        level: q.level,
        levelColor: q.level === 'Advanced'
          ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
          : q.level === 'Intermediate'
            ? 'bg-primary-fixed text-on-primary-fixed-variant'
            : 'bg-secondary-container text-on-secondary-container',
        question: q.question,
        answer: q.idealAnswer,
      }));
      setQuestions(mapped);
      setStats({
        total: mapped.length,
        answered: 0,
        proficiency: '0%',
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate questions.');
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
            <span className="text-xs font-medium text-primary">Viva Questions</span>
          </nav>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface">Viva Preparation</h2>
              <p className="font-body-md text-on-surface-variant mt-2">Master your oral exams with AI-generated questions and expert tips.</p>
            </div>
          </div>
        </div>

        {questions.length === 0 && !isLoading && (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 mb-6">
            <label className="font-label-md text-on-surface mb-2 block">Enter your project or topic to generate viva questions</label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="e.g., Machine Learning for Crop Disease Detection"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
            />
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={handleGenerate}
              disabled={!project.trim()}
            >
              Generate Questions
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Generating viva questions...</p>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {questions.length > 0 && !isLoading && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-center shadow-sm">
                <p className="font-headline-lg text-headline-lg font-bold text-on-surface">{stats.total}</p>
                <p className="font-body-sm text-on-surface-variant">Total Questions</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-center shadow-sm">
                <p className="font-headline-lg text-headline-lg font-bold text-primary">{stats.answered}</p>
                <p className="font-body-sm text-on-surface-variant">Answered</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-center shadow-sm">
                <p className="font-headline-lg text-headline-lg font-bold text-tertiary">{stats.proficiency}</p>
                <p className="font-body-sm text-on-surface-variant">Proficiency</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant pointer-events-none" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant/40 rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setFilter(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-label-md whitespace-nowrap transition-colors ${
                      filter === l
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                className="px-3 py-1.5 rounded-lg text-xs font-label-md bg-primary text-on-primary hover:bg-primary-container transition-colors whitespace-nowrap"
              >
                Generate More
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FilterX className="size-10 text-on-surface-variant/40 mb-3" aria-hidden="true" />
                  <p className="font-body-md text-on-surface-variant">No questions match your search.</p>
                </div>
              )}
              {filtered.map((q) => (
                <div
                  key={q.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-label-md text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                      <span className={`text-xs font-label-md px-2 py-0.5 rounded ${q.levelColor}`}>
                        {q.level}
                      </span>
                    </div>
                    <p className="font-body-md text-on-surface leading-relaxed">{q.question}</p>
                  </div>

                  {revealedAnswers[q.id] && (
                    <div className="px-5 pb-5">
                      <div className="border-t border-outline-variant/20 pt-4 mt-1">
                        <p className="font-body-sm text-on-surface-variant leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  )}

                  <div className="px-5 pb-5">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-bright transition-colors font-label-md text-sm text-on-surface"
                    >
                      {revealedAnswers[q.id] ? (
                        <>
                          <ChevronDown className="size-4" aria-hidden="true" />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <ChevronRight className="size-4" aria-hidden="true" />
                          Reveal Answer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="bg-gradient-to-br from-primary-fixed/60 to-primary-fixed border border-primary/20 rounded-xl p-6 flex items-start gap-5">
          <div className="p-3 bg-white rounded-full shrink-0 shadow-sm">
            <Stars className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-label-md text-primary mb-1">Pro Viva Tip</h3>
            <p className="font-body-sm text-on-surface-variant">
              Record yourself answering these questions and review the playback. This helps you identify filler words, improve pacing, and build confidence for the real session.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
