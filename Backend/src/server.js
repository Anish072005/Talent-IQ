import express from 'express';
import { env } from './lib/env.js';
import path from "path";
import { connectDB } from './lib/db.js';  
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test routes
app.get('/health', (req, res) => {
    res.status(200).json({ msg: "hello world" });
});

app.get('/books', (req, res) => {
    res.status(200).json({ msg: "this is the books endpoint" });
});

// ✅ PRODUCTION FRONTEND SERVING (FIXED)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(process.cwd(), "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            console.log(`✅ Server is running on port ${env.PORT}`);
        });

    } catch (error) {
        console.error("❌ Error starting server:", error);
    }
};

startServer();
