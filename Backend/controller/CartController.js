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



}

module.exports = {
  getCart,
  getCartDetails

};