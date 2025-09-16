"use client"

import { useState } from "react"
import { FallingHearts } from "../components/falling-hearts"
import { BouncingNoButton } from "../components/bouncing-no-button"
import { PhoneInput } from "../components/phone-input"
import { AnimatedStickers } from "../components/animated-stickers"
import { Button } from "../components/ui/button"

export default function HomePage() {
  const [showInput, setShowInput] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleYesClick = () => {
    setShowInput(true)
  }

  const handlePhoneSubmit = async (phoneNumber) => {
    try {
      const response = await fetch("/api/phone-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (response.ok) {
        setShowInput(false)
        setShowThankYou(true)
      }
    } catch (error) {
      console.error("Error submitting phone number:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FallingHearts />
      <AnimatedStickers />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-6xl">
          {!showThankYou ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground neon-text text-balance leading-tight">
                Are you letting me wake you up my sweetheart?
              </h1>

              {!showInput ? (
                <div className="flex gap-6 justify-center items-center flex-wrap">
                  <Button
                    onClick={handleYesClick}
                    size="5xl"
                    className="bg-red-500  animate-pulse hover:bg-red-700 text-primary-foreground px-8 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    Yes
                  </Button>
                  <BouncingNoButton />
                </div>
              ) : (
                <PhoneInput onSubmit={handlePhoneSubmit} />
              )}
            </>
          ) : (
            <div className="animate-in zoom-in-50 duration-700">
              <h1 className="text-5xl md:text-7xl font-bold text-primary neon-text text-balance leading-tight">
                Thank you sweetheart
              </h1>
              <p className="text-xl text-muted-foreground mt-6">I can't wait to hear your voice every morning 💕</p>
              <div className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <a href="/answer">View Number</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
