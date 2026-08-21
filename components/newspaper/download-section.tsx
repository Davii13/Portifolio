"use client"

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Download, FileText } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

export function DownloadSection() {
  const { lang } = useLanguage()
  const t = texts.download

  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const bgX = useTransform(smoothX, [-0.5, 0.5], [30, -30])
  const bgY = useTransform(smoothY, [-0.5, 0.5], [20, -20])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="download"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-background py-28 md:py-40 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x: bgX, y: bgY }}
      >
        <span className="font-serif text-[15rem] md:text-[25rem] font-bold text-foreground/[0.03] uppercase leading-none">
          CV
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground uppercase leading-[0.85] tracking-[-0.02em] mb-4">
              {t.titleLine1[lang]}
              <br />
              <span className="text-foreground/15">
                {t.titleLine2[lang]}
              </span>
            </h2>

            <div className="h-px w-24 bg-primary mx-auto mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base text-muted-foreground max-w-lg mb-12 leading-relaxed"
          >
            {t.description[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="images/Currículo_Davi_NunesCarvalho.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 font-mono text-[10px] uppercase tracking-[0.15em] overflow-hidden hover:bg-primary/90 transition-colors"
            >
              <Download size={16} />
              <span>{t.downloadButton[lang]}</span>
            </motion.a>

            <motion.a
              href="/cv.pdf"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-4 border border-foreground text-foreground px-8 py-4 font-mono text-[10px] uppercase tracking-[0.15em] overflow-hidden hover:bg-foreground hover:text-background transition-colors"
            >
              <FileText size={16} />
              <span>{t.viewOnline[lang]}</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className="flex justify-between mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{t.lastUpdate[lang]}</span>
              <span>{t.format[lang]}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}