const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ============================
// App Setup
// ============================
const app = express();
const PORT = process.env.PORT || 3000;

// ============================
// CORS (Single, Clean, Production Safe)
// ============================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // 🔁 replace with real frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// ============================
// JWT Middleware
// ============================
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ============================
// MongoDB Models
// ============================
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
});

const ShopSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
});

const NewArrivalSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Product = mongoose.model("Product", ProductSchema);
const Shop = mongoose.model("Shop", ShopSchema);
const NewArrival = mongoose.model("NewArrival", NewArrivalSchema);
const User = mongoose.model("User", UserSchema);

// ============================
// Auth Routes (Public)
// ============================
const bcrypt = require("bcryptjs");

app.post("/users/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });
  res.json({ message: "User registered" });
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// ============================
// Public API
// ============================
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to API" });
});

app.get("/newArrival", async (req, res) => {
  const data = await NewArrival.find();
  res.json(data);
});

app.get("/shop", async (req, res) => {
  const data = await Shop.find();
  res.json(data);
});

// ============================
// Protected API (JWT Required)
// ============================
app.get("/products", verifyToken, async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.get("/user/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// ============================
// MongoDB Connection
// ============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ============================
// Server Start
// ============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
