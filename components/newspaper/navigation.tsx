"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { Magnetic } from "@/components/newspaper/magnetic"
import { useUISound } from "@/hooks/use-ui-sound"
import { ThemeToggle } from "@/components/newspaper/theme-toggle"

/* ================================
   TEXTOS DO MENU (PT / EN)
================================ */
const navItems = {
  pt: [
    { label: "Sobre", href: "#sobre" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Projetos", href: "#projetos" },
    { label: "Experiência", href: "#experiencia" },
    { label: "Livros", href: "#livros" },
    { label: "Contato", href: "#contato" },
  ],
  en: [
    { label: "About", href: "#sobre" },
    { label: "Skills", href: "#habilidades" },
    { label: "Projects", href: "#projetos" },
    { label: "Experience", href: "#experiencia" },
    { label: "Books", href: "#livros" },
    { label: "Contact", href: "#contato" },
  ],
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 🔥 Agora usando Context GLOBAL
  const { lang, toggleLang } = useLanguage()
  const { playHover, playClick } = useUISound()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#"
          className="group font-serif text-sm font-bold text-foreground tracking-[0.2em] uppercase relative"
        >
          DAVI NUNES
        </a>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {/* LINKS */}
          <div className="flex items-center gap-8">
            {navItems[lang].map((item) => (
              <Magnetic key={item.href}>
                <a
                  href={item.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="group relative font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 block py-1"
                >
                  <span className="relative z-10">{item.label}</span>

                  <span
                    className="absolute left-0 bottom-0 h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ width: "100%" }}
                  />
                </a>
              </Magnetic>
            ))}
          </div>

          <ThemeToggle />

          {/* BOTÃO IDIOMA */}
          <Magnetic>
            <button
              onClick={() => { playClick(); toggleLang(); }}
              onMouseEnter={playHover}
              className="relative px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em]
                         border border-border text-muted-foreground
                         hover:text-primary hover:border-primary
                         transition-all duration-300"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </Magnetic>

          {/* BOTÃO CV */}
          <Magnetic>
            <a
              href="#download"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group relative flex items-center gap-2 border border-foreground text-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              <Download size={12} className="relative z-10" />
              <span className="relative z-10">
                {lang === "pt" ? "Baixar CV" : "Download CV"}
              </span>
            </a>
          </Magnetic>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navItems[lang].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { playClick(); setIsOpen(false); }}
                  className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* BOTÃO IDIOMA MOBILE */}
              <button
                onClick={toggleLang}
                className="mt-4 px-4 py-2 w-fit border border-border
                           font-mono text-xs uppercase tracking-[0.15em]
                           text-muted-foreground hover:text-primary hover:border-primary
                           transition-all"
              >
                {lang === "pt" ? "English" : "Português"}
              </button>

              <a
                href="#download"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-2 border border-foreground text-foreground px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] w-fit hover:bg-foreground hover:text-background transition-colors"
              >
                <Download size={14} />
                {lang === "pt" ? "Baixar CV" : "Download CV"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}