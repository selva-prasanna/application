import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import Products from './Shop.json';
import SingleProDetails from './SingleProDetails';
import './Shop.css';

const Shop = ({ addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(''); // State for notifications

  const productsPerPage = 20;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(Products.length / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 1000); // Hide after 1 second
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    showNotification('Item added to cart!');
  };

  return (
    <div>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {selectedProduct ? (
        <SingleProDetails 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          addToCart={(product) => {
            handleAddToCart(product);
            setSelectedProduct(null);
          }} 
        />
      ) : (
        <>
          <section id="page-header">
            <h2>#stayhome</h2>
            <p>Save more with coupons and up to 70% off!</p>
          </section>

          <section id="product1" className="section-p1">
            <div className="pro-container">
              {currentProducts.map((product) => (
                <div 
                  className="pro" 
                  key={product.id} 
                >
                  <div 
                    className="pro-img" 
                    onClick={() => setSelectedProduct(product)} // Show details on image click
                  >
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
                      e.stopPropagation(); // Prevent click event from propagating to parent
                      handleAddToCart(product); 
                    }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section id="pagination" className="section-p1">
            <ul>
              {pageNumbers.map(number => (
                <li key={number} onClick={() => handlePageChange(number)}>
                  {number}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Shop;
