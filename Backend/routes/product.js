const express = require("express");
const getdata = require("../controllers/products");

const router = express.Router();

router.route("/getproducts").get(getdata.getAllProducts);
router.route("/statistics").get(getdata.getStatisticsData);
router.route("/monthdata").get(getdata.getDataOfMonth);
router.route("/bar").get(getdata.getbarData);


module.exports = router;
