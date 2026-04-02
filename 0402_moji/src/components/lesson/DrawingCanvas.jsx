import React, { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'

const DrawingCanvas = forwardRef(function DrawingCanvas({ guideChar = null, disabled = false }, ref) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const lastPos = useRef(null)

  // Expose getImageData and clear to parent via ref
  useImperativeHandle(ref, () => ({
    getDataURL: () => canvasRef.current?.toDataURL() ?? null,
    clear: () => clearCanvas(),
    isEmpty: () => {
      const canvas = canvasRef.current
      if (!canvas) return true
      const ctx = canvas.getContext('2d')
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      return !data.some((v, i) => i % 4 === 3 && v > 0)
    },
  }), [])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (guideChar) drawGuide(ctx, canvas.width, canvas.height, guideChar)
  }, [guideChar])

  // Two-pass sizing: measure actual glyph bounds, scale to fit, then center precisely.
  const drawGuide = (ctx, w, h, char) => {
    const targetSize = Math.min(w, h) * 0.6
    // Pass 1: measure at target size
    ctx.font = `${targetSize}px "Noto Sans Georgian", serif`
    const m1 = ctx.measureText(char)
    const glyphW = (m1.actualBoundingBoxLeft ?? 0) + (m1.actualBoundingBoxRight ?? targetSize * 0.6)
    const glyphH = (m1.actualBoundingBoxAscent ?? targetSize * 0.7) + (m1.actualBoundingBoxDescent ?? targetSize * 0.1)
    // Scale down so the actual glyph fits within 60% of canvas
    const scaleW = (w * 0.6) / glyphW
    const scaleH = (h * 0.6) / glyphH
    const fontSize = targetSize * Math.min(scaleW, scaleH, 1)
    // Pass 2: measure at final font size
    ctx.font = `${fontSize}px "Noto Sans Georgian", serif`
    const m2 = ctx.measureText(char)
    const asc  = m2.actualBoundingBoxAscent  ?? fontSize * 0.7
    const desc = m2.actualBoundingBoxDescent ?? fontSize * 0.1
    const left = m2.actualBoundingBoxLeft    ?? 0
    const right= m2.actualBoundingBoxRight   ?? fontSize * 0.6
    // Center on actual glyph extents
    const x = (w - (left + right)) / 2 + left
    const y = (h - (asc + desc))   / 2 + asc
    ctx.save()
    ctx.globalAlpha = 0.12
    ctx.fillStyle = '#000'
    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'left'
    ctx.fillText(char, x - left, y)
    ctx.restore()
  }

  // Re-render guide when guideChar changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (guideChar) {
      const rect = canvas.getBoundingClientRect()
      drawGuide(ctx, rect.width, rect.height, guideChar)
    }
  }, [guideChar])

  // Handle canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      ctx.putImageData(imageData, 0, 0)
      if (guideChar) drawGuide(ctx, rect.width, rect.height, guideChar)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    // Initial size
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    if (guideChar) drawGuide(ctx, rect.width, rect.height, guideChar)
    return () => observer.disconnect()
  }, [])

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - rect.left, y: src.clientY - rect.top }
  }

  const startDraw = (e) => {
    if (disabled) return
    e.preventDefault()
    drawing.current = true
    lastPos.current = getPos(e, canvasRef.current)
  }

  const moveDraw = (e) => {
    if (!drawing.current || disabled) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 3.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const endDraw = (e) => {
    if (disabled) return
    e.preventDefault()
    drawing.current = false
    lastPos.current = null
  }

  return (
    <div className="canvas-wrap">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={startDraw}
        onMouseMove={moveDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={moveDraw}
        onTouchEnd={endDraw}
        style={{ touchAction: 'none', cursor: disabled ? 'default' : 'crosshair' }}
      />
      {!disabled && (
        <button className="clear-btn" onClick={clearCanvas} type="button">
          クリア
        </button>
      )}
    </div>
  )
})

export default DrawingCanvas
