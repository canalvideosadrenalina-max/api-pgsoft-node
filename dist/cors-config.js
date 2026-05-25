"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIoCors = exports.corsOptions = exports.allowedCorsOrigins = void 0;
/** Origens permitidas (Express + Socket.IO). */
exports.allowedCorsOrigins = [
    "https://aavip55.vercel.app",
    "https://api-pgsoft-node-production.up.railway.app",
];
exports.corsOptions = {
    origin(origin, callback) {
        if (!origin || exports.allowedCorsOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`CORS bloqueado para origem: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
exports.socketIoCors = {
    origin: exports.allowedCorsOrigins,
    methods: ["GET", "POST"],
};
