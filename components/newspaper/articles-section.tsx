"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { PenTool, ArrowRight } from "lucide-react"

// Dados fixos (placeholder) para o blog. Idealmente viriam do i18n ou CMS.
const articlesList = {
  pt: [
    {
      id: "ART-01",
      title: "Clean Architecture em Projetos Reais",
      date: "09 Abril, 2026",
      excerpt: "Como aplicar os conceitos do Uncle Bob sem transformar o seu sistema em um monstro de complexidade acidental...",
      category: "Arquitetura",
    },
    {
      id: "ART-02",
      title: "Desmistificando o Event Loop",
      date: "25 Março, 2026",
      excerpt: "Um mergulho profundo no funcionamento interno do Node.js e como ele lida com milhares de requisições de forma assíncrona.",
      category: "Node.js",
    }
  ],
  en: [
    {
      id: "ART-01",
      title: "Clean Architecture in Real Projects",
      date: "April 09, 2026",
      excerpt: "How to apply Uncle Bob's concepts without turning your system into an accidental complexity monster...",
      category: "Architecture",
    },
    {
      id: "ART-02",
      title: "Demystifying the Event Loop",
      date: "March 25, 2026",
      excerpt: "A deep dive into the inner workings of Node.js and how it handles thousands of asynchronous requests.",
      category: "Node.js",
    }
  ]
}

export function ArticlesSection() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const articles = articlesList[lang]

  return (
    <section id="artigos" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-2 text-primary mb-4 font-mono uppercase tracking-widest text-xs">
            <PenTool size={16} />
            <span>{lang === "pt" ? "Editorial" : "Editorial"}</span>
          </div>
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <span>{lang === "pt" ? ".Arti" : ".Arti"}</span>
            <br />
            <span className="text-primary">{lang === "pt" ? "gos" : "cles"}</span>
          </h2>
          <div className="mt-6 h-[3px] w-24 bg-primary" />
        </motion.div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group cursor-pointer border-b border-border pb-8 block"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {article.category}
                </span>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  {article.date}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-4 line-clamp-2">
                {article.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm line-clamp-3 mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest group-hover:pl-2 transition-all duration-300">
                <span>{lang === "pt" ? "Ler Artigo" : "Read Article"}</span>
                <ArrowRight size={14} className="text-primary" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
