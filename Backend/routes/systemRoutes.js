const express = require('express');
const router = express.Router();

const customerController = require('../controller/AdminUserController');
const productController = require('../controller/ProductController');

router.post('/registerUser', customerController.createCustomer);
router.post('/loginUser', customerController.LoginUser);
router.get('/getSeller', customerController.getSeller);

router.get('/getCategory',productController.getCategory);
router.post('/addProduct',productController.addProduct);

module.exports = router;
