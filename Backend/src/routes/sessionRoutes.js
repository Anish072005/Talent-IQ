import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionsById,
  joinSession,
  endSession,
} from "../controllers/sessionController.js";
const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, getSessionsById);

router.get("/:id/join", protectRoute, joinSession);

router.get("/:id/end", protectRoute, endSession);

export default router;
