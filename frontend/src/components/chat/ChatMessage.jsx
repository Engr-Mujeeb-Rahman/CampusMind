import { Copy, RefreshCw } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex items-start gap-3 md:gap-4 max-w-3xl w-full group ${!isAI ? 'self-end flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${
        isAI ? 'bg-surface-container-highest' : 'bg-primary-container'
      }`}>
        <span className={`text-xl ${isAI ? 'text-primary' : 'text-white'} font-bold`} aria-hidden="true">
          {isAI ? 'AI' : 'U'}
        </span>
      </div>
      <div className={`flex flex-col gap-1.5 max-w-[85%] ${!isAI ? 'items-end' : ''}`}>
        <div className={`px-4 py-3 shadow-sm ${
          isAI
            ? 'bg-white border border-outline-variant rounded-tr-2xl rounded-br-2xl rounded-bl-2xl'
            : 'bg-primary-fixed text-on-primary-fixed-variant rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
        }`}>
          <p className="font-body-md">{message.content}</p>
        </div>
        <span className="text-[11px] text-on-surface-variant px-1">{message.timestamp}</span>
        {isAI && (
          <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 hover:bg-surface-container-low rounded-md text-on-surface-variant flex items-center gap-1 text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Copy message">
              <Copy className="size-[16px]" aria-hidden="true" /> Copy
            </button>
            <button className="p-1.5 hover:bg-surface-container-low rounded-md text-on-surface-variant flex items-center gap-1 text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Regenerate response">
              <RefreshCw className="size-[16px]" aria-hidden="true" /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
