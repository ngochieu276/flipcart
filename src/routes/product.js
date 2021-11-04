const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");
const multer = require("multer");

const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
} = require("../controller/product");

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);

router.get("/product/:productId", getProductDetailsById);

// router.get("/category/getCategory", getCategories);

module.exports = router;
