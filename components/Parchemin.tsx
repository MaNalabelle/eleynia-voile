'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface ParcheminProps {
  onSuccess:  () => void
  registered: boolean
}

// Petites étincelles autour du bouton CTA
function CtaSparkles({ active }: { active: boolean }) {
  const prefersRM = useReducedMotion()
  if (prefersRM || !active) return null
  const sparks = [
    { top: '-12px', left: '15%',  delay: 0 },
    { top: '-14px', left: '50%',  delay: 0.4 },
    { top: '-10px', left: '80%',  delay: 0.8 },
    { top: '50%',   left: '-14px', delay: 0.2 },
    { top: '50%',   right: '-14px', delay: 0.6 },
    { bottom: '-12px', left: '25%', delay: 1.0 },
    { bottom: '-12px', left: '70%', delay: 0.3 },
  ]
  return (
    <>
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-eleynia-gold-light pointer-events-none"
          style={{ ...s } as React.CSSProperties}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: 1.8, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

export default function Parchemin({ onSuccess, registered }: ParcheminProps) {
  const [email, setEmail]   = useState('')
  const [prenom, setPrenom] = useState('')
  const [status, setStatus] = useState<FormStatus>(registered ? 'success' : 'idle')
  const [errMsg, setErrMsg] = useState('')
  const [ctaHovered, setCtaHovered] = useState(false)

  useEffect(() => { if (registered) setStatus('success') }, [registered])

  const sectionRef   = useRef<HTMLElement>(null)
  const prefersRM    = useReducedMotion()
  const inView       = useInView(sectionRef, { once: true, margin: '-80px' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting' || status === 'success') return
    setStatus('submitting'); setErrMsg('')
    try {
      const res  = await fetch('/api/voile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prenom: prenom || undefined }),
      })
      const data = await res.json()
      if (res.ok && data.success) { setStatus('success'); onSuccess() }
      else { setStatus('error'); setErrMsg(data.error || 'Le Voile résiste. Réessaie.') }
    } catch { setStatus('error'); setErrMsg("Impossible de joindre le Voile pour l'instant.") }
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Grave ton nom dans le Codex des Voyageurs"
      className="relative py-28 px-6 overflow-hidden bg-eleynia-emerald-deep"
    >
      {/* Lueur centrale dorée */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(212,162,76,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-h2 text-eleynia-gold tracking-widest uppercase mb-12">
            Inscris ton nom dans le Codex
          </h2>
        </motion.div>

        {/* ── Parchemin ── */}
        <motion.div
          initial={{ scaleY: prefersRM ? 1 : 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="overflow-hidden"
        >
          <div className="relative rounded-lg px-10 py-12 text-left"
            style={{
              background: 'linear-gradient(160deg, #0F2D1E 0%, #0B2016 100%)',
              border: '1.5px solid rgba(212,162,76,0.55)',
              boxShadow: '0 0 0 1px rgba(212,162,76,0.08), 0 8px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(212,162,76,0.18)',
            }}
          >
            {/* Coins ornementaux */}
            {[
              'top-3 left-3',
              'top-3 right-3 rotate-90',
              'bottom-3 right-3 rotate-180',
              'bottom-3 left-3 -rotate-90',
            ].map((cls, i) => (
              <div key={i} className={`absolute ${cls} w-7 h-7`} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 2 2 L 2 12 M 2 2 L 12 2" stroke="rgba(212,162,76,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            ))}

            {status !== 'success' ? (
              <form onSubmit={handleSubmit} noValidate>

                {/* Champ prénom */}
                <div className="mb-8">
                  <label htmlFor="prenom" className="block font-display text-caption text-eleynia-gold/70 tracking-widest uppercase mb-3">
                    Comment dois-je t&apos;appeler ?
                    <span className="font-body normal-case tracking-normal ml-2 text-parchment/40 text-xs">(optionnel)</span>
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Ton prénom..."
                    autoComplete="given-name"
                    disabled={status === 'submitting'}
                    maxLength={50}
                    className="input-voile"
                  />
                </div>

                {/* Champ email */}
                <div className="mb-10">
                  <label htmlFor="email" className="block font-display text-caption text-eleynia-gold/70 tracking-widest uppercase mb-3">
                    Où t&apos;envoyer la magie ?
                    <span className="text-eleynia-gold ml-1 text-xs" aria-hidden="true">✦</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton.email@exemple.com"
                    autoComplete="email"
                    required
                    disabled={status === 'submitting'}
                    className="input-voile"
                  />
                </div>

                {/* Animation plume au submit */}
                {status === 'submitting' && (
                  <div className="mb-6 flex justify-center" aria-hidden="true">
                    <svg viewBox="0 0 180 36" width="180" height="36">
                      <motion.path
                        d="M 5,28 C 35,8 65,32 95,12 C 125,0 150,22 175,16"
                        fill="none" stroke="rgba(212,162,76,0.7)" strokeWidth="1.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </div>
                )}

                {/* ── CTA — bouton magique ── */}
                <div className="text-center">
                  <div className="relative inline-block">
                    {/* Anneau de glow pulsant */}
                    <motion.span
                      className="absolute -inset-2 rounded-lg pointer-events-none"
                      animate={ctaHovered && !prefersRM
                        ? { boxShadow: ['0 0 0px rgba(212,162,76,0)', '0 0 28px rgba(212,162,76,0.6)', '0 0 0px rgba(212,162,76,0)'] }
                        : { boxShadow: ['0 0 0px rgba(212,162,76,0)', '0 0 16px rgba(212,162,76,0.3)', '0 0 0px rgba(212,162,76,0)'] }
                      }
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                    {/* Étincelles */}
                    <CtaSparkles active={ctaHovered} />

                    <motion.button
                      type="submit"
                      disabled={status === 'submitting' || !email}
                      onMouseEnter={() => setCtaHovered(true)}
                      onMouseLeave={() => setCtaHovered(false)}
                      className="relative px-10 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden font-display tracking-widest uppercase inline-flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        fontSize: '1rem',
                        letterSpacing: '0.18em',
                        background: 'linear-gradient(135deg, #C4922A 0%, #E8C57A 50%, #C4922A 100%)',
                        backgroundSize: '200% auto',
                        color: '#0B0F0C',
                        border: '1.5px solid rgba(232,197,122,0.85)',
                        boxShadow: '0 0 24px rgba(212,162,76,0.5), 0 4px 20px rgba(0,0,0,0.5)',
                        textShadow: 'none',
                      }}
                      whileHover={prefersRM ? {} : { scale: 1.04, boxShadow: '0 0 48px rgba(212,162,76,0.8), 0 6px 28px rgba(0,0,0,0.6)' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shimmer sweep */}
                      {!prefersRM && (
                        <motion.span
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">
                        {status === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-ink/40 border-t-ink rounded-full animate-spin" />
                            Envoi en cours…
                          </span>
                        ) : '✦ Recevoir les reliques'}
                      </span>
                    </motion.button>
                  </div>

                  <p className="font-display text-parchment/55 tracking-[0.12em] mt-5 leading-relaxed" style={{ fontSize: '0.74rem' }}>
                    Aucun spam. Seulement les secrets, cartes<br />
                    et fragments oubliés d&apos;Eleynia.
                  </p>

                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-4 font-body text-small text-red-400" role="alert">
                      {errMsg}
                    </motion.p>
                  )}
                </div>
              </form>
            ) : (
              /* Succès — sceau de cire */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="mx-auto w-20 h-20 flex items-center justify-center rounded-full mb-6 animate-seal-glow"
                  style={{ background: 'radial-gradient(circle at 40% 35%, #2a6b45, #0E2A1F)', boxShadow: '0 0 24px rgba(30,94,63,0.7)' }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                    <path d="M24 6 L28 18 L40 14 L32 24 L40 34 L28 30 L24 42 L20 30 L8 34 L16 24 L8 14 L20 18 Z" fill="#D4A24C" opacity="0.9"/>
                  </svg>
                </motion.div>
                <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="font-display text-h3 text-eleynia-gold tracking-widest uppercase mb-3">
                  Le pacte est scellé.
                </motion.h3>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                  className="font-subtitle italic text-body-lg text-parchment/80">
                  {prenom ? `Bienvenue, ${prenom}. Eleynia saura te trouver.` : 'Eleynia saura te trouver. Le Voile veille.'}
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
