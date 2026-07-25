import { useState } from 'react';
import {
  Sparkles, Book, Clock, CheckCircle, RefreshCw, Calendar,
  ChevronLeft, ChevronRight, Info, Zap, TrendingUp, GripHorizontal,
  Download, Printer, Lightbulb, CalendarPlus,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { apiClient, ApiError } from '../services/apiClient';

export default function StudyPlannerPage() {
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('3 Hours');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim() || !deadline.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/planner/generate', {
        subject: subject.trim(),
        deadline,
        hoursPerDay,
      });
      const parsed = JSON.parse(data.response);
      const mapped = parsed.map((item, i) => ({
        day: `Day ${String(item.day).padStart(2, '0')}`,
        title: item.title,
        topics: item.topics || [],
        slot: `${item.hours}h`,
        focus: item.focus || 'High Focus',
        span: i === 0 ? 'md:col-span-2' : i < 3 ? 'md:col-span-1' : 'list',
        variant: i === 2 ? 'primary' : 'default',
        description: item.focus ? `${item.hours}h focus: ${item.focus}` : `${item.hours}h session`,
        planned: `${item.hours} Hours`,
        progress: Math.min(Math.round((i + 1) / parsed.length * 100), 100),
      }));
      setTimetable(mapped);
      setIsGenerated(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate study plan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-[900px] mx-auto">
        <section className="mb-10 text-center md:text-left">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">AI Study Planner</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Optimize your learning journey with our intelligent scheduling engine. Enter your course details to receive a customized, high-efficiency study plan.
          </p>
        </section>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 mb-gutter border border-outline-variant">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-on-surface" htmlFor="subject">Subject Name</label>
              <div className="relative group">
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Quantum Mechanics"
                  className="w-full bg-surface-container-low border-none rounded-lg h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
                />
                <Book className="absolute right-3 top-3 size-5 text-outline group-focus-within:text-primary pointer-events-none" aria-hidden="true" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-on-surface" htmlFor="deadline">Deadline Date</label>
              <div className="relative group">
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary transition-all text-on-surface"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-on-surface" htmlFor="hours">Hours per Day</label>
              <div className="relative group">
                <select
                  id="hours"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary transition-all text-on-surface appearance-none"
                >
                  <option>1 Hour</option>
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                  <option>5+ Hours</option>
                </select>
                <Clock className="absolute right-3 top-3 size-5 text-outline pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !subject.trim() || !deadline.trim()}
            className={`w-full font-label-md py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg active:scale-[0.98] transition-all ${
              isGenerated ? 'bg-green-600 text-white' : 'bg-primary text-on-primary'
            } disabled:opacity-80`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="size-5 animate-spin" aria-hidden="true" />
                Thinking...
              </>
            ) : isGenerated ? (
              <>
                <CheckCircle className="size-5" aria-hidden="true" />
                Plan Generated
              </>
            ) : (
              <>
                <Sparkles className="size-5" aria-hidden="true" />
                Generate Study Plan
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6">
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline ml-auto">Dismiss</button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body-md text-on-surface-variant">Creating your personalized study plan...</p>
          </div>
        )}

        {timetable.length > 0 && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-lg text-on-surface flex items-center gap-2">
                <Calendar className="size-6 text-primary" aria-hidden="true" />
                AI-Generated Timetable
              </h3>
              <button className="flex items-center gap-2 text-primary font-label-md bg-primary-fixed/30 px-4 py-2 rounded-lg hover:bg-primary-fixed/50 transition-colors">
                <CalendarPlus className="size-5" aria-hidden="true" />
                Add to Calendar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {timetable.slice(0, 3).map((item) => (
                <div
                  key={item.day}
                  className={`${item.span} ${
                    item.variant === 'primary'
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-lowest border border-outline-variant'
                  } p-5 rounded-xl ${
                    item.variant === 'primary' ? '' : 'hover:border-primary'
                  } transition-colors cursor-pointer group`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                          item.variant === 'primary'
                            ? 'bg-white/20 text-on-primary'
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}
                      >
                        {item.day}
                      </span>
                      <h4 className={`font-headline-lg mt-2 ${item.variant === 'primary' ? 'text-on-primary' : 'text-on-surface'}`}>
                        {item.title}
                      </h4>
                    </div>
                    {item.variant !== 'primary' && (
                      <Info className="size-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true" />
                    )}
                  </div>
                  {item.topics && item.topics.length > 0 && (
                    <ul className="space-y-3">
                      {item.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-3 text-on-surface-variant font-body-sm">
                          <div className={`h-2 w-2 rounded-full shrink-0 ${i === 0 ? 'bg-primary' : 'bg-primary/40'}`} />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.variant === 'primary' && (
                    <>
                      <p className="mt-4 text-white/80 text-[13px]">{item.description}</p>
                      <div className="mt-8 flex justify-end">
                        <TrendingUp className="size-6" aria-hidden="true" />
                      </div>
                    </>
                  )}
                  {item.planned && (
                    <>
                      <div className="py-4">
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary" style={{ width: `${item.progress}%` }} />
                        </div>
                        <p className="text-[11px] text-outline mt-2">Planned: {item.planned}</p>
                      </div>
                      <p className="text-on-surface-variant text-[13px] font-body-sm">{item.description}</p>
                    </>
                  )}
                  {item.slot && item.variant !== 'primary' && (
                    <div className="mt-6 pt-4 border-t border-outline-variant flex items-center justify-between text-outline text-[12px]">
                      <span>Slot: {item.slot}</span>
                      <span className="flex items-center gap-1">
                        <Zap className="size-3.5" aria-hidden="true" />
                        {item.focus}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {timetable.length > 3 && (
                <div className="md:col-span-4 space-y-2">
                  {timetable.slice(3).map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant hover:bg-surface-container-high transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-primary shrink-0">
                        {item.day.replace('Day ', '')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-on-surface">{item.title}</p>
                        <p className="text-on-surface-variant text-[12px]">{item.description}</p>
                      </div>
                      <GripHorizontal className="size-5 text-outline shrink-0" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {timetable.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
              <Lightbulb className="size-10 text-primary" aria-hidden="true" />
            </div>
            <h4 className="font-headline-lg text-on-surface">Ready to Plan?</h4>
            <p className="text-on-surface-variant mt-2 font-body-md">
              Fill in the details above to unlock your personalized AI study schedule.
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mt-8 pb-8">
          <button className="flex-1 bg-surface-container-high text-on-surface font-label-md py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all">
            <Download className="size-5" aria-hidden="true" />
            Download Plan (PDF)
          </button>
          <button className="flex-1 bg-surface-container-high text-on-surface font-label-md py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all">
            <Printer className="size-5" aria-hidden="true" />
            Print Study Schedule
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
