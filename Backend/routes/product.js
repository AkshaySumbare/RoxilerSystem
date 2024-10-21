const express = require("express");
const getdata = require("../controllers/products");

const router = express.Router();

router.route("/getproducts").get(getdata.getAllProducts);
router.route("/paginate").get(getdata.Pagination);
router.route("/statistics").get(getdata.getStatisticsData);
router.route("/monthdata").get(getdata.getDataOfMonth);
router.route("/bar").get(getdata.getbarData);
router.route("/getcategory").get(getdata.getCategoryData);

module.exports = router;
