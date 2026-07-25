# CampusMind — Rules.md
### Ground rules for any AI coding agent (Claude Code, Cursor, etc.) working on this repo

## 1. Source of Truth
- `PRD.md` = what to build. `Architecture.md` = how it's structured. `design.md` = how it should look. `phases.md` = the order to build in. `memory.md` = what's already been done — **read `memory.md` first, every session, before writing any code.**
- If a request conflicts with these files, follow the files unless the user explicitly overrides them in the current message — and if you override, update the relevant `.md` file in the same turn so it doesn't drift out of sync.

## 2. Never Assume Something Is Done
- Do not assume a feature, file, migration, or config exists just because it's mentioned in a plan. Check the actual repo state first (`view`/`ls`/read the file) before building on top of it.
- If `memory.md` says a feature is "done," still verify the relevant file compiles/runs before building the next phase on top of it.

## 3. Work in Phases, Not All at Once
- Follow `phases.md` in order. Do not jump ahead to Phase 5 while Phase 2 is broken.
- Finish and verify one phase (it runs, builds, no console errors) before starting the next.
- After finishing a phase, update `memory.md` with: what was built, what decisions were made, what's still pending, and any known issues.

## 4. Secrets & Security
- Never hardcode API keys, database URLs, or secrets in source files. Always read from environment variables.
- Never commit `.env` or `.env.local`. Only `.env.example` (with empty/placeholder values) is committed.
- `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must only ever be referenced in server-side code (API routes / server components), never in client components, never in anything under `NEXT_PUBLIC_*`.
- Every Supabase table needs Row-Level Security enabled before the app is considered feature-complete for that table.

## 5. Code Quality Rules
- TypeScript everywhere; no untyped `any` unless truly unavoidable (and comment why).
- One Gemini wrapper module (`lib/gemini.ts`) — no scattering raw `fetch` calls to the Gemini API across multiple files.
- All prompt templates live in `lib/prompts.ts`, not inline in route handlers — makes them easy to review and tune.
- Any AI output that needs to be structured (MCQs, flashcards, viva questions) must be validated against a schema (e.g. `zod`) server-side before it's saved or shown to the user. If parsing fails, retry once with a stricter prompt, then surface a clear error — never show broken/malformed JSON to the user.
- Keep components small and single-purpose. Shared UI goes in `components/ui/`.
- Loading and error states are required for every async action (upload, generate, chat) — no silent failures.

## 6. Testing Before Calling Anything "Done"
- After building a feature, actually run it locally (or in the sandbox) and confirm the happy path works end-to-end, not just that the code compiles.
- Test at least one failure case per feature (e.g., upload a non-supported file type, generate MCQs from an empty document) and confirm the app fails gracefully with a user-facing message.
- Before marking a phase complete in `memory.md`, do a quick manual walk-through of every feature added in that phase.

## 7. Incremental, Reviewable Changes
- Prefer small, focused commits/edits over one giant rewrite. If a change touches more than ~5 files, pause and summarize the plan before proceeding.
- Don't refactor unrelated code while implementing a new feature unless asked.
- If an architectural decision in `Architecture.md` turns out to be wrong or impractical while building, flag it explicitly, propose the fix, update `Architecture.md`, and only then proceed — don't silently diverge from the documented architecture.

## 8. UI/Design
- Follow `design.md` for colors, typography, spacing, and component patterns. Don't introduce a new visual style per screen.
- Mobile-responsive by default — students will use this on phones between classes.

## 9. Git & Deployment
- Meaningful commit messages (`feat: add MCQ generation endpoint`, not `update`).
- Never commit `node_modules`, `.env`, or generated build artifacts.
- Before deployment: confirm `.env.example` lists every required variable, and the README's setup steps actually work from a clean clone.

## 10. Communication Back to the User
- After each phase (or any significant change), summarize in plain language: what was built, what now works, what to test, and what's next.
- If something in the original plan is ambiguous or you had to make a judgment call, say so explicitly rather than silently picking an interpretation.
- Never claim something is "fully working" without having actually run/tested it.
