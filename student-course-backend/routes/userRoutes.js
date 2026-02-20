import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Logged-in users route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile",
    user: req.user
  });
});

export default router;
