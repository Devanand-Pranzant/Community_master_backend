import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/rolePermissionController.js";

const router = express.Router();

router.post("/", authMiddleware, controller.assignPermission);
router.get("/role/:roleId", authMiddleware, controller.getPermissions);

export default router;
