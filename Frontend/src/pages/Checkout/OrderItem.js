import React, { useEffect, useState } from 'react'
import { useManageCart } from '../../services/useManageCart'
import axios from 'axios'

const OrderItem = ({cartItem, setUpdateCartTrigger}) => {


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

   useEffect(()=>{
    setQtycart(cartQty)
    //setTotal(qty* cartItem.productPrice)
   },[])


   useEffect(()=>{

    const newTotal = qty * cartItem.productPrice
    setTotal(newTotal)
    setUpdateCartTrigger((prev) => !prev);

   },[qty, cartItem.productPrice ])

  return (
    <>
    <td className="align-middle">{cartItem.productName}</td>
    <td className="align-middle">{qty}</td>
    <td className="align-middle">${total}</td>
    </>
  )
}

export default OrderItem