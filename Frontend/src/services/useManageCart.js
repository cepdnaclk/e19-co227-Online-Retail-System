import { useEffect, useState } from "react";
import axios from 'axios';
import { manageAccount } from "./manage-account.service";

export const useManageCart = () => {
  const [cartID, setCartID] = useState(null); // Initialize cartID as null
  const [loading, setLoading] = useState(true); // Add a loading state

 
  useEffect(() => {
    const customerID = manageAccount.getCustomerID();

    if (customerID > 0) {
      const fetchCartDetails = async () => {
        try {
          const res = await axios.post("http://localhost:8081/api/v1/cart", { customerID });
         
          setCartID(res.data[0].cartID);
          setLoading(false); // Set loading to false once data is fetched
        } catch (err) {
          console.log(err);
          setLoading(false); // Set loading to false in case of an error
        }
      };
      fetchCartDetails();
    } else {
      setLoading(false); // Set loading to false if customerID is not greater than 0
    }
  }, []);

///////////////////// funcion for handle cart qty logic
  let [qty,setQty] = useState(1)

  let [errQty,setErrQty] = useState("")

  const handleQty = (product,action)=>{  
    
    if (action ==='plus'){
      
      if(qty<product.productQty){
        setQty((prevQty) => prevQty + 1); // Use the functional form of setState
        setErrQty((prevErr) => prevErr="");
      }
      else{
        setQty(product.productQty)
        setErrQty((prevErr) => prevErr+"Max order qty exceeded");
        
      }
      
    }
    if (action ==='minus'){
      if(qty>0){
        setQty((prevQty) => prevQty - 1); // Use the functional form of setState
        setErrQty((prevErr) => prevErr="");
      }
    }
    
  }

  const handleChange = (e,product)=>{
    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue) && newValue >= 1 && newValue <= product.productQty) {
    setQty(newValue);
    setErrQty((prevErr) => prevErr="");
    }
    else{ setErrQty((prevErr) => prevErr+"Max order qty exceeded");
    setQty(product.productQty)
  }
  }


///////////////fetch product details function
  let id = null
  const productDetails = (id1)=>{
    id = id1
  }
  const [product,setProduct] = useState([])

  useEffect(()=>{
    const fetchProductDetails = async ()=>{
      try{
        const res = await axios.get("http://localhost:8081/api/v1/product/"+id)

        //console.log(res.data)
        setProduct(res.data[0]) ;

      }catch(err){
        console.log(err)

      }
    }
    fetchProductDetails()
  },[]);
  
  // Return null while loading, and return cartID once it's fetched
  return {
    qty,
    errQty,
    handleQty,
    setQty,
    setErrQty,
    handleChange,
    productDetails,
    cartID,
    product
    
  };
};
