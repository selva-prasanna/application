
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productsData = require('../products.json');

//? Import products from JSON file into MongoDB
router.post('/import', async (req, res) => {
    try {
        // *Clear existing products if needed
        await Product.deleteMany();
        
        // *Insert new products from JSON file
        await Product.insertMany(productsData);
        
        res.status(201).json({ message: 'Products imported successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Create a new product
router.post('/', async (req, res) => {
    try {
        const productData = {
            id: req.body.id,
            imgSrc: req.body.imgSrc,
            brand: req.body.brand,
            name: req.body.name,
            price: req.body.price,
            details: req.body.details,
            about: req.body.about,
        };

        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ?Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Update product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//? Delete product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
