import type { CorsOptions } from "cors";

/** Origens permitidas (Express + Socket.IO). */
export const allowedCorsOrigins = [
  "https://aavip55.vercel.app",
  "https://api-pgsoft-node-production.up.railway.app",
];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedCorsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS bloqueado para origem: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

export const socketIoCors = {
  origin: allowedCorsOrigins,
  methods: ["GET", "POST"],
};
