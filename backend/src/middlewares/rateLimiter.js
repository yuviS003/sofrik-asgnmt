const rateLimit = require("express-rate-limit");

const windowMs = parseInt(
  process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  10
);
const max = parseInt(process.env.RATE_LIMIT_MAX || 100, 10);

const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

module.exports = limiter;
