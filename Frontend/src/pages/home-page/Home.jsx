import React, { useState, useEffect } from "react";
import './Home.component.css';
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import axios from "axios";
import introImage from '../../assets/welcome-sign-near-plant.jpg'
import { NavLink } from "react-router-dom";

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
          <div key={product.productID} className="product" ><NavLink to={`/product/${product.productID}`}>
            <img
              src={product.productImage1} 
              alt={product.productName} 
              className="product-image"
            />
            <h2>{product.productName}</h2>
            <p>Price: LKR {product.productPrice}</p>
            </NavLink>
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
          <div className="image-container">
            <img src={introImage} alt="Introductory Image"  style={{ width: '100%', height: 'auto' }} className="background-image" />
            <div>
            <div className="image-text">Welcome to Our Store</div>
            <div className="another-image-text"><p>Discover a wide range of top-quality<br/> products to meet your needs.</p></div></div>
          </div>
            
            
            
          </section>
          
          <h2>Top Selling</h2>
          {this.renderProducts(this.state.topSellingProducts)}
          
          <h2>New Products</h2>
          {this.renderProducts(this.state.newlyAddedProducts)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;