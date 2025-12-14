// Only use dotenv in development
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import express from "express";
import connectDB from "./config/connectDB.js";
import ProjectRouter from "./routes/projectRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoute from "./routes/AuthRouter.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
app.use(
  cors({
    credentials: true,
    // Update CORS origin for production
    origin: ["https://portfolio-2-rkft.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/api/projects", ProjectRouter);
app.use("/api/portfolio", AuthRoute);

connectDB();

app.listen(PORT, () => console.log("server has started on port " + PORT));
