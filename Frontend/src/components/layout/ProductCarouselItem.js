import React, { useState } from 'react'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect  } from 'react'




const ProductCarouselItem = ({id}) => {

  const navigate = useNavigate()


  const [product,setProduct] = useState([])

  useEffect(()=>{
    const fetchProductDetails = async ()=>{
      try{
        const res = await axios.get("http://localhost:8081/api/v1/product/"+id)

        //console.log(res.data)
        setProduct(res.data[0]) ;

      }catch(err){
        console.log(err)

      }
    }
    fetchProductDetails()
  },[id]);

  useEffect(()=>{
    console.log(product)
  },[product])




  return (
    <div>
        <div className="product-item bg-light">
        <div className="product-img position-relative overflow-hidden">
          <img className="product-img w-100" src={product.productImage1} alt={product.productName} />

          <div className="product-action">
                <Link to={`/product/${product.productID}`} className="btn btn-outline-dark btn-square">
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

        
         
     
    
         
        
      </div>
  )
}

export default ProductCarouselItem