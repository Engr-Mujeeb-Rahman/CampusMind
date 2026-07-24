import { useState } from 'react';
import { Lightbulb, Stars, AlertTriangle, ClipboardList } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { REVISION_DATA } from '../constants/revision';

function ChecklistItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-4 p-4 bg-white rounded-lg border border-outline-variant/20 cursor-pointer hover:bg-surface-bright transition-colors group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-outline text-primary focus:ring-primary transition-all"
      />
      <span className={`font-body-md text-on-surface transition-all ${checked ? 'line-through opacity-50' : ''}`}>
        {label}
      </span>
    </label>
  );
}

export default function RevisionNotesPage() {
  const [checked, setChecked] = useState(REVISION_DATA.checklist.map(() => false));
  const completedCount = checked.filter(Boolean).length;

  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto py-8">
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="text-xs font-medium">Study Tools</span>
            <span className="text-xs" aria-hidden="true">›</span>
            <span className="text-xs font-medium text-primary">Notes</span>
          </nav>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">{REVISION_DATA.title}</h2>
          <p className="font-body-md text-on-surface-variant mt-2">{REVISION_DATA.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="col-span-1 md:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                <Lightbulb className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-headline-lg">Key Concepts</h3>
            </div>
            <ul className="space-y-4 font-body-md text-on-surface-variant list-none">
              {REVISION_DATA.keyConcepts.map((concept, index) => (
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
              {REVISION_DATA.definitions.map((item, index) => (
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
              {REVISION_DATA.examTips.map((tip, index) => (
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
              {REVISION_DATA.commonMistakes.map((mistake, index) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>
          </section>

          <section className="col-span-1 md:col-span-2 bg-surface-container-low border border-outline-variant/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-primary size-5" aria-hidden="true" />
                <h3 className="font-headline-lg">Revision Checklist</h3>
              </div>
              <span className="font-label-md text-primary">{completedCount}/{REVISION_DATA.checklist.length} Complete</span>
            </div>
            <div className="space-y-3">
              {REVISION_DATA.checklist.map((item, index) => (
                <ChecklistItem
                  key={index}
                  label={item}
                  checked={checked[index]}
                  onChange={() => setChecked((prev) => {
                    const next = [...prev];
                    next[index] = !next[index];
                    return next;
                  })}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
