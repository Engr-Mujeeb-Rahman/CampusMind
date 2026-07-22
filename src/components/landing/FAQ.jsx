import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../ui/Card';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is CampusMind free to use?",
      answer: "Yes, CampusMind offers a free forever plan with basic features. You can upgrade for advanced capabilities like unlimited AI summaries."
    },
    {
      question: "Can I upload handwritten notes?",
      answer: "Absolutely! Our AI can process scanned handwritten notes and convert them into structured digital summaries."
    },
    {
      question: "How accurate are the AI summaries?",
      answer: "Our AI is powered by Gemini and is highly accurate. It's designed specifically to extract core academic concepts reliably."
    }
  ];

  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
        <h3 className="font-headline-lg text-headline-lg text-center mb-12">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} variant="elevated" className="!p-6 !rounded-2xl overflow-hidden shadow-none hover:shadow-none transition-all">
              <button 
                className="flex justify-between items-center w-full text-left font-label-md"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="size-5 text-on-surface-variant" />
                ) : (
                  <ChevronDown className="size-5 text-on-surface-variant" />
                )}
              </button>
              {openIndex === index && (
                <div className="pt-4 mt-2 border-t border-outline-variant/30 text-on-surface-variant font-body-sm">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

