"use client"

import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import { Hero3D } from "@/components/newspaper/hero-3d"

export function HeroSection() {
  const { lang } = useLanguage()
  const t = texts.hero

  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2])

  // Apple-style scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Triggers as section leaves the viewport
  })

  // Fade out, scale down, and move up as user scrolls down
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const blurValue = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])

  const [scrambledSubtitle, setScrambledSubtitle] = useState(t.subtitle[lang])
  const originalText = t.subtitle[lang]
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    let frame = 0
    const totalFrames = 30
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * originalText.length)

      const result = originalText
        .split("")
        .map((char, i) => {
          if (i < revealed) return char
          if (char === " ") return " "
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      setScrambledSubtitle(result)

      if (frame >= totalFrames) clearInterval(interval)
    }, 40)

    return () => clearInterval(interval)
  }, [originalText])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const wordVars = {
    hidden: { opacity: 0, y: 50, rotate: 3 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const splitFirstName = t.firstName[lang].split("");
  const splitLastName = t.lastName[lang].split(" ");

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[150vh] bg-background" // Aumentado para dar espaço de scroll
    >
      {/* Sticky container para prender o hero na tela enquanto rola */}
      <div className="sticky top-0 h-screen w-full flex items-end overflow-hidden">
        <Hero3D />
        
        {/* Container que reage ao scroll da página */}
        <motion.div 
          className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-48 w-full z-10 pointer-events-none *:pointer-events-auto"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: blurValue
          }}
        >
          <motion.div
            className="flex flex-col"
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
          >
            {/* Editorial label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                01 / INTRO
              </span>
              <div className="h-px flex-1 bg-border max-w-[120px]" />
            </motion.div>

            {/* Main headline */}
            <motion.div
              variants={containerVars}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              <h1 className="font-serif text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.85] tracking-[-0.03em] text-foreground uppercase">
                <span className="inline-flex overflow-hidden">
                  {splitFirstName.map((char: string, i: number) => (
                    <motion.span key={i} variants={wordVars} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="inline-flex flex-wrap overflow-hidden text-foreground/15">
                  {splitLastName.map((word: string, i: number) => (
                    <span key={i} className="inline-flex overflow-hidden mr-[2vw]">
                      {word.split("").map((char, j) => (
                        <motion.span key={j} variants={wordVars} className="inline-block">
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Role & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                  {t.role[lang]}
                </p>
                <p className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed">
                  {`"${scrambledSubtitle}"`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.info[lang].map((text: string, i: number) => (
                  <span key={text} className="flex items-center gap-3">
                    {i > 0 && <span className="hidden sm:inline text-border">—</span>}
                    {text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bottom line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 h-px bg-border origin-left"
            />

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex justify-between items-center mt-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.edition[lang]}
              </span>
              <a
                href="#sobre"
                className="flex items-center gap-3 group"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {t.scroll[lang]}
                </span>
                <div className="w-px h-6 bg-primary group-hover:h-10 transition-all duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}