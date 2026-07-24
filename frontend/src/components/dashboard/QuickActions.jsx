import React from 'react';
import { QUICK_ACTIONS } from '../../constants/dashboard';
import { Upload, MessageCircle, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const iconMap = {
  Upload,
  MessageCircle,
  Calendar,
};

export default function QuickActions() {
  return (
    <div className="col-span-12 lg:col-span-12 flex flex-wrap gap-4 mb-2">
      {QUICK_ACTIONS.map((action) => {
        const IconComponent = iconMap[action.icon];
        return (
          <Button 
            key={action.id} 
            variant={action.variant}
            className="flex-1 min-w-[160px] py-4 px-6 rounded-xl shadow-sm"
            icon={IconComponent}
          >
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
