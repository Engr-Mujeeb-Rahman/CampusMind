import { Loader2 } from 'lucide-react'

export default function Loader({ size = 'md', className = '', label = 'Loading...' }) {
  const sizes = {
    sm: 'size-4',
    md: 'size-8',
    lg: 'size-12',
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <Loader2 className={`animate-spin text-primary ${sizes[size]}`} />
      {label && (
        <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
      )}
    </div>
  )
}
