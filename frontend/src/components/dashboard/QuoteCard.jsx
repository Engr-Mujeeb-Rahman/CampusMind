import React from 'react';
import { Quote, GraduationCap } from 'lucide-react';

export default function QuoteCard() {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-highest rounded-xl p-8 relative overflow-hidden">
      <div className="relative z-10">
        <Quote className="text-primary-fixed-dim size-10 mb-4" aria-hidden="true" />
        <p className="font-headline-lg italic text-on-surface-variant mb-4">"The beautiful thing about learning is that no one can take it away from you."</p>
        <p className="font-label-md text-primary">— B.B. King</p>
      </div>
      <div className="absolute -right-10 -bottom-10 opacity-10">
        <GraduationCap className="w-[200px] h-[200px]" aria-hidden="true" />
      </div>
    </div>
  );
}
