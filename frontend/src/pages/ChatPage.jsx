import DashboardLayout from '../components/layout/DashboardLayout';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import ChatTypingIndicator from '../components/chat/ChatTypingIndicator';
import SuggestedChips from '../components/chat/SuggestedChips';
import ChatInput from '../components/chat/ChatInput';

const MESSAGES = [
  {
    id: '1',
    type: 'ai',
    content: "Hi there! I've analyzed your upcoming syllabus for CS301. You have a mid-term coming up in 5 days focusing on Data Structures. Would you like to review some complex topics like AVL Trees or Red-Black Trees?",
    timestamp: '10:42 AM',
  },
  {
    id: '2',
    type: 'student',
    content: 'Yes, please! AVL trees are still a bit confusing. Can you explain the rotation logic again with some visual-like steps?',
    timestamp: '10:43 AM',
  },
  {
    id: '3',
    type: 'ai',
    content: 'Of course! Think of AVL rotations as "balancing a seesaw". When one side gets too heavy (height difference > 1), we rotate to restore balance.\n\nLeft Rotation (Single):\n\n  A (Root)\n   \\\n    B\n     \\\n      C (Heavy)\n\nStep 1: Move B up to become new Root\nStep 2: A becomes Left child of B\nResult:\n    B\n   / \\\n  A   C\n\nWould you like me to generate a practice quiz on this specific rotation?',
    timestamp: '10:44 AM',
  },
];

export default function ChatPage() {
  return (
    <DashboardLayout className="h-screen overflow-hidden">
      <div className="h-full flex flex-col">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6 flex flex-col" id="chat-container">
          <div className="max-w-3xl mx-auto w-full text-center py-10 opacity-70">
            <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full mb-4">
              <span className="text-[13px] font-medium">Academic integrity guidelines apply</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Hello, Alex!</h3>
            <p className="font-body-sm text-on-surface-variant">How can I assist with your studies today?</p>
          </div>

          {MESSAGES.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          <ChatTypingIndicator />
        </div>

        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 bg-gradient-to-t from-background via-background to-transparent shrink-0">
          <SuggestedChips onChipClick={() => {}} />
          <ChatInput onSend={() => {}} onSuggest={() => {}} />
          <p className="text-center text-[11px] text-on-surface-variant mt-3">
            CampusMind can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
