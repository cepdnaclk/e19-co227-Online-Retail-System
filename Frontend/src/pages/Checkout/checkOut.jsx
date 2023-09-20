import React, { useState } from 'react';
import './style.css'

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address1: '',
    address2: '',
    address3: '',
    paymentMethod: 'creditCard',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission, send data to the server, and process the order.
    // You would typically make an API request to create the order on the server.
    console.log('Form data:', formData);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label  htmlFor="firstName" >First Name:</label>  
          <input className = "inputs"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="lastName">Last Name:</label>
          <input className = "inputs"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="email">Email:</label>
          <input className = "inputs"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="mobile">Mobile:</label>
          <input className = "inputs"
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="address1">Address 1:</label>
          <input className = "inputs"
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="address2">Address 2:</label>
          <input className = "inputs"
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label  htmlFor="address3">Address 3:</label>
          <input className = "inputs"
            type="text"
            id="address3"
            name="address3"
            value={formData.address3}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}

export default Checkout;
