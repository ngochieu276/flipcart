const express = require("express");
const { userMiddleware, requireSignin } = require("../common-middleware");

const router = express.Router();

const { addAddress, getAddress } = require("../controller/address");

router.post("/user/address/create", requireSignin, userMiddleware, addAddress);

router.get("/user/getAddress", requireSignin, userMiddleware, getAddress);

module.exports = router;
