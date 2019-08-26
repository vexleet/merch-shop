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
            bearer: "A21AAEV354xmZ1AgFb0cofN8h2zLJGcqPXQ4XFil5XETVBZHZMz2Txa6Psnk1YRTvKS9xj0ETweaUrd8wQ12w03dDlrbZdGFg"
        },
        body: JSON.stringify({
            "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": (reqBody.reduce((a, b) => a + b["price"] * b["quantity"], 0)).toFixed(2)
                }
            }],
        })
    }, function (error, response, body) {
        const parsedBody = JSON.parse(body);
        console.log(body);
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
            bearer: "A21AAEV354xmZ1AgFb0cofN8h2zLJGcqPXQ4XFil5XETVBZHZMz2Txa6Psnk1YRTvKS9xj0ETweaUrd8wQ12w03dDlrbZdGFg"
        }
    }, function (error, response, body) {
        return res.status(200).json({
            data: JSON.parse(body)
        });
    });
});

router.post('/stripe/charge-card', async (req, res) => {
    const reqBody = req.body;

    const creditCard = reqBody["creditCard"];
    const amount = reqBody["amount"];

    await request.post("https://api.stripe.com/v1/tokens", {
        auth: {
            bearer: "pk_test_rCB3b9qzy0A8MHQjChtzZ17X00AtnWS7ZF",
        },
        form: {
            "card[number]": creditCard["cardNumber"],
            "card[exp_month]": creditCard["expMonth"],
            "card[exp_year]": creditCard["expYear"],
            "card[cvc]": creditCard["cvc"],
            "card[name]": creditCard["name"]
        }
    }, function (error, response, body) {
        const bodyParsed = JSON.parse(body);

        request.post("https://api.stripe.com/v1/charges", {
            auth: {
                bearer: "sk_test_oCdUi6zmTbilVt3yxff5rQtY00bvchtCNn",
            },
            form: {
                "amount": amount * 100,
                "currency": "usd",
                "source": bodyParsed["id"],
                "description": "Charge for jenny.rosen@example.com"
            }
        }, function (error, response, body) {
            return res.status(200).json({
                data: JSON.parse(body),
            });
        })
    });


});

module.exports = router;