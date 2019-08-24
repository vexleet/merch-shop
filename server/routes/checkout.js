const express = require('express');
const request = require('request');

const router = new express.Router();

router.post('/paypal/create-order', async (req, res) => {
    const reqBody = req.body;

    await request.post("https://api.sandbox.paypal.com/v2/checkout/orders", {
        headers: {
            "Content-Type": "application/json",
        },
        auth: {
            bearer: "A21AAEDhie8koy9jC-jqh8lkyvMapvUKu2LjM8HrvqirQ1hcv8goA6rQ5f-G3mxN8xV8L1necSCt9ATq41t6aIF0xsW7PSGVA"
        },
        body: JSON.stringify({
            "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": reqBody.reduce((a, b) => a + b["price"] * b["quantity"], 0)
                }
            }],
        })
    }, function (error, response, body) {
        const parsedBody = JSON.parse(body);

        return res.status(200).json({
            orderID: parsedBody["id"]
        });
    });
});

router.get('/paypal/capture-order/:order_id', async (req, res) => {
    const orderID = req.params.order_id;

    await request.post(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        headers: {
            "Content-Type": "application/json",
        },
        auth: {
            bearer: "A21AAEDhie8koy9jC-jqh8lkyvMapvUKu2LjM8HrvqirQ1hcv8goA6rQ5f-G3mxN8xV8L1necSCt9ATq41t6aIF0xsW7PSGVA"
        }
    }, function (error, response, body) {
        console.log(body);
        return res.status(200).json({
            data: JSON.parse(body)
        });
    });
});

module.exports = router;