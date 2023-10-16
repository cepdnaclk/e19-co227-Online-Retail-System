
import { useParams } from 'react-router-dom';
import { productService } from '../../services/product.service';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/layout/footer/footer';



const ProductType = () => {

  const { categoryName } = useParams();
  const {categoryID} = useParams();
  const {count} = useParams();

  const [productType, setProductType] = useState([]);


  useEffect(() => {
    const fetchProductType = async () => {
      try {
        
        const response = await productService.getProductByMainCategory(categoryID,categoryName,count);
        
        setProductType(response);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


    fetchProductType();
  }, [categoryID,categoryName,count]);



  return (
    <div className="container content">
      
      <h5 className="section-title position-relative text-uppercase mx-xl-5 mb-4" style={{ paddingTop: '200px' }}>
        <span className="bg-white pr-3">  Category : {categoryName} - ( {count} )  products 
        </span>  
    </h5>
    
    
    <div className="product-list">
        {productType.map((product) => (

          <div key={product.productID} className="product-item mb-4">
            <div className="product-img position-relative overflow-hidden">
              <img className="product-img w-100" src={product.productImage1} alt={product.productName} />

              <div className="product-action">

                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="fa fa-eye " />
                </Link>

               

              </div>
            </div>
            <div className="title text-center py-4"><NavLink to={`/product/${product.productID}`} className="nav-link-style">
              
              <div className="h6">

                {product.productName}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-2 text-center">

                <h6>${product.productPrice}</h6>

                <h6 className="d-flex align-items-center text-muted ml-2">

                  <del>${product.productPrice < 5 ? product.productPrice+product.productPrice/10 : product.productPrice + Math.floor(product.productPrice/20)}</del>
                </h6>

              </div>

              </NavLink>
            </div>
          </div>
        ))}
      </div><Footer/></div>
  );
};



export default ProductType;
