export const VIVA_DATA = {
  title: 'Viva Preparation',
  description: 'Master your oral exams with high-frequency questions and expert tips.',
  stats: [
    { label: 'Total Questions', value: '42', color: '' },
    { label: 'Answered', value: '18', color: 'text-primary' },
    { label: 'Proficiency', value: '42%', color: 'text-tertiary' },
  ],
  questions: [
    {
      id: 'q1',
      category: 'Introduction',
      level: 'Beginner',
      levelColor: 'bg-secondary-container text-on-secondary-container',
      question: '"Can you briefly explain the main objective of your project?"',
      answer: 'Focus on the problem statement and the solution you\'ve implemented. Be concise: state the background, the specific gap you\'re addressing, and the high-level methodology used to achieve the results.',
    },
    {
      id: 'q2',
      category: 'Methodology',
      level: 'Advanced',
      levelColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      question: '"What were the key limitations of the methodology you selected?"',
      answer: 'Every methodology has trade-offs. Discuss sample size, data availability, or computational complexity. Demonstrating awareness of limitations shows deep understanding and critical thinking.',
    },
    {
      id: 'q3',
      category: 'Results',
      level: 'Intermediate',
      levelColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      question: '"How do your findings compare with existing literature in this field?"',
      answer: 'Reference major authors or theories. Explain if your results support current trends or offer a new perspective. Be ready to explain any deviations from expected norms.',
    },
    {
      id: 'q4',
      category: 'Defense',
      level: 'Advanced',
      levelColor: 'bg-error-container text-on-error-container',
      question: '"Why should we care about the results of your study?"',
      answer: 'This is about Significance. Explain the practical application or the theoretical contribution. Who benefits? How can this be used in a real-world scenario?',
    },
  ],
};
