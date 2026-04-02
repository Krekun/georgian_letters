import React from 'react'
import { VOCABULARY, CATEGORY_LABELS, CATEGORY_ORDER } from '../data/vocabulary.js'

export default function FinaleScreen({ onBack }) {
  const byCategory = CATEGORY_ORDER.map(cat => ({
    cat,
    label: CATEGORY_LABELS[cat],
    words: VOCABULARY.filter(v => v.category === cat),
  }))

  return (
    <div className="screen">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={onBack}>← ホーム</button>
        <span className="lesson-topbar-title">フィナーレ</span>
        <span />
      </div>

      <div className="vocab-intro-header finale-header">
        <div className="finale-celebration">🎉</div>
        <p className="vocab-intro-text">
          ジョージア文字33文字、全部マスターしました！<br />
          さあ、読んでみよう！
        </p>
      </div>

      <div className="vocab-list">
        {byCategory.map(({ cat, label, words }) => (
          <div key={cat} className="vocab-category">
            <h3 className="vocab-category-title">{label}</h3>
            {words.map((w, i) => (
              <div key={i} className="vocab-card vocab-card--finale">
                <span className="vocab-georgian">{w.georgian}</span>
                <span className="vocab-roman vocab-roman--hidden">{w.romanization}</span>
                <span className="vocab-japanese">{w.japanese}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="screen-footer">
        <button className="btn btn--primary btn--full" onClick={onBack}>
          ホームに戻る
        </button>
      </div>
    </div>
  )
}
