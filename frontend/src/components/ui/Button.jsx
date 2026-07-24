const variants = {
  primary:
    'bg-primary text-on-primary hover:opacity-90 shadow-sm',
  secondary:
    'bg-surface-container-lowest text-primary border border-outline-variant hover:bg-surface-container-low',
  ghost:
    'bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-low',
  white:
    'bg-white text-primary hover:bg-primary-fixed',
  surface:
    'bg-surface-container-high text-on-surface hover:bg-surface-container-highest',
  error:
    'bg-error text-on-error hover:opacity-90',
}

const sizes = {
  sm: 'px-4 py-2 text-label-md',
  md: 'px-6 py-2.5 text-label-md',
  lg: 'px-10 py-4 text-label-md',
  xl: 'px-12 py-5 text-headline-lg',
}

const roundedStyles = {
  md: 'rounded-xl',
  lg: 'rounded-xl',
  full: 'rounded-full',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 font-label-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="size-5 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="size-5 shrink-0" />}
    </Component>
  )
}
