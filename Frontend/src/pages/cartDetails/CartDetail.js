import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { manageAccount } from '../../services/manage-account.service'
import { useManageCart } from '../../services/useManageCart'
import CartItem from './CartItem'
import Footer from '../../components/layout/footer/footer'

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

 

  useEffect(()=>{
    const fetchProductDetails = async ()=>{
      try{
        const res = await axios.get("http://localhost:8081/api/v1/cart/"+userID)

        
        setCart(res.data) ;

      }catch(err){
        console.log(err)

      }
    }
    fetchProductDetails()
  },[userID,updateCartTrigger])

//console.log(cart)

const [subTotal,setSubTotal] = useState(0)



useEffect(()=>{

  const changeSubtotal = ()=>{
    let sub = 0
    cart.forEach(item => {
     sub += item.productPrice * item.qty
    });
  
    setSubTotal(sub)
  }
  changeSubtotal()

},[cart,updateCartTrigger])

console.log(subTotal)




  return (
    <>
  
     {/* Cart Start */}
  <div className="container-fluid">
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
          <tbody className="align-middle">

            
                { cart.map((cartItem)=>(
    
                  <tr key={cartItem.productID} >
                  <CartItem cartItem ={cartItem}  setUpdateCartTrigger={setUpdateCartTrigger} />
                  </tr>
                 ))
}
           
                  
          </tbody>
        </table>
      </div>
      <div className="col-lg-4">
        <form className="mb-30" action="">
          <div className="input-group">
            <input
              type="text"
              className="form-control border-0 p-4"
              placeholder="Coupon Code"
            />
            <div className="input-group-append">
              <button className="btn btn-primary">Apply Coupon</button>
            </div>
          </div>
        </form>
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Cart Summary</span>
        </h5>
        <div className="bg-light p-30 mb-5">
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
            <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Cart End */}

  <Footer />
    
    </>
    
  )
}

export default CartDetail