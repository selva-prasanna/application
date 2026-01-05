
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SingleProDetails from './SingleProDetails'; 
import NewArrivals from './NewArrivals'; 

const Banner = ({ addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <section id="banner" className="section-m1">
        <h4>Repair Service</h4>
        <h2>Up to <span>70% off </span> - All Tshirts and Accessories</h2>
        <Link to="/shop">
          <button className="btn normal">Explore more</button>
        </Link>
      </section>

      {selectedProduct ? (
        <SingleProDetails 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          addToCart={addToCart} // Pass addToCart here
        />
      ) : (
        <NewArrivals 
          onSelectProduct={setSelectedProduct} 
          addToCart={addToCart} // Pass addToCart here
        />
      )}

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>Unbeatable offers on timeless styles</span>
          <Link to="/shop">
            <button className="btn white">Learn More</button>
          </Link>
        </div>
        
        <div className="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>upcoming season</h2>
          <span>Fresh looks for the new season</span>
          <Link to="/shop">
            <button className="btn white">Collection</button>
          </Link>
        </div>
      </section>

      <section id="banner3" className="section-p1">
        <div className="banner-box">
          <h2>SUMMER SPECIAL</h2>
          <h3>Bright & Breezy - 30% OFF</h3>
        </div>
        
        <div className="banner-box banner-img2">
          <h2>FALL FAVORITES</h2>
          <h3>Autumn Collection - 40% OFF</h3>
        </div>
        
        <div className="banner-box banner-img3">
          <h2>WINTER WONDER</h2>
          <h3>Winter Collection - 50% OFF</h3>
        </div>
      </section>
    </>
  );
}

export default Banner;
