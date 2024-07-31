const router = require("express").Router();
const product_controller = require("../controllers/product_controller");
const auth_controller = require("../controllers/auth_controller");
router
  .route("/")
  .get(product_controller.get_all_products)
  .post(auth_controller.protect_route, product_controller.create_product);

router.route("/product-stats").get(product_controller.products_stats);
router
  .route("/:id")
  .get(product_controller.get_product)
  .patch(auth_controller.protect_route, product_controller.update_product)
  .delete(auth_controller.protect_route, product_controller.delete_product);

module.exports = router;
