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






  return (
    <div>
        <div className="product-item bg-white">
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

        
         
     
    
         
        
      </div>
  )
}

export default ProductCarouselItem