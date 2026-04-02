import React, { useRef, useState, useEffect, useCallback } from 'react'
import DrawingCanvas from './DrawingCanvas.jsx'

// Renders a single Georgian character onto a canvas element and returns its data URL
function renderCharToDataURL(char, size = 300) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#C8102E'
  ctx.font = `bold ${size * 0.7}px "Noto Sans Georgian", serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, size / 2, size / 2)
  return canvas.toDataURL()
}

export default function WriteMode({ char, index, total, onResult, onUpdateCharacter }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('write') // 'write' | 'compare'
  const [userSnapshot, setUserSnapshot] = useState(null)
  const [answerURL, setAnswerURL] = useState(null)

  // Reset when char changes
  useEffect(() => {
    setPhase('write')
    setUserSnapshot(null)
    setAnswerURL(null)
  }, [char])

  const handleCheck = () => {
    const dataURL = canvasRef.current?.getDataURL()
    setUserSnapshot(dataURL)
    setAnswerURL(renderCharToDataURL(char.character))
    setPhase('compare')
  }

  const handleAssess = (ok) => {
    onUpdateCharacter(char.character, { ok })
    onResult(ok)
  }

  const handleRetry = () => {
    canvasRef.current?.clear()
    setPhase('write')
    setUserSnapshot(null)
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

      {phase === 'write' && (
        <>
          <p className="mode-instruction">ローマ字を見て文字を書いてみよう</p>
          <div className="canvas-container">
            <DrawingCanvas ref={canvasRef} guideChar={null} />
          </div>
          <button className="btn btn--primary btn--full" onClick={handleCheck}>
            答え合わせ →
          </button>
        </>
      )}

      {phase === 'compare' && (
        <>
          <p className="mode-instruction">どうだった？</p>
          <div className="compare-wrap">
            <div className="compare-side">
              <p className="compare-label">あなたの文字</p>
              <img src={userSnapshot} alt="your drawing" className="compare-img" />
            </div>
            <div className="compare-side">
              <p className="compare-label">お手本</p>
              <img src={answerURL} alt="correct character" className="compare-img" />
            </div>
          </div>
          <div className="assess-btns">
            <button className="btn btn--success btn--half" onClick={() => handleAssess(true)}>
              できた ✅
            </button>
            <button className="btn btn--outline btn--half" onClick={handleRetry}>
              もう一度 🔄
            </button>
          </div>
          <button className="btn btn--secondary btn--full assess-skip" onClick={() => handleAssess(false)}>
            次へスキップ
          </button>
        </>
      )}
    </div>
  )
}
