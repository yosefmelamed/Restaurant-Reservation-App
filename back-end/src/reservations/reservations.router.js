/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const cors = require("cors");
const router = require("express").Router();
const controller = require("./reservations.controller");

router
  .route("/")
  .get(controller.list)
  .get(cors(), controller.list)
  .post(controller.create);
router.route("/:reservation_id").get(controller.read).put(controller.update);
router
  .route("/:reservation_id/status")
  .get(controller.read2)
  .put(controller.update2);

module.exports = router;
