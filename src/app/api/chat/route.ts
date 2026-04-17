import { NextRequest, NextResponse } from 'next/server'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

const SYSTEM_PROMPT = `You are Fundi, an AI financial assistant built into Fundelstock — a real-time market news platform for fundamental traders.

You help users with:
- Stock market questions (sectors, indices, ETFs, individual stocks)
- Financial concepts (P/E ratio, earnings, dividends, market cap, etc.)
- Economic indicators (interest rates, inflation, GDP, unemployment)
- Market news context and what it means for traders
- Investment strategies and terminology (fundamental analysis, technical analysis, etc.)
- Global markets (US, Europe, Asia)

Rules:
- Always clarify you are NOT a licensed financial advisor and nothing you say is financial advice
- Be concise but thorough — aim for 2-4 sentences per answer unless the question needs more detail
- Use plain language, avoid jargon unless the user uses it first
- If asked about a specific stock price or live data, explain you don't have real-time prices but can discuss the company fundamentals
- Be friendly and professional`

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'AI not configured' }, { status: 503 })
  }

  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const messages = body.messages ?? []
  if (!messages.length) {
    return NextResponse.json({ error: 'No messages' }, { status: 400 })
  }

  // Strip initial greeting (first assistant msg) and sanitize, ensure user/model alternation
  const safeMessages = messages
    .slice(-10)
    .filter((m, i) => !(i === 0 && m.role === 'assistant'))
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content).slice(0, 1000) }],
    }))
    .filter((m, i, arr) => i === 0 ? m.role === 'user' : m.role !== arr[i - 1].role)

  if (!safeMessages.length) {
    return NextResponse.json({ reply: 'Please type a question.' })
  }

  try {
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Understood. I am Fundi, your AI market assistant.' }] },
      ...safeMessages,
    ]

    const res = await fetch(`${GEMINI_URL}?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Gemini error:', err)
      const status = res.status
      if (status === 400) return NextResponse.json({ reply: 'Invalid request. Please try rephrasing.' })
      if (status === 403 || status === 401) return NextResponse.json({ reply: 'AI service not authorized. Please check the API key in Vercel environment variables.' })
      if (status === 429) return NextResponse.json({ reply: 'Too many requests. Please wait a moment and try again.' })
      return NextResponse.json({ reply: 'AI service temporarily unavailable. Please try again shortly.' })
    }

    const data = await res.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'I could not generate a response. Please try again.'

    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error('Chat error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
