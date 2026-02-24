import express from "express";
import * as controller from "../controllers/unit.controller.js";

const router = express.Router();

router.get("/:client_id/:community_id/:property_id", controller.getUnits);
router.post("/", controller.createUnit);
router.put("/:unit_id", controller.updateUnit);
router.delete("/:unit_id", controller.deleteUnit);

export default router;