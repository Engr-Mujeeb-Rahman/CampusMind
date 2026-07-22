import React from 'react';
import { Sparkles, MemoryStick, Layers, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <>
      <section className="relative min-h-[707px] flex items-center justify-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0 opacity-40"></div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <Sparkles className="size-[18px]" />
            <span className="font-label-md text-label-md">Next-Gen Academic Assistant</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background mb-6 max-w-3xl mx-auto leading-tight">
            Master Your Studies with <span className="text-primary">AI-Powered</span> Precision
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Transform complex lectures into concise summaries, generate practice quizzes instantly, and organize your academic life with the ultimate student workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as={Link} to="/dashboard" size="lg" className="px-10 py-4 shadow-lg shadow-primary/20 hover:scale-[1.02] w-full sm:w-auto">
              Get Started for Free
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-4 w-full sm:w-auto bg-surface-container-lowest text-primary hover:bg-surface-container-low border-outline-variant">
              Watch Demo
            </Button>
          </div>
          
          {/* App Preview */}
          <div className="mt-20 max-w-5xl mx-auto rounded-t-3xl border-x border-t border-outline-variant bg-white p-4 shadow-2xl relative overflow-hidden">
            <div 
              className="w-full aspect-[16/9] rounded-t-2xl bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAO3K9iShoGOrxlXgnQ6oQYBryUCmhPeMFcwt0fd0Th5_NLI8gYN_GGMvA3WSlXt-xm4NV3N3bIPiL5u50lHAl56r0N5MFMaYpOL5wZ9CKbdxLUgvnt7qoUTEGDKQA1Ks1cYt_8We-pSB5UaoL0J0RKBdq4L78JrUbIS3ocsi06e02M0_2mliw5-RgFv-815877I39xFXdSe-lxUFWsmH0M3To8rbp2n5s8gNlGr0ZawxkK2Wie8vz_7J5JafJw_I_0Rts9JOLjMSM')" }}
              aria-label="App preview"
            ></div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface-container-low border-y border-outline-variant/30">
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="text-center font-label-md text-on-surface-variant mb-8 opacity-70">
            POWERED BY INDUSTRY-LEADING TECHNOLOGY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <MemoryStick className="size-6 text-primary" />
              <span className="font-bold">Gemini AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Workflow className="size-6 text-primary" />
              <span className="font-bold">n8n</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="size-6 text-primary" />
              <span className="font-bold">Google Stitch</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
