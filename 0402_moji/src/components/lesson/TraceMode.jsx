import React, { useRef } from 'react'
import DrawingCanvas from './DrawingCanvas.jsx'

export default function TraceMode({ char, index, total, onNext, onUpdateCharacter }) {
  const canvasRef = useRef(null)

  const handleNext = () => {
    onUpdateCharacter(char.character, { traced: true })
    canvasRef.current?.clear()
    onNext()
  }

  return (
    <div className="mode-screen">
      <div className="mode-header">
        <div className="char-info">
          <span className="romanization">{char.romanization}</span>
          <span className="char-type-badge">{char.type === 'vowel' ? '母音' : '子音'}</span>
        </div>
        <span className="progress-indicator">{index + 1} / {total}</span>
      </div>

      <p className="mode-instruction">お手本の文字をなぞってみよう</p>

      <div className="canvas-container">
        <DrawingCanvas ref={canvasRef} guideChar={char.character} />
      </div>

      <button className="btn btn--primary btn--full" onClick={handleNext}>
        {index + 1 < total ? '次へ →' : '書き取りへ →'}
      </button>
    </div>
  )
}
