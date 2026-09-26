import { Request } from "express";

export const getClientIp = (req: Request): string => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) return forwardedFor.split(",")[0].trim();
  if (Array.isArray(forwardedFor) && forwardedFor.length) return forwardedFor[0];
  return req.ip || req.socket.remoteAddress || "unknown";
};

export const makeVisitFingerprint = (req: Request, dateKey: string): string => {
  const ip = getClientIp(req);
  const agent = req.get("user-agent") || "unknown-user-agent";
  const language = req.get("accept-language") || "unknown-language";
  return `${dateKey}::${ip}::${agent}::${language}`;
};
