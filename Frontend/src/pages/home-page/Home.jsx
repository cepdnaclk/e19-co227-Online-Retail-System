import React, { useState, useEffect } from "react";
import './Home.component.css';
import Footer from "../../components/layout/footer/footer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../../css/style.css'
import '../../css/style.min.css'
import '../../css/bootstrap.css'
import '../../css/bootstrap.min.css'
import '../../css/bootstrap-reboot.css'
import '../../css/bootstrap-reboot.min.css'
import '../../css/bootstrap-grid.min.css'
import '../../css/bootstrap-grid.css'
import img1 from '../../assets/carousel-1.jpg'
import img2 from '../../assets/carousel-2.jpg'
import img3 from '../../assets/carousel-3.jpg'
import imgoffer1 from '../../assets/offer-1.jpg'
import imgoffer2 from '../../assets/offer-2.jpg'
import Categories from "../../components/layout/categories/categories";


//import 'animate.css/animate.min.css';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSellingProducts: [],
      newlyAddedProducts: [],
    };
  }

  componentDidMount() {
    // Fetch top selling products and newly added products data
    this.fetchTopSellingProducts();
    this.fetchNewlyAddedProducts();
  }

  fetchTopSellingProducts() {
    // Make an API request to fetch top selling products
    axios.get("http://localhost:8081/api/v1/top-selling-products")
      .then((response) => {
        this.setState({ topSellingProducts: response.data });
      })
      .catch((error) => {
        console.error("Error fetching top selling products:", error);
      });
  }

  fetchNewlyAddedProducts() {
    // Make an API request to fetch newly added products
    axios.get("http://localhost:8081/api/v1/newly-added-products")
      .then((response) => {
        this.setState({ newlyAddedProducts: response.data });
      })
      .catch((error) => {
        console.error("Error fetching newly added products:", error);
      });
  }

  renderProducts(products) {
    return (
      <div className="product-list">

{products.map((product) => (
          <div key={product.productID} className="product-item mb-4"><NavLink to={`/product/${product.productID}`} className="nav-link-style">
          <div className="product-img position-relative overflow-hidden">
            <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
            <div className="product-action">
              <a className="btn btn-outline-dark btn-square" href="cart/:id">
                <i className="fa fa-shopping-cart" />
              </a>
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="far fa-heart" />
              </a>
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-sync-alt" />
              </a>
              <a className="btn btn-outline-dark btn-square" href="">
                <i className="fa fa-search" />
              </a>
            </div>
          </div>
          <div className="title text-center py-4">
            <a className="h4 text-decoration-none text-truncate" href="">
            {product.productName}
            </a>
            <div className="d-flex align-items-center justify-content-center mt-2 w-75 text-center">
              <h5>LKR {product.productPrice}</h5>
              <h6 className="d-flex align-items-center text-muted ml-2 ">
                <del>LKR {product.productPrice+100}</del>
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1 color-yellow">
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small>(99)</small>
            </div>
          </div></NavLink>
        </div>
        
          
        ))}
      </div>
    );
  }
  
  

  render() {
    return (
      <div>
        
        <div className="home-page">
          {/* Introductory Section */}
          <section className="intro-section">
          
            
          <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
              <li data-target="#header-carousel" data-slide-to="1" ></li>
              <li data-target="#header-carousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item position-relative active" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src={img1} style={{ objectFit: 'cover' }} alt="" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Elevate Your Lifestyle</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Revamp your surroundings and enhance your daily living with our curated selection of home and lifestyle products</p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/products">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src={img2} style={{ objectFit: 'cover' }} alt="" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src={img3} style={{ objectFit: 'cover' }} alt="" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src={imgoffer1} alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="/products" className="btn btn-primary">Shop Now</a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src={imgoffer2} alt="fdg" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="/products" className="btn btn-primary">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>


            
          </section>
          <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fa fa-check text-primary m-0 mr-3 custom-yellow-icon" ></h1>
                <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fa fa-shipping-fast text-primary m-0 mr-2 "></h1>
                <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
              </div>
            </div>
          
          </div></div>
          
          <h2>Top Selling</h2>
          {this.renderProducts(this.state.topSellingProducts)}
          
          <h2>New Products</h2>
          {this.renderProducts(this.state.newlyAddedProducts)}
        </div>
        <Categories/>
        <Footer />
      </div>
    );
  }
}

export default Home;