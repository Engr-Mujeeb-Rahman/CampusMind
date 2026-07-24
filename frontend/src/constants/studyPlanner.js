export const STUDY_PLANNER_DATA = {
  title: 'AI Study Planner',
  description: 'Optimize your learning journey with our intelligent scheduling engine. Enter your course details to receive a customized, high-efficiency study plan.',
  timetable: [
    {
      day: 'Day 01',
      title: 'Fundamentals',
      topics: ['Core principles and definitions', 'Contextual background research'],
      slot: '09:00 - 11:30',
      focus: 'High Focus',
      span: 'md:col-span-2',
      variant: 'default',
    },
    {
      day: 'Day 02',
      title: 'Deep Analysis',
      planned: '3.5 Hours',
      progress: 33,
      description: 'Critical path modeling & data synthesis.',
      span: 'md:col-span-1',
      variant: 'default',
    },
    {
      day: 'Day 03',
      title: 'Synthesis',
      description: 'Integration of concepts and practice exam A.',
      span: 'md:col-span-1',
      variant: 'primary',
    },
    {
      day: '04',
      title: 'Application & Problem Solving',
      description: 'Focus on Chapter 5-8 exercises',
      variant: 'list',
    },
    {
      day: '05',
      title: 'Revision & Final Review',
      description: 'Self-assessment and summary notes',
      variant: 'list',
    },
  ],
};
