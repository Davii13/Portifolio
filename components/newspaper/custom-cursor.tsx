"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [visible, setVisible] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  const cursorX = useSpring(0, { stiffness: 800, damping: 35 })
  const cursorY = useSpring(0, { stiffness: 800, damping: 35 })

  const ringX = useSpring(0, { stiffness: 200, damping: 25 })
  const ringY = useSpring(0, { stiffness: 200, damping: 25 })

  const rotate = useMotionValue(0)
  const ringRotate = useTransform(rotate, [0, 360], [0, 360])

  let trailId = 0

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    setVisible(true)

    let rotation = 0

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)

      rotation += 0.8
      rotate.set(rotation % 360)

      if (isHovering) {
        setTrail((prev) => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }]
          return newTrail.slice(-5)
        })
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, [role='button']"
      )
      if (interactive) {
        setIsHovering(true)
        const text = interactive.getAttribute("data-cursor-text") || ""
        setCursorText(text)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, [role='button']"
      )
      if (interactive) {
        setIsHovering(false)
        setCursorText("")
        setTrail([])
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [cursorX, cursorY, ringX, ringY, rotate, isHovering])

  if (!visible) return null

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Ink trail on hover */}
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="pointer-events-none fixed top-0 left-0 z-[9997]"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              left: point.x - 2,
              top: point.y - 2,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer crosshair ring - follows with lag */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 transition-colors"
          animate={{
            width: isHovering ? 56 : isClicking ? 20 : 36,
            height: isHovering ? 56 : isClicking ? 20 : 36,
            scale: isHovering ? 1.2 : 1,
            backgroundColor: isHovering ? "rgba(37,99,235,0.08)" : "transparent"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* O texto do cursor no hover */}
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute -bottom-6 font-mono text-[7px] uppercase tracking-[0.2em] text-foreground whitespace-nowrap"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Inner dot - precise position */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full transition-colors"
          animate={{
            width: isHovering ? 6 : isClicking ? 10 : 6,
            height: isHovering ? 6 : isClicking ? 10 : 6,
            backgroundColor: isHovering ? "var(--primary)" : "var(--color-foreground, currentColor)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        />
      </motion.div>
    </>
  )
}
