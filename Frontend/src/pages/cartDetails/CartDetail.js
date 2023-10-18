import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { manageAccount } from '../../services/manage-account.service'
import { useManageCart } from '../../services/useManageCart'
import CartItem from './CartItem'
import Footer from '../../components/layout/footer/footer'
import { NavLink } from 'react-router-dom'
import RecommendedProducts from '../../components/layout/RecommendedProducts'
import { HeaderContext } from '../../contexts/HeaderContext'
import {cartService} from "../../services/cart.service";

const CartDetail = () => {

  const [cart,setCart] = useState([])

  const shipping = 10

  const [updateCartTrigger, setUpdateCartTrigger] = useState(false); 

  const userID = manageAccount.getCustomerID()

  const cartInfo = useManageCart();

  let cartID = null

  if (cartInfo ){
    cartID  = cartInfo.cartID
  }

 
  const{setTrigger} = useContext(HeaderContext)
    let rec = true
  



  useEffect(()=>{
    const fetchProductDetails = async ()=>{



        cartService.getFromCart(userID).then(res=>{

          setCart(res.data) ;
        }).catch(err =>{
          console.log(err)
        })
        /*const res = await axios.get("http://localhost:8081/api/v1/cart/"+userID)*/

        //console.log(res.data);


    }
    fetchProductDetails()
  },[userID,updateCartTrigger])



const [subTotal,setSubTotal] = useState(0)




useEffect(()=>{

  const changeSubtotal = ()=>{
    let sub = 0
    cart.forEach(item => {
     sub += item.productPrice * item.qty
    });
  
    setSubTotal((prevsub)=> prevsub = sub)
  }
  changeSubtotal()

},[cart,updateCartTrigger])


  return (
    <div style={{ paddingTop: '200px' }} >
  
     {/* Cart Start */}

     {!cart.length && <div className="position-relative" style={{height:"450px"}}> <div className="position-absolute top-50 start-50 translate-middle">
      <h2 style={{paddingBottom:"20px"}}>Your Cart is Empty</h2>
      <img style={{height:"250px"}} src='/img/shopping-cart-svgrepo-com.svg'
     />
     <h4 style={{marginTop:"25px" , marginLeft:"65px"}} ><NavLink to="/" style={{textDecoration:'none', backgroundColor:"#33cc99", padding:"5px 10px 5px 10px", borderRadius:"7px", color:"black", }}>Shop Now</NavLink></h4>
      </div> </div>}

    {cart.length && (<div className="container-fluid" >
    <div className="row px-xl-5">
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-light table-borderless table-hover text-center mb-0">
          <thead className="thead-dark">
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle" >

            
                { cart.map((cartItem)=>(
    
                  <tr key={cartItem.productID} style={{backgroundColor:'#ffffff'}}>
                  <CartItem cartItem ={cartItem}  setUpdateCartTrigger={setUpdateCartTrigger} />
                  </tr>
                 ))
}
           
                  
          </tbody>
        </table>
      </div>
      <div className="col-lg-4">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-white pr-3 pl-3">Cart Summary</span>
        </h5>
        
        <div className=" p-30 mb-5" style={{backgroundColor:'#ffffff'}}>
          <div className="border-bottom pb-2">
            <div className="d-flex justify-content-between mb-3">
              <h6>Subtotal</h6>
              <h6>${subTotal}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium">Shipping</h6>
              <h6 className="font-weight-medium">${shipping}</h6>
            </div>
          </div>
          <div className="pt-2">
            <div className="d-flex justify-content-between mt-2">
              <h5>Total</h5>
              <h5>${subTotal+shipping}</h5>
            </div>
            <a href='/checkout'>
              <button data-testid='buy' className="btn btn-block btn-primary font-weight-bold my-3 py-3" style={{backgroundColor:'#ffd333', border:'none'}}>
                Proceed To Checkout
              </button>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  </div>  


  )

  }

  
  {/* Cart End */}

      {cart.length && (cart.map((cartItem) => {

                
          
          if(rec){

            rec = false
            
            return(
              
            <div key={cartItem.productID}>
               <RecommendedProducts id={cartItem.productID}  />
               </div>)
          }

          else {  return (null)}
         

      }
      
        
            
      ))}

  
  <Footer />
    
    </div>
    
  )
}

export default CartDetail
