const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

const createCategories = (categories, parentId = null) => {
  const categoriesList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoriesList.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
      type: cate.type,
    });
  }
  return categoriesList;
};

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

  if (req.file) {
    categoryObj.categoryImage = "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);

  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoriesList = createCategories(categories);

      return res.status(200).json({ categoriesList });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updateCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updateCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updateCategories.push(updateCategory);
    }
    return res.status(201).json({ updateCategories: updateCategories });
  } else {
    const category = { name, type };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updateCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updateCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  console.log(ids);
  const deleCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleleCategory = await Category.findOneAndDelete({
      _id: ids[i].value,
    });
    deleCategories.push(deleleCategory);
  }
  if (deleCategories.length == ids.length) {
    res.status(201).json({ message: "Category remove" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
