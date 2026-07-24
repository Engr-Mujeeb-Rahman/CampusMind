import { FileText, MessageCircle, Layers, HelpCircle } from 'lucide-react'

export const DASHBOARD_STATS = [
  { icon: FileText, value: '12', label: 'Uploaded Notes' },
  { icon: MessageCircle, value: '45', label: 'AI Chats' },
  { icon: Layers, value: '120', label: 'Flashcards' },
  { icon: HelpCircle, value: '85', label: 'MCQs' },
]

export const QUICK_ACTIONS = [
  { id: 'upload', label: 'Upload Notes', icon: 'Upload', variant: 'primary', path: '/upload' },
  { id: 'chat', label: 'New Chat', icon: 'MessageCircle', variant: 'secondary', path: '/chat' },
  { id: 'planner', label: 'Create Planner', icon: 'Calendar', variant: 'secondary', path: '/planner' },
]

export const PROGRESS_DAYS = [
  { label: 'Mon', height: '60%', active: false },
  { label: 'Tue', height: '45%', active: false },
  { label: 'Wed', height: '85%', active: true },
  { label: 'Thu', height: '30%', active: false },
  { label: 'Fri', height: '70%', active: false },
  { label: 'Sat', height: '40%', active: false, faded: true },
]

export const RECENT_ACTIVITY = [
  {
    icon: 'FileText',
    iconBg: 'bg-surface-variant text-primary',
    title: 'Biology_Notes.pdf',
    subtitle: 'Uploaded today, 10:45 AM',
  },
  {
    icon: 'Sparkles',
    iconBg: 'bg-secondary-container text-on-secondary-container',
    title: 'Cell Biology Summary',
    subtitle: 'Generated 2 hours ago',
  },
  {
    icon: 'Calendar',
    iconBg: 'bg-tertiary-fixed text-tertiary',
    title: 'Weekly Study Plan',
    subtitle: 'Created yesterday',
  },
]
