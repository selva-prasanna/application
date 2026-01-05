const mongoose = require('mongoose');

//? Define the Shop schema
const ShopSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    imgSrc: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: mongoose.Schema.Types.Mixed, required: true, default: 'No details provided' },
    about: { type: [String], required: true },
});

// ?Create the Shop model
const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;