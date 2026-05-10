import { NextRequest, NextResponse } from 'next/server'

interface BrevoPayload {
  email: string
  attributes?: { PRENOM?: string }
  listIds: number[]
  tags: string[]
  updateEnabled: boolean
}

export async function POST(req: NextRequest) {
  let body: { email?: string; prenom?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID

  if (!apiKey || !listId) {
    console.error('[Voile API] Variables d\'environnement manquantes : BREVO_API_KEY ou BREVO_LIST_ID')
    return NextResponse.json(
      { error: 'Configuration serveur manquante. Contacte l\'administrateur.' },
      { status: 500 }
    )
  }

  const prenom = body.prenom?.trim() || undefined

  const payload: BrevoPayload = {
    email,
    attributes: prenom ? { PRENOM: prenom } : {},
    listIds: [parseInt(listId, 10)],
    tags: ['eleynia_voyageur_tome1'],
    updateEnabled: true,
  }

  let response: Response
  try {
    response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key':      apiKey,
        'Content-Type': 'application/json',
        Accept:         'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[Voile API] Erreur réseau Brevo :', err)
    return NextResponse.json(
      { error: 'Erreur de connexion au service d\'inscription.' },
      { status: 502 }
    )
  }

  // 201 = nouveau contact créé, 204 = contact existant mis à jour (updateEnabled)
  if (response.status === 201 || response.status === 204) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const errorBody = await response.json().catch(() => ({}))
  console.error('[Voile API] Erreur Brevo :', response.status, errorBody)
  return NextResponse.json(
    { error: 'Le pacte n\'a pas pu être scellé. Réessaie dans quelques instants.' },
    { status: 500 }
  )
}
