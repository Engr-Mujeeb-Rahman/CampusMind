# CampusMind — phases.md
### Build order. Each phase must fully work before moving to the next.

## Phase 0 — Project Setup
- [ ] Initialize Next.js (App Router + TypeScript + Tailwind) project.
- [ ] Set up GitHub repo (public), push initial scaffold.
- [ ] Create Supabase project; add `.env.example` with all required keys.
- [ ] Create Gemini API key; confirm a basic "hello world" call works from a local script.
- [ ] Set up `lib/supabase/client.ts` + `lib/supabase/server.ts`.
- **Exit criteria:** app runs locally (`npm run dev`), connects to Supabase, one successful test call to Gemini logged in console.

## Phase 1 — Auth & Database Schema
- [ ] Implement Supabase Auth: sign up, log in, log out, session handling.
- [ ] Create all tables from `Architecture.md` §5 via Supabase migrations.
- [ ] Enable Row-Level Security policies on every table.
- [ ] Basic protected dashboard route (redirects to /login if not authenticated).
- **Exit criteria:** can create an account, log in, log out; unauthenticated users can't reach `/dashboard`.

## Phase 2 — Upload & Document Management
- [ ] Build upload UI (drag-and-drop + file picker), accepting PDF/DOCX/TXT/images.
- [ ] `/api/upload` route: store file in Supabase Storage, extract text, save `documents` row with status.
- [ ] Document list UI showing status (processing/ready/error) and basic metadata.
- [ ] Optional: subject/folder grouping.
- **Exit criteria:** uploading a real PDF results in a `documents` row with correctly extracted text, visible in the UI.

## Phase 3 — AI Chat Core
- [ ] `/api/chat` route: takes a message + document_id, sends document text + question to Gemini, streams response back.
- [ ] Chat UI on document detail page, with message history loaded from `chat_messages`.
- [ ] Persist every user/assistant message.
- **Exit criteria:** user can open a document and have a real, grounded conversation about its content, with history preserved on refresh.

## Phase 4 — Study Tools: Summary, MCQ, Flashcards
- [ ] `lib/prompts.ts`: define prompt templates for summary, MCQ, flashcards (with strict JSON schemas for MCQ/flashcards).
- [ ] `/api/generate/summary`, `/api/generate/mcq`, `/api/generate/flashcards` routes, each validating output with `zod`.
- [ ] UI: Summary view (short/long toggle); interactive MCQ quiz mode with scoring; flip-card flashcard UI with known/unknown tracking.
- [ ] Save every generated artifact to the `artifacts` table.
- **Exit criteria:** from any ready document, a user can generate and interact with a summary, a scored MCQ quiz, and a flashcard deck.

## Phase 5 — Study Tools: Viva Questions & Revision Notes
- [ ] `/api/generate/viva` and `/api/generate/revision-notes` routes + prompts.
- [ ] UI: viva questions grouped by difficulty with expandable model answers; revision notes rendered with headings/bold key terms.
- **Exit criteria:** both artifact types generate correctly and are saved to history.

## Phase 6 — Study Planner
- [ ] Planner UI: exam date picker, hours/day input, subject/document selection.
- [ ] `/api/generate/study-plan` route: builds a day-by-day plan via Gemini, saved to `study_plans`.
- [ ] Planner view: calendar or list view of the generated plan.
- **Exit criteria:** user can generate a plan spanning today → exam date that references their actual uploaded subjects.

## Phase 7 — History & Downloads
- [ ] `/history` page listing all artifacts across all documents, filterable by type/document/date.
- [ ] `/api/download/[artifactId]` route exporting to PDF and Markdown.
- [ ] Download buttons wired up on every artifact view.
- **Exit criteria:** every artifact type can be downloaded correctly in at least one format.

## Phase 8 — Polish, Error Handling, Responsiveness
- [ ] Loading states, error toasts, empty states for every screen.
- [ ] Mobile responsive pass on all pages.
- [ ] Rate-limit / handle Gemini API errors and quota issues gracefully.
- **Exit criteria:** no dead-ends or blank screens under normal or error conditions; usable on a phone screen.

## Phase 9 — Testing Pass
- [ ] Manually walk through every feature end-to-end as a fresh user.
- [ ] Test edge cases: empty document, huge document, unsupported file type, network failure mid-upload.
- [ ] Fix all bugs found.
- **Exit criteria:** a full user journey (signup → upload → chat → all 6 study tools → planner → history → download → logout) works without errors.

## Phase 10 — Deployment & Submission
- [ ] Push final code to GitHub `main`.
- [ ] Connect repo to Vercel, configure environment variables in Vercel dashboard.
- [ ] Deploy, then test the live URL in an incognito window as a brand-new user.
- [ ] Write final `README.md` (problem, solution, live URL, features, AI prompt, tools used, screenshots, install/run instructions, future work).
- [ ] Take 3+ real screenshots of the working app for the README/`screenshots/` folder.
- [ ] Final check: no secrets committed, `.env.example` complete and accurate.
- **Exit criteria:** live public URL works for a brand-new incognito user; repo and README meet the course submission checklist.
