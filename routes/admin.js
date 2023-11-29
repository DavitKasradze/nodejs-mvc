const path = require('path');

const express = require('express');

const productsController = require(`../controllers/products`)

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

// exports.routes = router;
// exports.products = products;  // ეს რა იყო აღარ მახსოვს.

module.exports = router;
