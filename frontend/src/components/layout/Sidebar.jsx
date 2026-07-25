import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation';
import apiClient from '../../services/apiClient';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiClient.auth.logout();
    navigate('/');
  };

  return (
    <aside className="hidden md:flex flex-col w-sidebar-width fixed left-0 top-0 h-full z-40 bg-surface-container-low py-6 pt-20 border-r border-outline-variant/30">
      <div className="px-6 mb-8">
        <h2 className="font-headline-lg text-primary">CampusMind</h2>
        <p className="text-on-surface-variant text-sm">University Assistant</p>
      </div>
      <nav aria-label="Main Navigation" className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`px-6 py-3 flex items-center gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container border-l-4 border-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container-high border-l-4 border-transparent'
              }`}
            >
              <IconComponent className="size-6" aria-hidden="true" />
              <span className="font-label-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 pb-4 mt-auto border-t border-outline-variant/30 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors font-body-md"
        >
          <LogOut className="size-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

