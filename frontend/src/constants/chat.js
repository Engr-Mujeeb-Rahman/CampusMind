import { Sparkles, ListChecks, BrainCircuit, MessageCircle, Calendar } from 'lucide-react';

export const CHAT_SUGGESTED_CHIPS = [
  { id: 'summarize', label: 'Summarize my notes', icon: Sparkles },
  { id: 'mcq', label: 'Generate 20 MCQs', icon: ListChecks },
  { id: 'flashcards', label: 'Create Flashcards', icon: BrainCircuit },
  { id: 'viva', label: 'Generate Viva Questions', icon: MessageCircle },
  { id: 'planner', label: 'Make a Study Plan', icon: Calendar },
];
