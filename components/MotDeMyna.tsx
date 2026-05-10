'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const paragraphes = [
  `Tu es revenu·e.`,
  `Je le savais. Il y a quelque chose dans ton regard qui n'était pas là quand tu as ouvert le livre — une lumière qu'Eleynia a allumée et que rien ne pourra éteindre.`,
  `Avant que tu ne reparte dans ton monde, je veux te confier des choses. Des fragments d'Eleynia que peu de mortels ont vus. Des dessins, des cartes, des secrets que les Sept Royaumes gardaient pour ceux qui sauraient écouter.`,
  `Pour les recevoir, donne-moi simplement où t'écrire.\nLe Voile fera le reste.`,
]

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
}

const runePositions = [
  { top: '8%',  left: '12%',  size: 14, delay: 0,    duration: 4.2 },
  { top: '22%', left: '4%',   size: 10, delay: 1.1,  duration: 5.5 },
  { top: '60%', left: '8%',   size: 12, delay: 0.6,  duration: 4.8 },
  { top: '80%', left: '18%',  size: 9,  delay: 1.8,  duration: 6.0 },
  { top: '5%',  right: '14%', size: 11, delay: 0.3,  duration: 5.1 },
  { top: '40%', right: '6%',  size: 13, delay: 1.4,  duration: 4.5 },
  { top: '72%', right: '10%', size: 10, delay: 0.9,  duration: 5.8 },
]

function RuneSymbol({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M19 5 L5 19" stroke="#D4A24C" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}

function FloatingRunes() {
  const prefersRM = useReducedMotion()
  if (prefersRM) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {runePositions.map((r, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: r.top, left: (r as { left?: string }).left, right: (r as { right?: string }).right }}
          animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -8, 0], rotate: [0, 15, 0] }}
          transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RuneSymbol size={r.size} />
        </motion.div>
      ))}
    </div>
  )
}

export default function MotDeMyna() {
  const prefersRM = useReducedMotion()

  return (
    <section
      aria-label="Le message de Myna"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Image de fond : forêt de Miralyn */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/royaumes/miralyn.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(8,24,14,0.88) 0%, rgba(18,42,28,0.82) 50%, rgba(8,24,14,0.92) 100%)',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ boxShadow: 'inset 0 0 120px rgba(5,15,9,0.6)' }}
      />

      {/* Runes flottantes */}
      <FloatingRunes />

      {/* Séparateur supérieur */}
      <div className="relative z-10 flex items-center justify-center gap-5 mb-14" aria-hidden="true">
        <span className="ornament-separator flex-1 max-w-[180px]" />
        <svg width="28" height="28" viewBox="0 0 28 28" className="text-eleynia-gold/55 shrink-0" fill="currentColor">
          <path d="M14 2 C14 2 10 9 2 12 C10 15 14 23 14 28 C14 23 18 15 26 12 C18 9 14 2 14 2Z" opacity="0.8"/>
        </svg>
        <span className="ornament-separator flex-1 max-w-[180px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Visuel Myna avec effets magiques */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 md:w-[280px]"
          >
            <div className="relative mx-auto w-fit">
              {/* Halo extérieur pulsant */}
              {!prefersRM && (
                <motion.div
                  aria-hidden="true"
                  className="absolute -inset-8 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(212,162,76,0.18) 0%, transparent 65%)' }}
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Anneau doré rotatif */}
              {!prefersRM && (
                <motion.div
                  aria-hidden="true"
                  className="absolute -inset-5 rounded-full pointer-events-none"
                  style={{ border: '1px solid rgba(212,162,76,0.25)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {[0, 90, 180, 270].map((deg, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-eleynia-gold/50"
                      style={{
                        top: '50%', left: '50%',
                        transform: `rotate(${deg}deg) translateX(calc(50% + 2.5rem)) translateY(-50%)`,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Halo intérieur doré fixe */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,162,76,0.12) 0%, transparent 70%)' }}
              />

              <Image
                src="/assets/totems/MynaSacree.png"
                alt="Myna, le faucon-totem sacré d'Eleynia à quatre queues dorées"
                width={280}
                height={350}
                className="relative z-10 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(212,162,76,0.45)) drop-shadow(0 6px 24px rgba(0,0,0,0.7)) brightness(1.05)',
                }}
              />

              {/* Particules lumineuses autour de Myna */}
              {!prefersRM && (
                <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
                  {[
                    { top: '10%',  left: '5%',  delay: 0 },
                    { top: '25%',  right: '2%', delay: 0.8 },
                    { top: '55%',  left: '0%',  delay: 1.5 },
                    { top: '75%',  right: '8%', delay: 0.4 },
                    { top: '5%',   right: '20%', delay: 1.2 },
                  ].map((p, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-eleynia-gold-light"
                      style={p as React.CSSProperties}
                      animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.6, 0.5], y: [0, -12, 0] }}
                      transition={{ duration: 2.8, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex-1 text-left"
          >
            <motion.h2 variants={itemVariants} className="font-display text-h2 text-eleynia-gold tracking-widest uppercase mb-7">
              Myna t&apos;a vu·e.
            </motion.h2>

            <div className="space-y-6">
              {paragraphes.map((para, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className="font-subtitle italic text-white-glow/95"
                  style={{
                    fontSize:   i === 0 ? '1.5rem' : '1.22rem',
                    lineHeight: '1.95',
                    textShadow: '0 1px 5px rgba(0,0,0,0.75)',
                  }}
                >
                  {para.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </motion.p>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-9">
              <span className="font-subtitle italic text-eleynia-gold/55 text-small tracking-widest">— Myna</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Séparateur inférieur */}
      <div className="relative z-10 flex items-center justify-center gap-5 mt-14" aria-hidden="true">
        <span className="ornament-separator flex-1 max-w-[180px]" />
        <svg width="18" height="18" viewBox="0 0 18 18" className="text-eleynia-gold/35 shrink-0" fill="currentColor">
          <circle cx="9" cy="9" r="2.5" /><circle cx="9" cy="3" r="1.5" /><circle cx="9" cy="15" r="1.5" />
          <circle cx="3" cy="9" r="1.5" /><circle cx="15" cy="9" r="1.5" />
        </svg>
        <span className="ornament-separator flex-1 max-w-[180px]" />
      </div>
    </section>
  )
}
