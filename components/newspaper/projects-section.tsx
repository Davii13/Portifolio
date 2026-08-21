"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { texts } from "@/i18n/texts"
import { useLanguage } from "@/context/LanguageContext"
import ProjectModal from "@/components/newspaper/ProjectModal"

function ProjectCard({
  project,
  i,
  viewProjectLabel,
  viewCodeLabel,
  onSelect,
}: {
  project: any
  i: number
  viewProjectLabel: string
  viewCodeLabel: string
  onSelect: (project: any) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 100%", "center 60%"] 
  })
  
  // Transformação Helicoidal (Helical Entry)
  // Cada card gira, translada em X e Y, e escala, simulando uma fita de DNA desenrolando
  const isEven = i % 2 === 0
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const yTranslate = useTransform(scrollYProgress, [0, 1], [150, 0])
  const xTranslate = useTransform(scrollYProgress, [0, 1], [isEven ? 250 : -250, 0])
  
  // Rotações 3D
  const rotateY = useTransform(scrollYProgress, [0, 1], [isEven ? 75 : -75, 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0])
  const rotateZ = useTransform(scrollYProgress, [0, 1], [isEven ? -10 : 10, 0])
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <motion.article
      ref={cardRef}
      style={{ 
        opacity, 
        y: yTranslate, 
        x: xTranslate, 
        rotateX, 
        rotateY, 
        rotateZ, 
        scale,
        transformPerspective: 1500 // Essencial para dar a profundidade 3D
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      data-cursor-text={useLanguage().lang === 'pt' ? 'VER' : 'VIEW'}
      className="group cursor-pointer border-t border-border py-10 md:py-14 origin-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Number */}
        <div className="md:col-span-1">
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title + Subtitle */}
        <div className="md:col-span-5">
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-[0.9] tracking-tight group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
            {project.subtitle}
          </p>
        </div>

        {/* Description + Tags + Links */}
        <div className="md:col-span-5">
          <motion.p
            className="font-sans text-sm text-foreground/60 leading-relaxed mb-5"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground group-hover:border-primary/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-5">
            <a
              href={project.link}
              onClick={(e) => e.stopPropagation()}
              data-cursor-text=""
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/60 hover:text-primary transition-colors z-10"
            >
              <ExternalLink size={12} />
              {viewProjectLabel}
            </a>

            <a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              data-cursor-text=""
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/60 hover:text-primary transition-colors z-10"
            >
              <Github size={12} />
              {viewCodeLabel}
            </a>
          </div>
        </div>

        {/* Year */}
        <div className="md:col-span-1 text-right">
          <span className="font-mono text-[10px] text-muted-foreground">
            {project.year}
          </span>
        </div>
      </div>

      {/* Hover indicator line */}
      <motion.div
        className="h-px bg-primary mt-10 md:mt-14 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  )
}

export function ProjectsSection() {
  const { lang } = useLanguage()
  const section = texts.projects
  const projects = section.list[lang]

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 20%"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const headerX = useTransform(scrollYProgress, [0, 1], [-50, 0])

  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  return (
    <section id="projetos" className="relative bg-card py-28 md:py-40 z-20 overflow-hidden" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, x: headerX }}
          className="mb-16 md:mb-24 relative z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              04 / {lang === "pt" ? "TRABALHOS" : "WORK"}
            </span>
            <div className="h-px flex-1 bg-border max-w-[120px]" />
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-card-foreground uppercase leading-[0.85] tracking-[-0.02em]">
            {lang === "pt" ? "SELECTED" : "SELECTED"}
            <br />
            {/* Typographic Contrast: Mixing heavy sans-serif with elegant italic serif */}
            <span className="text-card-foreground/30 font-[family-name:var(--font-italic)] lowercase tracking-normal italic text-7xl md:text-9xl">
              {lang === 'pt' ? 'works' : 'works'}
            </span>
          </h2>
        </motion.div>

        {/* Projects list com container perspective se precisarmos global, mas o transformPerspective no filho é melhor */}
        <div className="flex flex-col relative z-20 perspective-1000">
          {projects.map((project: any, i: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              i={i}
              viewProjectLabel={section.viewProject[lang]}
              viewCodeLabel={section.viewCode[lang]}
              onSelect={setSelectedProject}
            />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
