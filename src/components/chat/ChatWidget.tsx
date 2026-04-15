'use client'

import { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What is the Fear & Greed index?',
  'Explain P/E ratio',
  'What moves the S&P 500?',
  'What is quantitative easing?',
]

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm Fundi — your AI market assistant. Ask me anything about stocks, sectors, economic indicators, or financial concepts.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'Sorry, something went wrong.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-medium)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(41,98,255,0.15)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                  <Bot size={15} className="text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Fundi</p>
                  <p className="text-[10px] text-text-tertiary">AI Market Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-bg-elevated transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background:
                        msg.role === 'user' ? 'rgba(41,98,255,0.15)' : 'rgba(38,166,154,0.15)',
                    }}
                  >
                    {msg.role === 'user' ? (
                      <User size={11} className="text-accent-blue" />
                    ) : (
                      <Bot size={11} className="text-accent-green" />
                    )}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-tr-sm'
                        : 'text-text-secondary rounded-tl-sm'
                    }`}
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'rgba(41,98,255,0.75)'
                          : 'var(--bg-surface)',
                      border: msg.role === 'assistant' ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center">
                    <Bot size={11} className="text-accent-green" />
                  </div>
                  <div
                    className="px-3 py-2 rounded-xl rounded-tl-sm"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
                  >
                    <Loader2 size={14} className="text-text-tertiary animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (show only when 1 message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1 rounded-full border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                    style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-surface)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 pb-3 pt-2 shrink-0 border-t"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <form
                onSubmit={(e) => { e.preventDefault(); send() }}
                className="flex gap-2 items-center"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stocks, markets…"
                  maxLength={500}
                  className="flex-1 text-sm px-3 py-2 rounded-xl outline-none text-text-primary placeholder:text-text-tertiary"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ background: 'rgba(41,98,255,0.85)' }}
                >
                  <Send size={14} className="text-white" />
                </button>
              </form>
              <p className="text-[10px] text-text-tertiary text-center mt-1.5">
                Not financial advice · Powered by Gemini
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #2962ff 0%, #7c4dff 100%)',
          boxShadow: '0 8px 32px rgba(41,98,255,0.4)',
        }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

export default memo(ChatWidget)
