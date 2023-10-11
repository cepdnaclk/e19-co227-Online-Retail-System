const express = require('express');
const router = express.Router();

const ProductDetailsController = require('../controller/ProductDetailsController')

const customerController = require('../controller/AdminUserController');
const productController = require('../controller/ProductController');
const CartController = require('../controller/CartController')
const OrderController = require('../controller/OrderController')
const RecomenderSystemComtroller = require('../controller/RecomenderSystemComtroller')

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

router.get('/getCustomerOrders',OrderController.getCustomerOrders)

router.get('/sales',OrderController.getSalesAmount)

router.get('/getOrders',OrderController.getOrders)
router.get('/getOrderItems',OrderController.getOrderItems)
router.put('/updateTracking',OrderController.updateTracking)
router.put('/updateOrderStatus',OrderController.updateStatus)
router.delete('/deleteOrder/:id',OrderController.deleteOrder)
router.post('/customer',OrderController.getcustomerinfo)
router.post('/putorder',OrderController.putOrder)

router.put('/updateCustomer/:id',customerController.updateUser)
router.post('/setAsSeller/:id',customerController.setAsSeller)

router.get('/top-selling-products', productController.getTopSellingProducts); 
router.get('/newly-added-products', productController.getNewlyAddedProducts);
router.get('/products/:categoryId/:subcategoryId', productController.getProductsByCategory) 
router.get('/categoryCount/:categoryId',productController.getproductcount);

router.get('/:categoryName/:categoryID/:count',productController.getProductsByMainCategory);

router.get('/product/:id', ProductDetailsController.getProduct); 
router.post('/product', ProductDetailsController.addToCart)

router.post('/cart', CartController.getCart);
router.get('/cart/:id', CartController.getCartDetails);
router.delete('/cart', CartController.deleteCartItem);
router.put('/cart/:id', CartController.changeQty);
router.post('/checkcart', CartController.checkCart);
router.get('/cartsize/:id',CartController.cartSize)

router.get('/productRCMND/:id', RecomenderSystemComtroller.getReccomnederProduct)



module.exports = router;
