import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const ProductDetails = () => {

  const {id} = useParams()

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
    
    
  },[]);


  return (
  <>
    {product && <div className="productdetails">
      <h1>jahdslk</h1>
      <h1>{product.productName}</h1>
    
    </div>}
  </>
 
    
  )
}

export default ProductDetails