import express from "express";
import {
  // getProjectSideMenu,
  // checkAccess,
  // getAllSideMenus,
  getAllSideMenusWithAccess,
} from "../controllers/sidemenuController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// // Get all sidemenu by project
// router.get("/all/project/:projectId", authMiddleware, getAllSideMenus);

// // Get sidemenu by project
// router.get("/project/:projectId", authMiddleware, getProjectSideMenu);

// // Check access permission
// router.post("/check-access", authMiddleware, checkAccess);

// Get all sidemenu with access
router.get("/all", authMiddleware, getAllSideMenusWithAccess);

export default router;
