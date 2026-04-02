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
    if (guideChar) drawGuide(ctx, canvas.width, canvas.height)
  }, [guideChar])

  const drawGuide = (ctx, w, h) => {
    ctx.save()
    ctx.globalAlpha = 0.15
    ctx.fillStyle = '#000'
    ctx.font = `bold ${Math.min(w, h) * 0.7}px "Noto Sans Georgian", serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(guideChar, w / 2, h / 2)
    ctx.restore()
  }

  // Re-render guide when guideChar changes or canvas resizes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (guideChar) drawGuide(ctx, canvas.width, canvas.height)
  }, [guideChar])

  // Handle canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      // Save existing drawing
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      ctx.putImageData(imageData, 0, 0)
      if (guideChar) drawGuide(ctx, rect.width, rect.height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    // Initial size
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.getContext('2d').scale(dpr, dpr)
    if (guideChar) {
      drawGuide(canvas.getContext('2d'), rect.width, rect.height)
    }
    return () => observer.disconnect()
  }, [])

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    }
  }

  const startDraw = (e) => {
    if (disabled) return
    e.preventDefault()
    drawing.current = true
    const canvas = canvasRef.current
    lastPos.current = getPos(e, canvas)
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
