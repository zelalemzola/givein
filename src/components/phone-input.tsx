"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void
}

export function PhoneInput({ onSubmit }: PhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <Input
          type="tel"
          placeholder="Enter your phone number..."
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-80 max-w-full text-center text-lg bg-card border-primary focus:ring-primary"
          autoFocus
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Submit
        </Button>
      </form>
    </div>
  )
}
