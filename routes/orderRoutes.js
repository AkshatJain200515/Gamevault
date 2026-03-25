const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders } = require('../controllers/orderController');


router.route('/').post(addOrderItems).get(getOrders);

module.exports = router;