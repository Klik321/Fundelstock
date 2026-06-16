import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Fundelstock team about features, feedback, or business inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Contact Fundelstock' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
