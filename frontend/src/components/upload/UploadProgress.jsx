export default function UploadProgress({ value = 0, variant = 'determinate', className = '' }) {
  const isIndeterminate = variant === 'indeterminate';
  const isError = variant === 'error';
  const showShimmer = value > 0 && value < 100 && !isError;

  return (
    <div className={`w-full h-2 bg-surface-container-high rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full relative overflow-hidden transition-all duration-500 ${
          isError ? 'bg-error' : 'bg-primary'
        }`}
        style={{ width: isIndeterminate ? '50%' : `${value}%` }}
      >
        {showShimmer && (
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        )}
      </div>
    </div>
  );
}
