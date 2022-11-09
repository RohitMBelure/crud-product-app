const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userController } = require("./routes/user.routes");
const { productsController } = require("./routes/products.routes");
const { authentication } = require("./middlewares/authentication");
const { connection } = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Home page of products app");
});

app.use(cors());

app.use("/user", userController);
app.use("/products", authentication, productsController);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connecting to db successful");
  } catch (err) {
    console.log("Error connecting to db");
    console.log(err);
  }
  console.log(`listening on port ${process.env.PORT}`);
});
