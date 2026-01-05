import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import newArrivalsData from './NewArrivals.json'; // Renamed the import to avoid conflicts
import SingleProDetails from './SingleProDetails';

const NewArrivals = ({ addToCart, onSelectProduct }) => {
  const [notification, setNotification] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setNotification('Item added to cart!');
    setSelectedProduct(null); // Return to product list view immediately
    setTimeout(() => setNotification(''), 1000); // Show notification for 1 second
  };

  return (
    <div>
      {selectedProduct ? (
        <SingleProDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          addToCart={(product) => {
            handleAddToCart(product);
          }}
        />
      ) : (
        <>
          <section id="product1" className="section-p1">
            <h2>New Arrivals</h2>
            <p>Style meets comfort in our new arrivals</p>
            <div className="pro-container">
              {newArrivalsData.map((product) => (
                <div key={product.id} className="pro">
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

          {notification && (
            <div className="notification">
              {notification}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewArrivals;
