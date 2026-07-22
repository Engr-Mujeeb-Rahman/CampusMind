import React from 'react';
import { DASHBOARD_STATS } from '../../constants/dashboard';
import StatsCard from './StatsCard';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {DASHBOARD_STATS.map((stat, index) => (
        <StatsCard 
          key={index} 
          icon={stat.icon} 
          value={stat.value} 
          label={stat.label} 
        />
      ))}
    </div>
  );
}
