import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

// Admin-only route
router.get("/admin-data", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin!",
    user: req.user
  });
});

export default router;
