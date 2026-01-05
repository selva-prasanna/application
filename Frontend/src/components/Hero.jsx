import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero">
      <h4>Exclusive Offer</h4>
      <h2>Massive Savings</h2>
      <h1>Across All Categories</h1>
      <p>Unlock extra discounts with coupons—up to 70% off!</p>
      <button>
        <Link to="/shop">Shop Now</Link>
      </button>
    </section>
  );
};

export default Hero;
