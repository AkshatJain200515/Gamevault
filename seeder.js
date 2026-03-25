const mongoose = require('mongoose');
const Product = require('./models/productModel'); 
require('dotenv').config();

const products = [
    {
        name: 'Logitech G305 Hero',
        brand: 'Logitech',
        image: 'https://images.unsplash.com/photo-1619334084350-b093f0a9b40e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'High-performance wired gaming mouse with HERO 25K sensor.',
        category: 'Mouse',
        price: 79.99,
        countInStock: 15
    },
    {
        name: 'Razer BlackWidow V4',
        brand: 'Razer',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500',
        description: 'Mechanical gaming keyboard with Razer Green Switches.',
        category: 'keyboard',
        price: 119.99,
        countInStock: 0 
    },
    {
        name: 'NVIDIA RTX 4070 Ti',
        brand: 'NVIDIA',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=500',
        description: 'Elite 1440p gaming with DLSS 3 technology.',
        category: 'Graphic Card',
        price: 799.00,
        countInStock: 3 
    },
    {
        name: 'RedGear Mechanical Keyboard',
        brand: 'RedGear',
        image: 'https://images.unsplash.com/photo-1625130694338-4110ba634e59?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'OmniPoint adjustable mechanical switches.',
        category: 'keyboard',
        price: 199.99,
        countInStock: 10
    },
    {
        name: 'Corsair Vengeance 32GB',
        brand: 'Corsair',
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=500',
        description: 'High-performance DDR4 memory for heavy multitasking.',
        category: 'RAM',
        price: 115.00,
        countInStock: 25
    },
    {
        name: 'Intel Core i5-13900K',
        brand: 'Intel',
        image: 'https://images.unsplash.com/photo-1673470609632-394851a7c77e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '24 cores and 32 threads for ultimate processing power.',
        category: 'CPU',
        price: 349.99,
        countInStock: 5
    },
    {
        name: 'ASUS ROG Strix RTX 4080',
        brand: 'ASUS',
        image: 'https://images.unsplash.com/photo-1642980701168-7c37d0116f28?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Triple fan cooling for maximum GPU performance.',
        category: 'Graphic Card',
        price: 1199.00,
        countInStock: 2
    },
    {
        name: 'AMD Ryzen 9 7950X',
        brand: 'AMD',
        image: 'https://images.unsplash.com/photo-1555616635-640b71bdb185?q=80&w=500',
        description: 'The dominant gaming processor for enthusiasts.',
        category: 'CPU',
        price: 549.99,
        countInStock: 7
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany(); 
        await Product.insertMany(products);
        console.log('✅ Success: All Products Added');
        process.exit();
    } catch (error) {
        console.error('❌ Error Seeding Data:', error);
        process.exit(1);
    }
};

seedData();