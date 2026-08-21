"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function Footer() {
  const { lang } = useLanguage()
  const t = texts.footer

  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Nome */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-sm font-bold text-foreground tracking-[0.2em] uppercase">
              {t.name[lang]}
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
              {t.role[lang]}
            </p>
          </div>

          {/* Ícones */}
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "davinunescarvalho35@gmail.com", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={social.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                data-cursor-hover
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Direitos */}
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">
            &copy; 2026 {t.name[lang]}. {t.rights[lang]}
          </p>

        </div>

        {/* Barra inferior */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/30 text-center">
            {t.developedWith[lang]}
          </p>
        </div>

      </div>
    </footer>
  )
}