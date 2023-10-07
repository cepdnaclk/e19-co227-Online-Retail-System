import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { manageAccount } from '../../services/manage-account.service'
import { useManageCart } from '../../services/useManageCart'
import Footer from '../../components/layout/footer/footer'
import OrderItem from './OrderItem'
import CheckOut from './checkOut'
import { Link, useNavigate } from "react-router-dom";

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

////////////////////////////////////////////////////////////////////////// supun's work
//checkOut file

//getcustomer info
const [customer,setcustomer] = useState([]);


  const customerID = manageAccount.getCustomerID();

  const fetchCustomerDetails = async ()=>{
    try{
      const res = await axios.post("http://localhost:8081/api/v1/customer", {customerID})
      setcustomer(res.data) ;

      console.log(res.data);
      console.log(customer);
      
    }catch(err){
      console.log(err)
    }
  }

useEffect(() => {
    // Call your fetchData function here
    fetchCustomerDetails();

}, []);


const [formData, setFormData] = useState({
  customerid: customerID,
  firstName: customer.firstName,
  lastName: '',
  email: '',
  mobile: '',
  address1: '',
  address2: '',
  address3: '',
  paymentMethod: 'creditCard',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const navigate = useNavigate();
const [error,setError] = useState(false)



const handlePaymentChange = (event) => {
  const { value } = event.target;
  setFormData({
    ...formData,
    paymentMethod: value,
  });
};

const paymentMethods = [
  { id: "paypal", label: "Paypal" },
  { id: "creditCard", label: "Credit Card" },
];


const handleSubmit = async (e) => {
  e.preventDefault();
  // Here, you can handle the form submission, send data to the server, and process the order.
  // You would typically make an API request to create the order on the server.
  console.log('Form data:', formData);
  try {
    await axios.post("http://localhost:8081/api/v1/putorder", formData);
    //navigate("/successful");
    
  } catch (err) {
    console.log(err);
    setError(true)
  }

};



  return (
    <>
  
     {/* Cart Start */}
  <div className="container-fluid">
    <div className="row px-xl-5">
      <div className="col-lg-8">

        {/*Start of checkout file*/}
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-12">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-white pr-3">Billing</span>
              </h5>

              {/*input form*/}
              <form onSubmit={handleSubmit}>  
                <div className="bg-light p-30 mb-5">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label>First Name</label>
                      <input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}            
                        className="form-control" 
                        type="text" 
                        onChange={handleInputChange}
                        required              
                        placeholder="John" />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Last Name</label>
                      <input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}            
                        className="form-control"
                        onChange={handleInputChange}
                        required 
                        type="text" 
                        placeholder="Doe" />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>E-mail</label>
                      <input
                        id="email"
                        name="email"
                        value={formData.email}
                        className="form-control"
                        onChange={handleInputChange}
                        required
                        type="text"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Mobile No</label>
                      <input
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}            
                        className="form-control"
                        onChange={handleInputChange}
                        required
                        type="tel"
                        placeholder="+94 "
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Address Line 1</label>
                      <input
                        id="address1"
                        name="address1"
                        value={formData.address1}            
                        className="form-control"
                        onChange={handleInputChange}
                        required
                        type="text"
                        placeholder="123 Street"
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Address Line 2</label>
                      <input
                        id="address2"
                        name="address2"
                        value={formData.address2}            
                        className="form-control"
                        onChange={handleInputChange}
                        required
                        type="text"
                        placeholder="123 Street"
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Address Line 3</label>
                      <input
                        id="address3"
                        name="address3"
                        value={formData.address3}            
                        className="form-control"
                        onChange={handleInputChange}
                        required
                        type="text"
                        placeholder="123 Street"
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label>Payment Method</label>
                      {paymentMethods.map((method) => (
                        <div className="custom-control custom-radio" key={method.id}>
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="payment"
                            id={method.id}
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handlePaymentChange}
                          />
                          <label className="custom-control-label" htmlFor={method.id}>
                            {method.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>  
              </form>      
              </div>
            </div>
        </div>
        {/*End of checkout file*/}
      </div>
      
      <div className="col-lg-4">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-white pr-3 pl-3">Order Total</span>
        </h5>
        <div className="col table-responsive mb-5">
        <table className="table table-white mb-0">
          <thead className="">
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="align-middle">

                {cart.map((cartItem)=>(
                  <tr key={cartItem.productID} >
                  <OrderItem cartItem ={cartItem}  setUpdateCartTrigger={setUpdateCartTrigger} />
                  </tr>
                 ))
}
            
          </tbody>
        </table>
        </div>
        <div className="col">
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
          <span className="bg-white pr-3">Payment</span>
        </h5>
        <div className="bg-white p-30 mb-5">
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
            
              <button onClick = {handleSubmit} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                Buy now
              </button>
            
            
          </div>
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