import express from "express";
import { env } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { fileURLToPath } from "url";

const app = express();

// Needed for ES Modules (__dirname fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// TEST ROUTES
// ======================
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is the books endpoint" });
});

// ======================
// PRODUCTION FRONTEND SERVING
// ======================
if (process.env.NODE_ENV === "production") {
  
  // Absolute path to Frontend/dist
  const frontendPath = path.join(process.cwd(), "Frontend", "dist");

  console.log("Serving frontend from:", frontendPath);

  // Serve static files
  app.use(express.static(frontendPath));

  // React Router fallback (Express 5 safe)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ======================
// START SERVER
// ======================
const startServer = async () => {
  try {
    await connectDB();

    // Railway provides PORT automatically
    const PORT = process.env.PORT || env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
