const variants = {
  default:
    'bg-surface-container-lowest border border-outline-variant shadow-sm',
  glass: 'glass-card',
  primary: 'bg-primary text-on-primary',
  surface: 'bg-surface-container-low border border-outline-variant/30',
  elevated:
    'bg-white border border-outline-variant shadow-sm hover:shadow-md transition-shadow',
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`rounded-xl ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
