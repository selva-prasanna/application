

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//? Import Routes
const homeRoutes = require('./routes/homeRoutes'); 
const productRoutes = require('./routes/productRoutes');
const shopRoutes = require('./routes/shopRoutes'); 
const newArrivalRoutes = require('./routes/newArrivalRoutes'); 
const userRoutes = require('./routes/userRoutes'); // Import user routes
const verifyToken = require('./middleware/auth'); // Import JWT verification middleware

//? Models
const Product = require('./models/Product');
const Shop = require('./models/Shop'); 
const NewArrival = require('./models/NewArrival'); 

//? Data
const productsData = require('./products.json'); 
const newArrivalsData = require('./newArrivals.json');
const shopData = require('./shop.json'); 

const app = express();
const PORT = process.env.PORT || 5000;

//? Middleware
app.use(express.json());
app.use(cors());

//? Public Routes
app.use('/home', homeRoutes);
app.use('/newArrival', newArrivalRoutes);
app.use('/shop', shopRoutes); 
app.use('/users', userRoutes); 

//? Protected Routes - Only accessible with a valid JWT token
app.use('/products', verifyToken, productRoutes);
app.use('/user', verifyToken, userRoutes);


//? Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce')
  .then(() => {
    console.log('MongoDB connected...');
    importData();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

//? Connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

//? Function to import JSON data into MongoDB
const importData = async () => {
  try {
    //* Clear existing data if needed
    await Product.deleteMany();
    await NewArrival.deleteMany();
    await Shop.deleteMany(); 

    // *Insert new data from JSON files
    await Product.insertMany(productsData);
    await NewArrival.insertMany(newArrivalsData);
    await Shop.insertMany(shopData); 

    console.log('Data Imported Successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

//? Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
