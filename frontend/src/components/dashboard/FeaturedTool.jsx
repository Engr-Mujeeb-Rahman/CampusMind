import React from 'react';
import { Sparkles } from 'lucide-react';
import Card from '../ui/Card';

export default function FeaturedTool() {
  return (
    <Card variant="glass" className="col-span-12 lg:col-span-4 !rounded-xl !p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
        <Sparkles className="size-8" aria-hidden="true" />
      </div>
      <h4 className="font-label-md text-headline-lg mb-2">AI Summarizer</h4>
      <p className="text-on-surface-variant text-sm mb-4">Turn 50-page readings into 5-minute key concepts.</p>
      <button className="w-full py-2 bg-surface-container-high rounded-lg text-primary font-semibold hover:bg-primary hover:text-on-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        Try Now
      </button>
    </Card>
  );
}
