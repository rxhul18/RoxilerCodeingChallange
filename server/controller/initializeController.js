const axios = require("axios");
const Transaction = require('../model/transaction');

exports.initializeController = async (req,res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany(); // Clear previous data
    await Transaction.insertMany(response.data); // Insert new data
    res.status(200).send("Database initialized successfully");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
};
