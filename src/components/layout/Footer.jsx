import React from 'react';
import { GraduationCap, Share2, AtSign, Network } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background py-16 border-t border-outline-variant/30">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="size-6 text-primary" />
              <span className="font-headline-lg text-headline-lg font-bold text-primary">
                CampusMind
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Empowering the next generation of scholars with intelligent, personalized learning tools.
            </p>
          </div>
          <div>
            <h6 className="font-label-md text-label-md text-on-surface mb-6">Platform</h6>
            <ul className="space-y-4">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#integrations">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-md text-label-md text-on-surface mb-6">Support</h6>
            <ul className="space-y-4">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#help">
                  Help Center
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#privacy">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-md text-label-md text-on-surface mb-6">Connect</h6>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                <Share2 className="size-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                <AtSign className="size-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                <Network className="size-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">© {new Date().getFullYear()} CampusMind AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
