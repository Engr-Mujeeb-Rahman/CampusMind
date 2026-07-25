import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import ChatTypingIndicator from '../components/chat/ChatTypingIndicator';
import SuggestedChips from '../components/chat/SuggestedChips';
import ChatInput from '../components/chat/ChatInput';
import { apiClient, ApiError } from '../services/apiClient';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatTimestamp() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (type, content) => {
    const msg = { id: generateId(), type, content, timestamp: formatTimestamp() };
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = async (text) => {
    addMessage('student', text);
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/chat/send', { message: text });
      addMessage('ai', data.response);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Network error. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (chip) => {
    handleSend(chip.label);
  };

  return (
    <DashboardLayout className="h-screen overflow-hidden">
      <div className="h-full flex flex-col">
        <ChatHeader />

        <div ref={containerRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6 flex flex-col" id="chat-container">
          {messages.length === 0 && !isLoading && (
            <div className="max-w-3xl mx-auto w-full text-center py-10 opacity-70">
              <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full mb-4">
                <span className="text-[13px] font-medium">Academic integrity guidelines apply</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Hello, Alex!</h3>
              <p className="font-body-sm text-on-surface-variant">How can I assist with your studies today?</p>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && <ChatTypingIndicator />}

          {error && (
            <div className="max-w-3xl mx-auto w-full flex justify-center">
              <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
                <span className="text-sm">{error}</span>
                <button onClick={() => setError(null)} className="text-sm font-medium underline hover:no-underline">Dismiss</button>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 bg-gradient-to-t from-background via-background to-transparent shrink-0">
          <SuggestedChips onChipClick={handleChipClick} />
          <ChatInput onSend={handleSend} onSuggest={() => {}} />
          <p className="text-center text-[11px] text-on-surface-variant mt-3">
            CampusMind can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
