import express from 'express' 
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoutes.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares

const allowedOrigins = [
    "https://better-uptime-eight.vercel.app",
    "http://localhost:3000",
  ];

app.use(express.json())
app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
        if (!isAllowed) {
          const msg = "The CORS policy for this site does not allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

//api endpoints
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin

app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("API Working");
})

app.listen(port,() => console.log("Server Started at ",port))