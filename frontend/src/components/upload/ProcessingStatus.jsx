import { PROCESSING_STEPS } from '../../constants/upload';

export default function ProcessingStatus() {
  return (
    <div className="w-full mb-8 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30">
      <h4 className="font-label-md text-on-surface-variant uppercase tracking-wider mb-4">Processing Status</h4>
      <div className="space-y-3">
        {PROCESSING_STEPS.map((step) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';
          const colorClass = isComplete ? 'text-green-600' : isActive ? 'text-primary' : 'text-outline';
          const IconComponent = step.icon;

          return (
            <div key={step.id} className={`flex items-center gap-3 ${colorClass}`}>
              <IconComponent className={`size-4 shrink-0 ${isActive ? 'animate-spin' : ''}`} />
              <span className={`text-sm ${isComplete || isActive ? 'font-bold' : ''}`}>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
