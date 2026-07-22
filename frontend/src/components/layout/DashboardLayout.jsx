import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import MobileDashboardNav from './MobileDashboardNav';

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-background min-h-screen text-on-background selection:bg-primary-container selection:text-on-primary-container font-body-md overflow-x-hidden">
      <Topbar />
      <Sidebar />
      
      {/* Main Content Canvas */}
      <main className="pt-24 pb-24 md:pb-8 md:pl-[280px] px-margin-mobile md:px-margin-desktop min-h-screen">
        <div className="max-w-container-max mx-auto">
          {children}
        </div>
      </main>

      <MobileDashboardNav />
    </div>
  );
}
