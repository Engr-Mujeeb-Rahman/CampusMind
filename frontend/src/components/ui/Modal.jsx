import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      <div
        className={`relative w-full max-w-lg bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl p-6 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 id="modal-title" className="font-headline-lg text-headline-lg text-on-surface">
              {title}
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors ml-auto"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
