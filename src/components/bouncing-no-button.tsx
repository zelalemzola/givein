"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"

export function BouncingNoButton() {
  const [bounceStyle, setBounceStyle] = useState({})
  const [isAnimating, setIsAnimating] = useState(false)

  const handleHover = () => {
    if (isAnimating) return

    const bounceX = (Math.random() - 0.5) * 300 // Random direction
    const bounceY = (Math.random() - 0.5) * 100

    setBounceStyle({
      "--bounce-x": `${bounceX}px`,
      "--bounce-y": `${bounceY}px`,
    } as React.CSSProperties)

    setIsAnimating(true)

    setTimeout(() => {
      setIsAnimating(false)
      setBounceStyle({})
    }, 500)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`
        bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500/10
        transition-all duration-300 cursor-pointer select-none
        ${isAnimating ? "bounce-away" : ""}
      `}
      style={bounceStyle}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      onClick={(e) => e.preventDefault()}
    >
      No
    </Button>
  )
}
