import React from 'react';
import { RECENT_ACTIVITY } from '../../constants/dashboard';
import { FileText, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const iconMap = {
  FileText,
  Sparkles,
  Calendar,
};

export default function RecentActivity() {
  return (
    <Card variant="glass" className="col-span-12 lg:col-span-5 !rounded-xl !p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-lg text-on-surface">Recent Activity</h3>
        <button className="text-primary text-sm font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">See all</button>
      </div>
      <div className="space-y-4">
        {RECENT_ACTIVITY.map((activity, index) => {
          const IconComponent = iconMap[activity.icon];
          return (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" tabIndex={0}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.iconBg}`}>
                <IconComponent className="size-6" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-label-md text-on-surface group-hover:text-primary transition-colors">{activity.title}</p>
                <p className="text-xs text-on-surface-variant">{activity.subtitle}</p>
              </div>
              <ChevronRight className="size-5 text-outline-variant group-hover:text-primary" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
