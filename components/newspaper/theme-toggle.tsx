"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import { useUISound } from "@/hooks/use-ui-sound"
import { Magnetic } from "@/components/newspaper/magnetic"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { lang } = useLanguage()
  const { playClick, playHover } = useUISound()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-28 h-8" />
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    playClick()
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Magnetic>
      <button
        onClick={toggleTheme}
        onMouseEnter={playHover}
        className="flex items-center gap-2 group px-3 py-[6px] border border-border hover:border-primary transition-colors duration-300"
      >
        <div className="relative w-4 h-4 overflow-hidden">
          <div
            className="flex flex-col items-center absolute w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateY(${isDark ? "-100%" : "0%"})` }}
          >
            <Sun size={16} className="text-muted-foreground group-hover:text-primary transition-colors h-4 mb-4" />
            <Moon size={16} className="text-muted-foreground group-hover:text-primary transition-colors h-4" />
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
          {isDark ? texts.themeToggle.dark[lang] : texts.themeToggle.light[lang]}
        </span>
      </button>
    </Magnetic>
  )
}
