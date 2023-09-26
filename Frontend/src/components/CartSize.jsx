import axios from 'axios'
import { useEffect,useState,useContext } from 'react'
import { useManageCart } from '../services/useManageCart'
import { HeaderContext } from '../contexts/HeaderContext'



const CartSize = () => {
  const {cartID} = useManageCart()

  const {trigger,setTrigger} = useContext(HeaderContext)


  const [cartSize,setCartSize] = useState(0)
 
  //////////////////////////////////////////
  useEffect(()=>{
    const fetchProductDetails = async ()=>{
      try{
        const res = await axios.get("http://localhost:8081/api/v1/cartsize/"+cartID)
 
        setCartSize(res.data.cartSize)
        setTrigger(false)
  
      
      }catch(err){
        console.log(err)
 
      }
    }
   
    fetchProductDetails()
  },[trigger,cartID])
 
  // useEffect(()=>{
  //   console.log("cart",cartSize)
  // },[cartSize])
 


  return (
    <>{cartSize}</>
  )
}

export default CartSize
