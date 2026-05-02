import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100,
  message: "Too many requests, please try again",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15min
  message: "Too many login attempts, please try again later",
});

export const tradeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 30,
  message: "Trade rate limit exceeds",
});
