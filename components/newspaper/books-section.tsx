"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { BookOpen } from "lucide-react"

// Dados internos para evitar erros de importação
const localBooks = {
  pt: [
    {
      id: "BK-001",
      title: "O Programador Pragmático",
      author: "Andrew Hunt & David Thomas",
      status: "read",
      bgColor: "#1c1917",
      year: "2024",
      image: "/assets/books/pragmatic-programmer.jpg",
    },
    {
      id: "BK-002",
      title: "Engenharia de Software Moderna",
      author: "Marco Tulio Valente",
      status: "read",
      bgColor: "#0f172a",
      year: "2023",
      image: "/assets/books/engSoftwaremoderna.webp",
    },
    {
      id: "BK-003",
      title: "Engenharia de Software",
      author: "Ian Sommerville",
      status: "read",
      bgColor: "#1e293b",
      year: "2023",
      image: "/assets/books/sommervile.jpg",
    },
    {
      id: "BK-004",
      title: "Scrum: A Arte de Fazer o Dobro do Trabalho na Metade do Tempo",
      author: "Jeff Sutherland",
      status: "read",
      bgColor: "#111827",
      year: "2024",
      image: "/assets/books/scrumft.webp",
    },
    {
      id: "BK-005",
      title: "Fundamentos de Sistemas Operacionais",
      author: "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne",
      status: "read",
      bgColor: "#020617",
      year: "2023",
      image: "/assets/books/so.webp",
    },
    {
      id: "BK-006",
      title: "Pense em Python",
      author: "Allen B. Downey",
      status: "read",
      bgColor: "#1a2e05",
      year: "2025",
      image: "/assets/books/pense-python.png",
    },
    {
      id: "BK-007",
      title: "Python Fluente",
      author: "Luciano Ramalho",
      status: "read",
      bgColor: "#172554",
      year: "2025",
      image: "/assets/books/python-fluente.png",
    },
    {
      id: "BK-008",
      title: "Arquitetura Limpa",
      author: "Robert C. Martin",
      status: "reading",
      bgColor: "#1c1917",
      year: "2026",
      image: "/assets/books/arquitetura-limpa.png",
    },
  ],

  en: [
    {
      id: "BK-001",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      status: "read",
      bgColor: "#1c1917",
      year: "2024",
      image: "/assets/books/pragmatic-programmer.jpg",
    },
    {
      id: "BK-002",
      title: "Modern Software Engineering",
      author: "Marco Tulio Valente",
      status: "read",
      bgColor: "#0f172a",
      year: "2023",
      image: "/assets/books/engSoftwaremoderna.webp",
    },
    {
      id: "BK-003",
      title: "Software Engineering",
      author: "Ian Sommerville",
      status: "read",
      bgColor: "#1e293b",
      year: "2023",
      image: "/assets/books/sommervile.jpg",
    },
    {
      id: "BK-004",
      title: "Scrum: The Art of Doing Twice the Work in Half the Time",
      author: "Jeff Sutherland",
      status: "read",
      bgColor: "#111827",
      year: "2024",
      image: "/assets/books/scrumft.webp",
    },
    {
      id: "BK-005",
      title: "Operating System Concepts",
      author: "Abraham Silberschatz, Peter Galvin, Greg Gagne",
      status: "read",
      bgColor: "#020617",
      year: "2023",
      image: "/assets/books/so.webp",
    },
    {
      id: "BK-006",
      title: "Think Python",
      author: "Allen B. Downey",
      status: "read",
      bgColor: "#1a2e05",
      year: "2025",
      image: "/images/pense-em-python.jpg",
    },
    {
      id: "BK-007",
      title: "Fluent Python",
      author: "Luciano Ramalho",
      status: "read",
      bgColor: "#172554",
      year: "2025",
      image: "/images/python-fluente.jpg",
    },
    {
      id: "BK-008",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      status: "reading",
      bgColor: "#1c1917",
      year: "2026",
      image: "/images/arquitetura-limpa.jpg",
    },
  ],
}
function BookCard({ book, i, isInView, label }: { book: any; i: number; isInView: boolean; label: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="flex flex-col items-center gap-4 group cursor-pointer"
      data-cursor-text={useLanguage().lang === 'pt' ? 'LER' : 'READ'}
    >
      {/* Book frame */}
      <div
        className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg"
        style={{
          width: '160px',
          height: '230px',
          backgroundColor: book.bgColor,
          borderRadius: '2px',
          boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Tag IMG pura - sem filtros que possam ocultá-la */}
        {book.image && !imgError && (
          <img
            src={book.image}
            alt={book.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 10
            }}
            onError={() => setImgError(true)}
          />
        )}

        {/* Fallback caso a imagem falhe (fica atrás da img se ela carregar) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          textAlign: 'center',
          zIndex: 5
        }}>
          <h3 style={{ color: 'white', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {book.title}
          </h3>
        </div>
      </div>

      <div className="text-center max-w-[160px]">
        <h4 className="font-sans font-medium text-sm text-foreground leading-tight">{book.title}</h4>
        <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase text-primary">
          <BookOpen size={10} />
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export function BooksSection() {
  const { lang } = useLanguage()
  const currentLang = lang === 'en' ? 'en' : 'pt'
  const books = localBooks[currentLang]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const readingBooks = books.filter((b) => b.status === "reading")
  const readBooks = books.filter((b) => b.status === "read")

  const t = {
    pt: { reading: "Lendo Atualmente", read: "Já Lidos", t1: ".Biblio", t2: "teca" },
    en: { reading: "Currently Reading", read: "Already Read", t1: ".Biblio", t2: "theque" }
  }[currentLang]

  return (
    <section id="livros" className="py-28 md:py-40 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            06 / {currentLang === "pt" ? "LEITURA" : "READING"}
          </span>
          <div className="h-px flex-1 bg-border max-w-[120px]" />
        </div>

        <h2 className="font-serif text-6xl md:text-8xl font-bold uppercase mb-20 leading-[0.85] tracking-[-0.02em]">
          {t.t1} <span className="text-card-foreground/30 font-[family-name:var(--font-italic)] lowercase tracking-normal italic text-7xl md:text-9xl">{t.t2}</span>
        </h2>

        {/* Lendo Atualmente - Destaque */}
        {readingBooks.length > 0 && (
          <div className="mb-20">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4 mb-10">
              {t.reading}
            </h3>
            <div className="flex flex-wrap gap-10 justify-center md:justify-start">
              {readingBooks.map((book, i) => (
                <BookCard key={`reading-${book.id}`} book={book} i={i} isInView={isInView} label={t.reading} />
              ))}
            </div>
          </div>
        )}

        {/* Já Lidos - Grid Responsivo */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4 mb-10">
            {t.read}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {readBooks.map((book, i) => (
              <BookCard key={`read-${book.id}`} book={book} i={i} isInView={isInView} label={t.read} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}