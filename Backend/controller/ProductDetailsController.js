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
      p.sellerID,
      s.shopName,
      c.categoryName,
      sc.subCategoryName
  FROM
      product p
  JOIN
      seller s ON p.sellerID = s.sellerID
  JOIN
      sub_category sc ON p.categoryID = sc.subCategoryID
      
  JOIN
      category c ON sc.categoryID = c.categoryID
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

const addToCart = async(req,res)=>{

    
    const {cartID,  customerID, productID, sellerID, qty, price } = req.body;

    const q2 = `INSERT INTO cart_items (cartID, productID,sellerID, qty, price) VALUES (?,?,?,?,?);`
    
    const q1 = `INSERT INTO cart (customerID) VALUES (?);
        SELECT LAST_INSERT_ID() AS GencartID`;

    const q3 = `INSERT INTO cart_items (productID,sellerID, qty, price) WHERE cartID =cartID VALUES (?,?,?,?,?);`
    if(cartID === null || cartID === undefined){

          db.query(q1,customerID, (err,data) => {
            if(err) return res.json(err)
        
              const GenCartID = (data[1][0].GencartID);
             
              //console.log(cartID)
        
        
        
              db.query(q2,[GenCartID,productID, sellerID, qty, price],(err,data)=>{
                if(err) return res.json(err)
                //console.log("added new")
              })
              
        
              return res.json(data)
          })

    }
    else{
        db.query(q2,[cartID,productID, sellerID, qty, price],(err,data)=>{
            if(err) return res.json(err)

           // console.log("added existing")
            return res.json(data)
            
          })
    }

  
}

module.exports = {
  getProduct,
  addToCart
};