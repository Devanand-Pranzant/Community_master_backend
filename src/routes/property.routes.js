import express from "express";
import * as controller from "../controllers/property.controller.js";

const router = express.Router();

router.get("/:client_id/:community_id", controller.getProperties);
router.post("/", controller.createProperty);
router.put("/:property_id", controller.updateProperty);
router.delete("/:property_id", controller.deleteProperty);

export default router;