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
import {cartService} from "../../services/cart.service";


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


         cartService.checkInCart(cartID,product.productID).then(res=>{
           const cartCheckQty = res.data[0]?.qty || 0; // Use optional chaining and provide a default value

           if(cartCheckQty>0){
             setIsInCart(true)
             setTrigger(true)
           }

         }).catch(err=>{
           console.log(err)

         })
         /*const res = await axios.post("http://localhost:8081/api/v1/checkcart",{cartID: cartID,
         productID: product.productID})*/
  


     }
     fetchProductDetails()
   }
 })




  const handleCart = async (e)=>{
    e.preventDefault()


    if (customerID > 0 ){


        cartService.addToCart(cartDetails).then(res =>{
          setIsInCart(true)
        }).catch(err=>{
          console.log(err)
        })

        /*await axios.post("http://localhost:8081/api/v1/product",cartDetails)
        //console.log(cartDetails)
         // force render */
     

    }
    else{
      navigate("/SignIn")
    }
  }

  const discountedPrice = product.productPrice < 5 ? product.productPrice + product.productPrice / 10 : product.productPrice + Math.floor(product.productPrice / 20)

  return (
  <div  className='pt-5'>
    {product && (<>
  {/* Shop Detail Start */}
  <div className="container-fluid " >
    <div className="row px-xl-5" style={{ paddingTop: '140px' }} >
      <div className="col-lg-5 mb-30 pt-10"   >

      <div id="carouselExampleDark" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval={5000}>
              <img src={product.productImage1} className="w-100 h-100" alt="Image" />
            </div>
           { product.productImage2 && <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage2} className="w-100 h-100" alt="Image" />
            </div>}
            {product.productImage3 &&  <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage3} className="w-100 h-100" alt="Image" />
            </div>}
           {product.productImage4 &&  <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage4} className="w-100 h-100" alt="Image" />
            </div>}
            {product.productImage5 &&  <div className="carousel-item" data-bs-interval={7000}>
              <img src={product.productImage5} className="w-100 h-100" alt="Image" />
            </div>}
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

      <div className="col-lg-7 h-auto mb-30 bg-light" >
        <div className="h-100  p-30" >
          <h2>{product.productName}</h2>
          <p>{product.categoryName} {`->`} {product.subCategoryName}</p>
          <p><strong>Seller:</strong> {product.shopName}</p>

          
          <div className="d-flex text-muted fs-5">
                  <div className='mr-5'>M.R.P. :</div>
                  
                  <del>${discountedPrice}</del>
          </div>
         

          <div className="d-flex ">
          
          <div className="font-weight-bold fs-5 mr-2">Deal Price :</div>

          <div className="font-weight-bold text-danger fs-5"> ${product.productPrice}</div>

          </div>

          <div className="d-flex text-muted fs-5  ">
                  <div className='mr-4'>You Save :</div>
                  
                  <div className='text-success'>${discountedPrice-product.productPrice}</div>
          </div>
          
         
          <div className="d-flex mb-3 mt-4">
            <div className="return text-center mr-5">
              <div className="font-size-20 my-2 color-second">
                <span className="fas fa-retweet border p-3 rounded-pill " style={{backgroundColor:'#ffd333'}} />
              </div>
              <p  className="font-rale font-size-12">
                10 Days <br /> Replacement
              </p>
            </div>
            <div className="return text-center mr-5">
              <div className="font-size-20 my-2 color-second">
                <span className="fas fa-truck  border p-3 rounded-pill" style={{backgroundColor:'#ffd333'}}/>
              </div>
              <p className="font-rale font-size-12">
                Cash on Delivery <br />
                Available
              </p>
            </div>
            <div className="return text-center mr-5">
              <div className="font-size-20 my-2 color-second">
                <span className="fas fa-check-double border p-3 rounded-pill"style={{backgroundColor:'#ffd333'}} />
              </div>
              <p className="font-rale font-size-12">
                1 Year <br />
                Warranty
              </p>
            </div>
          </div>
        
         
          <div className="d-flex align-items-center mb-4 pt-2">
            <div className="input-group quantity mr-3" style={{ width: 130 }}>
              <div className="input-group-btn">   
                <button data-testid="plus" className="btn btn-success btn-minus" style={{backgroundColor:'#ffd333', border:'none', color:'black'}} onClick={()=>handleQty(product,'minus') }>
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
                <button data-testid="minus" className="btn btn-success btn-plus" style={{backgroundColor:'#ffd333', border:'none' ,color:'black'}} onClick={()=>handleQty  (product,'plus')}>
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          
            { isInCart && (<button data-testid="already-in-cart" className="btn btn-success text-dark px-3" style = {{backgroundColor:"#f0c53a", border:"none"}} onClick={()=>{navigate("/cart/"+{cartID})}} >
              <i className="fa fa-shopping-cart mr-1 " /> Already in Cart
            </button>)}

            { !isInCart && (<button className="btn btn-success text-dark px-3" style={{backgroundColor:'#ffa41c', border:'none'}} onClick={(e)=>handleCart(e)}>
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
    <div className="row px-xl-5 "  >

        <div className="row-lg-7 h-auto  pt-3 pl-3 bg-light">
     
              <h4 className="mb-3 pb-2 border-bottom">Product Description</h4>
              <p style={{ whiteSpace: 'pre-line' }} >
                {product.productDetails}
              </p>
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
