import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createResume
);

router.get(
  "/my-resumes",
  authMiddleware,
  getMyResumes
);

router.get(
  "/:id",
  authMiddleware,
  getResumeById
);

router.put(
  "/:id",
  authMiddleware,
  updateResume
);

router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);

export default router;