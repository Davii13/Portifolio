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
      title: "Leitura aramuni",
      author: "Davi Nunes",
      status: "reading",
      bgColor: "#1e3a8a",
      year: "2026",
      image: "/images/atletico.jpg", 
    },
  ],
  en: [
    { id: "BK-001", title: "The Pragmatic Programmer", author: "Andrew Hunt", status: "read", bgColor: "#1c1917", year: "2024", image: "/assets/books/pragmatic-programmer.jpg" },
    { id: "BK-002", title: "Currently aramuni", author: "Davi Nunes", status: "reading", bgColor: "#1e3a8a", year: "2026", image: "/images/atletico.jpg" },
  ],
}

function BookCard({ book, i, isInView, label }: { book: any; i: number; isInView: boolean; label: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Moldura do Livro - Simplificada ao máximo para evitar bugs de CSS */}
      <div 
        style={{
          position: 'relative',
          width: '180px',
          height: '260px',
          backgroundColor: book.bgColor,
          borderRadius: '0 4px 4px 0',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          borderLeft: '6px solid rgba(0,0,0,0.4)'
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
          <h3 style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {book.title}
          </h3>
        </div>
      </div>

      <div className="text-center">
        <h4 className="font-serif font-bold text-sm text-foreground">{book.title}</h4>
        <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase text-primary bg-primary/10 px-2 py-1">
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
    <section id="livros" className="py-24 bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-serif text-6xl md:text-8xl font-black uppercase mb-16">
          {t.t1} <span className="text-primary">{t.t2}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b pb-4 mb-8">
              {t.reading}
            </h3>
            <div className="flex flex-wrap gap-8">
              {readingBooks.map((book, i) => (
                <BookCard key={`reading-${book.id}`} book={book} i={i} isInView={isInView} label={t.reading} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b pb-4 mb-8">
              {t.read}
            </h3>
            <div className="flex flex-wrap gap-8">
              {readBooks.map((book, i) => (
                <BookCard key={`read-${book.id}`} book={book} i={i} isInView={isInView} label={t.read} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}