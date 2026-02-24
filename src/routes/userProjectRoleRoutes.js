import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/userProjectRoleController.js";

const router = express.Router();

router.post("/", authMiddleware, controller.assignUserToProject);
router.get("/user/:userId", authMiddleware, controller.getUserAssignments);
router.delete("/:id", authMiddleware, controller.removeAssignment);

export default router;
