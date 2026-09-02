import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import prisma from "./config/prisma";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();