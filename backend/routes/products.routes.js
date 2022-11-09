const { Router } = require("express");
const { ProductsModel } = require("../models/Products.model");

const productsController = Router();

productsController.get("/", async (req, res) => {
  const { userId } = req.body;
  const products = await ProductsModel.find({ userId });
  res.send({ products });
});

productsController.post("/create", async (req, res) => {
  const { Name, Price, Category, Made_In, userId } = req.body;

  const new_product = new ProductsModel({
    Name,
    Price,
    Category,
    Made_In,
    userId,
  });

  try {
    await new_product.save();
    res.send({ message: "product added", new_product });
  } catch (err) {
    res.send({ message: "something went wrong, please try later" });
  }
});

productsController.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const temp = await ProductsModel.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    req.body
  );

  if (temp) {
    res.send({ message: "product updated" });
  } else {
    res.send({ message: "something went wrong, please try later" });
  }
});

productsController.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const temp = await ProductsModel.findOneAndDelete({
    _id: id,
    userId,
  });

  if (temp) {
    res.send({ message: "product deleted" });
  } else {
    res.send({ message: "something went wrong, please try later" });
  }
});

module.exports = { productsController };
