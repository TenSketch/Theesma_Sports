import mongoose from "mongoose"

// 🔁 Global cache (prevents multiple connections in dev)
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  // ✅ Lazy load env (FIXED)
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  // ✅ Return existing connection
  if (cached.conn) {
    return cached.conn
  }

  // ✅ Create new connection if not exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default dbConnect