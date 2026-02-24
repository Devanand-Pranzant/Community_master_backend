import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/projectRoleController.js";

const router = express.Router();

router.post("/", authMiddleware, controller.createRole);
router.get("/project/:projectId", authMiddleware, controller.getRoles);

export default router;
