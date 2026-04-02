import React, { useState } from 'react'
import { CHARACTERS } from '../data/characters.js'

export default function ChartScreen({ onBack }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="screen">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={onBack}>← ホーム</button>
        <span className="lesson-topbar-title">文字一覧表</span>
        <span />
      </div>

      <div className="chart-grid">
        {CHARACTERS.map((c) => (
          <button
            key={c.character}
            className="chart-cell"
            onClick={() => setSelected(c)}
          >
            <span className="chart-cell-char">{c.character}</span>
            <span className="chart-cell-roman">{c.romanization}</span>
            <span className={`chart-cell-type ${c.type === 'vowel' ? 'vowel' : 'consonant'}`}>
              {c.type === 'vowel' ? '母音' : '子音'}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal chart-modal" onClick={e => e.stopPropagation()}>
            <div className="chart-modal-char">{selected.character}</div>
            <div className="chart-modal-roman">{selected.romanization}</div>
            <div className={`chart-modal-type ${selected.type === 'vowel' ? 'vowel' : 'consonant'}`}>
              {selected.type === 'vowel' ? '母音' : '子音'}
            </div>
            <div className="chart-modal-lesson">レッスン {selected.lesson}</div>
            <button className="btn btn--secondary btn--full" onClick={() => setSelected(null)}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  )
}
