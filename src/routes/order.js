const express = require("express");
const { userMiddleware, requireSignin } = require("../common-middleware");

const router = express.Router();

const { addOrder, getOrders } = require("../controller/order");

router.post("/user/addOrder", requireSignin, userMiddleware, addOrder);

router.get("/user/getOrders", requireSignin, userMiddleware, getOrders);

module.exports = router;
