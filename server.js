require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51TBaAUH0zAQ0spyzBXZxzbVBlNnaI3hrIsYnRd5maJZD3uO7Lz0kq1uGhReqiAOmMSAXYRdLpLtllGprTel6D9B000dViQ2CBd');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Order = require('./models/orderModel');
const Product = require('./models/productModel'); 

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Stripe Session Route
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { productName, price, productId } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: { name: productName },
                    unit_amount: Math.round(price * 100), 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5000/orders.html?success=true&id=${productId}&price=${price}`,
            cancel_url: `http://localhost:5000/checkout.html?id=${productId}`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order & Stock Logic
app.post('/api/orders', async (req, res) => {
    try {
        const { orderItems, totalPrice, paymentResult, isPaid } = req.body;
        const newOrder = new Order({
            orderItems,
            totalPrice,
            paymentResult,
            isPaid,
            paidAt: Date.now(),
        });

        const createdOrder = await newOrder.save();

        if (isPaid) {
            for (const item of orderItems) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { countInStock: -1 }
                });
            }
        }
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: 'Error processing order' });
    }
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("GameVault Connected!"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log(`Server running on port 5000`));