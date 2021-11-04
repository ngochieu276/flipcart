const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });
  console.log(req.body, req.files);
  const { name, price, description, category, quantity, createBy } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  console.log(req.files);
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createBy: req.user._id,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ err });
    if (product) return res.status(201).json({ product });
  });
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) return res.status(400).json({ error });
          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                productsByPrice: {
                  under5m: products.filter(
                    (product) => product.price <= 5000000
                  ),
                  under10m: products.filter(
                    (product) =>
                      product.price > 5000000 && product.price <= 10000000
                  ),
                  under15m: products.filter(
                    (product) =>
                      product.price > 10000000 && product.price <= 15000000
                  ),
                  under20m: products.filter(
                    (product) =>
                      product.price > 15000000 && product.price <= 20000000
                  ),
                  under30m: products.filter(
                    (product) =>
                      product.price > 20000000 && product.price <= 300000000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({
              products,
            });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) return res.status(200).json({ product });
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
