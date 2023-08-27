const express = require('express');
const router = express.Router();

const customerController = require('../controller/AdminUserController');

router.post('/registerUser', customerController.createCustomer);
router.post('/loginUser', customerController.LoginUser);

module.exports = router;
