const express = require('express');
const router = express.Router();

const ProductDetailsController = require('../controller/ProductDetailsController')

const customerController = require('../controller/AdminUserController');
const productController = require('../controller/ProductController');
const CartController = require('../controller/CartController')
const OrderController = require('../controller/OrderController')

//const apriory = require('../controller/RecomenderSystemComtroller')

router.post('/registerUser', customerController.createCustomer);
router.post('/loginUser', customerController.LoginUser);
router.get('/getSeller', customerController.getSeller);
router.get('/verifyToken', customerController.verifyToken);

router.get('/getCategory',productController.getCategory);
router.post('/addProduct',productController.addProduct);
router.get('/getAllProductsFromSeller',productController.getAllProductsFromSeller)
router.put('/updateProduct/:id',productController.updateProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)

router.get('/getOrders',OrderController.getOrders)
router.get('/getOrderItems',OrderController.getOrderItems)
router.put('/updateTracking',OrderController.updateTracking)
router.put('/updateOrderStatus',OrderController.updateStatus)
router.delete('/deleteOrder/:id',OrderController.deleteOrder)

router.get('/top-selling-products', productController.getTopSellingProducts); 
router.get('/newly-added-products', productController.getNewlyAddedProducts);
router.get('/products/:categoryId/:subcategoryId', productController.getProductsByCategory) 

router.get('/product/:id', ProductDetailsController.getProduct); 
router.post('/product', ProductDetailsController.addToCart)

router.post('/cart', CartController.getCart);
router.get('/cart/:id', CartController.getCartDetails);
router.delete('/cart', CartController.deleteCartItem);
router.put('/cart/:id', CartController.changeQty);
router.post('/checkcart', CartController.checkCart);
router.get('/cartsize/:id',CartController.cartSize)



module.exports = router;
