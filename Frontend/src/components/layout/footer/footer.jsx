import React, {useEffect, useState} from "react";
import './footer.component.css'
import '../../../css/style.css'
import '../../../css/style.min.css'
import '../../../css/bootstrap.css'
import '../../../css/bootstrap.min.css'
import '../../../css/bootstrap-reboot.css'
import '../../../css/bootstrap-reboot.min.css'
import '../../../css/bootstrap-grid.min.css'
import '../../../css/bootstrap-grid.css'
import '../../layout/themeColor.css'
import {NavLink, useNavigate} from "react-router-dom";
import {manageAccount} from "../../../services/manage-account.service";
import {useContext} from "react";
import {HeaderContext} from "../../../contexts/HeaderContext";


const Footer = () => {


  const [isSeller,setIsSeller] = useState(false)
  const [isLogged,setIsLogged] = useState(false)
  const {trigger,setTrigger} = useContext(HeaderContext)

  useEffect(() => {
    checkisLogged();
    checkSeller();


    return () => {
      console.log('Component unmounted');

    };
  }, [trigger]);


  const checkSeller=()=>{
    console.log('sellerID header',manageAccount.getSellerID())
    if(manageAccount.getSellerID()!==-1){
      setIsSeller(true);

    }
  }

  const checkisLogged= async () => {

    try {
      const isLogged = await manageAccount.isLoggedIn();
      console.log(isLogged)
      if (isLogged) {
        setIsLogged(true)
        console.log("Logged In")
      } else {
        // User is not logged in
      }
    } catch (error) {
      // Handle errors here
    }
  }
  return (
    <footer className="footer">
      <div className="container-fluid bg-secondary text-white mt-5 pt-15">
  <div className="row px-xl-5 pt-5">
    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5 ">
      <h5 className="text-white text-uppercase mb-4 ">Get In Touch</h5>
      <p className="mb-4">
      Our company is dedicated to providing high-quality products and exceptional customer service. We take pride in our commitment to excellence and strive to meet the unique needs of each of our customers. With years of experience in the industry, we have established a strong reputation for reliability and innovation. We look forward to serving you and exceeding your expectations.

      </p>
      
    </div>
    <div className="col-lg-8 col-md-12">
      <div className="row">
        <div className="col-md-4 mb-5">
          <h5 className="text-white text-uppercase mb-4 text-white">Quick Shop</h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2 nav-link" href="/">
              <i className="fa fa-angle-right mr-2" />
              Home
            </a>
            <a className="text-white mb-2 nav-link" href="/products">
              <i className="fa fa-angle-right mr-2" />
              Our Shop
            </a>
          
            <NavLink to={`/cart/${manageAccount.getCustomerID()}`} className="text-white mb-2 nav-link" >
              <i className="fa fa-angle-right mr-2" />
              Shopping Cart
            </NavLink>
            <a className="text-white mb-2 nav-link" href="/checkout">
              <i className="fa fa-angle-right mr-2" />
              Checkout
            </a>
            
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h5 className="text-white text-uppercase mb-4 text-white">My Account</h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2 nav-link text-10px" href="/my-orders">
              <i className="fa fa-angle-right mr-2" />
             My Orders
            </a>
            <a className="text-white mb-2 nav-link" href="dashboard">
              <i className="fa fa-angle-right mr-2" />
             My Store
            </a>
            
            <a className="text-white mb-2 nav-link" href="/user"> 
              <i className="fa fa-angle-right mr-2" />
              My profile
            </a>
            
            <a className="text-white mb-2 nav-link"
                  href="/"
                  onClick={() => {
                    manageAccount.logOut();
                    setIsLogged(false);
                    setIsSeller(false);
                    setTrigger(true);
                  }}
                >
                  <i className="fa fa-angle-right mr-2" /> Log Out
                </a>

            
          </div>
        </div>
        
        <div className="col-md-4 mb-5">
        <h5 className="text-white text-uppercase mb-4 text-white">Follow Us</h5>{/*
          <p>Subscribe to our newsletter for the latest updates, exclusive offers, and news about our products and services.</p>
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email Address"
              />
              <div className="input-group-append">
                <button className="btn custom-btn-warning text-dark">Sign Up</button>
              </div>
            </div>
          </form>*/}
          <div className="d-flex">
            <a className="btn custom-btn-warning btn-square mr-2 " href="/">
              <i className="fab fa-twitter text-dark" />
            </a>
            <a className="btn custom-btn-warning btn-square mr-2" href="/">
              <i className="fab fa-facebook-f text-dark" />
            </a>
            <a className="btn custom-btn-warning btn-square mr-2"  href="/">
              <i className="fab fa-linkedin-in text-dark" />
            </a>
            <a className="btn custom-btn-warning btn-square" href="/">
              <i className="fab fa-instagram text-dark" />
            </a>
          </div>

          <div><br></br><br></br>
          <p className="mb-2">
        <i className="fa fa-map-marker-alt custom-text-warning mr-3" />
        123 Street, Colombo 9, Sri Lanka 
      </p>
      <p className="mb-2">
        <i className="fa fa-envelope custom-text-warning mr-3 yellow"  />
        info@example.com
      </p>
      <p className="mb-0">
        <i className="fa fa-phone-alt custom-text-warning mr-3" />
        +012 345 67890
      </p>
          </div>
        </div>
      </div>
    </div>
  </div> 
  <div
    className="row border-top mx-xl-5 py-4"
    style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
  >
    <div className="col-md-6 px-xl-0">
      <p className="mb-md-0 text-center text-md-left text-white">
        ©{" "}
        
          Copyright 2023. All Rights Reserved. Designed by Group 5
        
      </p>
    </div>
    <div className="col-md-6 px-xl-0 text-center text-md-right">
      <img className="img-fluid" src="img/payments.png" alt="" />
    </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;
