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
  p.productName,
  p.productPrice,
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

module.exports = {
  getCart,
  getCartDetails

};