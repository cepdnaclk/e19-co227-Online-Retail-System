const express = require('express');
const router = express.Router();

const customerController = require('../controller/AdminUserController');
const productController = require('../controller/ProductController');

router.post('/registerUser', customerController.createCustomer);
router.post('/loginUser', customerController.LoginUser);
router.get('/getSeller', customerController.getSeller);
router.get('/verifyToken', customerController.verifyToken);

router.get('/getCategory',productController.getCategory);
router.post('/addProduct',productController.addProduct);

router.get('/top-selling-products', productController.getTopSellingProducts); 
router.get('/newly-added-products', productController.getNewlyAddedProducts); 



module.exports = router;
