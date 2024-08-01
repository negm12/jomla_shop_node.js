<<<<<<< HEAD
const router = require("express").Router();
const product_item_controller = require("../controllers/product_item_controller");
router
  .route("/")
  .get(product_item_controller.get_all_product_items)
  .post(product_item_controller.create_product_item);

router
  .route("/:product_id")
  .get(product_item_controller.get_product_item)
  .patch(product_item_controller.update_product_item)
  .delete(product_item_controller.delete_product_item);

router.route("/:product_id/sizes").post(product_item_controller.add_size);

router
  .route("/sizes/:size_id")
  .patch(product_item_controller.update_size)
  .delete(product_item_controller.delete_size);
module.exports = router;
=======
const router = require("express").Router();
const product_item_controller = require("../controllers/product_item_controller");
router
  .route("/")
  .get(product_item_controller.get_all_product_items)
  .post(product_item_controller.create_product_item);

router
  .route("/:product_id")
  .get(product_item_controller.get_product_item)
  .patch(product_item_controller.update_product_item)
  .delete(product_item_controller.delete_product_item);

router.route("/:product_id/sizes").post(product_item_controller.add_size);

router
  .route("/sizes/:size_id")
  .patch(product_item_controller.update_size)
  .delete(product_item_controller.delete_size);
module.exports = router;
>>>>>>> 0212859 (first commit)
