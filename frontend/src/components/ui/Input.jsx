export default function Input({
  label,
  icon: Icon,
  className = '',
  inputClassName = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${wrapperClassName}`}>
      {label && (
        <label className="font-label-md text-label-md text-on-surface">
          {label}
        </label>
      )}
      <div className={`relative group ${className}`}>
        <input
          className={`w-full bg-surface-container-low border-none rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline outline-none ${Icon ? 'pr-10' : ''} ${inputClassName}`}
          {...props}
        />
        {Icon && (
          <Icon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-outline group-focus-within:text-primary pointer-events-none" />
        )}
      </div>
    </div>
  )
}
