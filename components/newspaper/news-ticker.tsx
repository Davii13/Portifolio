"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function NewsTicker() {
  const { lang } = useLanguage()
  const messages = texts.marquee.messages[lang]

  return (
    <div className="w-full bg-background font-mono text-[11px] py-4 overflow-hidden border-y border-border flex items-center relative">
      <motion.div
        className="flex whitespace-nowrap gap-16 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {messages.map((item, index) => (
          <div key={index} className="flex items-center gap-16">
            <span className="uppercase tracking-[0.2em] text-muted-foreground">{item}</span>
            <span className="text-primary text-[8px]">—</span>
          </div>
        ))}
        {/* Repeat the messages to create a seamless loop */}
        {messages.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center gap-16">
            <span className="uppercase tracking-[0.2em] text-muted-foreground">{item}</span>
            <span className="text-primary text-[8px]">—</span>
          </div>
        ))}
        {/* Repeat the messages again for super wide screens */}
        {messages.map((item, index) => (
          <div key={`dup2-${index}`} className="flex items-center gap-16">
            <span className="uppercase tracking-[0.2em] text-muted-foreground">{item}</span>
            <span className="text-primary text-[8px]">—</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
