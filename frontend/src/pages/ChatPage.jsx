import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const documentId = searchParams.get('document_id');

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (documentId) {
      loadHistory();
    } else {
      setMessages([]);
    }
  }, [documentId]);

  async function loadHistory() {
    setIsHistoryLoading(true);
    try {
      const data = await apiClient.get(`/chat/history?document_id=${documentId}`);
      const formatted = (data || []).map((msg) => ({
        id: msg.id,
        type: msg.role === 'user' ? 'student' : 'ai',
        content: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      setMessages(formatted);
    } catch {
      // Silently fail — history is optional
    } finally {
      setIsHistoryLoading(false);
    }
  }

  const addMessage = (type, content) => {
    const msg = { id: generateId(), type, content, timestamp: formatTimestamp() };
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = async (text) => {
    addMessage('student', text);
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.post('/chat/send', {
        message: text,
        document_id: documentId || null,
      });
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
        <ChatHeader documentId={documentId} />

        <div ref={containerRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6 flex flex-col" id="chat-container">
          {isHistoryLoading && (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!documentId && messages.length === 0 && !isLoading && (
            <div className="max-w-3xl mx-auto w-full text-center py-10 opacity-70">
              <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full mb-4">
                <span className="text-[13px] font-medium">Select a document to chat</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Chat with your notes</h3>
              <p className="font-body-sm text-on-surface-variant">
                Open a document from the{' '}
                <button onClick={() => navigate('/library')} className="text-primary underline">Library</button>
                {' '}and start asking questions about its content.
              </p>
            </div>
          )}

          {documentId && messages.length === 0 && !isHistoryLoading && !isLoading && (
            <div className="max-w-3xl mx-auto w-full text-center py-10 opacity-70">
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Start a conversation</h3>
              <p className="font-body-sm text-on-surface-variant">
                Ask questions about your document — CampusMind will answer based on the content.
              </p>
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
          {!documentId && (
            <div className="max-w-3xl mx-auto mb-3">
              <button
                onClick={() => navigate('/library')}
                className="w-full py-3 rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant font-body-md hover:border-primary hover:text-primary transition-colors"
              >
                Select a document from your Library to start chatting
              </button>
            </div>
          )}
          <SuggestedChips onChipClick={handleChipClick} />
          <ChatInput onSend={handleSend} onSuggest={() => {}} disabled={!documentId} />
          <p className="text-center text-[11px] text-on-surface-variant mt-3">
            CampusMind can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
