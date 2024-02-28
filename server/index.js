import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express()
const connectToDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connnected to database")
    } catch (err) {
        console.log(err)
    }
}
connectToDataBase()
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  
app.listen(process.env.PORT,()=>{
    console.log(`the server run in port ${process.env.PORT}`)
})