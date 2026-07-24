export default function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-3 md:gap-4 max-w-3xl w-full">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
        <span className="text-primary text-xl font-bold" aria-hidden="true">AI</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="bg-white border border-outline-variant px-4 py-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm flex items-center gap-1">
          <span className="text-sm text-on-surface-variant">AI is typing</span>
          <div className="flex gap-1 ml-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
