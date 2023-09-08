const db = require('../database');


const getProduct = async(req,res)=>{

    const productID = req.params.id
      const q= `SELECT DISTINCT
      p.productID, 
      p.productName,
      p.productPrice,
      p.productQty,
      p.productImage1,
      p.productImage2,
      p.productImage3,
      p.productImage4,
      p.productImage5,
      p.productDetails,
      s.shopName,
      c.categoryName,
      sc.subcategoryName
  FROM
      product p
  JOIN
      seller s ON p.sellerID = s.sellerID
  JOIN
      category c ON p.categoryID = c.categoryID
  JOIN
      sub_category sc ON c.categoryID = sc.categoryID
  WHERE
      p.productID = ?
  GROUP BY
      p.productID;;`
    ;
         
    db.query(q,[productID],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
    })
}

//sub_category sc ON p.subcategoryID = sc.subcategoryID

module.exports = {
  getProduct
};