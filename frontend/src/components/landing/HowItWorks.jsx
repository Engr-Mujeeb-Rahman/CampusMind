import React from 'react';
import { TrendingUp, Upload, Brain, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: Upload,
      title: 'Upload',
      description: 'Drop your lecture slides, textbooks, or even audio recordings into your hub.'
    },
    {
      id: 2,
      icon: Brain,
      title: 'AI Analyzes',
      description: 'Our neural networks process information and find the core concepts you need to know.'
    },
    {
      id: 3,
      icon: Sparkles,
      title: 'Study Smarter',
      description: 'Interact with your materials through quizzes, summaries, and chat-based Q&A.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="how-it-works">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h3 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-4">Study Smarter, Not Harder</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our three-step process designed to maximize retention and minimize wasted hours.
            </p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="w-24 h-24 text-surface-container-high" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px border-t-2 border-dashed border-outline-variant -z-10"></div>
          
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center group">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-primary mx-auto mb-8 flex items-center justify-center relative shadow-xl group-hover:scale-110 transition-transform">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">{step.id}</span>
                  <IconComponent className="w-10 h-10 text-primary" />
                </div>
                <h5 className="font-headline-lg text-headline-lg mb-3">{step.title}</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

