import cors from 'cors'
import path from 'path'
import session from 'express-session'
import express from 'express'
import { connectDB } from './lib/connectDB.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.router.js'
import jobRoutes from './routes/job.router.js'
import roadmapRoutes from './routes/roadmap.router.js'

dotenv.config()

const __dirname = path.resolve();

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(express.json({ limit: "1mb" }))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 60 * 60 * 1000
  }
}))

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// Routes
app.use("/auth", authRoutes)
app.use("/job", jobRoutes)
app.use("/roadmap", roadmapRoutes)

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error("❌ Failed to connect DB", err)
})
