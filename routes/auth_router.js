<<<<<<< HEAD
const router = require("express").Router();
const auth_controller = require("../controllers/auth_controller");

// router.route("/auto-login").get(auth_controller.auto_login);

router.route("/forgot-password").post(auth_controller.forgot_password);
router.route("/reset-password/:token").patch(auth_controller.reset_password);
router
  .route("/add-admin")
  .post(auth_controller.protect_route, auth_controller.create_admin);
router
  .route("/users")
  .get(auth_controller.protect_route, auth_controller.get_all_users);

router
  .route("/update-password")
  .patch(auth_controller.protect_route, auth_controller.update_password);

router
  .route("/update-me")
  .patch(auth_controller.protect_route, auth_controller.update_me);

router.route("/signin").post(auth_controller.signIn);
router.route("/login").post(auth_controller.login);

router
  .route("/user-count")
  .get(auth_controller.protect_route, auth_controller.user_count);

// auth_controller.protect_route,

module.exports = router;
=======
const router = require("express").Router();
const auth_controller = require("../controllers/auth_controller");

// router.route("/auto-login").get(auth_controller.auto_login);

router.route("/forgot-password").post(auth_controller.forgot_password);
router.route("/reset-password/:token").patch(auth_controller.reset_password);
router
  .route("/add-admin")
  .post(auth_controller.protect_route, auth_controller.create_admin);
router
  .route("/users")
  .get(auth_controller.protect_route, auth_controller.get_all_users);

router
  .route("/update-password")
  .patch(auth_controller.protect_route, auth_controller.update_password);

router
  .route("/update-me")
  .patch(auth_controller.protect_route, auth_controller.update_me);

router.route("/signin").post(auth_controller.signIn);
router.route("/login").post(auth_controller.login);

router
  .route("/user-count")
  .get(auth_controller.protect_route, auth_controller.user_count);

// auth_controller.protect_route,

module.exports = router;
>>>>>>> 0212859 (first commit)
