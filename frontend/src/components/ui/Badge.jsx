const variants = {
  default: 'bg-secondary-container text-on-secondary-container',
  primary: 'bg-primary-fixed text-on-primary-fixed-variant',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  error: 'bg-error-container text-on-error-container',
  surface: 'bg-surface-dim text-on-surface-variant',
  intro: 'bg-secondary-container text-on-secondary-container',
  methodology: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  results: 'bg-primary-fixed text-on-primary-fixed-variant',
  defense: 'bg-error-container text-on-error-container',
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
