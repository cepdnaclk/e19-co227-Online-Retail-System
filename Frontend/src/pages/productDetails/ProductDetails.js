import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams,  useNavigate } from 'react-router'
import { manageAccount } from '../../services/manage-account.service'
import { useManageCart } from '../../services/useManageCart'
import Footer from '../../components/layout/footer/footer'
import { HeaderContext } from '../../contexts/HeaderContext'
import RecommendedProducts from '../../components/layout/RecommendedProducts'
import { NavLink } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton,PinterestShareButton,
  LinkedinShareButton } from 'react-share';


const ProductDetails = (props) => {

  const {id} = useParams()

  let cartID = null

  const navigate = useNavigate()

  const cartInfo = useManageCart();

  const [rec, setRec] = useState(false)

  const currentUrl = window.location.href;

  
  const { qty, errQty, handleQty, handleChange, productDetails,isInCart, setIsInCart, } = useManageCart();
  

  const product = productDetails(id);   // get product details from useManageCart

  if (cartInfo ){
    cartID  = cartInfo.cartID
  }
  
  console.log('inproduct')
  const customerID = manageAccount.getCustomerID()


  let [cartDetails, setCartDetails] = useState({
    cartID:"",
    customerID:"", 
    productID:"", 
    sellerID:"", 
    qty:"", 
    price:""
  })

  useEffect(()=>{
    setCartDetails((prev) =>( {cartID: cartID,
      customerID:customerID, 
      productID: product.productID, 
      sellerID: product.sellerID, 
      qty:qty, 
      price:product.productPrice}))
  },[cartID,product.productPrice,qty])



  const {trigger,setTrigger} = useContext(HeaderContext)
 useEffect(()=>{

   if(cartID !== null){
    
     const fetchProductDetails = async ()=>{
       try{
         const res = await axios.post("http://localhost:8081/api/v1/checkcart",{cartID: cartID,
         productID: product.productID})
  
         const cartCheckQty = res.data[0]?.qty || 0; // Use optional chaining and provide a default value
         
         if(cartCheckQty>0){
           setIsInCart(true)
           setTrigger(true)
         }
  
       }catch(err){
         console.log(err)
  
       }
     }
     fetchProductDetails()
   }
 })


  //console.log(cartDetails)

  const handleCart = async (e)=>{
    e.preventDefault()
    //console.log(manageAccount.isLoggedIn())

    if (customerID > 0 ){
      try{
        await axios.post("http://localhost:8081/api/v1/product",cartDetails)
        //console.log(cartDetails)
        setIsInCart(true) // force render 
        
      }
      catch(err){
        console.log(err)
      }
    }
    else{
      navigate("/SignIn")
    }
  }

  return (
  <div style={{backgroundColor:'#f5f5f5'}}>
    {product && (<>
  {/* Shop Detail Start */}
  <div className="container-fluid pb-5" style={{margin:"20px 0px"}}>
    <div className="row px-xl-5" >
      <div className="col-lg-5 mb-30" >

      <div id="carouselExampleDark" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval={7000}>
              <img src={product.productImage1} className="w-100 h-100" alt="Image" />
            </div>
            <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage2} className="w-100 h-100" alt="Image" />
            </div>
            <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage3} className="w-100 h-100" alt="Image" />
            </div>
            <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage4} className="w-100 h-100" alt="Image" />
            </div>
            <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage5} className="w-100 h-100" alt="Image" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>



      </div>
      <div className="col-lg-7 h-auto mb-30" >
        <div className="h-100 bg-light p-30">
          <h1>{product.productName}</h1>
          <p>{product.categoryName} {`->`} {product.subCategoryName}</p>
          <p><strong>Seller:</strong> {product.shopName}</p>
          <div className="d-flex mb-3">
            <div className="text-warning mr-2">
              <small className="fas fa-star" />
              <small className="fas fa-star" />
              <small className="fas fa-star" />
              <small className="fas fa-star-half-alt" />
              <small className="far fa-star" />
            </div>
            <small className="pt-1">(99 Reviews)</small>
          </div>
          <h3 className="font-weight-semi-bold mb-4">${product.productPrice}</h3>
          <p className="mb-4">
            Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat
            diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo
            dolor no sea Nonumy
          </p>
         
          <div className="d-flex align-items-center mb-4 pt-2">
            <div className="input-group quantity mr-3" style={{ width: 130 }}>
              <div className="input-group-btn">   
                <button className="btn btn-success btn-minus" style={{backgroundColor:'#ffd333', border:'none', color:'black'}} onClick={()=>handleQty(product,'minus') }>
                  <i className="fa fa-minus" />
                </button>
              </div>
              <input
                className="form-control bg-white border-0 text-center"
                style={{width:"32px", padding:"0", height:"48px"}}
                
                type="text"
                onChange={(e)=>{ handleChange(e,product)}} //from useManageCart Hook
                value={qty}
              />
              <div className="input-group-btn">    
                <button className="btn btn-success btn-plus" style={{backgroundColor:'#ffd333', border:'none' ,color:'black'}} onClick={()=>handleQty  (product,'plus')}>    
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          
            { isInCart && (<button className="btn btn-success text-dark px-3" style = {{backgroundColor:"#f0c53a", border:"none"}} onClick={()=>{navigate("/cart/"+{cartID})}} >
              <i className="fa fa-shopping-cart mr-1 " /> Already in Cart
            </button>)}

            { !isInCart && (<button className="btn btn-success text-dark px-3" style={{backgroundColor:'#ffd333', border:'none'}} onClick={(e)=>handleCart(e)}>
              <i className="fa fa-shopping-cart mr-1 " /> Add To Cart
            </button>)}

            <p style={{paddingTop:"13px", paddingLeft:"10px", color:"red"}}>{errQty}</p>

          </div>
          <div className="d-flex pt-2">
            <strong className="text-dark mr-2">Share on:</strong>
            <div className="d-inline-flex">
                <FacebookShareButton url={currentUrl} quote={`Check out ${product.productName} on Gadget Wave store!`}>
          <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
          </FacebookShareButton>

          <TwitterShareButton url={currentUrl} title={`Check out ${product.productName} on Gadget Wave store!`}>
          <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter" />
                  </a>
          </TwitterShareButton>


          <LinkedinShareButton url={currentUrl} title={`Check out ${product.productName} on Gadget Wave store!`}>
          <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
          </LinkedinShareButton>


              <div>
    

    
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row px-xl-5">
      <div className="col">
        <div className="bg-light p-30">
          <div className="nav nav-tabs mb-4">
         
            
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="tab-pane-1">
              <h4 className="mb-3">Product Description</h4>
              <p style={{ whiteSpace: 'pre-line' }}>
                {product.productDetails}
              </p>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Shop Detail End */}


</>)
}

  <RecommendedProducts id={id} setRec={setRec}/>

  <Footer />


  </div>
 
    
  )
}

export default ProductDetails
