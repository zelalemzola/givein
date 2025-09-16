"use client"

import { useEffect, useState } from "react"
import { FallingHearts } from "../../components/falling-hearts"
import { AnimatedStickers } from "../../components/animated-stickers"
import { Button } from "../../components/ui/button"
import Link from "next/link"

export default function AnswerPage() {
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await fetch("/api/phone-number")
        const data = await response.json()
        setPhoneNumber(data.phoneNumber)
      } catch (error) {
        console.error("Error fetching phone number:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhoneNumber()
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FallingHearts />
      <AnimatedStickers />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-2xl">
          {loading ? (
            <div className="animate-pulse">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground neon-text">Loading...</h1>
            </div>
          ) : phoneNumber ? (
            <div className="animate-in zoom-in-50 duration-700 space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-primary neon-text text-balance">Her Number is:</h1>

              <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <p className="text-4xl md:text-6xl font-mono font-bold text-foreground tracking-wider select-all">
                  {phoneNumber}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-muted-foreground">Time to make that call! 💕</p>

                <div className="flex gap-4 justify-center flex-wrap">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 hover:scale-105 transition-transform"
                  >
                    <a href={`tel:${phoneNumber}`}>Call Now</a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 bg-transparent hover:scale-105 transition-transform"
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-700 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-muted-foreground text-balance">No number yet...</h1>

              <p className="text-xl text-muted-foreground">
                She hasn't shared her number yet. Maybe try asking again? 😉
              </p>

              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 hover:scale-105 transition-transform"
              >
                <Link href="/">Ask Again</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
