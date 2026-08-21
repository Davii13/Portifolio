import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/context/LanguageContext'
import { Preloader } from '@/components/newspaper/preloader'
import { ReadingProgress } from '@/components/newspaper/reading-progress'
import { GlitchEffectSVG } from '@/components/newspaper/glitch-effect-svg'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScrollProvider } from '@/components/smooth-scroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })
const playfair = Playfair_Display({ subsets: ['latin'], style: 'italic', variable: '--font-playfair-italic' })

export const metadata: Metadata = {
  title: 'Davi Nunes | Software Engineer',
  description: 'Portfolio de Davi nunes - Engenheiro de Software',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Subtle Noise Texture Overlay */}
        <div className="pointer-events-none fixed inset-0 z-[99] h-full w-full opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider>
            <Preloader />
            <ReadingProgress />
            <GlitchEffectSVG />
            {/* 🌍 PROVIDER GLOBAL DE IDIOMA */}
            <LanguageProvider>
              {children}
            </LanguageProvider>
            <Analytics />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}