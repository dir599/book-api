import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { Request, Response } from "express";
import prisma from "./lib/prisma.js";
import bookRoute from "./routes/book.route.js"

const app = express();
const port = process.env["PORT"] || 4000;
app.use(express.json());
// basic endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Server is running`,
  });
});
app.use("/book", bookRoute)
// middleware
app.use(
  cors({
    origin: process.env["HOST_URL"],
  }),
);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully! ✅");

    // app.listen is here
    app.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });
  } catch (error: unknown) {
    console.error("Database connection failed! ❌", error);
    process.exit(1);
  }
}

startServer();
