import { RequestHandler } from "express";

const requests = new Map<string, number[]>();
const windowMs = 60_000;
const maxRequests = 4;

export const contactRateLimit: RequestHandler = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || "unknown";
  const recent = (requests.get(ip) || []).filter((time) => now - time < windowMs);
  if (recent.length >= maxRequests) {
    res.status(429).json({ success: false, message: "Too many messages. Please wait a minute and try again." });
    return;
  }
  recent.push(now);
  requests.set(ip, recent);
  if (requests.size > 1000) requests.forEach((times, key) => { if (times.every((time) => now - time >= windowMs)) requests.delete(key); });
  next();
};
