// const router = require("express").Router();
const router = require("express").Router();
const auth_controller = require("../controllers/auth_controller");

const review_controller = require("../controllers/review_controller");

router
  .route("/")
  .get(review_controller.get_product_reviews)
  .post(auth_controller.protect_route, review_controller.create_review);
router
  .route("/:id")
  .delete(auth_controller.protect_route, review_controller.delete_review)
  .patch(auth_controller.protect_route, review_controller.update_review);

module.exports = router;
