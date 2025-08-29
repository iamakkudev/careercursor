import rateLimit from 'express-rate-limit';

export const limiter = (max) => {
  return rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: "⏳ Too many requests. Please try again later."
      });
    }
  });
};
