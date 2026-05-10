'use client'

import { useState } from 'react'
import Portail       from '@/components/Portail'
import Hero          from '@/components/Hero'
import MotDeMyna     from '@/components/MotDeMyna'
import Parchemin     from '@/components/Parchemin'
import Reliques      from '@/components/Reliques'
import MotDeRosy     from '@/components/MotDeRosy'
import GoldDust      from '@/components/GoldDust'
import AudioAmbiance from '@/components/AudioAmbiance'

export default function VoilePage() {
  const [portailComplete, setPortailComplete] = useState(false)
  const [registered, setRegistered]           = useState(false)

  const handleSuccess = () => setRegistered(true)

  return (
    <>
      {/* Poussière d'or — canvas fixe sur toute la page */}
      <GoldDust />

      {/* Musique d'ambiance — bouton flottant bas-droite */}
      <AudioAmbiance />

      <main className="min-h-screen bg-eleynia-emerald-deep">
        {/* Acte 1 — animation d'entrée */}
        {!portailComplete && (
          <Portail onComplete={() => setPortailComplete(true)} />
        )}

        {/* Actes 2–6 */}
        {portailComplete && (
          <>
            {/* Acte 2 — Hero avec mini-formulaire intégré (above-the-fold) */}
            <Hero onSuccess={handleSuccess} registered={registered} />

            {/* Acte 3 — Message de Myna */}
            <MotDeMyna />

            {/* Acte 4 — Parchemin complet (skip si déjà inscrit via Hero) */}
            <Parchemin onSuccess={handleSuccess} registered={registered} />

            {/* Acte 5 — Reliques */}
            <Reliques registered={registered} />

            {/* Acte 6 — Mot de Rosy */}
            <MotDeRosy />
          </>
        )}
      </main>
    </>
  )
}
