import React, { useState } from 'react'
import { LESSON_META } from '../data/characters.js'

export default function HomeScreen({ progress, onNavigate, onReset }) {
  const [showReset, setShowReset] = useState(false)

  const handleLessonClick = (lesson) => {
    if (lesson.type === 'intro')   onNavigate('intro')
    else if (lesson.type === 'finale') onNavigate('finale')
    else onNavigate('lesson', lesson.id)
  }

  const getLessonStatus = (lesson) => {
    if (lesson.type === 'intro' || lesson.type === 'finale') return null
    return progress.lessonProgress[lesson.id] ?? null
  }

  const totalCompleted = Object.values(progress.lessonProgress).filter(p => p.completed).length
  const totalLessons = LESSON_META.filter(l => l.type === 'lesson').length

  return (
    <div className="screen">
      <header className="home-header">
        <div className="home-title-block">
          <h1 className="home-title">ジョージア文字</h1>
          <p className="home-subtitle">トレーナー</p>
        </div>
        <button className="chart-btn" onClick={() => onNavigate('chart')}>
          一覧表
        </button>
      </header>

      {totalCompleted > 0 && (
        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${(totalCompleted / totalLessons) * 100}%` }}
            />
          </div>
          <span className="progress-bar-label">{totalCompleted} / {totalLessons} レッスン完了</span>
        </div>
      )}

      <div className="lesson-list">
        {LESSON_META.map(lesson => {
          const status = getLessonStatus(lesson)
          const isSpecial = lesson.type !== 'lesson'
          return (
            <button
              key={lesson.id}
              className={`lesson-card ${isSpecial ? 'lesson-card--special' : ''} ${status?.completed ? 'lesson-card--done' : ''}`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="lesson-card-left">
                <span className="lesson-card-title">{lesson.title}</span>
                <span className="lesson-card-subtitle">{lesson.subtitle}</span>
              </div>
              <div className="lesson-card-right">
                {status?.completed && (
                  <span className="lesson-badge">
                    ✓ {status.bestScore}/{status.total}
                  </span>
                )}
                {!status?.completed && !isSpecial && (
                  <span className="lesson-arrow">›</span>
                )}
                {isSpecial && <span className="lesson-arrow">›</span>}
              </div>
            </button>
          )
        })}
      </div>

      <footer className="home-footer">
        <button className="reset-link" onClick={() => setShowReset(true)}>
          進捗をリセット
        </button>
      </footer>

      {showReset && (
        <div className="modal-overlay" onClick={() => setShowReset(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <p>すべての進捗をリセットしますか？</p>
            <div className="modal-btns">
              <button className="btn btn--secondary" onClick={() => setShowReset(false)}>キャンセル</button>
              <button className="btn btn--danger" onClick={() => { onReset(); setShowReset(false) }}>リセット</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
