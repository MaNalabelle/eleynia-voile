'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PortailProps {
  onComplete: () => void
}

// Etapes de l'animation
type Stage = 'black' | 'mist' | 'door' | 'light' | 'fade'

export default function Portail({ onComplete }: PortailProps) {
  const prefersReducedMotion = useReducedMotion()
  const [stage, setStage]   = useState<Stage>('black')
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    // Reduced motion : sauter immediatement
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const timers = [
      setTimeout(() => setStage('mist'),  100),   // brume : 100ms
      setTimeout(() => setStage('door'),  700),   // porte : 700ms
      setTimeout(() => setStage('light'), 1500),  // lumiere : 1500ms
      setTimeout(() => setStage('fade'),  2400),  // fondu sortie : 2400ms
      setTimeout(() => {
        setMounted(false)
        onComplete()
      }, 3200),                                   // terminer : 3200ms
    ]

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  const showMist  = stage !== 'black'
  const showDoor  = stage === 'door' || stage === 'light' || stage === 'fade'
  const showLight = stage === 'light' || stage === 'fade'
  const fadeOut   = stage === 'fade'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      role="presentation"
      aria-label="Ouverture du portail d'Eleynia"
    >
      {/* Bouton skip — sr-only, accessible au clavier */}
      <button
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-8 focus:left-1/2 focus:-translate-x-1/2 focus:z-[60] focus:px-6 focus:py-2 focus:bg-transparent focus:border focus:border-eleynia-gold/60 focus:text-eleynia-gold focus:font-display focus:text-caption focus:tracking-widest focus:uppercase focus:rounded-lg"
        onClick={() => { setMounted(false); onComplete() }}
        aria-label="Passer l'animation d'introduction"
      >
        Passer l&apos;introduction
      </button>

      {/* Couche 1 : brume argentee */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMist ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at center, rgba(190,200,220,0.25) 0%, rgba(120,140,170,0.1) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Couche 2 : porte ovale avec runes */}
      <motion.div
        className="relative z-10 pointer-events-none"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: showDoor ? 1 : 0.2, opacity: showDoor ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 320 420"
          width="320"
          height="420"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 48px rgba(212,162,76,0.55))' }}
        >
          <defs>
            <radialGradient id="glow-outer" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#E8C57A" stopOpacity="0.3" />
              <stop offset="60%"  stopColor="#D4A24C" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D4A24C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow-inner" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FAF7F0" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Remplissages lumineux */}
          <ellipse cx="160" cy="210" rx="130" ry="180" fill="url(#glow-outer)" />
          <ellipse cx="160" cy="210" rx="105" ry="150" fill="url(#glow-inner)" />

          {/* Contours de la porte */}
          <ellipse cx="160" cy="210" rx="130" ry="180" fill="none" stroke="#D4A24C" strokeWidth="1.5" opacity="0.85" />
          <ellipse cx="160" cy="210" rx="122" ry="170" fill="none" stroke="#E8C57A" strokeWidth="0.8" opacity="0.4" />

          {/* Runes aux 4 points cardinaux */}
          <g stroke="#E8C57A" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
            {/* Nord */}
            <line x1="160" y1="22" x2="160" y2="36" />
            <line x1="152" y1="29" x2="168" y2="29" />
            {/* Sud */}
            <line x1="160" y1="384" x2="160" y2="398" />
            <line x1="152" y1="391" x2="168" y2="391" />
            {/* Est */}
            <line x1="282" y1="210" x2="296" y2="210" />
            <line x1="289" y1="202" x2="289" y2="218" />
            {/* Ouest */}
            <line x1="24"  y1="210" x2="38"  y2="210" />
            <line x1="31"  y1="202" x2="31"  y2="218" />
          </g>

          {/* Ornements diagonaux */}
          <g stroke="#D4A24C" strokeWidth="1" opacity="0.55">
            <path d="M 82 72 L 90 64 L 98 72" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 222 72 L 230 64 L 238 72" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 82 348 L 90 356 L 98 348" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 222 348 L 230 356 L 238 348" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </motion.div>

      {/* Couche 3 : inondation de lumiere doree */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showLight ? 2.5 : 0, opacity: showLight ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at center, rgba(212,162,76,0.75) 0%, rgba(232,197,122,0.45) 30%, rgba(250,247,240,0.2) 60%, transparent 100%)',
          transformOrigin: 'center',
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
