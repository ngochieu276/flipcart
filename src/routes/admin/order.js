const express = require("express");
const { adminMiddleware } = require("../../common-middleware");
const { requireSignin } = require("../../common-middleware");
const {
  updateOrders,
  getCustomerOrders,
} = require("../../controller/admin/order");
const router = express.Router();

router.post("/order/update", requireSignin, adminMiddleware, updateOrders);

router.get(
  "/order/getCustomerOrders",
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
