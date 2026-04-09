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
      title: "Microservices e Arquitetura Distribuída",
      date: "Abril, 2026",
      excerpt: "Estudo dos conceitos de microsserviços com base em Martin Fowler e Engenharia de Software Moderna, abordando desacoplamento, escalabilidade e desafios reais.",
      category: "Arquitetura",
    },
    {
      id: "ART-02",
      title: "Padrões de Projeto na Prática: Facade",
      date: "Março, 2026",
      excerpt: "Aplicação do padrão Facade para simplificar sistemas complexos, com base nos conceitos do Refactoring Guru e uso em projetos reais.",
      category: "Design Patterns",
    },
    {
      id: "ART-03",
      title: "Modularização e Big Ball of Mud",
      date: "Março, 2026",
      excerpt: "Análise dos problemas de sistemas mal estruturados e como critérios de modularização ajudam a evitar arquiteturas caóticas.",
      category: "Arquitetura",
    },
    {
      id: "ART-04",
      title: "Impacto do Uso de Tecnologia na Saúde Mental",
      date: "Novembro, 2025",
      excerpt: "Revisão de estudos científicos sobre os efeitos do uso excessivo de telas, incluindo ansiedade, sono e bem-estar emocional.",
      category: "Pesquisa",
    },
    {
      id: "ART-05",
      title: "BitTorrent e Estratégias de Caching",
      date: "2025",
      excerpt: "Estudo sobre o funcionamento do BitTorrent sob a perspectiva de caching e distribuição eficiente de dados em larga escala.",
      category: "Sistemas Distribuídos",
    },
  ],

  en: [
    {
      id: "ART-01",
      title: "Microservices and Distributed Architecture",
      date: "April, 2026",
      excerpt: "Study of microservices concepts based on Martin Fowler and Modern Software Engineering, focusing on scalability and decoupling.",
      category: "Architecture",
    },
    {
      id: "ART-02",
      title: "Design Patterns in Practice: Facade",
      date: "March, 2026",
      excerpt: "Applying the Facade pattern to simplify complex systems based on Refactoring Guru concepts.",
      category: "Design Patterns",
    },
    {
      id: "ART-03",
      title: "Modularization and Big Ball of Mud",
      date: "March, 2026",
      excerpt: "Analysis of poorly structured systems and how modularization criteria help avoid chaotic architectures.",
      category: "Architecture",
    },
    {
      id: "ART-04",
      title: "Technology Usage and Mental Health Impact",
      date: "November, 2025",
      excerpt: "Review of scientific studies on screen time and its effects on anxiety, sleep, and emotional well-being.",
      category: "Research",
    },
    {
      id: "ART-05",
      title: "BitTorrent from a Caching Perspective",
      date: "2025",
      excerpt: "Study of BitTorrent focusing on caching strategies and efficient large-scale data distribution.",
      category: "Distributed Systems",
    },
  ],
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
