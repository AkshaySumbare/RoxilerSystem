require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");
const ProductJson = require("./products.json");


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
   
    await Product.create(ProductJson)
    console.log("Success")
  } catch (error) {
    console.log(error);
  }
};
start();