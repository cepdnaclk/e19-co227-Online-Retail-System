import React, { useEffect, useState } from 'react';
import Footer from '../../components/layout/footer/footer';
import { productService } from '../../services/product.service';
import { Link, NavLink } from 'react-router-dom'; 


const Products = () => {
  const [ProductForShop, setProductForShop] = useState([]);


useEffect(() => {
    
    const fetchProductForShop = async () => {
      try {
        const response = await productService.getAllP();
        setProductForShop(response);
      } catch (error) {
        console.error('Error fetching top-selling products:', error);
      }
    };

    
    fetchProductForShop();
  }, []); 

return (
    <div className="product-list">

      {ProductForShop.map((product) => (

        <div key={product.productID} className="product-item mb-4">

          <div className="product-img position-relative overflow-hidden">
            <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
            <div className="product-action">

              <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                <i className="fa fa-shopping-cart" />
              </Link>

              <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                <i className="far fa-heart " />
              </Link>

              <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                <i className="fa fa-sync-alt " />
              </Link>

              <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                <i className="fa fa-search" />
              </Link>

            </div>
          </div>
          <div className="title text-center py-4">

            <NavLink to={`/product/${product.productID}`} className="nav-link-style">

              <div className="h4 text-decoration-none text-truncate">
                {product.productName}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-2 w-75 text-center">
                <h6>${product.productPrice}</h6>

                <h6 className="d-flex align-items-center text-muted ml-2">
                  <del>${product.productPrice < 5 ? product.productPrice + product.productPrice / 10 : product.productPrice + Math.floor(product.productPrice / 20)}</del>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-1">


                <small className="fa fa-star custom-text-warning mr-1" />
                <small className="fa fa-star custom-text-warning mr-1" />
                <small className="fa fa-star custom-text-warning mr-1" />
                <small className="fa fa-star custom-text-warning mr-1" />
                <small className="fa fa-star custom-text-warning mr-1" />

                <small>(99)</small>
              </div>
            </NavLink>

          </div>
        </div>
      ))}

      <Footer />
    </div>

  );
};

export default Products;
