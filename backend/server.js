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
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",  
    credentials: true,               
  })
);

// Routes
app.use("/api", routes); 

//This is for Image Uploading
const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening at port ${process.env.SERVER_PORT}`);
});
