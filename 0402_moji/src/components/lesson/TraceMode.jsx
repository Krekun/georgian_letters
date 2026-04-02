import React, { useRef, useState, useEffect } from 'react'
import DrawingCanvas from './DrawingCanvas.jsx'

export default function TraceMode({ char, index, total, onNext, onUpdateCharacter }) {
  const canvasRef = useRef(null)
  const [showGuide, setShowGuide] = useState(true)

  // Reset guide visibility when the character changes
  useEffect(() => {
    setShowGuide(true)
  }, [char])

  const handleNext = () => {
    onUpdateCharacter(char.character, { traced: true })
    canvasRef.current?.clear()
    onNext()
  }

  // Highlight the target character within the example word
  const renderWordWithHighlight = (word, targetChar) => {
    return word.split('').map((ch, i) =>
      ch === targetChar
        ? <mark key={i} className="example-highlight">{ch}</mark>
        : <span key={i}>{ch}</span>
    )
  }

  return (
    <div className="mode-screen">
      <div className="mode-header">
        <div className="char-info">
          <span className="romanization">{char.romanization}</span>
          <span className="char-type-badge">{char.type === 'vowel' ? '母音' : '子音'}</span>
        </div>
        <div className="mode-header-right">
          <button
            className={`guide-toggle ${showGuide ? 'guide-toggle--on' : 'guide-toggle--off'}`}
            onClick={() => setShowGuide(v => !v)}
            type="button"
          >
            お手本 {showGuide ? 'ON' : 'OFF'}
          </button>
          <span className="progress-indicator">{index + 1} / {total}</span>
        </div>
      </div>

      {char.example && (
        <div className="example-card">
          <span className="example-word">
            {renderWordWithHighlight(char.example.word, char.character)}
          </span>
          <span className="example-arrow">→</span>
          <span className="example-meaning">{char.example.meaning}</span>
        </div>
      )}

      <p className="mode-instruction">お手本の文字をなぞってみよう</p>

      <div className="canvas-container">
        <DrawingCanvas ref={canvasRef} guideChar={showGuide ? char.character : null} />
      </div>

      <button className="btn btn--primary btn--full" onClick={handleNext}>
        {index + 1 < total ? '次へ →' : '書き取りへ →'}
      </button>
    </div>
  )
}
