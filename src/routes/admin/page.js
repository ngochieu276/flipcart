const express = require("express");
const { upload, adminMiddleware } = require("../../common-middleware");
const { createPage, getPage } = require("../../controller/admin/page");
const { requireSignin } = require("../../common-middleware");
const router = express.Router();

router.post(
  "/page/create",
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

router.get("/page/:category/:type", getPage);

module.exports = router;
