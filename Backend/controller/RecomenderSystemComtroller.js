const db = require('../database');
const fi = require('frequent-itemset');

const getReccomnederProduct = async(req,res)=>{

    
    const productID = req.params.id

    const q = 'SELECT orderID, GROUP_CONCAT(productID ORDER BY productID ASC) as productIDs FROM order_item GROUP BY orderID';


          db.query(q, (err,data) => {
            if(err) return res.json(err)
             
              //console.log(data)

              const purchaseHistory = data.map((row) => row.productIDs.split(','));

              console.log(purchaseHistory)

              const frequentItemsets = fi(
                purchaseHistory,
                0.1,
                true
              )

              console.log(frequentItemsets);

              const filteredItemsets = frequentItemsets
                .filter((itemset) => itemset.includes(productID))
                .map((itemset) => itemset.map((productID) => parseInt(productID, 10)));

            console.log('Filtered Itemsets:', filteredItemsets);
    
            
              return res.json(filteredItemsets)
          })

    


  
}



module.exports = {
    getReccomnederProduct
  };