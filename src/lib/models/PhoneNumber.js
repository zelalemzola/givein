import clientPromise from "../db.js"

export class PhoneNumber {
  static async create(phoneNumber) {
    const client = await clientPromise
    const db = client.db("romantic_proposal")
    const collection = db.collection("phone_numbers")

    const result = await collection.insertOne({
      phoneNumber,
      createdAt: new Date(),
    })

    return result
  }

  static async getLatest() {
    const client = await clientPromise
    const db = client.db("romantic_proposal")
    const collection = db.collection("phone_numbers")

    const result = await collection.findOne({}, { sort: { createdAt: -1 } })

    return result
  }
}
