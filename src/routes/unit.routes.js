// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/unit.controller");

// router.get("/", controller.getAll);
// router.post("/", controller.create);
// router.get("/by-property/:property_id", controller.getByProperty);

// router.get("/:id", controller.getById);
// router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);


// module.exports = router;


const express = require("express");
const router = express.Router();
const controller = require("../controllers/unit.controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/by-property/:property_id", controller.getByProperty);

router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);



module.exports = router;