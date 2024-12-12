import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/config.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import path from 'path';

dotenv.config();

const app = express();
app.use(cookieParser());
connectDb();

// Middleware
app.use(express.json({ limit: "10mb" })); 

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173",  
    credentials: true,              
  })
);
//^Important
// const allowedOrigins = ["http://localhost:5173", "http://192.168.18.21:5173"];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// Routes
app.use("/api", routes); 

//This is for Image Uploading
const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, 'public')));


// app.listen(process.env.SERVER_PORT,  '0.0.0.0', () => {
//   console.log(`Server is listening at port http://192.168.18.21:${process.env.SERVER_PORT}`);
// });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening at port ${process.env.SERVER_PORT}`);
});