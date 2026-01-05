
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Products from './components/Products';
import Banner from './components/Banner';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginForm from './components/LoginForm';
import MyOrders from './components/MyOrders';

function App() {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [shopError, setShopError] = useState('');

  // Fetch home data using Axios
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/home');
        setHomeData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  // Fetch shop data using Axios
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shop');
        setShopData(response.data);
      } catch (error) {
        setShopError('Error fetching shop data');
        console.error('Error fetching shop data:', error);
      }
    };

    fetchShopData();
  }, []);

  // Fetch new arrivals data using Axios
  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/newArrival');
        setNewArrivalData(response.data);
      } catch (error) {
        console.error('Error fetching new arrivals data:', error);
      }
    };

    fetchNewArrivalData();
  }, []);

  // Fetch product data using Axios
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    if (auth) {
      const savedCart = JSON.parse(localStorage.getItem('userCart')) || [];
      setCart(savedCart);
    }
  }, [auth]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const updatedCart = prevCart.some(item => item.id === product.id)
        ? prevCart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
          )
        : [...prevCart, { ...product, quantity: product.quantity || 1 }];
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleOrderPlaced = () => {
    setOrderDetails(cart); // Save the cart as order details
    setCart([]); // Reset the cart to zero items after order is placed
    localStorage.removeItem('userCart');
    setOrderPlaced(true); // Set the orderPlaced state to true
  };

  return (
    <Router>
      <Header 
        cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        setAuth={setAuth} 
        auth={auth} 
        setCart={setCart} 
        cart={cart} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Hero data={homeData.hero} />
              <Feature data={homeData.feature} />
              <Products addToCart={addToCart} products={productData} />
              <Banner addToCart={addToCart} newArrivals={newArrivalData} />
            </>
          } 
        />
        <Route 
          path="/home" 
          element={
            <>
              <Hero data={homeData.hero} />
              <Feature data={homeData.feature} />
              <Products addToCart={addToCart} products={productData} />
              <Banner addToCart={addToCart} newArrivals={newArrivalData} />
            </>
          } 
        />
        <Route path="/shop" element={<Shop addToCart={addToCart} shopItems={shopData} />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cart}
              onRemoveItem={removeItem}
              onQuantityChange={updateQuantity}
              auth={auth}
              setShowLoginForm={setShowLoginForm}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            auth 
              ? orderPlaced 
                ? <MyOrders orderDetails={orderDetails} /> 
                : <Checkout cartItems={cart} onOrderPlaced={handleOrderPlaced} />
              : (showLoginForm && <LoginForm setAuth={setAuth} />)
          } 
        />
        <Route path="/myorders" element={<MyOrders orderDetails={orderDetails} />} /> 
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
