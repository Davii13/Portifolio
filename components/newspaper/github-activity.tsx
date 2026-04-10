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
    <section className="relative bg-card py-24 border-t border-card-foreground/10" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <h2 className="font-serif text-5xl md:text-6xl font-black text-card-foreground uppercase leading-none">
              <span className="text-primary">{t.titleLine1[lang]}</span>
              {t.titleLine2[lang]}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-card-foreground/50 mt-4">
              {t.githubLabel[lang]}
            </p>
          </div>
          
          <a href="https://github.com/davii13" target="_blank" rel="noreferrer" className="group flex items-center gap-3 border border-card-foreground/20 px-6 py-3 hover:bg-card-foreground hover:text-card transition-colors">
            <Github size={18} />
            <span className="font-mono text-xs uppercase tracking-widest">{t.viewProfile[lang]}</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-card-foreground/5 h-48 border border-card-foreground/10" />
            ))
          ) : events.length > 0 ? (
            events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-card-foreground/10 bg-card p-6 hover:border-primary transition-colors flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-card-foreground/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {ev.type === "PushEvent" ? <GitCommit size={20} /> : <GitPullRequest size={20} />}
                  </div>
                  <span className="font-mono text-[10px] text-card-foreground/40 bg-card-foreground/5 px-2 py-1 uppercase">
                    {new Date(ev.created_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                
                <h4 className="font-sans text-sm font-bold text-card-foreground mb-2 break-all line-clamp-1">
                  {ev.repo.name.replace("davii13/", "")}
                </h4>
                
                <p className="font-serif text-sm text-card-foreground/70 italic mb-4 flex-grow line-clamp-3">
                  {ev.type === "PushEvent" 
                    ? `"${ev.payload.commits?.[0]?.message || 'Update'}"`
                    : `${ev.payload.action} pull request`
                  }
                </p>
                
                <div className="font-mono text-[9px] uppercase tracking-widest text-primary pt-4 border-t border-card-foreground/10">
                  {ev.type.replace("Event", "")}
                </div>
              </motion.div>
            ))
          ) : (
             <div className="col-span-3 text-center py-12 text-card-foreground/50 font-mono text-sm uppercase border border-dashed border-card-foreground/20">
               Nenhuma atividade recente encontrada. / No recent activity found.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
