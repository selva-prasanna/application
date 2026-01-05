
import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = ({ cartItems, onOrderPlaced }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + quantity * price;
    }, 0);
  };

  const calculateSubtotal = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return price * quantity;
  };

  const calculateTotalBeforeDiscount = () => {
    return calculateTotal(); // Placeholder
  };

  const discountAmount = 0; // Placeholder for discount logic

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    //? Validate fields
    if (!firstName) errors.firstName = 'First Name is required.';
    if (!lastName) errors.lastName = 'Last Name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!phone) errors.phone = 'Phone Number is required.';
    if (!street) errors.street = 'Street is required.';
    if (!city) errors.city = 'City is required.';
    if (!state) errors.state = 'State is required.';
    if (!pincode) errors.pincode = 'Pin Code is required.';
    if (!country) errors.country = 'Country is required.';
    if (!paymentMethod) errors.paymentMethod = 'Payment Method is required.';

    if (paymentMethod === 'online') {
      if (!cardNumber || !expirationMonth || !expirationYear || !cvv || !cardholderName) {
        errors.paymentDetails = 'All payment details are required.';
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) errors.upiId = 'UPI ID is required.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setOrderSuccess(true);
    onOrderPlaced();
  };

  const isFormValid = () => {
    // *Validate delivery information
    const isDeliveryInfoValid = firstName && lastName && email && phone && street && city && state && pincode && country;
  
    // *Validate payment method selection
    const isPaymentMethodValid = paymentMethod;
  
    // *Validate payment details based on selected payment method
    if (paymentMethod === 'online') {
      return isDeliveryInfoValid && isPaymentMethodValid && cardNumber && expirationMonth && expirationYear && cvv && cardholderName;
    } else if (paymentMethod === 'upi') {
      return isDeliveryInfoValid && isPaymentMethodValid && upiId;
    } else if (paymentMethod === 'cod') {
      return isDeliveryInfoValid && isPaymentMethodValid;
    }
  
    return false;
  };
  
  

  return (
    <>
      {orderSuccess ? (
        <div className="order-success">
          <h2>Thank you for your purchase!</h2>
          <div className="receipt">
            <h3>Receipt</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <strong>Total: ${calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      ) : (
        <>
          <section className="page-header">
            <h2>Checkout</h2>
            <p>Please review your information and place your order</p>
          </section>

          <div className="checkout-container">
            {/* Order Summary Section */}
            <div className="summary-container">
              <h3>Order Summary</h3>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="summary-item">
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">Quantity: {item.quantity}</div>
                      </div>
                      <div className="item-pricing">
                        <div className="item-subtotal">Subtotal: ${calculateSubtotal(item).toFixed(2)}</div>
                        <div className="item-price">Each: ${parseFloat(item.price).toFixed(2)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-container">
                <div><strong>Total</strong></div>
                <div><strong>${calculateTotal().toFixed(2)}</strong></div>
              </div>
            </div>

            <div className="checkout-content">
              <div className="left-side">
                <form onSubmit={handleSubmit} aria-labelledby="delivery-info">
                  <h3 id="delivery-info">Delivery Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="firstName" 
                        aria-label="First Name" 
                        placeholder="First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className={`form-control ${validationErrors.firstName ? 'error-border' : ''}`} 
                      />
                      {validationErrors.firstName && <span className="error-text">{validationErrors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="lastName" 
                        aria-label="Last Name" 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        className={`form-control ${validationErrors.lastName ? 'error-border' : ''}`} 
                      />
                      {validationErrors.lastName && <span className="error-text">{validationErrors.lastName}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      aria-label="Email" 
                      placeholder="Email Address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className={`form-control ${validationErrors.email ? 'error-border' : ''}`} 
                    />
                    {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      id="phone" 
                      aria-label="Phone Number" 
                      placeholder="Phone Number" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className={`form-control ${validationErrors.phone ? 'error-border' : ''}`} 
                    />
                    {validationErrors.phone && <span className="error-text">{validationErrors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="street" 
                      aria-label="Street" 
                      placeholder="Street" 
                      value={street} 
                      onChange={(e) => setStreet(e.target.value)} 
                      className={`form-control ${validationErrors.street ? 'error-border' : ''}`} 
                    />
                    {validationErrors.street && <span className="error-text">{validationErrors.street}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="city" 
                        aria-label="City" 
                        placeholder="City" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        className={`form-control ${validationErrors.city ? 'error-border' : ''}`} 
                      />
                      {validationErrors.city && <span className="error-text">{validationErrors.city}</span>}
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="state" 
                        aria-label="State" 
                        placeholder="State" 
                        value={state} 
                        onChange={(e) => setState(e.target.value)} 
                        className={`form-control ${validationErrors.state ? 'error-border' : ''}`} 
                      />
                      {validationErrors.state && <span className="error-text">{validationErrors.state}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="pincode" 
                        aria-label="Pin Code" 
                        placeholder="Pin Code" 
                        value={pincode} 
                        onChange={(e) => setPincode(e.target.value)} 
                        className={`form-control ${validationErrors.pincode ? 'error-border' : ''}`} 
                      />
                      {validationErrors.pincode && <span className="error-text">{validationErrors.pincode}</span>}
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="country" 
                        aria-label="Country" 
                        placeholder="Country" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        className={`form-control ${validationErrors.country ? 'error-border' : ''}`} 
                      />
                      {validationErrors.country && <span className="error-text">{validationErrors.country}</span>}
                    </div>
                  </div>
                </form>
              </div>

              <div className="right-side">
                <div className='subtotal'>
                  <h3>Cart Totals</h3>
                  <p><span>Cart Subtotal:</span> ${calculateTotalBeforeDiscount().toFixed(2)}</p>
                  <p><span>Discount:</span> -${discountAmount.toFixed(2)}</p>
                  <p><span>Shipping:</span> Free</p>
                  <p><span>Total:</span> ${calculateTotal().toFixed(2)}</p>
                </div>

                <div className="payment-container">
                  <form aria-labelledby="payment-method">
                    <h3 id="payment-method">Payment Method</h3>
                    <div className="payment-options">
                      <label>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="cod" 
                          onChange={(e) => setPaymentMethod(e.target.value)} 
                          required 
                        />
                        Cash on Delivery
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="online" 
                          onChange={(e) => setPaymentMethod(e.target.value)} 
                          required 
                        />
                        Online Payment
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="upi" 
                          onChange={(e) => setPaymentMethod(e.target.value)} 
                          required 
                        />
                        UPI Payment
                      </label>
                      {validationErrors.paymentMethod && <span className="error-text">{validationErrors.paymentMethod}</span>}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className='place-order'>
              {paymentMethod === 'online' && (
                <form aria-labelledby="payment-info">
                  <h4 id="payment-info">Payment Information</h4>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="cardNumber" 
                      aria-label="Card Number" 
                      placeholder="Card Number" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)} 
                      className={`form-control ${validationErrors.paymentDetails ? 'error-border' : ''}`} 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="expirationMonth" 
                        aria-label="Expiration Month" 
                        placeholder="Expiration Month (MM)" 
                        value={expirationMonth} 
                        onChange={(e) => setExpirationMonth(e.target.value)} 
                        className={`form-control ${validationErrors.paymentDetails ? 'error-border' : ''}`} 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="expirationYear" 
                        aria-label="Expiration Year" 
                        placeholder="Expiration Year (YYYY)" 
                        value={expirationYear} 
                        onChange={(e) => setExpirationYear(e.target.value)} 
                        className={`form-control ${validationErrors.paymentDetails ? 'error-border' : ''}`} 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="cvv" 
                      aria-label="CVV" 
                      placeholder="CVV" 
                      value={cvv} 
                      onChange={(e) => setCvv(e.target.value)} 
                      className={`form-control ${validationErrors.paymentDetails ? 'error-border' : ''}`} 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="cardholderName" 
                      aria-label="Cardholder Name" 
                      placeholder="Cardholder Name" 
                      value={cardholderName} 
                      onChange={(e) => setCardholderName(e.target.value)} 
                      className={`form-control ${validationErrors.paymentDetails ? 'error-border' : ''}`} 
                    />
                  </div>
                </form>
              )}

              {paymentMethod === 'upi' && (
                <form aria-labelledby="upi-info">
                  <h4 id="upi-info">UPI Information</h4>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="upiId" 
                      aria-label="UPI ID" 
                      placeholder="UPI ID" 
                      value={upiId} 
                      onChange={(e) => setUpiId(e.target.value)} 
                      className={`form-control ${validationErrors.upiId ? 'error-border' : ''}`} 
                    />
                    {validationErrors.upiId && <span className="error-text">{validationErrors.upiId}</span>}
                  </div>
                </form>
              )}

              <button type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
