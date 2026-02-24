import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/adminSidemenuController.js";

const router = express.Router();

/*
Create sidemenu
*/
router.post("/", authMiddleware, controller.createAdminSidemenu);

/*
Get sidemenus by project
*/
router.get(
  "/project/:projectId",
  authMiddleware,
  controller.getAdminSidemenuByProject,
);

/*
Update sidemenu
*/
router.put("/:sideMenuId", authMiddleware, controller.updateAdminSidemenu);

/*
Delete sidemenu (soft delete)
*/
router.delete("/:sideMenuId", authMiddleware, controller.deleteAdminSidemenu);

export default router;
