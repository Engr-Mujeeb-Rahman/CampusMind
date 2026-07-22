import React from 'react';

export default function StatsCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
      <Icon className="text-primary size-6" />
      <div>
        <p className="text-2xl font-bold text-on-surface">{value}</p>
        <p className="text-xs text-on-surface-variant font-label-md">{label}</p>
      </div>
    </div>
  );
}
