import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/adminUserController.js";

const router = express.Router();

/* Create User */
router.post("/", authMiddleware, controller.createAdminUser);

/* Get All Users */
router.get("/", authMiddleware, controller.getAdminUsers);

/* Get Single User */
router.get("/:userId", authMiddleware, controller.getAdminUserById);

/* Update Status */
router.put("/:userId/status", authMiddleware, controller.updateAdminUserStatus);

export default router;
