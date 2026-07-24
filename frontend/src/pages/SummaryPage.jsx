import { Share2, Printer, Copy, RefreshCw, FileText, Lightbulb, Book } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import { SUMMARY_DATA } from '../constants/summary';

export default function SummaryPage() {
  return (
    <DashboardLayout>
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-label-md text-on-surface-variant mb-2">
          <a href="/dashboard" className="hover:text-primary transition-colors">Home</a>
          <span className="text-xs" aria-hidden="true">›</span>
          <span className="text-primary font-bold">Summary</span>
        </nav>

        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="font-label-md text-primary uppercase tracking-wider">Document Summary</span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">{SUMMARY_DATA.title}</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Share">
              <Share2 className="size-5" aria-hidden="true" />
            </button>
            <button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Print">
              <Printer className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <article className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
            <FileText className="size-32 text-primary" aria-hidden="true" />
          </div>

          <section className="border-b border-surface-variant pb-6">
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {SUMMARY_DATA.intro.split('Information Processing Models').map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>{part}<span className="font-bold text-primary">Information Processing Models</span></span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-primary size-6" aria-hidden="true" />
              <h3 className="font-headline-lg text-on-surface">Key Takeaways</h3>
            </div>
            <ul className="space-y-4">
              {SUMMARY_DATA.keyTakeaways.map((item, index) => (
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
              {SUMMARY_DATA.definitions.map((item, index) => (
                <div key={index} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant hover:shadow-sm transition-all group">
                  <span className="font-label-md text-primary block mb-1 group-hover:underline">{item.term}</span>
                  <p className="font-body-sm text-on-surface-variant">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <div className="flex flex-wrap justify-center gap-3 sticky bottom-8 z-30">
          <Button variant="primary" size="md" className="rounded-full shadow-lg" icon={Copy}>
            Copy Text
          </Button>
          <Button variant="surface" size="md" className="rounded-full shadow-lg" icon={RefreshCw}>
            Regenerate
          </Button>
          <Button variant="surface" size="md" className="rounded-full shadow-lg" icon={FileText}>
            Export PDF
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
