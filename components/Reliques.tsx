'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Relique {
  id:          string
  titre:       string
  description: string
  image:       string
  imageAlt:    string
  ornament:    string
  bgImage:     string
}

const reliques: Relique[] = [
  {
    id:          'codex',
    titre:       "Le Codex Illustré",
    description: "Huit illustrations originales d'Eleynia à colorier. Les Totems sacrés. Les Sept Royaumes. La Forêt Éternelle. Pour les longues soirées où tu veux replonger sans relire.",
    image:       '/assets/totems/MynaSacree.png',
    imageAlt:    "Myna, totem illustré du Codex d'Eleynia",
    ornament:    'I',
    bgImage:     '/assets/royaumes/ailenthys.jpeg',
  },
  {
    id:          'carte',
    titre:       "La Carte Vivante d'Eleynia",
    description: "Explore chaque royaume. Découvre leurs capitales, leurs dieux, leurs créatures. Une carte qui murmure ses légendes à ceux qui savent écouter.",
    image:       '/assets/totems/Valorith.png',
    imageAlt:    "Valorith, totem des territoires d'Eleynia",
    ornament:    'II',
    bgImage:     '/assets/royaumes/ondaline.jpeg',
  },
  {
    id:          'bestiaire',
    titre:       "Le Bestiaire d'Eleynia",
    description: "Tous les totems. Toutes les créatures. Tous les mystères du monde derrière le Voile, illustrés et racontés.",
    image:       '/assets/totems/Pyralis.png',
    imageAlt:    "Pyralis, créature du bestiaire d'Eleynia",
    ornament:    'III',
    bgImage:     '/assets/royaumes/sylvania.jpg',
  },
  {
    id:          'tome2',
    titre:       "L'Aube qui vient",
    description: "Les trois premiers chapitres du Tome 2 — disponibles uniquement pour celles et ceux qui ont franchi le Voile. Tu seras parmi les premiers à les recevoir.",
    image:       '/assets/totems/Brimor.png',
    imageAlt:    'Brimor, totem annonciateur du Tome 2',
    ornament:    'IV',
    bgImage:     '/assets/royaumes/nyxor.jpg',
  },
]

interface ReliquesProps {
  registered: boolean
}

export default function Reliques({ registered: _registered }: ReliquesProps) {
  return (
    <section
      aria-label="La Salle des Reliques"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Image de fond : sept clans / scène épique */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/scenes/sept_clans.jpeg"
          alt=""
          fill
          className="object-cover object-top opacity-20"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,10,20,0.92) 0%, rgba(8,18,28,0.85) 50%, rgba(5,10,20,0.95) 100%)',
          }}
        />
      </div>

      {/* Particules de lumière dorée */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 50% 20%, rgba(212,162,76,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="ornament-separator w-20 inline-block" />
            <svg width="26" height="26" viewBox="0 0 26 26" className="text-eleynia-gold/55" fill="currentColor">
              <path d="M13 1 L15 9 L23 7 L17.5 13 L23 19 L15 17 L13 25 L11 17 L3 19 L8.5 13 L3 7 L11 9 Z"/>
            </svg>
            <span className="ornament-separator w-20 inline-block" />
          </div>
          <h2 className="font-display text-h2 text-eleynia-gold tracking-widest uppercase mb-4">
            La Salle des Reliques
          </h2>
          <p className="font-subtitle italic text-white-glow/90 max-w-lg mx-auto" style={{ fontSize: '1.18rem', lineHeight: '1.85' }}>
            Les bonus réservés aux voyageurs d&apos;Eleynia.
          </p>
          <p className="font-display text-caption text-eleynia-gold/60 tracking-[0.2em] uppercase mt-3 max-w-lg mx-auto">
            Des fragments gardés pour toi — ils arrivent.
          </p>
        </motion.div>

        {/* Grille */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {reliques.map((r) => <ReliqueCarte key={r.id} relique={r} />)}
        </motion.div>

      </div>
    </section>
  )
}

function ReliqueCarte({ relique }: { relique: Relique }) {
  return (
    <motion.article
      variants={{
        hidden:   { opacity: 0, y: 28 },
        visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
      }}
      className="relative rounded-lg overflow-hidden group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #112518 0%, #0C1E13 100%)',
        border:    '1px solid rgba(212,162,76,0.35)',
        boxShadow: '0 4px 28px rgba(0,0,0,0.5)',
      }}
      whileHover={{
        boxShadow: '0 10px 56px rgba(212,162,76,0.22), 0 0 0 1px rgba(212,162,76,0.45)',
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Image de fond du royaume */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={relique.bgImage}
          alt=""
          fill
          className="object-cover object-center opacity-20 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(12,26,18,0.92) 0%, rgba(14,42,31,0.88) 60%, rgba(8,18,12,0.95) 100%)',
          }}
        />
      </div>

      {/* Numéro ornement */}
      <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded z-10"
        style={{ border: '1px solid rgba(212,162,76,0.3)' }}
        aria-hidden="true">
        <span className="font-display text-caption text-eleynia-gold/55 tracking-widest">{relique.ornament}</span>
      </div>

      <div className="relative z-10 flex gap-4 p-5 pl-14">
        {/* Image totem */}
        <div className="shrink-0 w-16 flex items-center justify-center" aria-hidden="true">
          <Image
            src={relique.image}
            alt={relique.imageAlt}
            width={60}
            height={80}
            className="object-contain opacity-72 group-hover:opacity-95 transition-all duration-400"
            style={{ filter: 'drop-shadow(0 0 14px rgba(212,162,76,0.38)) sepia(10%) brightness(1.05)' }}
          />
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-small text-eleynia-gold tracking-wider uppercase mb-2" style={{ textShadow: '0 0 14px rgba(212,162,76,0.5)', fontSize: '0.82rem' }}>
            {relique.titre}
          </h3>
          <p className="font-body text-small text-white-glow/88 leading-relaxed mb-3" style={{ lineHeight: '1.8' }}>
            {relique.description}
          </p>

        </div>
      </div>
    </motion.article>
  )
}
