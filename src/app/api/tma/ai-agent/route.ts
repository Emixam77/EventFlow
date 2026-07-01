import { openai, HOSPITALITY_SYSTEM_PROMPT } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { artiste, retard_minutes, vol_reference } = body;

  if (!artiste || retard_minutes === undefined) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
  }

  const userMessage = `
Artiste : ${artiste.nom}
Vol référence : ${vol_reference}
Retard confirmé : ${retard_minutes} minutes
Heure de balances prévue : ${artiste.heure_balances}
Heure de show : ${artiste.heure_show}

Analyse l'impact et propose 2 plans de secours.
  `.trim();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: HOSPITALITY_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 600,
  });

  const raw = completion.choices[0].message.content ?? '{}';
  const report = JSON.parse(raw);

  return NextResponse.json(report);
}
