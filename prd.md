# CampusMind — Product Requirements Document (PRD)

## 1. Project Summary
CampusMind is an AI-powered study assistant for university students. Students upload their lecture notes/PDFs, and the app uses AI to turn that raw material into summaries, MCQs, flashcards, viva questions, revision notes, and a personalized study plan — plus a chat interface to ask direct questions about the uploaded content.

This document supersedes the original low-code plan (Google Stitch + n8n). It re-targets the project as a **fully coded, AI-agent-buildable web application**, because that produces a more reliable, fully-functional, portfolio-ready result than chaining no-code tools. The feature set and grading requirements from the original plan are preserved.

## 2. Problem Statement
Students accumulate scattered notes (PDFs, slides, scans) and waste time re-reading everything before exams instead of actively studying. There's no single place to turn "my messy notes" into structured, testable study material quickly.

## 3. Target Users
- University/college students (primary)
- Self-learners studying from long-form documents (secondary)

## 4. Goals
- Let a student go from "raw notes" to "quiz-ready material" in under 2 minutes.
- Keep the app simple enough to be built and maintained by a solo developer using AI coding tools.
- Ship a working, publicly deployed product with a clean GitHub repo and README suitable for course submission.

## 5. Non-Goals (Out of Scope for v1)
- Multi-university LMS integrations (Canvas, Moodle, etc.)
- Real-time collaborative study rooms
- Mobile native apps (web-responsive only)
- Payment/subscription system
- Plagiarism detection

## 6. Core Features & Requirements

### 6.1 Authentication
- Email/password + Google OAuth sign-in.
- Each user only sees their own notes, chats, and generated content.

### 6.2 Upload Notes
- Accept PDF, DOCX, TXT, and images (scanned notes via OCR-lite through Gemini's multimodal input).
- Extract text server-side; store the original file and extracted text.
- Show upload progress and parsing errors clearly.
- Multiple documents can be grouped into a "Subject" or "Course" folder.

### 6.3 AI Chat
- Chat interface scoped to one document or one subject folder at a time ("chat with your notes").
- Streamed responses.
- Must cite which uploaded document(s) an answer draws from.
- Persisted chat history per document/subject.

### 6.4 Summaries
- One-click "Generate Summary" per document: short (bullet) and long (paragraph) modes.
- Downloadable as PDF/Markdown.

### 6.5 MCQs (Multiple Choice Questions)
- Generate N questions (user-selectable: 5/10/20) from a document.
- Each question has 4 options, one correct answer, and a short explanation.
- Interactive quiz mode: user answers, gets instant scoring + review.

### 6.6 Flashcards
- Auto-generate front/back flashcard sets from a document.
- Flip-card UI, "mark as known/unknown," basic spaced-repetition re-queueing of unknown cards.

### 6.7 Viva / Oral Exam Questions
- Generate open-ended viva-style questions with model answers, grouped by difficulty (easy/medium/hard).

### 6.8 Revision Notes
- Condensed, exam-oriented notes generated from one or more documents (denser than the summary, formatted with headings and key-term bolding).

### 6.9 Study Planner
- User inputs: exam date, available study hours/day, list of subjects/documents.
- AI generates a day-by-day study schedule covering all material before the exam date, balancing weak vs. strong topics if the user has quiz history.

### 6.10 History & Downloads
- Every generated artifact (summary, MCQ set, flashcards, viva set, revision notes, plan) is saved to the user's history and re-visitable.
- Each artifact can be downloaded as PDF and/or Markdown.

## 7. User Stories
- As a student, I want to upload my messy lecture PDF and get a clean summary so I can review it quickly before class.
- As a student, I want to generate a 10-question MCQ quiz from my notes so I can self-test before an exam.
- As a student, I want flashcards I can flip through on my phone so I can study in short breaks.
- As a student, I want the AI to build me a day-by-day study plan so I know what to study and when.
- As a student, I want to ask a question directly about my notes and get an answer grounded in what I uploaded, not generic information.

## 8. Success Criteria
- All 10 core features work end-to-end on the deployed live URL.
- A new user can go from sign-up → upload → first generated artifact in under 5 clicks.
- No API keys or secrets committed to the public repo.
- README satisfies the course README checklist (problem, solution, live URL, features, AI prompt, tools, screenshots, install steps, future work).

## 9. Constraints
- Single developer, AI-assisted ("vibe coding") build process.
- Must use Gemini API as the core LLM.
- Must deploy on Vercel with a public GitHub repo.
- Budget-conscious: prefer free tiers (Supabase free tier, Vercel free tier, Gemini free tier) wherever possible.

## 10. Open Questions
- Do we need multi-subject organization in v1, or is "one document at a time" acceptable for the deadline? (Default: implement folders, but chat/quiz generation works per-document even before folders exist.)
- Is OCR for handwritten notes required, or typed/scanned-printed notes only? (Default: rely on Gemini's native multimodal PDF/image understanding; no separate OCR pipeline.)
