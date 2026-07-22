import React from 'react';
import { FileText, CheckCircle2, Layers, CalendarDays, Users } from 'lucide-react';
import Card from '../ui/Card';

export default function Features() {
  return (
    <section className="py-24 bg-surface-container-lowest" id="features">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h3 className="font-headline-lg text-headline-lg mb-4">Everything You Need to Excel</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Academic excellence, simplified by intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* AI Note Summaries */}
          <Card variant="elevated" className="md:col-span-8 group !p-8 !rounded-3xl hover:border-primary/30 shadow-none hover:shadow-none transition-all flex flex-col md:flex-row gap-8 overflow-hidden">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center mb-6 text-on-primary-container">
                <FileText className="size-6" />
              </div>
              <h4 className="font-headline-lg text-headline-lg mb-4">AI Note Summaries</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Upload your PDFs, recordings, or handwritten notes and get perfectly structured summaries in seconds.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="font-label-md text-label-md">Key Concept Extraction</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="font-label-md text-label-md">Visual Mind Mapping</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-2xl p-4 min-h-[240px] relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <div 
                className="absolute inset-0 bg-cover bg-center m-4 rounded-xl shadow-sm" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTjJ49aaAp8HjVir4BTbKd1L31TK4a-XiYlDH4agoqzh7wX8H453SpKxGcz_XdjRIp-qbnT0H265NsPPla0S1KI2gvICFK_qyO4tAChi7qfgDxhti4JtAT8SoRcCWbyENjLq9QHRb4OsLQa_iSu3A0N-tb4vF9mGzaD82Pl7U4T7mQPzkbNXTftV1KhW7PNUSZmkYpdbqFFkXS274z028SJMVCYNYeub4Yg7ARA5Ef4rR98Bd-LykjwYulA-MkhEUSPgQIQ7WHbO8')" }}
                aria-label="AI summary preview"
              ></div>
            </div>
          </Card>

          {/* Flashcard Generator */}
          <Card variant="elevated" className="md:col-span-4 !p-8 !rounded-3xl hover:border-primary/30 shadow-none hover:shadow-none transition-all">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 text-on-secondary-container">
              <Layers className="size-6" />
            </div>
            <h4 className="font-headline-lg text-headline-lg mb-4">Flashcard Generator</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Turn any study material into Anki-style flashcards with one click using spaced repetition logic.
            </p>
          </Card>

          {/* Study Planner */}
          <Card variant="elevated" className="md:col-span-4 !p-8 !rounded-3xl hover:border-primary/30 shadow-none hover:shadow-none transition-all">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-6 text-on-tertiary-fixed">
              <CalendarDays className="size-6" />
            </div>
            <h4 className="font-headline-lg text-headline-lg mb-4">Study Planner</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Dynamic scheduling that adapts to your performance and exam dates automatically.
            </p>
          </Card>

          {/* Collaboration Tool */}
          <Card variant="primary" className="md:col-span-8 !p-8 !rounded-3xl hover:opacity-95 shadow-none transition-all flex flex-col justify-center">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h4 className="font-headline-lg text-headline-lg mb-4">Collaborative Hub</h4>
                <p className="font-body-md text-body-md opacity-90 mb-4">
                  Share knowledge bases with classmates and build the ultimate collaborative study guide.
                </p>
                <button className="bg-white text-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-lowest transition-colors">
                  Learn More
                </button>
              </div>
              <div className="hidden sm:block w-32 h-32 opacity-20">
                <Users className="w-full h-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

