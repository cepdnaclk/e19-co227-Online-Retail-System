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
    <div className="product-list" style={{ paddingTop: '195px' }}>

      {ProductForShop.map((product) => (

        <div key={product.productID} className="product-item mb-4">

          <div className="product-img position-relative overflow-hidden">
            <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
            <div className="product-action">

              <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square" style={{width:'85px'}}>
                <i className="fa fa-eye" /> View
              </Link>

            </div>
          </div>
          <div className="title text-center py-4">

            <NavLink to={`/product/${product.productID}`} className="nav-link-style">

              <div className="h6">
                {product.productName}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-2 text-center">
                <h6>${product.productPrice}</h6>

                <h6 className="d-flex align-items-center text-muted ml-2">
                  <del>${product.productPrice < 5 ? product.productPrice + product.productPrice / 10 : product.productPrice + Math.floor(product.productPrice / 20)}</del>
                </h6>
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
