
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css';

const Cart = ({ cartItems = [], onRemoveItem, onQuantityChange, auth, setShowLoginForm }) => {
  const [discountCode, setDiscountCode] = useState(localStorage.getItem('discountCode') || '');
  const [discountAmount, setDiscountAmount] = useState(0); // Start with 0, calculate as needed
  const navigate = useNavigate();

  const calculateSubtotal = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return quantity * price;
  };

  const calculateTotalBeforeDiscount = () => {
    return cartItems.reduce((total, item) => {
      const subtotal = calculateSubtotal(item);
      return total + subtotal;
    }, 0);
  };

  const applyDiscount = (subtotal) => {
    const validDiscountCodes = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
    };

    const discountPercentage = validDiscountCodes[discountCode.toUpperCase()] || 0;
    const discount = subtotal * discountPercentage;
    setDiscountAmount(discount);

    // Save the applied coupon and discount in localStorage
    localStorage.setItem('discountCode', discountCode);
    localStorage.setItem('discountAmount', discount.toString());
  };

  const calculateTotal = (subtotal) => {
    return subtotal - discountAmount;
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    onRemoveItem(id);
  };

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to your cart before proceeding.');
      return;
    }

    if (auth) {
      navigate('/checkout', { state: { discountAmount } }); // Pass discount amount to checkout page
    } else {
      if (typeof setShowLoginForm === 'function') {
        alert('Please login to proceed');
        setShowLoginForm(true);
      } else {
        console.error('setShowLoginForm is not a function');
      }
    }
  };

  useEffect(() => {
    const subtotal = calculateTotalBeforeDiscount();

    if (cartItems.length === 0) {
      setDiscountCode('');
      setDiscountAmount(0);
      localStorage.removeItem('discountCode');
      localStorage.removeItem('discountAmount');
    } else {
      applyDiscount(subtotal); // Recalculate discount whenever the cart changes
    }
  }, [cartItems, discountCode]); // Re-run this effect if cart items or discount code changes

  return (
    <>
      <section id="page-header" className="blog-header">
        <h2>#Cart</h2>
        <p>Add your coupon code & save up to 70%!</p>
      </section>

      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <th>Remove</th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="6">Your cart is empty</td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                      <DeleteIcon />
                    </button>
                  </td>
                  <td><img src={item.imgSrc} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <AddIcon />
                      </button>
                    </div>
                  </td>
                  <td>${calculateSubtotal(item).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <div>
            <input 
              type="text" 
              placeholder="Enter your coupon code" 
              value={discountCode}
              onChange={handleDiscountChange}
            />
            <button className="normal" onClick={() => applyDiscount(calculateTotalBeforeDiscount())}>Apply</button>
          </div>
        </div>

        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tbody>
              <tr>
                <td>Cart Subtotal</td>
                <td>${calculateTotalBeforeDiscount().toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>-${discountAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>Free</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${calculateTotal(calculateTotalBeforeDiscount()).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
          <button className="btn normal" onClick={handleProceedToCheckout}>Proceed to checkout</button>
        </div>
      </section>
    </>
  );
};

export default Cart;
