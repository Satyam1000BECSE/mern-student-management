import express from "express";
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  enrollStudent,
  getStudentDetails,
  getMyDetails,
  unenrollStudent,
  updateEnrollment
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ CREATE
router.post("/", protect, addStudent);

// ✅ READ ALL
router.get("/", protect, getStudents);

// ✅ MY DETAILS (MUST BE BEFORE :id)
router.get("/me", protect, getMyDetails);

// ✅ ENROLL
router.delete("/:studentId/unenroll/:courseId", protect, unenrollStudent);
router.put("/:studentId/update-enrollment/:oldCourseId/:newCourseId", protect, updateEnrollment);
router.post("/:studentId/enroll/:courseId", protect, enrollStudent);

// ✅ STUDENT DETAILS WITH COURSES
router.get("/:id/details", protect, getStudentDetails);

// ✅ GET BY ID (KEEP LAST)
router.get("/:id", getStudentById);

// ✅ UPDATE
router.put("/:id", updateStudent);

// ✅ DELETE
router.delete("/:id",protect, deleteStudent);

export default router;
