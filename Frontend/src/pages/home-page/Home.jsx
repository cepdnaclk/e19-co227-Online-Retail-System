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
import imgoffer3 from '../../assets/offer-3.jpg'
import imgoffer4 from '../../assets/offer-4.jpg'
import Categor from "../../components/layout/categories/categor";
import { Link } from "react-router-dom";
import '../../components/layout/themeColor.css'
import {homePageService} from "../../services/home-page.services";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSellingProducts: [],
      newlyAddedProducts: [],
    };
  }

  componentDidMount() {
    
    this.fetchTopSellingProducts();
    this.fetchNewlyAddedProducts();
  }

  fetchTopSellingProducts() {

    homePageService.getTopSellingProducts().then(response=>{

      if(response!==undefined){
        this.setState({ topSellingProducts: response });
      }
      this.setState({ topSellingProducts: response });
    }).catch((error) => {
      console.error("Error fetching top selling products:", error);
    });
  }

  fetchNewlyAddedProducts() {

    homePageService.getNewlyAddedProducts().then((response) => {
      if(response!==undefined){
        this.setState({ newlyAddedProducts: response });
      }

    }).catch((error) => {
      console.error("Error fetching newly added products:", error);
    });


  }

  renderProducts(products) {
    return (
      <div className="product-list">

        {products.map((product) => (
          <div key={product.productID} className="product-item mb-4">
            <div className="product-img position-relative overflow-hidden">
              <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
              <div className="product-action">

                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square" style={{width:'85px'}}>
                  <i className="fa fa-eye" /> View
                </Link>

              </div>
            </div>
            
            <div className="title text-center py-4"><NavLink to={`/product/${product.productID}`} className="nav-link-style">
              <div className="h6 ">
                {product.productName}
              </div>
              <div className="d-flex align-items-center justify-content-center mt-2">
                <h6>${product.productPrice}</h6>
                <h6 className="text-muted ml-2">
                  <del>
                    ${product.productPrice < 5
                      ? product.productPrice + product.productPrice / 10
                      : product.productPrice + Math.floor(product.productPrice / 20)}
                  </del>
                </h6>
              </div>

         </NavLink>
            </div>
          </div>
        ))}
      </div>
    );
  } 
  

  render() {
    return (
      <div>
        
        <div className="home-page">
        <section className="intro-section content">
          
            
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-bs-ride="carousel">
         

            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#header-carousel"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>
            <div className="carousel-inner">
            <div className="carousel-item position-relative active" style={{ height: '430px' }}>
              <img className="position-absolute w-100 h-100" src={img1} style={{ objectFit: 'cover' }} alt="" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Elevate Your Lifestyle</h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Revamp your surroundings and enhance your daily living with our curated selection of home and lifestyle products</p>
                  <div className="text-center">
                    <a data-testid="shop-now" className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/products">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>


              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src={img2} style={{ objectFit: 'cover' }} alt="" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3"style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Electronics</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Elevate your technology experience with our thoughtfully chosen range of electronic innovations and gadgets.</p>
                    <a  className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/products">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src={img3} style={{ objectFit: 'cover' }} alt="" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn"> Discover the latest in style with our fashion-forward choices. </p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/products">Shop Now</a>
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
              <h6 className="text-white text-uppercase">Save 20% <br/>for Electronic Items</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="/products" className="btn custom-btn-primary" >Shop Now</a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src={imgoffer2} alt="fdg" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="/products" className="btn custom-btn-primary">Shop Now</a>
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
                <h1 className="fa fa-check custom-text-warning
                 m-0 mr-3 " ></h1>
                <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
              </div>

            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fa fa-shipping-fast custom-text-warning
                 m-0 mr-2 "></h1>
                <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fas fa-exchange-alt custom-text-warning
                 m-0 mr-3"></h1>
                <h5 className="font-weight-semi-bold m-0 margingleft-10px">14-Day Return</h5>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
                <h1 className="fa fa-phone-volume custom-text-warning
                 m-0 mr-3"></h1>
                <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
              </div>
            </div>
          
          </div></div>
          <Categor/>
          
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
              <span className="bg-white pr-3">top selling</span>
          </h2>
          {this.renderProducts(this.state.topSellingProducts)}
          
          <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
              <div className="col-md-6">
                <div className="product-offer mb-30" style={{ height: 300 }}>
                  <img className="img-fluid" src={imgoffer3} alt="" />
                  <div className="offer-text">
                    <h5 className="text-white text-uppercase">Save 10%</h5>
                    <h2 className="text-white mb-3 special-offer-text">Special Offer</h2>
                    <a href="/products" className="btn custom-btn-primary">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-offer mb-30" style={{ height: 300 }}>
                  <img className="img-fluid" src={imgoffer4} alt="" />
                  <div className="offer-text">
                    <h5 className="text-white text-uppercase">Save 20%</h5>
                    <h2 className="text-white mb-3">Special Offer</h2>
                    <a href="/products" className="btn custom-btn-primary">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-white pr-3">New Arrivals</span>
          </h2>
          {this.renderProducts(this.state.newlyAddedProducts)}
        </div>
        
        
        <Footer />
      </div>
    );
  }
}

export default Home;
