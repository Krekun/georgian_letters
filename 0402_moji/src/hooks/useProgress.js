import { useState, useCallback } from 'react'

const STORAGE_KEY = 'georgian-trainer-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore parse errors
  }
  return {
    lessonProgress: {},
    characterProgress: {},
    lastAccessedLesson: null,
    lastUpdated: null,
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      lastUpdated: new Date().toISOString(),
    }))
  } catch {
    // ignore storage errors (e.g. private mode)
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const update = useCallback((updater) => {
    setProgress(prev => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const markLessonComplete = useCallback((lessonId, score, total) => {
    update(prev => {
      const existing = prev.lessonProgress[lessonId] ?? {}
      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            completed: true,
            lastScore: score,
            bestScore: Math.max(existing.bestScore ?? 0, score),
            total,
          },
        },
        lastAccessedLesson: lessonId,
      }
    })
  }, [update])

  const updateCharacter = useCallback((char, { traced = false, ok = null } = {}) => {
    update(prev => {
      const existing = prev.characterProgress[char] ?? { traceCount: 0, selfAssessOk: 0, selfAssessFail: 0 }
      return {
        ...prev,
        characterProgress: {
          ...prev.characterProgress,
          [char]: {
            traceCount:    existing.traceCount    + (traced ? 1 : 0),
            selfAssessOk:  existing.selfAssessOk  + (ok === true  ? 1 : 0),
            selfAssessFail:existing.selfAssessFail + (ok === false ? 1 : 0),
          },
        },
      }
    })
  }, [update])

  const setLastLesson = useCallback((lessonId) => {
    update(prev => ({ ...prev, lastAccessedLesson: lessonId }))
  }, [update])

  const resetAll = useCallback(() => {
    const fresh = {
      lessonProgress: {},
      characterProgress: {},
      lastAccessedLesson: null,
      lastUpdated: null,
    }
    saveProgress(fresh)
    setProgress(fresh)
  }, [])

  return { progress, markLessonComplete, updateCharacter, setLastLesson, resetAll }
}
