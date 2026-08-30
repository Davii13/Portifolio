"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"

function TimelineCard({ exp, i, isInView }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="relative pl-8 md:pl-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 md:left-8 top-2 -translate-x-[4px] rounded-full bg-primary"
        animate={{
          width: isHovered ? 10 : 8,
          height: isHovered ? 10 : 8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />

      <div
        className="border-b border-border pb-10 md:pb-14"
        data-cursor-hover
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase leading-[0.9] tracking-tight">
              {exp.role}
            </h3>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mt-2">
              {exp.company} — {exp.location}
            </p>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap border border-border px-3 py-1.5">
            {exp.period}
          </span>
        </div>

        <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-5">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function EducationCard({ edu, i, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
      whileHover={{
        borderColor: "var(--primary)",
        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.1)"
      }}
      className="border border-border p-6 md:p-8 transition-all duration-300"
      data-cursor-hover
    >
      <span className="inline-block font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 mb-4 border text-primary border-primary">
        {edu.period}
      </span>

      <h4 className="font-serif text-xl font-bold uppercase mt-3 mb-1 tracking-tight">
        {edu.title}
      </h4>

      <div className="h-px bg-border my-4" />

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4 text-muted-foreground">
        {edu.institution}
      </p>

      <p className="font-sans text-sm text-foreground/60 leading-relaxed">
        {edu.description}
      </p>
    </motion.div>
  )
}

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { lang } = useLanguage()
  const t = texts.experience

  const experiences = t.experiences[lang]
  const education = t.education[lang]

  return (
    <section id="experiencia" className="relative bg-background py-28 md:py-40" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              05 / {lang === "pt" ? "CARREIRA" : "CAREER"}
            </span>
            <div className="h-px flex-1 bg-border max-w-[120px]" />
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-[-0.02em]">
            {t.titleLine1[lang]}
            <br />
            <span className="text-foreground/15">
              {t.titleLine2[lang]}
            </span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-0">
            {experiences.map((exp: any, i: number) => (
              <TimelineCard key={i} exp={exp} i={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <h3 className="font-serif text-4xl md:text-5xl font-bold uppercase leading-[0.9] tracking-tight mb-4">
            {t.educationTitle[lang]}
          </h3>

          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-8 bg-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.academicLabel[lang]}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu: any, i: number) => (
              <EducationCard key={i} edu={edu} i={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}