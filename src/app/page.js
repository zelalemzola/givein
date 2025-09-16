"use client"

import { useState } from "react"
import { FallingHearts } from "../components/falling-hearts"
import { BouncingNoButton } from "../components/bouncing-no-button"
import { PhoneInput } from "../components/phone-input"
import { AnimatedStickers } from "../components/animated-stickers"
import { Button } from "../components/ui/button"
import Sticker from "@/components/Sticker";

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
        <div className="text-center space-y-8 max-w-full">
          {!showThankYou ? (
            <div className="relative flex items-center justify-center w-full">
              {/* Top left sticker */}
              <div className="absolute -top-16 -left-16 rotate-[-20deg]">
                <Sticker src="/2.tgs" />
              </div>
              {/* Top right sticker */}
              <div className="absolute -top-16 -right-12 rotate-[20deg]">
                <Sticker src="/3.tgs" />
              </div>
              {/* Bottom center sticker */}
              {/* <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 rotate-[8deg]">
                <Sticker src="/1.tgs" />
              </div> */}
              <div className='flex flex-col items-center justify-center'>
                <h1 className="w-[75%] text-4xl md:text-6xl font-bold text-foreground neon-text text-balance leading-tight relative z-10">
                  Are you letting me wake you up my sweetheart?
                </h1>
                {!showInput ? (
                  <div className="flex gap-6 justify-center items-center flex-wrap mt-8">
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
              </div>
            </div>
          ) : (
            <div className="animate-in zoom-in-50 duration-700 relative">
              {/* Show 4th sticker above thank you message */}
              <div className="absolute left-1/2 -top-24 -translate-x-1/2 rotate-[-10deg]">
                <Sticker src="/4.tgs" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-primary neon-text text-balance leading-tight">
                Thank you Kalye
              </h1>
              <p className="text-xl text-muted-foreground mt-6">I can't wait to hear your voice every morning 💕</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
