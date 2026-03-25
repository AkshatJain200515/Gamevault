const Order = require('../models/orderModel');
const Product = require('../models/productModel');


const addOrderItems = async (req, res) => {
    try {
        const { orderItems, totalPrice, paymentResult } = req.body;
        // Initialize order record with payment verification
        const order = new Order({
            orderItems,
            totalPrice,
            paymentResult,
            isPaid: true,
            paidAt: Date.now()
        });

        const createdOrder = await order.save();

        // INVENTORY SYNCHRONIZATION
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { countInStock: -1 } 
            });
            console.log(`Inventory sync successful for: ${item.name}`);
        }

        res.status(201).json(createdOrder);
        } catch (error) {
        console.error("Transactional Error:", error);
        res.status(400).json({ message: "Order processing failed", error });
    }
};

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
};

module.exports = { addOrderItems, getOrders };