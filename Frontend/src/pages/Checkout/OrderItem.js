import React, { useEffect, useState } from 'react'
import { useManageCart } from '../../services/useManageCart'
import axios from 'axios'
import {cartService} from "../../services/cart.service";

const OrderItem = ({cartItem, setUpdateCartTrigger}) => {


  const changeQty = async (qty)=>{

      cartService.updateCart(qty,cartID, productID).then(res=>{

      }).catch(err =>{
          console.log(err)
      })
    /*try{
      await axios.put("http://localhost:8081/api/v1/cart/"+{cartID},{ qty,cartID, productID})

      
    }catch(err){
      console.log(err)
    }*/
  }

  
  const { qty, errQty, handleQty, handleChange,productDetails,setQtycart, cartID } = useManageCart(changeQty)
  console.log(productDetails(cartItem.productID))////////DONT DELETE THIS///////////////

  const cartQty = cartItem.qty

  const[total,setTotal] = useState(cartQty* cartItem.productPrice)




  const productID = cartItem.productID

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
    <td className="align-middle">{cartItem.productName}</td>
    <td className="align-middle" >{qty}</td>
    <td className="align-middle">${total}</td>
    </>
  )
}

export default OrderItem
