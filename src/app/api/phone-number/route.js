import { NextResponse } from "next/server"
import { PhoneNumber } from "../../../lib/models/PhoneNumber.js"

export async function POST(request) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    await PhoneNumber.create(phoneNumber)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving phone number:", error)
    return NextResponse.json({ error: "Failed to save phone number" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await PhoneNumber.getLatest()

    return NextResponse.json({
      phoneNumber: result?.phoneNumber || null,
    })
  } catch (error) {
    console.error("Error fetching phone number:", error)
    return NextResponse.json({ error: "Failed to fetch phone number" }, { status: 500 })
  }
}
