const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const Productsroute = require("./routes/product");
const mongoose = require("mongoose");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, UPDATE, PATCH, DELETE, HEAD",
  credential: true,
};
app.use(cors(corsOptions));

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is runing!");
});

app.use("/api/products", Productsroute);
