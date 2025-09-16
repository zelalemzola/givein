"use client"

import { useEffect, useState } from "react"

interface Sticker {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
  scale: number
  animationDelay: number
}

export function AnimatedStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([])

  useEffect(() => {
    const romanticEmojis = ["💕", "💖", "💝", "💗", "🌹", "💐", "💘", "💞"]

    // 8 stickers, frame the screen (corners and edges), avoid center
    const framePositions = [
      { x: 5, y: 5 },    // top-left
      { x: 50, y: 5 },   // top-center
      { x: 95, y: 5 },   // top-right
      { x: 5, y: 50 },   // left-center
      { x: 95, y: 50 },  // right-center
      { x: 5, y: 95 },   // bottom-left
      { x: 50, y: 95 },  // bottom-center
      { x: 95, y: 95 },  // bottom-right
    ]
    const generateStickers = () => {
      const newStickers: Sticker[] = []
      for (let i = 0; i < framePositions.length; i++) {
        const pos = framePositions[i]
        newStickers.push({
          id: i,
          emoji: romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)],
          x: pos.x,
          y: pos.y,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.8,
          animationDelay: Math.random() * 2,
        })
      }
      setStickers(newStickers)
    }

    generateStickers()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute text-4xl opacity-30 animated-sticker"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            animationDelay: `${sticker.animationDelay}s`,
            animationDuration: "3.5s",
          }}
        >
          {sticker.emoji}
        </div>
      ))}
      <style>{`
        @keyframes slow-pulse {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animated-sticker {
          animation-name: slow-pulse;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}
