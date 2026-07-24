import React from 'react';
import Card from '../ui/Card';

export default function Testimonials() {
  const testimonials = [
    {
      initials: 'JD',
      name: 'James D.',
      role: 'Medical Student',
      quote: '"CampusMind turned my 2-hour lecture recordings into 5-minute study guides. It\'s a literal lifesaver."',
      bgColor: 'bg-primary-container',
      textColor: 'text-on-primary-container'
    },
    {
      initials: 'SR',
      name: 'Sarah R.',
      role: 'Law Student',
      quote: '"The flashcard generator is magic. I\'ve cut my study time in half while improving my retention."',
      bgColor: 'bg-secondary-container',
      textColor: 'text-on-secondary-container'
    },
    {
      initials: 'ML',
      name: 'Marcus L.',
      role: 'Engineering Student',
      quote: '"The study planner actually works. It adjusts when I fall behind, keeping me on track for finals."',
      bgColor: 'bg-tertiary-fixed',
      textColor: 'text-on-tertiary-fixed'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h3 className="font-headline-lg text-headline-lg mb-4">What Students Say</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Join thousands of successful students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} variant="elevated" className="!p-8 !rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${testimonial.bgColor} flex items-center justify-center ${testimonial.textColor} font-bold`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-label-md">{testimonial.name}</p>
                  <p className="text-xs text-on-surface-variant">{testimonial.role}</p>
                </div>
              </div>
              <p className="font-body-md italic">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

