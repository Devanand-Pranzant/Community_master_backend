import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/adminCategoryController.js";

const router = express.Router();

router.post("/", authMiddleware, controller.createCategory);
router.get("/", authMiddleware, controller.getCategories);

export default router;
