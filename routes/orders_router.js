const router = require("express").Router();
const orders_controller = require("../controllers/orders_controller");
const auth_controller = require("../controllers/auth_controller");

router
  .route("/")
  .get(orders_controller.get_all_orders)
  .post(orders_controller.create_order);

// router.route("/");
router
  .route("/reject/:id")
  .patch(auth_controller.protect_route, orders_controller.reject_order);
router
  .route("/accept/:id")
  .patch(auth_controller.protect_route, orders_controller.accept_order);

router.route("/orders-stats").get(orders_controller.orders_stats);

module.exports = router;
