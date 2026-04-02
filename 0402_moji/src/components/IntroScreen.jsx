import React from 'react'
import { VOCABULARY, CATEGORY_LABELS, CATEGORY_ORDER } from '../data/vocabulary.js'

export default function IntroScreen({ onBack, onStartLesson }) {
  const byCategory = CATEGORY_ORDER.map(cat => ({
    cat,
    label: CATEGORY_LABELS[cat],
    words: VOCABULARY.filter(v => v.category === cat),
  }))

  return (
    <div className="screen">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={onBack}>← ホーム</button>
        <span className="lesson-topbar-title">イントロ</span>
        <span />
      </div>

      <div className="vocab-intro-header">
        <p className="vocab-intro-text">
          レッスンを終えると、これらが読めるようになります！
        </p>
      </div>

      <div className="vocab-list">
        {byCategory.map(({ cat, label, words }) => (
          <div key={cat} className="vocab-category">
            <h3 className="vocab-category-title">{label}</h3>
            {words.map((w, i) => (
              <div key={i} className="vocab-card">
                <span className="vocab-georgian">{w.georgian}</span>
                <span className="vocab-roman">{w.romanization}</span>
                <span className="vocab-japanese">{w.japanese}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--full" onClick={onStartLesson}>
          レッスン 1 を始める →
        </button>
      </div>
    </div>
  )
}
