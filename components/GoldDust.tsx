'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type PType = 'dust' | 'star'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  maxOpacity: number
  phase: number
  phaseSpeed: number
  color: string
  type: PType
}

const DUST_COLORS = ['#D4A24C', '#E8C57A', '#C89840', '#FFD97A', '#FFF0A0']
const STAR_COLORS = ['#FAF7F0', '#E8C57A', '#D4A24C', '#EDD89A', '#ffffff']

function rand(a: number, b: number) { return a + Math.random() * (b - a) }

function makeParticle(w: number, h: number, type: PType, scatter = false): Particle {
  const isStar = type === 'star'
  return {
    x:          Math.random() * w,
    y:          isStar ? Math.random() * h : (scatter ? Math.random() * h : h + rand(0, 60)),
    vx:         isStar ? (Math.random() - 0.5) * 0.06 : (Math.random() - 0.5) * 0.22,
    vy:         isStar ? (Math.random() - 0.5) * 0.06 : -rand(0.18, 0.52),
    size:       isStar ? rand(0.8, 2.1) : rand(0.4, 1.7),
    maxOpacity: isStar ? rand(0.12, 0.5) : rand(0.35, 0.8),
    phase:      Math.random() * Math.PI * 2,
    phaseSpeed: isStar ? rand(0.005, 0.018) : rand(0.014, 0.038),
    color:      (isStar ? STAR_COLORS : DUST_COLORS)[Math.floor(Math.random() * 5)],
    type,
  }
}

export default function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersRM = useReducedMotion()
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    if (prefersRM) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const mobile     = window.innerWidth < 768
    const dustCount  = mobile ? 40 : 70
    const starCount  = mobile ? 25 : 45

    const particles: Particle[] = [
      ...Array.from({ length: dustCount }, () => makeParticle(canvas.width, canvas.height, 'dust', true)),
      ...Array.from({ length: starCount }, () => makeParticle(canvas.width, canvas.height, 'star', true)),
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.phase += p.phaseSpeed
        const tw  = (Math.sin(p.phase) + 1) / 2
        const alpha = p.maxOpacity * (0.22 + 0.78 * tw)

        p.x += p.vx
        p.y += p.vy

        if (p.type === 'dust') {
          p.vx += (Math.random() - 0.5) * 0.007
          if (p.y < -10) Object.assign(p, makeParticle(canvas.width, canvas.height, 'dust'))
        } else {
          if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        }

        ctx.save()
        ctx.globalAlpha  = alpha
        ctx.fillStyle    = p.color
        if (p.size > 1.1) {
          ctx.shadowBlur  = p.size * 6
          ctx.shadowColor = p.color
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Petite croix lumineuse sur les grandes étoiles
        if (p.type === 'star' && p.size > 1.5 && alpha > p.maxOpacity * 0.6) {
          ctx.strokeStyle = p.color
          ctx.lineWidth   = 0.5
          ctx.globalAlpha = alpha * 0.6
          const r = p.size * 2.5
          ctx.beginPath()
          ctx.moveTo(p.x - r, p.y); ctx.lineTo(p.x + r, p.y)
          ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x, p.y + r)
          ctx.stroke()
        }
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [prefersRM])

  if (prefersRM) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 45, mixBlendMode: 'screen', opacity: 0.72 }}
      aria-hidden="true"
    />
  )
}
