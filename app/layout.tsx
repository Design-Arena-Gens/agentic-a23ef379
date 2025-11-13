import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How English Literature Improves Our Life',
  description: 'A beautiful presentation on the benefits of learning English literature',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
