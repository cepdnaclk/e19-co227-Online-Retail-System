import React from "react";
import './footer.component.css'
import '../../../css/style.css'
import '../../../css/style.min.css'
import '../../../css/bootstrap.css'
import '../../../css/bootstrap.min.css'
import '../../../css/bootstrap-reboot.css'
import '../../../css/bootstrap-reboot.min.css'
import '../../../css/bootstrap-grid.min.css'
import '../../../css/bootstrap-grid.css'



const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid bg-secondary text-white mt-5 pt-5">
  <div className="row px-xl-5 pt-5">
    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5 ">
      <h5 className="text-white text-uppercase mb-4 ">Get In Touch</h5>
      <p className="mb-4">
      Our company is dedicated to providing high-quality products and exceptional customer service. We take pride in our commitment to excellence and strive to meet the unique needs of each of our customers. With years of experience in the industry, we have established a strong reputation for reliability and innovation. We look forward to serving you and exceeding your expectations.

      </p>
      <p className="mb-2">
        <i className="fa fa-map-marker-alt text-warning mr-3" />
        123 Street, Colombo 9, Sri Lanka 
      </p>
      <p className="mb-2">
        <i className="fa fa-envelope text-warning mr-3 yellow"  />
        info@example.com
      </p>
      <p className="mb-0">
        <i className="fa fa-phone-alt text-warning mr-3" />
        +012 345 67890
      </p>
    </div>
    <div className="col-lg-8 col-md-12">
      <div className="row">
        <div className="col-md-4 mb-5">
          <h5 className="text-white text-uppercase mb-4 text-white">Quick Shop</h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2" href="/">
              <i className="fa fa-angle-right mr-2" />
              Home
            </a>
            <a className="text-white mb-2" href="/products">
              <i className="fa fa-angle-right mr-2" />
              Our Shop
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Shop Detail
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Shopping Cart
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Checkout
            </a>
            <a className="text-white" href="#">
              <i className="fa fa-angle-right mr-2" />
              Contact Us
            </a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h5 className="text-white text-uppercase mb-4 text-white">My Account</h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2" href="/">
              <i className="fa fa-angle-right mr-2" />
              Home
            </a>
            <a className="text-white mb-2" href="/products">
              <i className="fa fa-angle-right mr-2" />
              Our Shop
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Shop Detail
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Shopping Cart
            </a>
            <a className="text-white mb-2" href="#">
              <i className="fa fa-angle-right mr-2" />
              Checkout
            </a>
            <a className="text-white" href="#">
              <i className="fa fa-angle-right mr-2" />
              Contact Us
            </a>
          </div>
        </div>
        <div className="col-md-4 mb-5">
          <h5 className="text-white text-uppercase mb-4 text-white">Newsletter</h5>
          <p>Subscribe to our newsletter for the latest updates, exclusive offers, and news about our products and services.</p>
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email Address"
              />
              <div className="input-group-append">
                <button className="btn btn-warning text-dark">Sign Up</button>
              </div>
            </div>
          </form>
          <h6 className="text-white text-uppercase mt-4 mb-3 text-white">Follow Us</h6>
          <div className="d-flex">
            <a className="btn btn-warning btn-square mr-2 " href="#">
              <i className="fab fa-twitter text-dark" />
            </a>
            <a className="btn btn-warning btn-square mr-2" href="#">
              <i className="fab fa-facebook-f text-dark" />
            </a>
            <a className="btn btn-warning btn-square mr-2"  href="#">
              <i className="fab fa-linkedin-in text-dark" />
            </a>
            <a className="btn btn-warning btn-square" href="#">
              <i className="fab fa-instagram text-dark" />
            </a>
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
        <a className="text-warning text-#ff377" href="#">
          Domain
        </a>
        . All Rights Reserved. Designed by
        <a className="text-warning" href="https://htmlcodex.com">
          HTML Codex
        </a>
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
