import React from 'react';
import Button from '../ui/Button';

export default function ActionPrompt() {
  return (
    <div className="w-full mt-10 p-6 rounded-[24px] bg-primary-container text-on-primary-container relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
      <div className="z-10 text-center md:text-left flex-1">
        <h5 className="font-headline-lg text-white mb-2">Need a summary of these files?</h5>
        <p className="text-primary-fixed text-sm">Convert your uploads into structured study guides, flashcards, or practice quizzes in one click.</p>
      </div>
      <Button 
        className="z-10 bg-white text-primary px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-primary-fixed transition-colors shadow-sm active:scale-95"
      >
        Generate Guide
      </Button>
      {/* Decorative background elements */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -left-8 -top-8 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
    </div>
  );
}
