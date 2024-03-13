import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@vtex/shoreline/css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoreline next 14 exampel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
