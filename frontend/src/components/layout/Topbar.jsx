import React from 'react';
import { Menu } from 'lucide-react';
import { LOGO_URL } from '../../assets/images';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background h-16 px-margin-mobile md:px-margin-desktop flex justify-between items-center border-b border-outline-variant/30 md:border-none">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-1 rounded-lg hover:bg-surface-container-high transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <Menu className="size-6 text-primary" aria-hidden="true" />
        </button>
        <Link to="/" className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg" aria-label="CampusMind Home">
          <img alt="CampusMind Logo" className="h-8 w-auto" src={LOGO_URL} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button 
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="User Profile"
        >
          <img 
            className="w-full h-full object-cover" 
            alt="User profile portrait" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuEHT65XsqccCajsXX9yIkZDPFRC2pTZL89s2xaQCPYT4UmekEh9yeDj0Q41nusX2Z5HDmvJotoG_fct50O0qNDUGr79ZV6n-y4BzsEMs2qj-cmh3PckdW0VoQa0QAEXdyKth-o2p3HSOzpmvoyrhkHPlgAif1QSEqQPnJsfXhKsTgDV1o3_LvHUiPbT-FuVj7Q6KXxUYXRR8VSSa0-EPjjuC9WUFdJPXHHO1Am8RnVUokkKA_ywFpyln8Ep82HSOn72If-vsTm9w" 
          />
        </button>
      </div>
    </header>
  );
}

