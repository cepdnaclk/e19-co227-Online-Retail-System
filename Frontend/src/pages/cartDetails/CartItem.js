import React from 'react'
import { useManageCart } from '../../services/useManageCart'

const CartItem = ({cartItem}) => {

  const { qty, errQty, handleQty, handleChange,productDetails } = useManageCart()
 console.log(productDetails(cartItem.productID))


  return (
    <>
    <td className="align-middle">
      <img src="img/product-1.jpg" alt="" style={{ width: 50 }} />{cartItem.productName}
      
    </td>
    <td className="align-middle">{cartItem.productPrice}</td>
    <td className="align-middle">
      <div
        className="input-group quantity mx-auto"
        style={{ width: 100 }}
      >
        <div className="input-group-btn">
          <button className="btn btn-sm btn-primary btn-minus" onClick={()=>handleQty(productDetails(cartItem.productID),'minus') }>

            <i className="fa fa-minus" />
          </button>
        </div>
        <input
          type="text"
          
          className="form-control form-control-sm bg-secondary border-0 text-center"
          //defaultValue={cartItem.qty}
          style={{width:"20px",  height:"40px"}}
          onChange={(e)=>{ handleChange(e,productDetails(cartItem.productID))}} //from useManageCart Hook
          value={qty}
        />
        <div className="input-group-btn">
          <button className="btn btn-sm btn-primary btn-plus" onClick={()=>handleQty  (productDetails(cartItem.productID),'plus')}>
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    </td>
    <td className="align-middle">$150</td>
    <td className="align-middle">
      <button className="btn btn-sm btn-danger">
        <i className="fa fa-times" />
      </button>
    </td>
    <td>
    <p style={{paddingTop:"13px", paddingLeft:"10px", color:"red"}}>{errQty}</p>
    </td>
  
    </>
  )
}

export default CartItem