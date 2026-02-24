import express from "express";
import * as controller from "../controllers/community.controller.js";

const router = express.Router();

router.get("/:client_id", controller.getCommunities);
router.post("/", controller.createCommunity);
router.put("/:community_id", controller.updateCommunity);
router.delete("/:community_id", controller.deleteCommunity);

export default router;