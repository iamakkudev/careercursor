import cors from 'cors'
import path from 'path'
import session from 'express-session'
import express from 'express'
import {connectDB} from './lib/connectDB.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.router.js'
import jobRoutes from './routes/job.router.js'
import roadmapRoutes from './routes/roadmap.router.js'
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



const PORT = process.env.PORT||8080


//express-session
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 60 * 60 * 1000,
        maxAge: 60 * 60 * 1000,
        httpOnly: true
}
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


// Middleware

app.use(express.json({ limit: "1mb" })); // Parse incoming JSON
app.use(cookieParser()); // Parse incoming cookies
app.use(session(sessionOptions))


app.use("/auth",authRoutes)
app.use("/job",jobRoutes)
app.use("/roadmap",roadmapRoutes)


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    connectDB();
})