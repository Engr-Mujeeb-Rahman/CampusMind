# CampusMind — design.md
### UI/UX guidelines (replaces Google Stitch mockups — the coding agent designs directly in code)

## 1. Design Principles
- **Calm, focused, study-friendly.** Students use this while stressed before exams — avoid visual clutter, avoid dark patterns, avoid anything that competes for attention with the content itself.
- **Content-first.** The generated study material (summary, flashcards, MCQs) is the star; chrome and navigation stay minimal.
- **Fast to act on.** Every core action (upload, generate, quiz, download) should be reachable in one or two clicks from the document page.

## 2. Visual Style
- **Palette:** a calm primary (deep indigo/blue, e.g. `#4F46E5`) for actions and emphasis, a warm neutral background (off-white `#FAFAFA` in light mode), near-black text (`#111827`) for readability, and a soft success green / warning amber / error red for states. Support a dark mode using a deep slate background (`#0F172A`) with the same accent.
- **Typography:** a clean, highly legible sans-serif (e.g. Inter or system-ui) throughout. Headings slightly bolder/tighter; body text at 16px minimum for readability during long study sessions.
- **Spacing:** generous whitespace, comfortable line-height (1.5+) on any generated text (summaries, revision notes) since these are meant to be *read*, not skimmed like marketing copy.
- **Corners & elevation:** soft rounded corners (8–12px), subtle shadows for cards, no heavy borders.

## 3. Core Screens

### Dashboard (`/dashboard`)
- Grid/list of subjects and documents with status badges (processing/ready/error).
- Prominent "Upload Notes" primary button.
- Empty state for new users: short explainer + upload CTA.

### Document Detail (`/documents/[id]`)
- Left: document info (title, upload date, extracted text preview/expand).
- Tabs (not separate pages) for: Chat · Summary · MCQ · Flashcards · Viva · Revision Notes.
- Each tab's "Generate" action shows a loading skeleton, not a blank screen, while Gemini responds.

### Chat Tab
- Standard chat bubble layout, user right-aligned, assistant left-aligned.
- Streaming text renders progressively (typing effect via streamed tokens, not a fake typewriter).
- Small citation chip under assistant messages referencing the source document.

### MCQ Quiz
- One question at a time (or full-page scroll list — pick one, stay consistent), radio-button options, immediate visual feedback (green/red) on submit, running score visible.
- End-of-quiz summary screen with review of missed questions + explanations.

### Flashcards
- Card flips on click/tap (CSS 3D flip), swipe or arrow navigation between cards.
- "Know it" / "Still learning" buttons re-queue unknown cards at the end of the deck.

### Viva Questions
- Accordion list grouped by difficulty (Easy/Medium/Hard), click to reveal model answer.

### Revision Notes
- Rendered Markdown with clear heading hierarchy, bolded key terms, optional print/PDF-friendly view.

### Study Planner (`/planner`)
- Simple form: exam date, hours/day slider or input, subject/document multi-select.
- Result: calendar-style or day-by-day list view, each day showing subject + focus topics + estimated hours.

### History (`/history`)
- Filterable table/list: type, document, date created, quick "view" and "download" actions.

## 4. Components Library
Build once, reuse everywhere in `components/ui/`: `Button`, `Card`, `Badge`, `Tabs`, `Modal`, `Toast`, `Skeleton/Loader`, `EmptyState`, `FileDropzone`.

## 5. Responsive Behavior
- Single-column stacking on mobile (<640px); tab bar becomes a horizontally scrollable strip.
- Flashcards and MCQ views are touch-optimized first (this is where students will actually use it most, between classes).

## 6. Accessibility
- All interactive elements keyboard-navigable and screen-reader labeled.
- Color is never the only signal (pair green/red feedback with icons/text, e.g. ✓/✗).
- Sufficient contrast ratio (WCAG AA) between text and background in both light and dark mode.

## 7. What NOT to Do
- No auto-playing audio/video.
- No modal-on-load popups (newsletter-style interruptions).
- No feature buried more than 2 clicks from the document page.
