import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Home, Wrench, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingLayout({ children }) {
  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      
      <main className="pt-16">
        {children}
      </main>

      <Footer />

      {/* Mobile Navigation (BottomNavBar style injection) */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container-lowest shadow-[0_-1px_3px_rgba(0,0,0,0.05)] h-16 flex justify-around items-center px-4">
        <Link to="/" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1">
          <Home className="size-5" />
          <span className="font-label-md text-[10px]">Home</span>
        </Link>
        <a href="#features" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <Wrench className="size-5" />
          <span className="font-label-md text-[10px]">Tools</span>
        </a>
        <Link to="/chat" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <MessageCircle className="size-5" />
          <span className="font-label-md text-[10px]">Chat</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
          <User className="size-5" />
          <span className="font-label-md text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

