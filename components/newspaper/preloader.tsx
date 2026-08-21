"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Artificial fast loading just for the wow effect
    let progressValue = 0
    const interval = setInterval(() => {
      progressValue += Math.floor(Math.random() * 15) + 5
      if (progressValue >= 100) {
        progressValue = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => setLoading(false), 300)
      } else {
        setProgress(progressValue)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <span className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight uppercase">
              DAVI NUNES
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mt-2">
              Software Engineer
            </span>
          </div>
          
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex flex-col items-center gap-2">
            {/* Progress Bar */}
            <div className="w-48 h-[1px] bg-border relative overflow-hidden mt-2">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="mt-2 text-[10px] text-muted-foreground">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
