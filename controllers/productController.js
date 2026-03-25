const Product = require('../models/productModel');


const getProducts = async (req, res) => {
    try {
        const { keyword, category } = req.query;
        let query = {};

        // Search for product name using regex
        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }

        // Filter by category if user selects a specific hardware type
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        const products = await Product.find(query);

        res.json(products);
    } catch (error) {
        console.error("Database Retrieval Error:", error);
        res.status(500).json({ message: "System error during product fetch" });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, countInStock } = req.body;

        // Image map to maintain visual consistency across gaming categories
        const defaultImages = {
            'keyboard': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500',
            'mouse': 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=500',
            'cpu': 'https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=500',
            'graphic card': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=500',
            'ram': 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=500'
        };

        // If image is empty, find the match based on category
        let finalImage = image;
        if (!image || image.trim() === "") {
            const lookup = category.toLowerCase();
            finalImage = defaultImages[lookup] || 'https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=500';
        }

        const product = new Product({
            name,
            price,
            brand,
            category,
            description: description || "Premium gaming hardware from GameVault.",
            image: finalImage,
            countInStock: countInStock || 0
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Entity Creation Error:", error);
        res.status(500).json({ message: "Validation error: Failed to create product record." });
    }
};

module.exports = { 
    getProducts, 
    createProduct 
};