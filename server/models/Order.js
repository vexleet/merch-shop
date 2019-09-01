const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    adress: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    approved: { type: Boolean, required: true, default: false },
    items: { type: Array, required: true },
    orderDate: { type: Date, required: true, default: Date.now() },
    status: { type: String, required: true, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;