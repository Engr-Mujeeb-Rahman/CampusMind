import { useState, useRef } from 'react';
import { Plus, Mic, Send } from 'lucide-react';

export default function ChatInput({ onSend, onSuggest: _onSuggest, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = '';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (value.trim()) {
      onSend?.(value.trim());
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative group">
      <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
      <div className={`relative bg-white border border-outline-variant rounded-2xl shadow-sm flex items-end p-2 min-h-[56px] focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all ${disabled ? 'opacity-50' : ''}`}>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded" aria-label="Attach file" disabled={disabled}>
          <Plus className="size-5" aria-hidden="true" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-2 text-on-surface placeholder:text-on-surface-variant/60 font-body-md max-h-32"
          placeholder={disabled ? 'Select a document to start chatting' : 'Message CampusMind...'}
          rows={1}
          aria-label="Chat message input"
          disabled={disabled}
        />
        <div className="flex items-center gap-1 mb-1">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded" aria-label="Voice input" disabled={disabled}>
            <Mic className="size-5" aria-hidden="true" />
          </button>
          <button
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="bg-primary hover:bg-primary-container text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
