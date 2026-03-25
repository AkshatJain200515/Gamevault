const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const Product = require('../models/productModel');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.status(200).json({ message: "Product deleted" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error during delete" });
    }
});

module.exports = router;