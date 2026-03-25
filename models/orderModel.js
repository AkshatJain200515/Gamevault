const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentResult: { id: String, status: String },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);