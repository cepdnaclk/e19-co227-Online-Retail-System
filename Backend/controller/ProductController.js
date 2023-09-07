// ProductController.js
const db = require('../database');


async function getTopSellingProducts(req, res) {
  try {
    const sql = 'SELECT * FROM product'; 
    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching top-selling products from the database:', error);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results); 
      }
    });
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function getNewlyAddedProducts(req, res) {
    try {
      const sql = 'SELECT * FROM product ORDER BY productID DESC LIMIT 2;';
      db.query(sql, (error, result) => {
        if (error) {
          console.error('Error fetching newly added products from the database:', error);
          res.status(500).json({ error: 'Database error' });
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching newly added products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = {
  getTopSellingProducts,
  getNewlyAddedProducts,
};
