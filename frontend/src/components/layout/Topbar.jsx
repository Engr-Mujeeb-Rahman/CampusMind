import React, { useState, useEffect } from 'react';
import { Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

export default function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await apiClient.auth.me();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    }
    if (apiClient.auth.isAuthenticated()) {
      loadUser();
    }
  }, []);

  const handleLogout = async () => {
    await apiClient.auth.logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm h-16 px-margin-mobile md:px-margin-desktop flex justify-between items-center border-b border-outline-variant/30 md:border-none">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-1 rounded-lg hover:bg-surface-container-high transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Open navigation menu"
        >
          <Menu className="size-6 text-primary" aria-hidden="true" />
        </button>
        <Link to="/dashboard" className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">CampusMind</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 relative">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-sm text-on-surface-variant">
          <User className="size-4" />
          <span>{user?.email || 'Student'}</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-surface-container-high transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="User menu"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-sm font-bold">
            {(user?.email || 'S')[0].toUpperCase()}
          </div>
          <ChevronDown className="size-4 text-on-surface-variant" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-12 z-50 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-2 min-w-[200px]">
              <div className="px-4 py-2 border-b border-outline-variant/30">
                <p className="font-label-md text-on-surface">{user?.email || 'Student'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md"
              >
                <LogOut className="size-5" />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
