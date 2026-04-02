import React, { useReducer, useMemo, useEffect } from 'react'
import { getCharsForLesson, LESSON_META } from '../../data/characters.js'
import TraceMode from './TraceMode.jsx'
import WriteMode from './WriteMode.jsx'
import ResultScreen from './ResultScreen.jsx'

// --- Reducer ---
function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_TRACE': {
      const nextIndex = state.traceIndex + 1
      if (nextIndex >= state.chars.length) {
        // Done tracing, switch to write mode
        return { ...state, step: 'write', writeIndex: 0, results: [] }
      }
      return { ...state, traceIndex: nextIndex }
    }
    case 'SUBMIT_RESULT': {
      const newResults = [...state.results, { char: state.chars[state.writeIndex], ok: action.ok }]
      const nextIndex = state.writeIndex + 1
      if (nextIndex >= state.chars.length) {
        return { ...state, step: 'result', results: newResults }
      }
      return { ...state, writeIndex: nextIndex, results: newResults }
    }
    case 'RESTART':
      return initState(action.chars)
    default:
      return state
  }
}

function initState(chars) {
  return {
    step: 'trace',     // 'trace' | 'write' | 'result'
    chars,
    traceIndex: 0,
    writeIndex: 0,
    results: [],
  }
}

// --- Component ---
export default function LessonScreen({ lessonId, progressApi, onBack, onNext }) {
  const chars = useMemo(() => getCharsForLesson(lessonId), [lessonId])
  const [state, dispatch] = useReducer(reducer, chars, initState)
  const meta = LESSON_META.find(l => l.id === lessonId)

  // Reset when lessonId changes
  useEffect(() => {
    dispatch({ type: 'RESTART', chars: getCharsForLesson(lessonId) })
  }, [lessonId])

  const handleLessonComplete = (results) => {
    const score = results.filter(r => r.ok).length
    progressApi.markLessonComplete(lessonId, score, results.length)
  }

  // Trigger save when entering result step
  useEffect(() => {
    if (state.step === 'result') {
      handleLessonComplete(state.results)
    }
  }, [state.step])

  return (
    <div className="screen">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={onBack}>← ホーム</button>
        <span className="lesson-topbar-title">{meta?.title ?? `レッスン ${lessonId}`}</span>
        <span className="step-indicator">
          {state.step === 'trace' ? 'なぞり' : state.step === 'write' ? '書き取り' : '結果'}
        </span>
      </div>

      {state.step === 'trace' && (
        <TraceMode
          char={state.chars[state.traceIndex]}
          index={state.traceIndex}
          total={state.chars.length}
          onNext={() => dispatch({ type: 'NEXT_TRACE' })}
          onUpdateCharacter={progressApi.updateCharacter}
        />
      )}

      {state.step === 'write' && (
        <WriteMode
          key={`write-${state.writeIndex}`}
          char={state.chars[state.writeIndex]}
          index={state.writeIndex}
          total={state.chars.length}
          onResult={(ok) => dispatch({ type: 'SUBMIT_RESULT', ok })}
          onUpdateCharacter={progressApi.updateCharacter}
        />
      )}

      {state.step === 'result' && (
        <ResultScreen
          results={state.results}
          lessonId={lessonId}
          onRetry={() => dispatch({ type: 'RESTART', chars: getCharsForLesson(lessonId) })}
          onNext={onNext}
          onHome={onBack}
        />
      )}
    </div>
  )
}
