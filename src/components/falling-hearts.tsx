"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  animationDuration: number
  size: number
  filled: boolean
}

export function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 4 + 7, // 7-11 seconds (slower)
        size: Math.random() * 20 + 15, // 15-35px
        filled: Math.random() > 0.5,
      }
      return heart
    }

    // Add fewer hearts, less frequently for a lighter effect
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Add 6-10 hearts per tick
        const newHearts = Array.from({ length: Math.floor(Math.random() * 5) + 6 }, createHeart)
        return [...prev, ...newHearts]
      })
    }, 600) // every 0.6s

    // Clean up old hearts, keep last 100 (so fewer are visible at once)
    const cleanup = setInterval(() => {
      setHearts((prev) => prev.slice(-100))
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(cleanup)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="falling-heart text-red-500 neon-text"
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            top: "-40px",
            fontSize: `${heart.size}px`,
            animation: `fall ${heart.animationDuration}s linear forwards`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {heart.filled ? "♥" : "♡"}
        </span>
      ))}
      <style>{`
        @keyframes fall {
          0% { top: -40px; opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
