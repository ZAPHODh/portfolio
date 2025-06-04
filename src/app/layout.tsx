import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portifólio - Luis',
  description: 'My personal portfolio showcasing my projects and skills.',
  openGraph: {
    title: 'Portifólio - Luis',
    description: 'My personal portfolio showcasing my projects and skills.',
    url: 'https://your-portfolio-url.com',
    siteName: 'Portifólio - Luis',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
