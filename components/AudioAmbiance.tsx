'use client'

// Dépose ton fichier audio ici : public/assets/audio/ambiance.mp3
// Suggestion : musique orchestrale fantasy libre de droits (epic-score, musicbed, pixabay…)

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AudioAmbiance() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const audio = new Audio('/assets/audio/ambiance.mp3')
    audio.loop   = true
    audio.volume = 0.32
    audioRef.current = audio

    const show  = () => setVisible(true)
    const timer = setTimeout(show, 2800)
    window.addEventListener('scroll', show, { once: true })

    return () => {
      audio.pause()
      clearTimeout(timer)
      window.removeEventListener('scroll', show)
    }
  }, [])

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Fichier manquant ou autoplay bloqué — silence
      }
    }
  }

  if (!mounted) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 hidden md:block"
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={visible ? { opacity: 0.55, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={toggle}
        className="relative w-12 h-12 rounded-lg flex items-center justify-center group overflow-hidden"
        style={{
          background: playing
            ? 'radial-gradient(circle at 38% 32%, rgba(212,162,76,0.22) 0%, rgba(14,42,31,0.94) 65%)'
            : 'rgba(10,28,18,0.88)',
          border:         `1px solid rgba(212,162,76,${playing ? 0.6 : 0.22})`,
          backdropFilter: 'blur(14px)',
          boxShadow: playing
            ? '0 0 28px rgba(212,162,76,0.4), 0 4px 24px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.45)',
        }}
        aria-label={playing ? "Couper la musique d'ambiance" : "Activer la musique d'ambiance"}
        title={playing ? 'Couper la musique' : "Musique d'Eleynia"}
      >
        {/* Shimmer interne quand actif */}
        {playing && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, transparent 30%, rgba(212,162,76,0.18) 50%, transparent 70%)',
            }}
            animate={{ x: ['-120%', '180%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {/* Anneau pulsant */}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0px rgba(212,162,76,0)',
                '0 0 20px rgba(212,162,76,0.55)',
                '0 0 0px rgba(212,162,76,0)',
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}

        {/* Icône */}
        <span className="relative z-10">
          {playing ? <IconSpeaker /> : <IconMuted />}
        </span>

        {/* Tooltip */}
        <span
          className="absolute right-full mr-3 whitespace-nowrap font-display text-eleynia-gold/65 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ fontSize: '0.6rem' }}
          aria-hidden="true"
        >
          {playing ? 'Couper' : 'Ambiance'}
        </span>
      </button>

      {/* Barres sonores animées */}
      {playing && (
        <div className="absolute -top-1.5 -right-1.5 flex items-end gap-px pointer-events-none" aria-hidden="true">
          {[3, 5, 4, 7, 3, 5].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-eleynia-gold"
              style={{ height: h * 2.2 }}
              animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: 0.7 + i * 0.08,
                delay:    i * 0.09,
                repeat:   Infinity,
                ease:     'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function IconSpeaker() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="#D4A24C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 L6 9 H2 v6 h4 l5 4 V5z" fill="rgba(212,162,76,0.15)" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function IconMuted() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="rgba(212,162,76,0.42)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 L6 9 H2 v6 h4 l5 4 V5z" fill="rgba(212,162,76,0.05)" />
      <line x1="23" y1="9"  x2="17" y2="15" />
      <line x1="17" y1="9"  x2="23" y2="15" />
    </svg>
  )
}
