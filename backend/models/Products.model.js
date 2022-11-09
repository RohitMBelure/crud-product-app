const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Category: { type: String, required: true },
  Made_In: { type: String, required: true },
  userId: { type: String },
});

const ProductsModel = mongoose.model("product", ProductsSchema);

module.exports = { ProductsModel };
