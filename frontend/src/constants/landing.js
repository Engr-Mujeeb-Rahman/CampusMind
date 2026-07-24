import { Brain, Cpu, Layers, Sparkles } from 'lucide-react'

export const TECH_PARTNERS = [
  { name: 'Gemini AI', icon: Brain },
  { name: 'n8n', icon: Cpu },
  { name: 'Google Stitch', icon: Layers },
]

export const FEATURES = [
  {
    id: 'summaries',
    colSpan: 'md:col-span-8',
    icon: 'FileText',
    iconBg: 'bg-primary-container text-on-primary-container',
    title: 'AI Note Summaries',
    description:
      'Upload your PDFs, recordings, or handwritten notes and get perfectly structured summaries in seconds.',
    bullets: ['Key Concept Extraction', 'Visual Mind Mapping'],
    image: true,
    variant: 'default',
  },
  {
    id: 'flashcards',
    colSpan: 'md:col-span-4',
    icon: 'Layers',
    iconBg: 'bg-secondary-container text-on-secondary-container',
    title: 'Flashcard Generator',
    description:
      'Turn any study material into Anki-style flashcards with one click using spaced repetition logic.',
    variant: 'default',
  },
  {
    id: 'planner',
    colSpan: 'md:col-span-4',
    icon: 'Calendar',
    iconBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    title: 'Study Planner',
    description:
      'Dynamic scheduling that adapts to your performance and exam dates automatically.',
    variant: 'default',
  },
  {
    id: 'collaboration',
    colSpan: 'md:col-span-8',
    icon: 'Users',
    iconBg: '',
    title: 'Collaborative Hub',
    description:
      'Share knowledge bases with classmates and build the ultimate collaborative study guide.',
    variant: 'primary',
  },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    icon: 'Upload',
    title: 'Upload',
    description:
      'Drop your lecture slides, textbooks, or even audio recordings into your hub.',
  },
  {
    step: 2,
    icon: 'Brain',
    title: 'AI Analyzes',
    description:
      'Our neural networks process information and find the core concepts you need to know.',
  },
  {
    step: 3,
    icon: 'Sparkles',
    title: 'Study Smarter',
    description:
      'Interact with your materials through quizzes, summaries, and chat-based Q&A.',
  },
]

export const TESTIMONIALS = [
  {
    initials: 'JD',
    name: 'James D.',
    role: 'Medical Student',
    avatarBg: 'bg-primary-container text-on-primary-container',
    quote:
      "CampusMind turned my 2-hour lecture recordings into 5-minute study guides. It's a literal lifesaver.",
  },
  {
    initials: 'SR',
    name: 'Sarah R.',
    role: 'Law Student',
    avatarBg: 'bg-secondary-container text-on-secondary-container',
    quote:
      "The flashcard generator is magic. I've cut my study time in half while improving my retention.",
  },
  {
    initials: 'ML',
    name: 'Marcus L.',
    role: 'Engineering Student',
    avatarBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    quote:
      'The study planner actually works. It adjusts when I fall behind, keeping me on track for finals.',
  },
]

export const FAQ_ITEMS = [
  { question: 'Is CampusMind free to use?' },
  { question: 'Can I upload handwritten notes?' },
  { question: 'How accurate are the AI summaries?' },
]

export const HERO_BADGE = {
  icon: Sparkles,
  label: 'Next-Gen Academic Assistant',
}
