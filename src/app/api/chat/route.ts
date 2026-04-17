import { NextRequest, NextResponse } from 'next/server'

const MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
]

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

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

async function callGemini(model: string, contents: object[], key: string) {
  const url = `${BASE_URL}/${model}:generateContent?key=${key}`
  const res = await fetch(url, {
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
  return res
}

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

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am Fundi, your AI market assistant.' }] },
    ...safeMessages,
  ]

  // Try each model in order, fall back on 429 or 503
  for (const model of MODELS) {
    try {
      const res = await callGemini(model, contents, key)

      if (res.ok) {
        const data = await res.json()
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          'I could not generate a response. Please try again.'
        return NextResponse.json({ reply: text })
      }

      const status = res.status
      const errText = await res.text()
      console.error(`Gemini ${model} error ${status}:`, errText)

      if (status === 400) {
        return NextResponse.json({ reply: 'Invalid request. Please try rephrasing your question.' })
      }
      if (status === 401 || status === 403) {
        return NextResponse.json({ reply: 'AI service not authorized. Please check the API key in Vercel environment variables.' })
      }
      // 429, 404, or 5xx — try next model
      if (status === 429 || status === 404 || status >= 500) continue

      return NextResponse.json({ reply: `AI error (${status}). Please try again.` })
    } catch (err) {
      console.error(`Gemini ${model} fetch error:`, err)
      // Network error — try next model
      continue
    }
  }

  // All models exhausted
  return NextResponse.json({
    reply: 'The AI service is currently rate-limited. Please wait 1–2 minutes and try again. This is a free-tier API limit.',
  })
}
