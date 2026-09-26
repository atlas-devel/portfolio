import "dotenv/config";
import express from "express";
import connectDB from "./config/connectDB";
import ProjectRouter from "./routes/projectRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoute from "./routes/AuthRouter";
import analyticsRouter from "./routes/analyticsRoutes";
import certificateRouter from "./routes/certificateRoutes";
import contactRouter from "./routes/contactRoutes";



const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://portfolio-2-rkft.onrender.com",
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CLIENT_URL,
].filter((origin): origin is string => Boolean(origin));
app.set("trust proxy", 1);

// Setup augmentation for express interface
import "./types/index";

//middleware
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/projects", ProjectRouter);
app.use("/api/portfolio", AuthRoute);
app.use("/api/certificates", certificateRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/contact", contactRouter);

// Connect to DB and Start Listening
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
});
