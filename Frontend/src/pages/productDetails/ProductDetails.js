import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams,  useNavigate } from 'react-router'
import { manageAccount } from '../../services/manage-account.service'
import { useManageCart } from '../../services/useManageCart'
import Footer from '../../components/layout/footer/footer'
import { CartContext } from '../../contexts/CartContext'
import RecommendedProducts from '../../components/layout/RecommendedProducts'
import { NavLink } from 'react-router-dom'


const ProductDetails = (props) => {

  const {id} = useParams()

  let cartID = null

  const navigate = useNavigate()

  const cartInfo = useManageCart();



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



  const {trigger,setTrigger} = useContext(CartContext)
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
  <>
    {product && (<>
  {/* Shop Detail Start */}
  <div className="container-fluid pb-5" style={{margin:"20px 0px"}}>
    <div className="row px-xl-5" >
      <div className="col-lg-5 mb-30" >
        <div
          id="product-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner bg-light">
            <div className="carousel-item active">
              <img
                className="w-100 h-100"
                src={product.productImage1}
                alt="Image"
              />
            </div>
            <div className="carousel-item">
              <img
                className="w-100 h-100"
                src={product.productImage2}
                alt="Image"
              />
            </div>
            <div className="carousel-item">
              <img
                className="w-100 h-100"
                src={product.productImage3}
                alt="Image"
              />
            </div>
            <div className="carousel-item">
              <img
                className="w-100 h-100"
                src={product.productImage4}
                alt="Image"
              />
            </div>
            <div className="carousel-item">
              <img
                className="w-100 h-100"
                src={product.productImage5}
                alt="Image"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#product-carousel"
            data-slide="prev"
          >
            <i className="fa fa-2x fa-angle-left text-dark" />
          </a>
          <a
            className="carousel-control-next"
            href="#product-carousel"
            data-slide="next"
          >
            <i className="fa fa-2x fa-angle-right text-dark" />
          </a>
        </div>
      </div>
      <div className="col-lg-7 h-auto mb-30" >
        <div className="h-100 bg-light p-30">
          <h1>{product.productName}</h1>
          <p>{product.categoryName} {`->`} {product.subcategoryName}</p>
          <p><strong>Seller:</strong> {product.shopName}</p>
          <div className="d-flex mb-3">
            <div className="text-success mr-2">
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
                <button className="btn btn-success btn-minus" onClick={()=>handleQty(product,'minus') }>
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
                <button className="btn btn-success btn-plus" onClick={()=>handleQty  (product,'plus')}>    
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          
            { isInCart && (<button className="btn btn-success px-3" style = {{backgroundColor:"#f0c53a", border:"none"}} onClick={()=>{navigate("/cart/"+{cartID})}} >
              <i className="fa fa-shopping-cart mr-1 " /> Already in Cart
            </button>)}

            { !isInCart && (<button className="btn btn-success text-dark px-3" onClick={(e)=>handleCart(e)}>
              <i className="fa fa-shopping-cart mr-1 " /> Add To Cart
            </button>)}

            <p style={{paddingTop:"13px", paddingLeft:"10px", color:"red"}}>{errQty}</p>

          </div>
          <div className="d-flex pt-2">
            <strong className="text-dark mr-2">Share on:</strong>
            <div className="d-inline-flex">
              <a className="text-dark px-2" href="">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-twitter" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-dark px-2" href="">
                <i className="fab fa-pinterest" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row px-xl-5">
      <div className="col">
        <div className="bg-light p-30">
          <div className="nav nav-tabs mb-4">
            <a
              className="nav-item nav-link text-dark active"
              data-toggle="tab"
              href="#tab-pane-1"
            >
              Description
            </a>
            <a
              className="nav-item nav-link text-dark"
              data-toggle="tab"
              href="#tab-pane-2"
            >
              Information
            </a>
            <a
              className="nav-item nav-link text-dark"
              data-toggle="tab"
              href="#tab-pane-3"
            >
              Reviews (0)
            </a>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="tab-pane-1">
              <h4 className="mb-3">Product Description</h4>
              <p>
                {product.productDetails}
              </p>
            </div>
            <div className="tab-pane fade" id="tab-pane-2">
              <h4 className="mb-3">Additional Information</h4>
              <p>
                Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
                Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero
                diam ea vero et dolore rebum, dolor rebum eirmod consetetur
                invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd
                ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod.
                Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut
                diam consetetur duo justo est, sit sanctus diam tempor aliquyam
                eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at
                sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                sanctus eirmod takimata dolor ea invidunt.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                    </li>
                    <li className="list-group-item px-0">
                      Amet kasd gubergren sit sanctus et lorem eos sadipscing
                      at.
                    </li>
                    <li className="list-group-item px-0">
                      Duo amet accusam eirmod nonumy stet et et stet eirmod.
                    </li>
                    <li className="list-group-item px-0">
                      Takimata ea clita labore amet ipsum erat justo voluptua.
                      Nonumy.
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                    </li>
                    <li className="list-group-item px-0">
                      Amet kasd gubergren sit sanctus et lorem eos sadipscing
                      at.
                    </li>
                    <li className="list-group-item px-0">
                      Duo amet accusam eirmod nonumy stet et et stet eirmod.
                    </li>
                    <li className="list-group-item px-0">
                      Takimata ea clita labore amet ipsum erat justo voluptua.
                      Nonumy.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tab-pane-3">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="mb-4">1 review for "Product Name"</h4>
                  <div className="media mb-4">
                    <img
                      src="img/user.jpg"
                      alt="Image"
                      className="img-fluid mr-3 mt-1"
                      style={{ width: 45 }}
                    />
                    <div className="media-body">
                      <h6>
                        John Doe
                        <small>
                          {" "}
                          - <i>01 Jan 2045</i>
                        </small>
                      </h6>
                      <div className="text-primary mb-2">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <i className="far fa-star" />
                      </div>
                      <p>
                        Diam amet duo labore stet elitr ea clita ipsum, tempor
                        labore accusam ipsum et no at. Kasd diam tempor rebum
                        magna dolores sed sed eirmod ipsum.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h4 className="mb-4">Leave a review</h4>
                  <small>
                    Your email address will not be published. Required fields
                    are marked *
                  </small>
                  <div className="d-flex my-3">
                    <p className="mb-0 mr-2">Your Rating * :</p>
                    <div className="text-primary">
                      <i className="far fa-star" />
                      <i className="far fa-star" />
                      <i className="far fa-star" />
                      <i className="far fa-star" />
                      <i className="far fa-star" />
                    </div>
                  </div>
                  <form>
                    <div className="form-group">
                      <label htmlFor="message">Your Review *</label>
                      <textarea
                        id="message"
                        cols={30}
                        rows={5}
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email *</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group mb-0">
                      <input
                        type="submit"
                        defaultValue="Leave Your Review"
                        className="btn btn-primary px-3"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Shop Detail End */}


</>)
}

  <RecommendedProducts id={id}/>

  <Footer />


  </>
 
    
  )
}

export default ProductDetails