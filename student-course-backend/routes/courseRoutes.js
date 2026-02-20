import express from "express";
import {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect,addCourse);
router.get("/", protect, getCourses);
router.get("/:id",protect, getCourseById);
router.put("/:id",protect, updateCourse);
router.delete("/:id", protect,deleteCourse);

export default router;
