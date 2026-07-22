import React from 'react';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-white rounded-[40px] p-12 md:p-20 text-center shadow-sm border border-outline-variant overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Rocket className="w-[200px] h-[200px]" />
          </div>
          <h3 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-6 relative z-10">
            Ready to Ace Your Semester?
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of students who have reclaimed their time and improved their grades with CampusMind.
          </p>
          <div className="relative z-10">
            <Button as={Link} to="/dashboard" size="lg" className="px-12 py-5 text-headline-lg font-headline-lg">
              Get Started Now
            </Button>
            <p className="mt-6 font-label-md text-label-md text-on-surface-variant">
              No credit card required. Free forever plan available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
