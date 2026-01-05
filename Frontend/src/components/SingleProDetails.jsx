
import React, { useState } from 'react';

const SingleProDetails = ({ product, onBack, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  //? Extract detailed product information
  const detailItems = product.details ? Object.entries(product.details) : [];

  //? Handle adding product to cart
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1000); 
    }
  };

  return (
    <div className="single-pro-details">
      {showNotification && (
        <div className="notification">
          Item added to cart!
        </div>
      )}
      <button className="back-btn" onClick={onBack}>Back</button>
      <div className="details-container">
        <div className="image-container">
          <img src={product.imgSrc} alt={product.name} />
        </div>
        <div className="info-container">
          <span>Brand: {product.brand}</span>
          <h3>{product.name}</h3>
          <h2>${product.price}</h2>
          <div className="select-size-quantity-container">
            <select name="" id="" className="select-size">
              <option value="">Select size</option>
              <option value="S (36)">S</option>
              <option value="M (38)">M</option>
              <option value="L (40)">L</option>
              <option value="XL (42)">XL</option>
              <option value="XXL (44)">XXL</option>
            </select>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)} // Ensure quantity is a positive integer
              min="1"
              className="quantity-input"
            />
          </div>
          <button 
            className="btn normal add-to-cart-btn" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {detailItems.length > 0 && (
        <div className="product-details">
          <h4>Product Details:</h4>
          <ul>
            {detailItems.map(([key, value], index) => (
              <p key={index}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}
              </p>
            ))}
          </ul>
        </div>
      )}

      {product.about && (
        <div className="about-item">
          <h4>About this item:</h4>
          <ul>
            {product.about.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleProDetails;
