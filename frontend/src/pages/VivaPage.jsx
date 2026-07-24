import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Play, Stars, FilterX } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { VIVA_DATA } from '../constants/viva';

export default function VivaPage() {
  const [search, setSearch] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [filter, setFilter] = useState('All');

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filtered = VIVA_DATA.questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filter === 'All' || q.level === filter;
    return matchesSearch && matchesLevel;
  });

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
              <h2 className="font-headline-xl text-headline-xl text-on-surface">{VIVA_DATA.title}</h2>
              <p className="font-body-md text-on-surface-variant mt-2">{VIVA_DATA.description}</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md">
              <Play className="size-4" aria-hidden="true" />
              Practice Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {VIVA_DATA.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 text-center shadow-sm"
            >
              <p className={`font-headline-lg text-headline-lg font-bold ${stat.color || 'text-on-surface'}`}>
                {stat.value}
              </p>
              <p className="font-body-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
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

        <div className="flex items-center justify-center gap-3 mb-8">
          <button className="px-5 py-2.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-bright transition-colors font-label-md text-on-surface">
            Load 12 more questions
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md">
            Generate More
          </button>
        </div>

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
