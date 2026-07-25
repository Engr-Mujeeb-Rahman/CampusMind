# CampusMind — memory.md
### Living project memory. Read this FIRST every session. Update it LAST every session.

> Purpose: this file is the project's short-term memory across AI coding sessions. It should always reflect the *actual current state of the repo*, not the plan. If something here contradicts the real code, trust the code and fix this file.

---

## Project Identity
- **Name:** CampusMind — Your Personal University Learning Assistant
- **One-liner:** Upload your notes, get AI-generated summaries, MCQs, flashcards, viva questions, revision notes, and a study plan.
- **Origin:** Originally scoped as a no-code build (Google Stitch UI + n8n automation + Gemini API) for a course project. Re-architected as Vite+React frontend + Express backend + OpenRouter AI. See `Architecture.md` §1 for details.

## Companion Files
`PRD.md` (what) · `Architecture.md` (how it's structured) · `Rules.md` (guardrails) · `phases.md` (build order) · `design.md` (visual/UX rules) · this file (current state)

## Current Status (update every session)
- **Last updated:** 2026-07-26
- **Current phase:** Phase 10 complete — deployed to Vercel, everything confirmed working on live URL
- **Live URLs:**
  - **Frontend:** [https://frontend-phi-tan-43.vercel.app](https://frontend-phi-tan-43.vercel.app)
  - **Backend API:** [https://backend-khaki-delta-33.vercel.app](https://backend-khaki-delta-33.vercel.app)
- **What exists in the repo right now:**
  - `frontend/`: Vite + React 19 + Tailwind CSS 4 app with 14 route pages, full component library, Supabase Auth, file extraction, chat with document context
  - `backend/`: Express.js server with 12 route modules, 6 prompt templates, OpenRouter AI, Supabase Auth JWT verification, rate limiting, zod validation, structured error handling
  - `playwright-e2e.mjs`: 30-test Playwright suite covering auth, upload, all 13 page renders, API generation, history/download, mobile viewport, and 3 edge cases
  - `screenshots/`: 7 screenshots from the live deployed app

### Phase-by-phase summary

**Phase 0: Project Setup** ✅
- Frontend builds clean, backend starts on port 4000
- Architecture.md rewritten for actual Vite+React+Express+OpenRouter stack

**Phase 1: Authentication** ✅
- Supabase Auth email/password with JWT verification middleware
- Login/Signup UI, ProtectedRoute, session persistence
- Test user: `student@campusmind.dev` / `Test123456!`

**Phase 2: Documents & Upload** ✅
- File upload to Supabase storage + documents table, CRUD endpoints
- UploadPage (extraction, progress/cancel/retry), LibraryPage, DocumentDetailPage

**Phase 3: Chat with Document Context** ✅
- Chat with document-scoped AI context, persisted to chat_messages table
- ChatPage with history, document selector

**Phase 4: Schema Validation + Artifact Persistence** ✅
- zod schemas for all 6 artifact types (Summary, MCQ, Flashcards, Viva, RevisionNotes, StudyPlan)
- Artifact service saving/listing/downloading to Supabase `artifacts` table
- All generation controllers validated + persistent + document-context aware

**Phase 5: Viva & Revision Notes AI** ✅
- Viva generation with difficulty grouping, categories, search/filter/reveal UI
- Revision Notes generation with key concepts, definitions, exam tips, common mistakes

**Phase 6: Study Plan** ✅
- Day-by-day AI-generated study plan persisted to `study_plans` table

**Phase 7: History & Downloads** ✅
- History page with type filtering, artifact download as JSON
- Download endpoint on `/api/artifacts/:id/download`

**Phase 8: Polish, Error Handling, Mobile Responsiveness** ✅
- Flashcard "Know It" / "Still Learning" buttons with re-queue of unknown cards
- MCQ end-of-quiz summary screen with missed question review + explanations
- Mobile touch optimization (touch-manipulation, larger tap targets, responsive grid)
- Loading spinners with descriptive text for every async action
- Error banners with dismiss for every generation endpoint
- Empty states for Library (no documents), History (no artifacts), Flashcards/MCQ/Planner/Notes (no content input)

**Phase 9: E2E Testing & Edge Cases** ✅
- 30-test Playwright suite (`playwright-e2e.mjs`): auth, upload, all 13 pages render, MCQ/flashcards API generation, history/displays, 5 artifact types download-validated, mobile viewport touch targets, 3 edge cases (empty upload, bad file, large count)
- Real browser verification: logged in via UI, confirmed History page correctly displays all artifacts with type filters and timestamps (18 artifacts across 5 types shown)
- Real browser verification: MCQ quiz generated 10 questions from topic input, options clickable, progress tracking visible
- Real browser verification: Flashcards generated 5 cards with flip-to-reveal, "Card X of Y" navigation, Know It/Still Learning buttons rendered
- Previously invisible CORS bug fixed: E2E test used `127.0.0.1:5173` while CORS origin was `localhost:5173` — mismatch caused API failure. Changed to `localhost:5173`.
- History page test race condition fixed: inject session *before* navigating to history (was doing it after, causing session clear race from prior 401 response)
- Fixed syntax errors from edit churn: stray braces and orphaned try/catch blocks removed

## E2E Test Results (2026-07-26)

### Backend API Tests (all passing)
| Test | Result | Details |
|---|---|---|
| Auth login | PASS | student@campusmind.dev logged in successfully |
| MCQ generation | PASS | Multiple questions with options + correctIndex + explanation |
| Flashcards generation | PASS | Cards with question + answer |
| Viva generation | PASS | Questions with difficulty levels |
| Study Plan generation | PASS | Day-by-day plan with topics+activities |
| Summary generation | PASS | title + takeaways + definitions |
| Revision Notes generation | PASS | title + concepts + exam tips |
| History list | PASS | 18 artifacts across 5 types |
| Download artifact | PASS | Valid JSON for all 5 types |

### Full E2E Suite (30/30 passing)
See `playwright-e2e.mjs` for the complete test. It covers:
- Login via API, document upload
- 13 frontend pages render (Sign, Signup, Dashboard, Library, Upload, Chat, Summary, Revision, Flashcards, MCQ, Viva, Planner, History)
- MCQ: input form renders, API generation works, prior artifacts exist in DB
- Flashcards: textarea renders, API generation works
- Viva, Revision Notes, Study Planner: input fields render
- History: artifacts displayed with type filters, all 5 artifact types downloadable and valid
- Mobile viewport: touch targets ≥40px on MCQ options and flashcards buttons
- Edge cases: empty upload ("A file title is required."), bad file ("Extracted text content is required."), large count (handled gracefully)

### UI Changes (Phase 8)

**FlashcardsPage** (`frontend/src/pages/FlashcardsPage.jsx`):
- Added "Know It" / "Still Learning" buttons (visible only when card is flipped)
- Unknown cards tracked in `learningCards` state
- "Re-queue X unknown cards at end" button to recycle unknowns
- Card known/unknown counters in progress bar area
- Auto-generation from `document_id` search param on mount
- Mobile: touch-manipulation, responsive grid for tips cards, hidden nav text on small screens

**MCQPage** (`frontend/src/pages/MCQPage.jsx`):
- End-of-quiz summary screen with trophy + score + "Try Again" button
- Missed questions section showing correct/incorrect options + explanation
- Mobile: touch-manipulation on all buttons, responsive font sizes, larger tap targets
- Results tracking per question for review

**StudyPlannerPage** (`frontend/src/pages/StudyPlannerPage.jsx`):
- Fixed critical bug: removed `JSON.parse(data.response)` — now uses `data.plan` directly
- Added `useSearchParams` import and `document_id` support

**RevisionNotesPage** (`frontend/src/pages/RevisionNotesPage.jsx`):
- Complete rewrite from static hardcoded data → dynamic AI generation
- Accepts `document_id` from search params, auto-generates on mount
- Text input for manual paste, calls `/api/notes/generate`
- Handles new response format `data.notes`

### Bugs Fixed This Session
1. **StudyPlannerPage**: `JSON.parse(data.response)` would crash at runtime because the backend now returns a plain array instead of a string. Fixed to use `data.plan`.
2. **RevisionNotesPage**: Was entirely static (`constants/revision.js`) — no API integration at all. Rewrote to use `/api/notes/generate` with full loading/error handling.
3. **FlashcardsPage**: Missing `document_id` auto-generation support. Added `useEffect` to detect document_id and auto-generate.
4. **MCQPage**: Missing end-of-quiz summary (user had no way to review missed questions). Added full quiz summary screen.
5. **CORS hostname mismatch**: E2E test used `http://127.0.0.1:5173` but backend CORS allowed `http://localhost:5173` — caused silent API failure. Fixed to use `localhost`.
6. **History page race condition in E2E**: Navigated to /history before setting localStorage token, causing the first load's 401 response to clear the freshly injected session. Fixed by injecting session on a safe page before navigating to history.

## Key Decisions Log
| Decision | Reasoning |
|---|---|
| Vite+React+Express instead of Next.js | Existing codebase was built this way; 5000+ lines of working UI would be wasted on a rewrite |
| OpenRouter AI (GPT-4o-mini) instead of Gemini | Broader model access, free tier available; Gemini implementation preserved as reference |
| Supabase for DB, Auth, Storage | Fully managed, generous free tier, matches backend Express architecture |
| zod for schema validation | Runtime type safety for AI outputs, clean error messages |
| "Know It" / "Still Learning" on flip side | Design.md specifies this interaction; buttons only appear after answer is revealed |
| End-of-quiz summary for MCQ | Design.md specifies "End-of-quiz summary screen with review of missed questions + explanations" |
| API-only generation tests in E2E (not browser) | OpenRouter free tier rate-limits rapid repeated calls; API tests verify correctness without 2-min waits per test |

## Known Issues / Risks
- Dashboard components (WelcomeBanner, StatsGrid, RecentActivity) use hardcoded constants — not yet driven by real user data
- **OpenRouter free-tier rate limits**: Hitting rate limits during rapid-fire E2E tests causes AI generation failures. Fixes to consider for production: (a) client-side throttle/debounce on "Generate" clicks, (b) clearer "Please wait — AI is generating…" queuing indicator, (c) exponential backoff in the API client if 429 received, (d) queuing multiple requests server-side. Without these, 3+ concurrent users hitting "Generate" simultaneously will see errors.
- StudyPlannerPage "Add to Calendar" / "Download PDF" / "Print" buttons are UI-only (no backend integration)
- No dark mode implementation yet (design.md specifies it)
- Large PDFs (100+ pages) may need chunking — not yet designed
- Root package.json is unused/legacy

## Phase 10 — Deployment (complete)

**Backend (Vercel Serverless):**
- Deployed at `https://backend-khaki-delta-33.vercel.app`
- Uses `@vercel/node` builder with serverless-http wrapper
- Key bug fix: `uuid` v14 is ESM-only — Vercel's serverless runtime doesn't support `require()` of ESM modules. Replaced with native `crypto.randomUUID()`.
- Env vars set in Vercel dashboard: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENROUTER_API_KEY, CORS_ORIGIN

**Frontend (Vercel Static):**
- Deployed at `https://frontend-phi-tan-43.vercel.app`
- Vite build with `VITE_API_BASE_URL` env var pointing to backend
- SPA routing via `vercel.json` rewrites (`_redirects` is Netlify-only)
- Login, dashboard, library, MCQ, flashcards, history — all confirmed working in incognito session

**Live URL test (2026-07-25):**
- Backend health check: `{"status":"ok"}`
- Frontend login page renders with Welcome back + Sign In form
- Login as `student@campusmind.dev` → dashboard with stats (12 notes, 45 chats, 120 flashcards, 85 MCQs)
- All env vars verified: no secrets in repo, only `.env.example` with placeholders committed

### Deployment Decisions
| Decision | Reasoning |
|---|---|
| Vercel over Render/Railway | Simpler single-platform deployment, free tier generous, auto HTTPS |
| `serverless-http` wrapper | Required for Express to work as Vercel serverless function |
| `crypto.randomUUID()` over `uuid` package | uuid v14 is ESM-only, incompatible with Vercel's CommonJS serverless runtime |

## Next Recommended Step
Phase 11 — Production hardening (if continuing):
1. Add custom domain (e.g., campusmind.app)
2. Add client-side rate-limit queuing for OpenRouter 429s
3. Implement subject folders / document organization
4. Dark mode
5. Dashboard personalization with real user data
6. Large document chunking for 100+ page PDFs

## Session Update Template
Copy this block and fill it in at the end of every coding session:

```
### Session on <date>
- Phase worked on:
- What was built:
- What was tested and confirmed working:
- What's still broken/incomplete:
- Decisions made this session:
- Next recommended step:
```
