import React, { useState } from 'react';
import './style.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Checkout(handleSubmit) {
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

  const navigate = useNavigate();
  const [error,setError] = useState(false)



  const handlePaymentChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      paymentMethod: value,
    });
  };



  const paymentMethods = [
    { id: "paypal", label: "Paypal" },
    { id: "creditCard", label: "Credit Card" },
  ];
  
  return (
    <div className="container-fluid">
  <div className="row px-xl-5">
    <div className="col-lg-12">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-white pr-3">Billing</span>
      </h5>

      {/*input form*/}
      <form onSubmit={handleSubmit}>  
        <div className="bg-light p-30 mb-5">
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                  data-testid="firstName"
                id="firstName"
                name="firstName"
                value={formData.firstName}            
                className="form-control" 
                type="text" 
                onChange={handleInputChange}
                required              
                placeholder="John" />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName"
                name="lastName"
                value={formData.lastName}            
                className="form-control"
                onChange={handleInputChange}
                required 
                type="text" 
                placeholder="Doe" />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                className="form-control"
                onChange={handleInputChange}
                required
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="mobile">Mobile No</label>
              <input
                id="mobile"
                name="mobile"
                value={formData.mobile}            
                className="form-control"
                onChange={handleInputChange}
                required
                type="tel"
                placeholder="+94 "
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="address1">Address Line 1</label>
              <input
                id="address1"
                name="address1"
                value={formData.address1}            
                className="form-control"
                onChange={handleInputChange}
                required
                type="text"
                placeholder="123 Street"
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="address2">Address Line 2</label>
              <input
                id="address2"
                name="address2"
                value={formData.address2}            
                className="form-control"
                onChange={handleInputChange}
                required
                type="text"
                placeholder="123 Street"
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="address3">Address Line 3</label>
              <input
                id="address3"
                name="address3"
                value={formData.address3}            
                className="form-control"
                onChange={handleInputChange}
                required
                type="text"
                placeholder="123 Street"
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Payment Method</label>
              {paymentMethods.map((method) => (
                <div className="custom-control custom-radio" key={method.id}>
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="payment"
                    id={method.id}
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handlePaymentChange}
                  />
                  <label className="custom-control-label" htmlFor={method.id}>
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>  
      </form>      
      </div>
    </div>
  </div>
  );
}

export default Checkout;
