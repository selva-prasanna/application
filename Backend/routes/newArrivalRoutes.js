const express = require('express');
const router = express.Router();
const NewArrival = require('../models/NewArrival');
const newArrivalsData = require('../newArrivals.json');

//? Import new arrivals data from JSON file into MongoDB
router.post('/import', async (req, res) => {
    try {
        // *Clear existing new arrivals if needed
        await NewArrival.deleteMany();
        
        // *Insert new arrivals from JSON file
        await NewArrival.insertMany(newArrivalsData);
        
        res.status(201).json({ message: 'New arrivals imported successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Create new new-arrival
router.post('/', async (req, res) => {
    const newArrivalData = {
      id: req.body.id,
      imgSrc: req.body.imgSrc,
      brand: req.body.brand,
      name: req.body.name,
      price: req.body.price,
      details: req.body.details,
      about: req.body.about,
    };
  
    const newArrival = new NewArrival(newArrivalData);
  
    try {
      const savedArrival = await newArrival.save();
      res.status(201).json(savedArrival);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//? Get all new arrivals
router.get('/', async (req, res) => {
    try {
        const newArrivals = await NewArrival.find();
        res.status(200).json(newArrivals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Get single new arrival by ID
router.get('/:id', async (req, res) => {
    try {
        const newArrival = await NewArrival.findOne({ id: req.params.id });
        if (!newArrival) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(newArrival);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ?Update new arrival by ID
router.put('/:id', async (req, res) => {
    try {
        const newArrival = await NewArrival.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!newArrival) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(newArrival);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ?Delete new arrival by ID
router.delete('/:id', async (req, res) => {
    try {
        const newArrival = await NewArrival.findOneAndDelete({ id: req.params.id });
        if (!newArrival) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
