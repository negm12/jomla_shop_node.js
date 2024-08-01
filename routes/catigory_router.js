<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const catigory_controller = require("../controllers/catigory_controller");
const auth_controller = require("../controllers/auth_controller");

router
  .route("/")
  .get(catigory_controller.get_all_catigories)
  .post(auth_controller.protect_route, catigory_controller.create_catigory);
router
  .route("/:id")
  .patch(auth_controller.protect_route, catigory_controller.update_catigory)
  .delete(auth_controller.protect_route, catigory_controller.detelte_catigory);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const catigory_controller = require("../controllers/catigory_controller");
const auth_controller = require("../controllers/auth_controller");

router
  .route("/")
  .get(catigory_controller.get_all_catigories)
  .post(auth_controller.protect_route, catigory_controller.create_catigory);
router
  .route("/:id")
  .patch(auth_controller.protect_route, catigory_controller.update_catigory)
  .delete(auth_controller.protect_route, catigory_controller.detelte_catigory);

module.exports = router;
>>>>>>> 0212859 (first commit)
