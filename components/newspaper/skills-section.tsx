"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function SkillCategory({ category, catIndex }: { category: any; catIndex: number }) {
  const rowRef = useRef(null)
  
  // Parallax per row
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 95%", "start 40%"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const xTranslate = useTransform(scrollYProgress, [0, 1], [-30, 0])

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity, x: xTranslate }}
      className="border-t border-border py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
    >
      {/* Number + Title */}
      <div className="md:col-span-3 flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
          {String(catIndex + 1).padStart(2, '0')}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight">
          {category.title}
        </h3>
      </div>

      {/* Skills listed horizontally */}
      <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-3 items-center">
        {category.skills.map((skill: any, skillIndex: number) => (
          <span
            key={skill.name}
            className="font-sans text-sm md:text-base text-foreground/70 hover:text-primary transition-colors duration-300"
          >
            {skill.name}
            {skillIndex < category.skills.length - 1 && (
              <span className="ml-6 text-border">/</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const { lang } = useLanguage()
  const section = texts.skills
  const categories = section.categories[lang]
  const techTags = section.techTags

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <section id="habilidades" className="bg-background py-28 md:py-40 relative z-20" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              03 / {lang === "pt" ? "STACK" : "STACK"}
            </span>
            <div className="h-px flex-1 bg-border max-w-[120px]" />
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-[-0.02em]">
            {section.titleLine1[lang]}
            <br />
            <span className="text-foreground/15">
              {section.titleLine2[lang]}
            </span>
          </h2>
        </motion.div>

        {/* Editorial skill categories */}
        <div className="flex flex-col gap-0">
          {categories.map((category: any, catIndex: number) => (
            <SkillCategory key={category.title} category={category} catIndex={catIndex} />
          ))}
          <div className="border-t border-border" />
        </div>

        {/* Tech tags */}
        <div className="mt-20 md:mt-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            {section.techTitle[lang]}
          </p>

          <div className="flex flex-wrap gap-3">
            {techTags.filter((t: string) => t).map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-wider border border-border px-4 py-2 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}