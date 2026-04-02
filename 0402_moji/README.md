# Georgian Script Trainer

React + Vite web app for learning Georgian script (Mkhedruli). Mobile-first, Japanese UI.

## Stack

- React 18 + Vite 5
- HTML5 Canvas (touch + mouse drawing)
- Google Fonts: Noto Sans Georgian
- localStorage for progress persistence
- No router, no UI library

## Dev

```bash
npm install
npm run dev      # http://localhost:5173/0402_moji/
npm run build    # outputs to dist/
npm run preview  # preview production build
```

`vite.config.js` has `base: '/0402_moji/'` for GitHub Pages deployment.

## Architecture

Navigation is a single `view` state in `App.jsx`:

```js
{ screen: 'home' | 'chart' | 'intro' | 'lesson' | 'finale', lessonId: 1–8 }
```

No React Router. Screen components are conditionally rendered.

## File Map

```
src/
├── App.jsx                        # Root: navigation state, screen router
├── index.css                      # All styles (single file, no CSS modules)
├── main.jsx                       # ReactDOM.createRoot entry
│
├── data/
│   ├── characters.js              # 33 Georgian chars + LESSON_META + getCharsForLesson()
│   └── vocabulary.js              # Travel words for intro/finale screens
│
├── hooks/
│   └── useProgress.js             # localStorage read/write — markLessonComplete, updateCharacter, resetAll
│
└── components/
    ├── HomeScreen.jsx             # Lesson card list, progress bar, reset modal
    ├── ChartScreen.jsx            # 4-col char grid, tap-to-enlarge modal
    ├── IntroScreen.jsx            # Lesson 0: vocab preview (read-only)
    ├── FinaleScreen.jsx           # Lesson 9: same vocab, romanization hidden
    └── lesson/
        ├── LessonScreen.jsx       # useReducer orchestrator: trace → write → result
        ├── TraceMode.jsx          # Step 1: DrawingCanvas with guideChar
        ├── WriteMode.jsx          # Step 2: blank canvas → answer compare → self-assess
        ├── ResultScreen.jsx       # Step 3: score circle + per-char breakdown
        └── DrawingCanvas.jsx      # forwardRef canvas (touch/mouse, clear, getDataURL)
```

## Data Shape

**Character** (`data/characters.js`):
```js
{ character: 'ა', romanization: 'a', type: 'vowel', lesson: 1, order: 1 }
```
Lessons 1–7 have 3–5 chars each. Lesson 8 (総復習) = all 33 shuffled at runtime via `getLesson8Chars()`.

**Vocabulary** (`data/vocabulary.js`):
```js
{ georgian: 'გამარჯობა', romanization: 'gamarjoba', japanese: 'こんにちは', category: 'greeting' }
```
Categories: `greeting | place | food | useful`

**Progress** (localStorage key: `georgian-trainer-progress`):
```js
{
  lessonProgress: { "1": { completed: true, lastScore: 4, bestScore: 5, total: 5 } },
  characterProgress: { "ა": { traceCount: 2, selfAssessOk: 1, selfAssessFail: 0 } },
  lastAccessedLesson: 2,
  lastUpdated: "2026-04-02T..."
}
```

## Lesson Flow

```
LessonScreen (useReducer)
  state.step === 'trace'  → TraceMode  (one char at a time, NEXT_TRACE action)
  state.step === 'write'  → WriteMode  (one char at a time, SUBMIT_RESULT action)
  state.step === 'result' → ResultScreen
```

`WriteMode` phase sub-states: `'write'` → `'compare'` (managed internally with useState).  
Answer compare renders the correct char onto an off-screen canvas via `renderCharToDataURL()`.

## DrawingCanvas

`forwardRef` component. Ref exposes: `clear()`, `getDataURL()`, `isEmpty()`.  
`guideChar` prop: if set, draws the Georgian char at `opacity: 0.15` as the trace guide.  
Canvas is sized via `ResizeObserver` + `devicePixelRatio` scaling.

## Spec

Full requirements: `plan.md` in this directory.
