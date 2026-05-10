import type { Metadata } from 'next'
import { cinzel, cormorant, lora } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: "Le Voile d'Eleynia — Pour celles et ceux qui ont franchi",
  description:
    "Tu viens de fermer le livre. Mais quelque chose t'a suivi de l'autre côté.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Le Voile d'Eleynia",
    description: "Cette page n'existe que pour toi.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${cormorant.variable} ${lora.variable}`}
    >
      <body className="bg-eleynia-emerald-deep text-white-glow antialiased">
        {children}
      </body>
    </html>
  )
}
