import React from 'react';
import LandingLayout from '../components/layout/LandingLayout';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';

const LandingPage = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </LandingLayout>
  );
};

export default LandingPage;


