import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Website Builder - Create Stunning Websites with AI',
  description: 'Build beautiful websites in seconds using AI. Just describe what you want and watch your website come to life.',
  keywords: 'AI website builder, website generator, AI web development, no-code website',
  authors: [{ name: 'AI Website Builder' }],
  openGraph: {
    title: 'AI Website Builder - Create Stunning Websites with AI',
    description: 'Build beautiful websites in seconds using AI. Just describe what you want and watch your website come to life.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 dark:from-gray-950 dark:via-purple-950 dark:to-violet-950">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
