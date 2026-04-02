import React from 'react'
import { LESSON_META } from '../../data/characters.js'

export default function ResultScreen({ results, lessonId, onRetry, onNext, onHome }) {
  const score = results.filter(r => r.ok).length
  const total = results.length
  const pct = Math.round((score / total) * 100)

  const isLastLesson = lessonId === 8
  const nextMeta = LESSON_META.find(l => l.id === lessonId + 1)

  return (
    <div className="mode-screen result-screen">
      <div className="result-score-block">
        <div className="result-score-circle" style={{ '--pct': pct }}>
          <span className="result-score-num">{score}<span className="result-score-denom">/{total}</span></span>
        </div>
        <p className="result-score-label">
          {pct === 100 ? '完璧！🎉' : pct >= 60 ? 'よくできました！' : 'もう少し練習しよう'}
        </p>
      </div>

      <div className="result-breakdown">
        {results.map((r, i) => (
          <div key={i} className={`result-row ${r.ok ? 'result-row--ok' : 'result-row--fail'}`}>
            <span className="result-char">{r.char.character}</span>
            <span className="result-roman">{r.char.romanization}</span>
            <span className="result-icon">{r.ok ? '○' : '✗'}</span>
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button className="btn btn--outline btn--full" onClick={onRetry}>
          もう一度 🔄
        </button>
        {!isLastLesson && nextMeta && (
          <button className="btn btn--primary btn--full" onClick={onNext}>
            {nextMeta.title}へ →
          </button>
        )}
        {isLastLesson && (
          <button className="btn btn--primary btn--full" onClick={onNext}>
            フィナーレへ 🎉
          </button>
        )}
        <button className="btn btn--secondary btn--full" onClick={onHome}>
          ホームへ
        </button>
      </div>
    </div>
  )
}
