const express = require('express');
const router = express.Router();

const ProductDetailsController = require('../controller/ProductDetailsController')

const customerController = require('../controller/AdminUserController');
const productController = require('../controller/ProductController');
const CartController = require('../controller/CartController')

router.post('/registerUser', customerController.createCustomer);
router.post('/loginUser', customerController.LoginUser);
router.get('/getSeller', customerController.getSeller);
router.get('/verifyToken', customerController.verifyToken);

router.get('/getCategory',productController.getCategory);
router.post('/addProduct',productController.addProduct);

router.get('/top-selling-products', productController.getTopSellingProducts); 
router.get('/newly-added-products', productController.getNewlyAddedProducts); 

router.get('/product/:id', ProductDetailsController.getProduct); 
router.post('/product', ProductDetailsController.addToCart)

router.post('/cart', CartController.getCart);
router.get('/cart/:id', CartController.getCartDetails);




module.exports = router;
