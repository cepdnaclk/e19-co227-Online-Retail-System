import React, { useEffect, useState,useContext } from 'react'
import { useManageCart } from '../../services/useManageCart'
import axios from 'axios'
import { HeaderContext } from '../../contexts/HeaderContext'

const CartItem = ({cartItem, changeSubtotal, setUpdateCartTrigger}) => {


  const changeQty = async (qty)=>{

    try{
      await axios.put("http://localhost:8081/api/v1/cart/"+{cartID},{ qty,cartID, productID})

      
    }catch(err){
      console.log(err)
    }
  }

  
  const { qty, errQty, handleQty, handleChange,productDetails,setQtycart, cartID } = useManageCart(changeQty)
  console.log(productDetails(cartItem.productID))////////DONT DELETE THIS///////////////

  const cartQty = cartItem.qty

  const[total,setTotal] = useState(cartQty* cartItem.productPrice)




  const productID = cartItem.productID


  const{setTrigger} = useContext(HeaderContext)

  const handleDelete = async () =>{
    try{
      await axios.delete("http://localhost:8081/api/v1/cart",{ data: {cartID, productID}})

      setUpdateCartTrigger((prev) => !prev);
      setTrigger(true)
      
    }catch(err){
      console.log(err)
    }
  }


 

   useEffect(()=>{
    setQtycart(cartQty)
    
   },[])


   useEffect(()=>{

    const newTotal = qty * cartItem.productPrice
    setTotal(newTotal)
    setUpdateCartTrigger((prev) => !prev);

   },[qty, cartItem.productPrice ])





  return (
      <>

    <td className="align-middle text-left " style={{paddingLeft:"25px"}}>
      <img src={cartItem.productImage1} alt="" style={{ width: 50 }} />{cartItem.productName}
      
    </td>
    <td className="align-middle">${cartItem.productPrice}</td>
    <td className="align-middle">
      <div
        className="input-group quantity mx-auto"
        style={{ width: 100 }}
      >
        <div className="input-group-btn">
          <button data-testid = 'minusbt' className="btn btn-sm btn-primary btn-minus" style={{backgroundColor:'#ffd333', border:'none'}} onClick={()=>handleQty(productDetails(cartItem.productID),'minus',true) }>

            <i className="fa fa-minus" />
          </button>
        </div>
        <input
          type="text"
          
          className="form-control form-control-sm bg border-0 text-center"
          
          
          style={{width:"22px", height:"40px",padding:"0" }}
          onChange={(e)=>{ handleChange(e,productDetails(cartItem.productID),true)
          }} //from useManageCart Hook
          value={qty}
          
        />
        <div className="input-group-btn">
          <button data-testid = 'plusbt' className="btn btn-sm btn-primary btn-plus" style={{backgroundColor:'#ffd333', border:'none'}} onClick={()=>{handleQty  (productDetails(cartItem.productID),'plus',true);
             }}>
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    </td>
    <td className="align-middle">${total}</td>
    <td className="align-middle">
      <button className="btn btn-sm btn-danger" onClick={()=> handleDelete()}>
        <i className="fa fa-times" />
      </button>
      <span style={{color:"red", fontSize:"0.85em"}}>{errQty}</span>
    </td>
  
  

      </>
  )
}

export default CartItem
