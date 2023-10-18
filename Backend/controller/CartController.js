const db = require('../database');


const getCart = async(req,res)=>{

    const customerID = req.body.customerID
    //console.log(customerID)
      const q= `SELECT cartID FROM cart WHERE customerID = ?; `
    ;
         
    db.query(q,[customerID],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
    })
}

const getCartDetails = async(req, res)=>{

  const customerID = req.params.id

  const q = `SELECT
  ci.productID,
  ci.sellerID,
  p.productName,
  p.productPrice,
  p.productImage1,
  ci.qty
FROM
  customer c
JOIN
  cart ca ON c.customerID = ca.customerID
JOIN
  cart_items ci ON ca.cartID = ci.cartID
JOIN
  product p ON ci.productID = p.productID
WHERE
  c.customerID = ?;
`

db.query(q,[customerID],(err,data)=>{
  if(err) return res.json(err)
  return res.json(data)
})

}

const deleteCartItem = async(req,res)=>{
  const { cartID, productID } = req.body;
  const q = "DELETE FROM cart_items WHERE cartID = ? AND productID = ?"

  db.query(q, [cartID, productID], (err, data) =>{
    if (err) return res.json(err);

    return res.json("Item deleted")
  })
}

const changeQty = async(req,res)=>{
  const { cartID, productID, qty } = req.body;

  const q = "UPDATE cart_items set `qty` = ? WHERE cartID = ? AND productID = ?"

  db.query(q, [qty,cartID, productID ], (err, data) =>{
    if (err) return res.json(err);
 
    return res.json("Updated")
  })
}

const checkCart = async(req,res)=>{
  const { cartID, productID } = req.body;
  console.log(req.body)
  const q = "SELECT qty FROM cart_items WHERE cartID = ? AND productID = ? "

  


  db.query(q, [cartID, productID], (err, data) =>{
    if (err) return res.json(err);
    return res.json(data)
   
    
  })

}

const cartSize = async(req,res)=>{

  cartID = req.params.id
  const q = `SELECT COUNT(*) as cartSize
  FROM cart_items
  WHERE cartID = ? ;`
  

  db.query(q,[cartID],(err,data) =>{
    if (err) return res.json(err)
    return res.json(data[0])
    
  })
}

module.exports = {
  getCart,
  getCartDetails,
  deleteCartItem, 
  changeQty, 
  checkCart,
  cartSize

};