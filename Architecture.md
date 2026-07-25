# CampusMind — Architecture.md

## 1. Architecture Decision

The original plan used Google Stitch (UI mockups) + n8n (automation) + Gemini API stitched together as separate no-code services. The actual implementation is a **coded two-tier web application**:

> **Vite + React 19 (TypeScript) frontend** — Tailwind CSS 4 for styling, React Router for navigation
> **Express.js backend** — REST API, rate-limited AI generation, file extraction, n8n webhook proxy
> **Supabase** (planned) — Auth, Postgres database, and file storage (not yet connected)
> **OpenRouter AI** — GPT-4o-mini (via OpenRouter API, with Gemini implementation preserved as reference)
> **Deployed on Vercel** (frontend) + Railway/Render (backend)

This keeps the tech-stack *spirit* from the course requirement (AI for generation, GitHub for version control, Vercel for hosting) while being a real, version-controlled, testable codebase.

n8n integration code exists (`backend/src/services/n8n.js`, `backend/src/routes/workflow.js`) but the n8n workflows themselves are empty placeholders. The AI fallback (OpenRouter direct call) is the primary path.

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Vite + React 19, TypeScript, Tailwind CSS 4, React Router v7 | Built and tested locally |
| Backend | Express.js 4, Node.js 18+ | REST API, separate from frontend |
| Auth | Stub (Bearer token, one user) → planned Supabase Auth | Not yet implemented |
| Database | None → planned Supabase Postgres | Not yet connected |
| File Storage | Client-side extraction only → planned Supabase Storage | Not yet implemented |
| AI | OpenRouter API (GPT-4o-mini) with prompt templates | Gemini `@google/generative-ai` preserved as commented reference |
| PDF/DOCX parsing | `pdfjs-dist` + `mammoth` (client-side) | Extraction happens in the browser before sending text to backend |
| Hosting | Vercel (frontend), Railway/Render (backend) | Not yet deployed |

## 3. High-Level Data Flow

```
Browser (Vite + React UI)
   │  (fetch / REST API calls)
   ▼
Express.js Backend (/api/*)  — port 4000
   │
   ├──► (planned) Supabase Postgres: read/write records
   ├──► (planned) Supabase Storage: upload/download raw files
   ├──► (optional) n8n webhook proxy (fallback if configured)
   └──► OpenRouter / Gemini API: generate content
   │
   ▼
JSON response returned to Browser → rendered in UI
```

## 4. Folder Structure

```
campusmind/
├─ frontend/
│  ├─ src/
│  │  ├─ pages/              # 10 route pages
│  │  ├─ components/
│  │  │  ├─ ui/              # shared Button, Card, Badge, Modal, etc.
│  │  │  ├─ layout/          # DashboardLayout, Sidebar, Topbar, Navbar
│  │  │  ├─ dashboard/       # WelcomeBanner, StatsGrid, QuickActions, etc.
│  │  │  ├─ chat/            # ChatHeader, ChatMessage, ChatInput, etc.
│  │  │  ├─ upload/          # UploadZone, FileItem, ProcessingStatus, etc.
│  │  │  └─ landing/         # Hero, Features, HowItWorks, FAQ, etc.
│  │  ├─ services/           # apiClient, uploadService
│  │  ├─ hooks/              # useUpload
│  │  ├─ constants/          # upload config, revision mock data, etc.
│  │  ├─ utils/              # extractors (PDF/DOCX), fileHelpers, validation
│  │  ├─ router/             # AppRouter
│  │  └─ index.css           # Tailwind + custom utilities
│  ├─ index.html
│  ├─ vite.config.js
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ server.js           # entry point
│  │  ├─ app.js              # Express app setup
│  │  ├─ config/             # env-based config
│  │  ├─ routes/             # health, notes, summary, mcq, flashcards, viva, planner, chat, workflow
│  │  ├─ controllers/        # one per route
│  │  ├─ services/           # gemini.js (OpenRouter AI), n8n.js (webhook proxy)
│  │  ├─ middleware/         # auth, errorHandler, rateLimiter, requestId, requestLogger
│  │  ├─ prompts/            # chatPrompt, mcqPrompt, flashcardPrompt, summaryPrompt, vivaPrompt, plannerPrompt
│  │  └─ utils/              # ApiError, logger
│  ├─ .env.example
│  └─ package.json
├─ n8n/
│  ├─ workflows/             # (empty — placeholder for n8n exports)
│  └─ prompts/               # (empty — placeholder for n8n prompts)
├─ screenshots/
├─ .env.example              # root-level example
├─ .gitignore
├─ README.md
├─ PRD.md / Architecture.md / Rules.md / phases.md / design.md / memory.md
└─ package.json              # (root — unused, legacy)
```

## 5. Database Schema (planned — Supabase Postgres)

```sql
-- Managed by Supabase Auth
-- auth.users

subjects (
  id uuid pk, user_id uuid fk, name text, created_at timestamptz
)

documents (
  id uuid pk, user_id uuid fk, subject_id uuid fk nullable,
  title text, storage_path text, extracted_text text,
  status text,           -- 'processing' | 'ready' | 'error'
  created_at timestamptz
)

chat_messages (
  id uuid pk, document_id uuid fk, user_id uuid fk,
  role text,              -- 'user' | 'assistant'
  content text, created_at timestamptz
)

artifacts (
  id uuid pk, document_id uuid fk, user_id uuid fk,
  type text,               -- 'summary'|'mcq'|'flashcards'|'viva'|'revision_notes'|'study_plan'
  content jsonb,           -- structured generated content
  created_at timestamptz
)

study_plans (
  id uuid pk, user_id uuid fk, exam_date date,
  hours_per_day int, subjects jsonb, plan jsonb, created_at timestamptz
)
```

Row-Level Security (RLS) must be enabled on every table: a user may only `select`/`insert`/`update`/`delete` rows where `user_id = auth.uid()`.

## 6. API Contract

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Health check |
| `/api/notes` | GET/POST/DELETE | Document CRUD (stub — returns mock data) |
| `/api/chat/send` | POST | Send message → AI response (no document context yet) |
| `/api/summary/generate` | POST | Generate summary from pasted content |
| `/api/mcq/generate` | POST | Generate MCQs from topic |
| `/api/flashcards/generate` | POST | Generate flashcards from content |
| `/api/viva/generate` | POST | Generate viva questions from project description |
| `/api/planner/generate` | POST | Generate study plan from subject/deadline |
| `/api/workflows/smart-notes` | POST | n8n proxy → AI fallback for all-in-one generation |

All generation endpoints return unvalidated AI output as `{ success: true, data: { response: "..." } }`. Structured output validation (zod) is planned but not yet implemented.

## 7. Environment Variables (`.env.example`)

```
# Server
PORT=4000
NODE_ENV=development

# OpenRouter AI (replaces Gemini — free tier with broader model access)
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1/chat/completions

# n8n Webhook (optional — leave blank to use direct AI calls)
N8N_WEBHOOK_URL=
N8N_TIMEOUT_MS=120000

# CORS
CORS_ORIGIN=http://localhost:5173

# (planned) Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
```

`OPENROUTER_API_KEY` is server-only — never exposed to the client.

## 8. Alternative Path (Gemini API)

If you prefer Gemini over OpenRouter:
1. Install `@google/generative-ai` in `backend/`
2. Set `GEMINI_API_KEY` in `.env`
3. Uncomment the Gemini implementation in `backend/src/services/gemini.js`
4. Comment out the OpenRouter implementation
5. Update `backend/src/config/index.js` to read `GEMINI_API_KEY`

## 9. Key Architectural Differences from Original Plan

| Original Plan | Actual Implementation | Reason |
|---|---|---|
| Next.js App Router | Vite + React + Express | Existing codebase was built this way |
| Gemini API | OpenRouter AI (GPT-4o-mini) | Broader model access, free tier |
| Supabase Auth | Stub auth middleware | Not yet implemented |
| Server-side PDF parsing | Client-side PDF parsing (pdfjs-dist) | Simpler for initial build |
| Single deployable | Two deployable units (frontend + backend) | Chosen during development |

## 10. Future Architecture Improvements

- Connect Supabase for auth, database, and file storage
- Add structured output validation with zod
- Move PDF parsing to server-side for large documents
- Add streaming for chat responses
- Consolidate to monorepo with shared types
