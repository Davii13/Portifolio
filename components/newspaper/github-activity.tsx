"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { texts } from "@/i18n/texts"
import { Github, GitCommit, GitPullRequest } from "lucide-react"

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: { message: string }[];
    action?: string;
  };
}

export function GithubActivity() {
  const { lang } = useLanguage()
  const t = texts.github
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [events, setEvents] = useState<GithubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGithub() {
      try {
        const res = await fetch("https://api.github.com/users/davii13/events?per_page=10")
        if (res.ok) {
          const data = await res.json()
          // Filter out only relevant events (PushEvents or PRs)
          const relevantEvents = data.filter((e: GithubEvent) => e.type === "PushEvent" || e.type === "PullRequestEvent").slice(0, 3)
          setEvents(relevantEvents)
        }
      } catch (e) {
        console.error("Failed to fetch Github Data", e)
      } finally {
        setLoading(false)
      }
    }
    fetchGithub()
  }, [])

  return (
    <section className="relative bg-card py-20 border-t border-border" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3 block">
              GITHUB
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground uppercase leading-[0.9] tracking-tight">
              {t.titleLine1[lang]}
              {t.titleLine2[lang]}
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
              {t.githubLabel[lang]}
            </p>
          </div>
          
          <a href="https://github.com/davii13" target="_blank" rel="noreferrer" className="group flex items-center gap-3 border border-border px-5 py-2.5 hover:border-primary hover:text-primary transition-colors text-foreground">
            <Github size={16} />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{t.viewProfile[lang]}</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-48 border border-border" />
            ))
          ) : events.length > 0 ? (
            events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-border bg-background p-6 hover:border-primary transition-colors duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 border border-border text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                    {ev.type === "PushEvent" ? <GitCommit size={18} /> : <GitPullRequest size={18} />}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground px-2 py-1 uppercase">
                    {new Date(ev.created_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                
                <h4 className="font-sans text-sm font-medium text-foreground mb-2 break-all line-clamp-1">
                  {ev.repo.name.replace("davii13/", "")}
                </h4>
                
                <p className="font-sans text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                  {ev.type === "PushEvent" 
                    ? `"${ev.payload.commits?.[0]?.message || 'Update'}"`
                    : `${ev.payload.action} pull request`
                  }
                </p>
                
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary pt-4 border-t border-border">
                  {ev.type.replace("Event", "")}
                </div>
              </motion.div>
            ))
          ) : (
             <div className="col-span-3 text-center py-12 text-muted-foreground font-mono text-sm uppercase border border-dashed border-border">
               Nenhuma atividade recente encontrada. / No recent activity found.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
