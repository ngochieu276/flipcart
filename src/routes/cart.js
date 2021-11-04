const express = require("express");
const { userMiddleware, requireSignin } = require("../common-middleware");

const router = express.Router();

const { addItemToCart, getCartItems } = require("../controller/cart");

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.get("/user/getCartItems", requireSignin, userMiddleware, getCartItems);

module.exports = router;
