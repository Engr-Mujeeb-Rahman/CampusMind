import {
  LayoutDashboard,
  BookOpen,
  Library,
  Calendar,
  Settings,
  Upload,
  MessageCircle,
  StickyNote,
} from 'lucide-react'

export const SIDEBAR_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'study-tools', label: 'Study Tools', icon: BookOpen, path: '/revision' },
  { id: 'library', label: 'Library', icon: Library, path: '/upload' },
  { id: 'revision-notes', label: 'Revision Notes', icon: StickyNote, path: '/revision' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/planner' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard' },
]

export const UPLOAD_SIDEBAR_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'upload', label: 'Upload Notes', icon: Upload, path: '/upload' },
  { id: 'library', label: 'Library', icon: Library, path: '/upload' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/planner' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard' },
]

export const CHAT_SIDEBAR_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'study-tools', label: 'Study Tools', icon: BookOpen, path: '/revision' },
  { id: 'library', label: 'Library', icon: Library, path: '/upload' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/planner' },
]

export const MOBILE_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'tools', label: 'Tools', icon: BookOpen, path: '/revision' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
  { id: 'profile', label: 'Profile', icon: Settings, path: '/dashboard' },
]

export const LANDING_MOBILE_NAV = [
  { id: 'home', label: 'Home', icon: LayoutDashboard, path: '/' },
  { id: 'tools', label: 'Tools', icon: BookOpen, path: '/#features' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
  { id: 'profile', label: 'Profile', icon: Settings, path: '/dashboard' },
]

export const LANDING_NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
]

export const FOOTER_PLATFORM_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#' },
  { label: 'Integrations', href: '#' },
]

export const FOOTER_SUPPORT_LINKS = [
  { label: 'Help Center', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Privacy Policy', href: '#' },
]
