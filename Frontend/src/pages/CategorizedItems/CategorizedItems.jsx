import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/product.service';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './CategorizedItem.css'
import Footer from '../../components/layout/footer/footer';

const CategorizedItems = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await productService.getProductByCategory(categoryId, subcategoryId);
        
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId]);

  return (
    <div>
      <h2>Categorized Items</h2>
      <p>Category ID: {categoryId}</p>
      <p>Subcategory ID: {subcategoryId}</p>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.productID} className="product-item mb-4">
            <div className="product-img position-relative overflow-hidden">
              <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
              <div className="product-action">
                <Link to={`/productt/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="fa fa-shopping-cart" />
                </Link>
                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="far fa-heart" />
                </Link>
                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="fa fa-sync-alt" />
                </Link>
                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="fa fa-search" />
                </Link>
              </div>
            </div>
            <div className="title text-center py-4"><NavLink to={`/product/${product.productID}`} className="nav-link-style">
              <div className="h4 text-decoration-none text-truncate">
                {product.productName}
              </div>
              <div className="d-flex align-items-center justify-content-center mt-2 w-75 text-center">
                <h5>${product.productPrice}</h5>
                <h6 className="d-flex align-items-center text-muted ml-2">
                  <del>${product.productPrice + 100}</del>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-1 color-yellow">
                <small className="fa fa-star text-primary mr-1" />
                <small className="fa fa-star text-primary mr-1" />
                <small className="fa fa-star text-primary mr-1" />
                <small className="fa fa-star text-primary mr-1" />
                <small className="fa fa-star text-primary mr-1" />
                <small>(99)</small>
              </div></NavLink>
            </div>
          </div>
        ))}
      </div><Footer/></div>
  );
};

export default CategorizedItems;
