import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/product.service';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './CategorizedItem.css'
import Footer from '../../components/layout/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';



const CategorizedItems = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  const [catname, setCatname] = useState("");
  const [subcatName,setSubcatName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await productService.getProductByCategory(categoryId, subcategoryId);
        

        if (response.length > 0) {
          setCatname(response[0].CategoryName);
        }

        if (response.length > 0) {
          setSubcatName(response[0].subCategoryName)
        }

        setProducts(response);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId]);

  return (
    <div style={{ paddingTop: '195px' }}>



<h5 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
  <span className="bg-white pr-3">
   {catname}   
   {subcatName.length > 0 && (
     <>
       
       <FontAwesomeIcon icon={faChevronRight} className="black-arrow mr-2" />
       {subcatName}
     </>
   )}
  </span>
</h5>
{subcatName.length === 0 ? (
  <p style={{ marginLeft: '65px' }} >No products for this category.</p>
) : (
      <div className="product-list">
        {products.map((product) => (
          <div key={product.productID} className="product-item mb-4">
            <div className="product-img position-relative overflow-hidden">
              <img className="product-img w-100" src={product.productImage1} alt={product.productName} />
              <div className="product-action">

                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
                  <i className="fa fa-eye" />
                </Link>

              
              </div>
            </div>
            <div className="title text-center py-4"><NavLink to={`/product/${product.productID}`} className="nav-link-style">
              
              <div className="h6">
                {product.productName}
              </div>

              <div className="d-flex align-items-center justify-content-center mt-2 ">

                <h6>${product.productPrice}</h6>

                <h6 className="d-flex align-items-center text-muted ml-2">
                  <del>${product.productPrice < 5 ? product.productPrice+product.productPrice/10 : product.productPrice + Math.floor(product.productPrice/20)}</del>
                </h6>

              </div>

              </NavLink>
            </div>
          </div>
        ))}
      </div>)}<Footer/></div>
  );
};

export default CategorizedItems;
