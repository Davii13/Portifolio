"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { texts } from "@/i18n/texts"
import { useLanguage } from "@/context/LanguageContext"

type Technology = {
  name: string
  description: string
}

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription: string
  image: string
  tags: string[]
  technologies: Technology[]
  year: string
  link: string
  github: string
}

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { lang } = useLanguage()
  const section = texts.projects

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border"
          >
            {/* Header bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background border-b border-border px-6 py-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.id}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label={section.closeModal[lang]}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Imagem / GIF do projeto */}
            <div className="relative w-full h-56 md:h-72 bg-muted overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none"
                }}
              />
            </div>

            {/* Conteúdo */}
            <div className="p-6 md:p-10">
              {/* Título */}
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground uppercase leading-[0.9] tracking-tight mb-2">
                {project.title}
              </h2>

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-8">
                {project.subtitle}
              </p>

              {/* Descrição detalhada */}
              <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-10">
                {project.detailedDescription}
              </p>

              {/* Tecnologias */}
              <div className="mb-10">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  — {section.technologiesLabel[lang]}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="border border-border p-3 group hover:border-primary transition-colors duration-200"
                    >
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                      <span className="block font-sans text-[11px] text-muted-foreground mt-1">
                        {tech.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  {section.viewProject[lang]}
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors"
                >
                  <Github size={14} />
                  {section.viewCode[lang]}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
