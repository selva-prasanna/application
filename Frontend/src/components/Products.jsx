import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import productsData from './Products.json'; 
import SingleProDetails from './SingleProDetails'; 
import './Shop.css'; // Ensure the CSS file includes styles for .notification

const Products = ({ addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setNotification('Item added to cart!');
    setTimeout(() => setNotification(''), 1000); // Hide notification after 1 second
  };

  return (
    <div>
      {selectedProduct ? (
        <SingleProDetails 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          addToCart={(product) => {
            handleAddToCart(product); // Notify when adding to cart
            setSelectedProduct(null); // Navigate back after adding
          }} 
        />
      ) : (
        <section id="product1" className="section-p1">
          <h2>Featured Products</h2>
          <p>Modern fashion that makes a statement</p>
          <div className="pro-container">
            {productsData.map((product) => (
              <div className="pro" key={product.id}>
                <div className="pro-img" onClick={() => setSelectedProduct(product)}>
                  <img src={product.imgSrc} alt={product.name} />
                </div>
                <div className="des">
                  <span>{product.brand}</span>
                  <h5>{product.name}</h5>
                  <div className="star">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas"><StarIcon /></i>
                    ))}
                  </div>
                  <h4>${product.price}</h4>
                </div>
                <button 
                  className="cart" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleAddToCart(product); 
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Products;
