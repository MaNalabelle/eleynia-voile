'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

interface Firefly {
  id: number; left: string; top: string
  dx1: number; dy1: number; dx2: number; dy2: number
  duration: number; size: number
}

function generateFireflies(count: number): Firefly[] {
  return Array.from({ length: count }, (_, i) => {
    const s1 = (i * 137.508 + 42.5) % 100
    const s2 = (i * 79.3   + 17.1) % 100
    const s3 = (i * 53.7   + 61.8) % 100
    return {
      id: i,
      left:     `${5 + (s1 * 0.9) % 90}%`,
      top:      `${10 + (s2 * 0.8) % 75}%`,
      dx1:      ((i * 31 + 7)  % 30) - 15,
      dy1:     -((i * 17 + 5)  % 25) - 5,
      dx2:      ((i * 43 + 13) % 28) - 14,
      dy2:     -((i * 23 + 9)  % 30) - 8,
      duration: 5 + (s3 * 0.04) % 5,
      size:     2.5 + (i % 3) * 0.75,
    }
  })
}

// ─── Scintilles autour du titre ──────────────────────────────────────────────
const TITLE_SPARKS = [
  { top: '-20px',    left: '6%',   delay: 0,    dur: 2.4, size: 11 },
  { top: '-24px',    left: '26%',  delay: 0.8,  dur: 3.0, size: 9  },
  { top: '-18px',    left: '50%',  delay: 1.4,  dur: 2.6, size: 14 },
  { top: '-22px',    left: '74%',  delay: 0.3,  dur: 2.2, size: 10 },
  { top: '-16px',    left: '93%',  delay: 1.0,  dur: 2.8, size: 8  },
  { top: '42%',      left: '-18px', delay: 0.6, dur: 2.5, size: 10 },
  { top: '42%',      right: '-16px', delay: 1.6, dur: 2.3, size: 9 },
  { bottom: '-18px', left: '14%',  delay: 1.1,  dur: 2.7, size: 9  },
  { bottom: '-22px', left: '56%',  delay: 0.2,  dur: 3.1, size: 13 },
  { bottom: '-16px', left: '84%',  delay: 0.9,  dur: 2.4, size: 8  },
] as const

function TitleSparkles() {
  const prefersRM = useReducedMotion()
  if (prefersRM) return null
  return (
    <>
      {TITLE_SPARKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-eleynia-gold-light pointer-events-none select-none"
          style={{ ...s, fontSize: s.size, lineHeight: 1 } as React.CSSProperties}
          animate={{ opacity: [0, 0.95, 0], scale: [0.3, 1.5, 0.3], rotate: [0, 90, 180] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      ))}
    </>
  )
}

function FirefliesLayer() {
  const prefersRM = useReducedMotion()
  const [fireflies, setFireflies] = useState<Firefly[]>([])
  useEffect(() => { if (!prefersRM) setFireflies(generateFireflies(10)) }, [prefersRM])
  if (prefersRM || fireflies.length === 0) return null
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full bg-eleynia-gold-light"
          style={{ left: f.left, top: f.top, width: f.size, height: f.size }}
          animate={{ x: [0, f.dx1, f.dx2, 0], y: [0, f.dy1, f.dy2, 0], opacity: [0.25, 0.85, 0.5, 0.25] }}
          transition={{ duration: f.duration, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }}
        />
      ))}
    </div>
  )
}

// ─── Mini-formulaire hero ─────────────────────────────────────────────────────
interface HeroFormProps {
  onSuccess: () => void
  registered: boolean
}

function HeroForm({ onSuccess, registered }: HeroFormProps) {
  const [email, setEmail]   = useState('')
  const [busy, setBusy]     = useState(false)
  const [done, setDone]     = useState(registered)
  const [error, setError]   = useState('')

  // Si déjà inscrit via Parchemin, montrer succès directement
  useEffect(() => { if (registered) setDone(true) }, [registered])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy || done || !email) return
    setBusy(true); setError('')
    try {
      const res  = await fetch('/api/voile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) { setDone(true); onSuccess() }
      else { setError(data.error || "Quelque chose s'est glissé dans le Voile…") }
    } catch { setError("Impossible de rejoindre le Voile pour l'instant.") }
    finally { setBusy(false) }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg"
          style={{ background: 'rgba(212,162,76,0.12)', border: '1px solid rgba(212,162,76,0.3)' }}>
          <span className="text-eleynia-gold text-lg">✦</span>
          <span className="font-display text-small text-eleynia-gold tracking-widest uppercase">
            Le pacte est scellé — Eleynia saura te trouver.
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="flex flex-col gap-3 w-full"
      noValidate
    >
      <label htmlFor="hero-email" className="sr-only">Ton adresse email</label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton.email@exemple.com"
        required
        autoComplete="email"
        disabled={busy}
        className="input-voile flex-1 text-sm"
        style={{ background: 'rgba(14,42,31,0.7)', backdropFilter: 'blur(8px)' }}
      />
      <button
        type="submit"
        disabled={busy || !email}
        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm px-6 py-3"
      >
        {busy ? (
          <span className="flex items-center gap-2">
                          <span className="w-3 h-3 border-2 border-ink/40 border-t-ink rounded-full animate-spin" />
            Un instant…
          </span>
        ) : '✦ Recevoir les reliques'}
      </button>
      {error && (
        <p className="sm:col-span-2 text-center font-body text-caption text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </motion.form>
  )
}

// ─── Hero principal ───────────────────────────────────────────────────────────
interface HeroProps {
  onSuccess: () => void
  registered: boolean
}

export default function Hero({ onSuccess, registered }: HeroProps) {
  const prefersRM = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: prefersRM ? 0 : 28 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
  })

  return (
    <section
      aria-label="Bienvenue dans Eleynia"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Image de fond : forêt nocturne ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/scenes/foret.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-35"
          priority
          sizes="100vw"
        />
        {/* Overlay dégradé sombre pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,15,9,0.82) 0%, rgba(14,42,31,0.70) 45%, rgba(5,15,9,0.92) 100%)',
          }}
        />
      </div>

      {/* Brume sol */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[-20%] right-[-20%] h-48 pointer-events-none animate-mist-drift"
        style={{
          background:
            'linear-gradient(to top, rgba(250,247,240,0.07) 0%, rgba(250,247,240,0.03) 50%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Lucioles */}
      <FirefliesLayer />

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">

        {/* Ornement */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
          <span className="ornament-separator w-16 inline-block" />
          <svg width="22" height="22" viewBox="0 0 22 22" className="text-eleynia-gold/65" fill="currentColor">
            <path d="M11 1 L13 8 L20 6 L15 11 L20 16 L13 14 L11 21 L9 14 L2 16 L7 11 L2 6 L9 8 Z" />
          </svg>
          <span className="ornament-separator w-16 inline-block" />
        </motion.div>

        {/* Titre — shimmer doré scintillant */}
        <div className="relative inline-block">
          <TitleSparkles />
          <motion.h1
            {...fadeUp(0.08)}
            className="font-display title-gold-shimmer tracking-widest uppercase"
            style={{ fontSize: 'clamp(1.9rem, 8vw, 5.2rem)', lineHeight: '1.1' }}
          >
            Tu as franchi<br />le Voile.
          </motion.h1>
        </div>

        {/* Sous-titre */}
        <motion.p {...fadeUp(0.22)} className="font-subtitle italic text-h3 text-parchment/88 mt-5">
          Eleynia te reconnaît.
        </motion.p>

        {/* Corps */}
        <motion.p
          {...fadeUp(0.36)}
          className="font-body text-white-glow/92 mt-6 max-w-[520px] mx-auto"
          style={{ fontSize: '1.15rem', lineHeight: '1.95', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
        >
          Tu viens de fermer le livre. Mais quelque chose t&apos;a suivi
          de l&apos;autre côté — un parfum de mousse, un battement d&apos;aile,
          une voix qui n&apos;a pas fini de murmurer.
        </motion.p>

        {/* Séparateur ornemental */}
        <motion.div {...fadeUp(0.46)} className="flex items-center justify-center gap-4 mt-8 mb-6 max-w-xs mx-auto" aria-hidden="true">
          <span className="ornament-separator flex-1" />
          <svg width="14" height="14" viewBox="0 0 14 14" className="text-eleynia-gold/50 shrink-0" fill="currentColor">
            <path d="M7 1 L8 5 L12 5 L9 7.5 L10 11.5 L7 9 L4 11.5 L5 7.5 L2 5 L6 5 Z" />
          </svg>
          <span className="ornament-separator flex-1" />
        </motion.div>

        <motion.p
          {...fadeUp(0.50)}
          className="font-subtitle italic text-eleynia-gold/85 mb-8"
          style={{ fontSize: '1.12rem', lineHeight: '1.8', textShadow: '0 0 18px rgba(212,162,76,0.35)' }}
        >
          Inscris ton nom dans le Codex pour recevoir<br />
          les reliques offertes aux voyageurs d&apos;Eleynia.
        </motion.p>

        {/* ── Mini-formulaire de capture — visible dès le premier viewport ── */}
        <div className="mb-2 w-full max-w-sm mx-auto">
          <HeroForm onSuccess={onSuccess} registered={registered} />
          <motion.p
            {...fadeUp(0.7)}
            className="font-body text-white-glow/55 mt-6 mb-4"
            style={{ fontSize: '0.88rem', lineHeight: '1.7', letterSpacing: '0.02em' }}
          >
            Aucun spam. Seulement les secrets, cartes et fragments oubliés d&apos;Eleynia.
          </motion.p>
        </div>

      </div>

      {/* Scroll indicator — flèche seule, sans texte */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 flex flex-col items-center gap-1 text-eleynia-gold/40"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersRM ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >↓</motion.div>
      </motion.div>
    </section>
  )
}
