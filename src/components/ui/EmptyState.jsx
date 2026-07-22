export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
      {Icon && (
        <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
          <Icon className="size-10 text-primary fill-primary/20" />
        </div>
      )}
      <h4 className="font-headline-lg text-headline-lg text-on-surface">{title}</h4>
      {description && (
        <p className="text-on-surface-variant mt-2 max-w-md">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
