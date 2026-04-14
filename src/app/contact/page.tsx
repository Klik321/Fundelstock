'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { sanitizeText } from '@/lib/utils'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Sanitize all inputs before submitting
    const sanitized = {
      name: sanitizeText(form.name),
      email: sanitizeText(form.email).slice(0, 254),
      message: sanitizeText(form.message),
    }

    // In production, POST to a server action or form endpoint
    // For now, simulate submission
    await new Promise((r) => setTimeout(r, 800))
    console.info('Contact form submission (configure your server action):', sanitized)

    setSubmitted(true)
    setLoading(false)
  }

  const field = (
    id: 'name' | 'email' | 'message',
    label: string,
    type = 'text',
    rows?: number,
  ) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-text-secondary">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          required
          maxLength={id === 'message' ? 2000 : 500}
          className="w-full bg-bg-elevated border border-border-medium rounded-md px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_3px_rgba(41,98,255,0.15)] transition-all resize-none"
          placeholder={id === 'message' ? 'Your message…' : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          required
          maxLength={type === 'email' ? 254 : 200}
          autoComplete={id === 'email' ? 'email' : id === 'name' ? 'name' : 'off'}
          className="w-full bg-bg-elevated border border-border-medium rounded-md px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue focus:shadow-[0_0_0_3px_rgba(41,98,255,0.15)] transition-all"
        />
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent-blue-bg border border-accent-blue-border flex items-center justify-center">
          <Mail size={18} className="text-accent-blue" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Contact</h1>
      </div>

      {submitted ? (
        <div className="card flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle size={40} className="text-accent-green" />
          <div>
            <p className="font-semibold text-text-primary">Message sent!</p>
            <p className="text-sm text-text-secondary mt-1">
              We&apos;ll get back to you at{' '}
              <span className="text-text-primary">{form.email}</span>
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="card space-y-4">
          {field('name', 'Name')}
          {field('email', 'Email address', 'email')}
          {field('message', 'Message', 'text', 5)}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg transition-colors"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {loading ? 'Sending…' : 'Send Message'}
          </button>

          <p className="text-[10px] text-text-tertiary text-center">
            By submitting, you agree to our{' '}
            <a href="/privacy" className="text-accent-blue hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  )
}
