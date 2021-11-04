const express = require("express");
const { adminMiddleware, requireSignin } = require("../common-middleware");

const router = express.Router();
const multer = require("multer");

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
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category");

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.post(
  "/category/update",

  upload.array("categoryImage"),
  updateCategories
);
router.post("/category/delete", deleteCategories);

router.get("/category/getCategory", getCategories);

module.exports = router;
