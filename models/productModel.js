const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String,},
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String},
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;