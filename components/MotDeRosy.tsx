'use client'

import { motion } from 'framer-motion'

const lettre = [
  `Si tu lis ces lignes, c'est que tu as voyage jusqu'a la derniere page. Et ca, c'est tout pour moi.`,
  `J'ai ecrit Eleynia pour celles et ceux qui ont garde une porte secrete quelque part en eux. Si tu en es arrive·e ici, c'est que ta porte ne s'est jamais vraiment fermee.`,
  `Si le livre t'a emu·e, le geste qui m'aiderait le plus : laisser un avis sur Amazon. Quelques mots. Honnetes. C'est grace a ca qu'Alan continuera a trouver d'autres lecteurs.`,
  `Et nous, on se retrouve au Tome 2.`,
]

// Versions avec accents pour l'affichage (JSX — pas de probleme d'encodage)
const lettreAffichage = [
  "Si tu lis ces lignes, c’est que tu as voyagé jusqu’à la dernière page. Et ça, c’est tout pour moi.",
  "J’ai écrit Eleynia pour celles et ceux qui ont gardé une porte secrète quelque part en eux. Si tu en es arrivé·e ici, c’est que ta porte ne s’est jamais vraiment fermée.",
  "Si le livre t’a ému·e, le geste qui m’aiderait le plus : laisser un avis sur Amazon. Quelques mots. Honnêtes. C’est grâce à ça qu’Alan continuera à trouver d’autres lecteurs.",
  "Et nous, on se retrouve au Tome 2.",
]

export default function MotDeRosy() {
  return (
    <section
      aria-label="Un dernier mot de Rosy Bloom"
      className="relative py-24 px-6 overflow-hidden surface-parchment"
    >
      {/* Filigrane superieur */}
      <div className="absolute top-0 left-0 right-0 h-px ornament-separator" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 right-0 flex justify-center pt-4 pointer-events-none"
        aria-hidden="true"
      >
        <OrnamentBorder />
      </div>

      {/* Lumieres laterales */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to right, rgba(212,162,76,0.06), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to left, rgba(212,162,76,0.06), transparent)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center pt-8">

        {/* Etiquette */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-ink tracking-[0.32em] uppercase mb-8"
          style={{ fontSize: '0.78rem', letterSpacing: '0.35em' }}
        >
          Un dernier mot
        </motion.p>

        {/* Lettre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-left space-y-5"
        >
          {lettreAffichage.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i }}
              className="font-body italic text-ink"
              style={{ fontSize: '1.18rem', lineHeight: '2.1', letterSpacing: '0.01em' }}
            >
              {para}
            </motion.p>
          ))}

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="font-subtitle italic text-ink pt-4"
            style={{ fontSize: '1.9rem' }}
          >
            &mdash; Rosy
          </motion.p>
        </motion.div>

        {/* CTA Amazon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-16"
        >
          {/* Remplacer ASIN_A_RENSEIGNER par l'ASIN Amazon reel du livre */}
          <a
            href="https://www.amazon.fr/review/create-review?&asin=B0G1LF61SY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-lg font-display text-small tracking-widest uppercase transition-all duration-300"
            style={{
              background:  'linear-gradient(135deg, #0E2A1F 0%, #1E5E3F 100%)',
              color:       '#D4A24C',
              border:      '1.5px solid rgba(212,162,76,0.65)',
              boxShadow:   '0 0 18px rgba(212,162,76,0.25), 0 4px 20px rgba(0,0,0,0.35)',
              textShadow:  '0 0 12px rgba(212,162,76,0.4)',
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 16 16"
              fill="#D4A24C"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M8 1 L9.5 5.5 L14 5.5 L10.5 8.5 L11.5 13 L8 10.5 L4.5 13 L5.5 8.5 L2 5.5 L6.5 5.5 Z" />
            </svg>
            Laisser un avis sur Amazon
          </a>
        </motion.div>

        {/* Separateur */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="my-12"
          aria-hidden="true"
        >
          <hr className="ornament-separator" />
        </motion.div>

        {/* Tagline finale */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <p className="font-display tracking-[0.18em] uppercase text-eleynia-gold"
            style={{ fontSize: '1.7rem', lineHeight: '1.7', textShadow: '0 0 24px rgba(212,162,76,0.45), 0 2px 4px rgba(0,0,0,0.25)' }}>
            Eleynia ne se lit pas.<br />
            Elle se vit.
          </p>
        </motion.div>

      </div>

      {/* Filigrane inferieur */}
      <div className="absolute bottom-0 left-0 right-0 h-px ornament-separator" aria-hidden="true" />
    </section>
  )
}

function OrnamentBorder() {
  return (
    <svg
      viewBox="0 0 400 40"
      width="400"
      height="40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-35"
      aria-hidden="true"
    >
      <path
        d="M 20 20 L 80 10 L 140 20 L 180 8 L 200 20 L 220 8 L 260 20 L 320 10 L 380 20"
        stroke="#D4A24C"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="200" cy="20" r="4" fill="#D4A24C" opacity="0.55" />
      <circle cx="80"  cy="10" r="2" fill="#D4A24C" opacity="0.4" />
      <circle cx="320" cy="10" r="2" fill="#D4A24C" opacity="0.4" />
    </svg>
  )
}
