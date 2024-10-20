const Product = require("../models/product");

// ****************Create an API to list the all transactions
const getAllProducts = async (req, res) => {
  const { category, title, price, description, sort, select } = req.query;
  const queryObject = {};
  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }
  if (description) {
    queryObject.description = { $regex: description, $options: "i" };
  }
  if (price) {
    queryObject.price = { $regex: price, $options: "i" };
  }

  let result = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    result = result.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    result = result.select(selectFix);
  }

  //**********************************88pagination functionality****************
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const myData = await result;

  res.status(200).json({ myData, nbHits: myData.length });
};

// ***************Create an API for statistics********************
const getStatisticsData = async (req, res) => {
  const month = req.query.month;

  if (!month) {
    return res.status(400).send("Please provide month.");
  }

  try {
    const totalSoldItems = await Product.aggregate([
      {
        $match: {
          sold: true,
        },
      },
      {
        $project: {
          month: {
            $month: "$dateOfSale",
          },
        },
      },

      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $count: "totalSoldItems",
      },
    ]);

    const totalUnsoldItems = await Product.aggregate([
      {
        $match: {
          sold: false,
        },
      },
      {
        $project: {
          month: {
            $month: "$dateOfSale",
          },
        },
      },

      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $count: "totalUnsoldItems",
      },
    ]);

    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          sold: true,
        },
      },
      {
        $project: {
          month: {
            $month: "$dateOfSale",
          },
          price: "$price",
        },
      },

      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);

    res.json({
      totalSoldItems:
        totalSoldItems.length > 0 ? totalSoldItems[0].totalSoldItems : 0,
      totalUnsoldItems:
        totalUnsoldItems.length > 0 ? totalUnsoldItems[0].totalUnsoldItems : 0,
      total: totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//**************************Bar Chart********************************/

const getbarData = async (req, res) => {
  const priceRanges = [
    { min: 0, max: 100, label: "0 - 100" },
    { min: 101, max: 200, label: "101 - 200" },
    { min: 201, max: 300, label: "201 - 300" },
    { min: 301, max: 400, label: "301 - 400" },
    { min: 401, max: 500, label: "401 - 500" },
    { min: 501, max: 600, label: "501 - 600" },
    { min: 601, max: 700, label: "601 - 700" },
    { min: 701, max: 800, label: "701 - 800" },
    { min: 801, max: 900, label: "801 - 900" },
    { min: 901, max: Infinity, label: "901 - above" },
  ];

  try {
    const month = req.query.month;
    const monthInt = parseInt(month);

    if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return res.status(400).json({ message: "please provide month properly" });
    }

    const products = await Product.aggregate([
      {
        $addFields: { monthOfSale: { $month: "$dateOfSale" } },
      },
      {
        $match: { monthOfSale: monthInt },
      },
    ]);

    const rangeCount = priceRanges.map((range) => {
      const count = products.filter(
        (product) => product.price >= range.min && product.price <= range.max
      ).length;
      return { range: range.label, count };
    });

    res.json(rangeCount);
  } catch (error) {
    res.status(500).json({ message: "something went wrong.", error });
  }
};

// ******************8GetMonthData**************************

const getDataOfMonth = async (req, res) => {
  const month = req.query.month;

  try {
    const transactions = await Product.aggregate([
      {
        $project: {
          title: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
          sold: 1,
          dateOfSale: 1,
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
    ]);

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getStatisticsData,
  getbarData,
  getDataOfMonth,
};
