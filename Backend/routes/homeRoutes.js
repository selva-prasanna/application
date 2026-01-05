// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const NewArrival = require('../models/NewArrival');

//? Get both products and new arrivals for the home page
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const newArrivals = await NewArrival.find();
    res.status(200).json({ products, newArrivals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
