import React from 'react';
import { PROGRESS_DAYS } from '../../constants/dashboard';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

export default function ProgressChart() {
  return (
    <Card variant="glass" className="col-span-12 lg:col-span-7 !rounded-xl !p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-headline-lg text-primary">Your Progress</h3>
          <p className="text-on-surface-variant text-sm">Study goals consistency this week</p>
        </div>
        <div className="bg-primary-fixed p-2 rounded-lg text-primary">
          <TrendingUp className="size-6" aria-hidden="true" />
        </div>
      </div>
      
      {/* Simplified Visual Progress Chart */}
      <div className="flex items-end justify-between h-40 gap-2 mb-4">
        {PROGRESS_DAYS.map((day, index) => (
          <div key={index} className="w-full bg-surface-container rounded-t-lg relative group/bar" style={{ height: day.height }}>
            <div className={`absolute inset-0 rounded-t-lg transition-all ${
              day.active 
                ? 'bg-primary opacity-100 group-hover/bar:brightness-110' 
                : 'bg-primary opacity-20 group-hover/bar:opacity-40'
            }`}></div>
            <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold ${
              day.active ? 'text-primary' : 'text-on-surface-variant'
            } ${day.faded ? 'text-opacity-40' : ''}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="text-headline-lg font-bold">12.5h</span>
          <span className="text-xs text-on-surface-variant">Study Time</span>
        </div>
        <div className="text-primary font-label-md flex items-center gap-1">
          84% of Weekly Goal <CheckCircle2 className="size-4" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
