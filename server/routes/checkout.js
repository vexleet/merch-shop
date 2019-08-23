const express = require('express');
const payPalClient = require('../common/payPalClient');
const paypal = require('@paypal/checkout-server-sdk');

const router = new express.Router();

router.post('/paypal', async (req, res) => {
    const reqBody = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    const total = reqBody.reduce((a, b) => a + b['price'] * b['quantity'], 0);

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: total.toString()
            }
        }]
    });

    let order;

    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {
        console.error(err);
        return res.send(500);
    }

    res.status(200).json({
        orderID: order.result.id
    });
});

module.exports = router;