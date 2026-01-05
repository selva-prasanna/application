
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

//? Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
