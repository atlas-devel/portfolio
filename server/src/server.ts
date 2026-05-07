import express from "express";
import connectDB from "./config/connectDB";
import ProjectRouter from "./routes/projectRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoute from "./routes/AuthRouter";
import path from "path";
import analyticsRouter from "./routes/analyticsRoutes";

// Only use dotenv in development
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;
app.set("trust proxy", 1);

// Setup augmentation for express interface
import "./types/index";

//middleware
app.use(
  cors({
    credentials: true,
    // Update CORS origin for production
    origin: ["https://portfolio-2-rkft.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/projects", ProjectRouter);
app.use("/api/portfolio", AuthRoute);
app.use("/api/certificates", require("./routes/certificateRoutes").default);
app.use("/api/analytics", analyticsRouter);

// Connect to DB and Start Listening
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
});
