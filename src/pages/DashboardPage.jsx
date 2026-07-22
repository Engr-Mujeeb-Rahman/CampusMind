import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsGrid from '../components/dashboard/StatsGrid';
import QuickActions from '../components/dashboard/QuickActions';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import FeaturedTool from '../components/dashboard/FeaturedTool';
import QuoteCard from '../components/dashboard/QuoteCard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full">
        <WelcomeBanner />
        <StatsGrid />
        
        {/* Bento Grid Main Layout */}
        <div className="bento-grid">
          <QuickActions />
          <ProgressChart />
          <RecentActivity />
          <FeaturedTool />
          <QuoteCard />
        </div>
      </div>
    </DashboardLayout>
  );
}

