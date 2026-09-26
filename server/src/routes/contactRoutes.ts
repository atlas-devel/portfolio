import express from "express";
import { submitContactMessage } from "../controllers/ContactController";
import { contactRateLimit } from "../middleware/contactRateLimit";

const contactRouter = express.Router();
contactRouter.post("/send", contactRateLimit, submitContactMessage);

export default contactRouter;
