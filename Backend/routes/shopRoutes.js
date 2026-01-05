const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// ?Get all shop items
router.get('/', async (req, res) => {
  try {
    const items = await Shop.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ?Get single shop item by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Shop.findOne({ id: req.params.id });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ?Create a new shop item
router.post('/', async (req, res) => {
  const newItem = new Shop({
    id: req.body.id,
    imgSrc: req.body.imgSrc,
    brand: req.body.brand,
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    about: req.body.about,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ?Update existing shop item by id
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Shop.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//?Delete shop item by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Shop.findOneAndDelete({ id: req.params.id });
    if (deletedItem) {
      res.status(200).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
