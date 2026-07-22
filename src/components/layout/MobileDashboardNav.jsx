import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MOBILE_NAV_ITEMS } from '../../constants/navigation';

export default function MobileDashboardNav() {
  const location = useLocation();

  return (
    <nav aria-label="Mobile Navigation" className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container-lowest shadow-[0_-1px_3px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 px-4 pb-safe">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
        const IconComponent = item.icon;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center px-4 py-1 active:scale-90 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive 
                ? 'bg-primary-container text-on-primary-container rounded-xl' 
                : 'text-on-surface-variant hover:bg-surface-variant/50 rounded-xl'
            }`}
          >
            <IconComponent className="size-5" aria-hidden="true" />
            <span className="font-label-md text-[10px] mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

