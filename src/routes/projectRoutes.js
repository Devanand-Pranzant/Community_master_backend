import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, controller.createProject);
router.get("/", authMiddleware, controller.getProjects);

export default router;
