
import React, { useState } from 'react';
import './MyOrders.css';

function MyOrders({ orderDetails }) {
  const [showInvoice, setShowInvoice] = useState(false);

  const handleViewReceipt = () => {
    setShowInvoice(!showInvoice);
  };

  const invoiceDetails = {
    orderDate: '03-09-2024',
    orderNumber: 'INV123456',
    billingAddress: '123 Main St, Coimbatore, Tamilnadu ',
    shippingAddress: '456 East St, Erode, Tamilnadu',
    paymentMethod: 'Case on delivery',
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.length === 0 ? (
            <tr>
              <td colSpan="5">Order is empty</td>
            </tr>
          ) : (
            orderDetails.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))
          )}
          {orderDetails.length > 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}><strong>Total</strong></td>
              <td><strong>${orderDetails.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="receipt-btn">
        <button onClick={handleViewReceipt}>{showInvoice ? 'Hide Receipt' : 'View Receipt'}</button>
      </div>

      {showInvoice && (
        <div className="invoice">
          <h3>Invoice Details</h3>
          <p><strong>Order Number:</strong> {invoiceDetails.orderNumber}</p>
          <p><strong>Order Date:</strong> {invoiceDetails.orderDate}</p>
          <p><strong>Billing Address:</strong> {invoiceDetails.billingAddress}</p>
          <p><strong>Shipping Address:</strong> {invoiceDetails.shippingAddress}</p>
          <p><strong>Payment Method:</strong> {invoiceDetails.paymentMethod}</p>

          <h4>Order Summary</h4>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total</strong></td>
                <td><strong>${orderDetails.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
            <div className="receipt-btn">
                <button>Download Receipt</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
