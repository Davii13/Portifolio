"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import { Newspaper } from "lucide-react"

export function NewsTicker() {
  const { lang } = useLanguage()
  const messages = texts.marquee.messages[lang]

  return (
    <div className="w-full bg-card-foreground text-card font-mono text-xs md:text-sm py-3 overflow-hidden border-y-2 border-primary flex items-center relative">
      <div className="bg-primary text-primary-foreground font-black px-4 py-3 uppercase tracking-widest absolute left-0 z-10 hidden md:flex items-center gap-2 border-r-2 border-card">
        <Newspaper size={16} />
        [ BREAKING NEWS ]
      </div>
      
      <motion.div
        className="flex whitespace-nowrap gap-12 pl-10 md:pl-64 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {messages.map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="uppercase tracking-widest">{item}</span>
            <span className="text-primary text-[10px]">✦</span>
          </div>
        ))}
        {/* Repeat the messages to create a seamless loop */}
        {messages.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center gap-12">
            <span className="uppercase tracking-widest">{item}</span>
            <span className="text-primary text-[10px]">✦</span>
          </div>
        ))}
        {/* Repeat the messages again for super wide screens */}
        {messages.map((item, index) => (
          <div key={`dup2-${index}`} className="flex items-center gap-12">
            <span className="uppercase tracking-widest">{item}</span>
            <span className="text-primary text-[10px]">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
