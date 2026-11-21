
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bookRoute from "./routes/book.route.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const port = Number(process.env["PORT"]) || 4000;

// Global middleware
app.use(cors({
  origin: process.env["HOST_URL"],
}));

app.use(express.json());

// Basic endpoint
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Routes
app.use("/book", bookRoute);

// Error middleware (always last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully! ✅");

    app.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });
  } catch (error: unknown) {
    console.error("Server startup failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
