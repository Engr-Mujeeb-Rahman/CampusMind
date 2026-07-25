const { z } = require('zod');

const MCQSchema = z.array(z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(1),
}));

const FlashcardSchema = z.array(z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
}));

const SummarySchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  keyTakeaways: z.array(z.string().min(1)),
  definitions: z.array(z.object({
    term: z.string().min(1),
    definition: z.string().min(1),
  })),
});

const VivaSchema = z.array(z.object({
  category: z.string().min(1),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  question: z.string().min(1),
  idealAnswer: z.string().min(1),
}));

const RevisionNotesSchema = z.object({
  title: z.string().min(1),
  subject: z.string().optional(),
  keyConcepts: z.array(z.string().min(1)),
  definitions: z.array(z.object({
    term: z.string().min(1),
    definition: z.string().min(1),
  })),
  examTips: z.array(z.object({
    title: z.string().min(1),
    detail: z.string().min(1),
  })),
  commonMistakes: z.array(z.string().min(1)),
});

const StudyPlanSchema = z.array(z.object({
  day: z.number().int().positive(),
  title: z.string().min(1),
  topics: z.array(z.string().min(1)),
  hours: z.number().positive(),
  focus: z.string().min(1),
}));

module.exports = {
  MCQSchema,
  FlashcardSchema,
  SummarySchema,
  VivaSchema,
  RevisionNotesSchema,
  StudyPlanSchema,
};
