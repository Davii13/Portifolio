"use client"

import { motion, useMotionValue, useTransform, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AboutSection() {
  const { lang } = useLanguage()
  const t = texts[lang].about

  const sectionRef = useRef(null)
  
  // Apple-style scroll-linked animation para a seção inteira
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"]
  })

  // Transforma o progresso do scroll em valores de CSS
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const sectionY = useTransform(scrollYProgress, [0, 1], [100, 0])
  const headerX = useTransform(scrollYProgress, [0, 1], [-50, 0])

  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [imgHovered, setImgHovered] = useState(false)

  // Parallax setup for the image specifically
  const imgContainerRef = useRef(null)
  const { scrollYProgress: imgScroll } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effect: moves image slightly up as user scrolls down
  const imgYParallax = useTransform(imgScroll, [0, 1], [-40, 40])
  const imgScaleScroll = useTransform(imgScroll, [0, 0.5], [0.8, 1])

  return (
    <section id="sobre" className="relative bg-card py-28 md:py-40 z-20" ref={sectionRef}>
      <motion.div 
        className="mx-auto max-w-7xl px-6"
        style={{ opacity: sectionOpacity, y: sectionY }}
      >
        {/* Section label */}
        <motion.div
          style={{ x: headerX }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              02 / {lang === "pt" ? "SOBRE" : "ABOUT"}
            </span>
            <div className="h-px flex-1 bg-border max-w-[120px]" />
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-card-foreground uppercase leading-[0.85] tracking-[-0.02em]">
            {t.titleLine1}
            <br />
            {/* Typographic Contrast: Mixed font */}
            <span className="text-card-foreground/30 font-[family-name:var(--font-italic)] lowercase tracking-normal italic text-7xl md:text-9xl">
              {t.titleLine2}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-7">
            <div
              ref={imgContainerRef}
              className="relative mb-12"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <div 
                className="relative overflow-hidden max-w-xs cursor-pointer rounded-sm"
                data-cursor-text="DAVI"
              >
                {/* Apply parallax y transform and scale on scroll and hover */}
                <motion.div 
                  style={{ y: imgYParallax, scale: imgScaleScroll }} 
                  animate={{ scale: imgHovered ? 1.05 : undefined }}
                  transition={{ scale: { duration: 0.5 } }}
                >
                  <Image
                    src="/images/atletico.jpg"
                    alt="Davi Nunes"
                    width={320}
                    height={400}
                    className="w-full h-[450px] object-cover"
                  />
                </motion.div>
              </div>

              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-card-foreground/30 mt-3">
                {t.photoCredit}
              </p>
            </div>

            <div className="border-l border-border pl-8 md:pl-12">
              <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8 text-card-foreground">
                {t.paragraph1}
              </p>
              <p className="text-card-foreground/60 text-sm leading-relaxed mb-6">
                {t.paragraph2}
              </p>
              <p className="text-card-foreground/60 text-sm leading-relaxed">
                {t.paragraph3}
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-card-foreground/40 mb-2">
                {t.signatureLabel}
              </p>
              {/* Added italic styling to signature for coherence */}
              <p className="font-[family-name:var(--font-italic)] text-4xl italic text-card-foreground">
                Davi Nunes
              </p>
              <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mt-2">
                {t.role}
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <TiltCard className="bg-muted/50 p-8 border border-border">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-8">
                {t.personalDataTitle}
              </h3>

              {t.personalData.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex justify-between py-3 ${
                    i !== t.personalData.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-card-foreground/40">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm text-card-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </TiltCard>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {t.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="border border-border p-5 text-center group hover:border-primary transition-colors duration-300"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  whileHover={{ y: -4 }}
                >
                  <p className="font-serif text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {stat.number}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] mt-2 text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}