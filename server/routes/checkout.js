const express = require('express');
const request = require('request');

const router = new express.Router();

router.post('/paypal/create-order', async (req, res) => {
    const reqBody = req.body;
    const paypalKey = process.env.PAYPAL_API_KEY;

    await request.post("https://api.sandbox.paypal.com/v2/checkout/orders", {
        headers: {
            "Content-Type": "application/json",
        },
        auth: {
            bearer: paypalKey
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
        if (error) {
            return res.status(200).json({
                success: false,
                message: error['message']
            });
        }

        const parsedBody = JSON.parse(body);

        return res.status(200).json({
            success: true,
            orderID: parsedBody["id"]
        });
    });
});

router.get('/paypal/capture-order/:order_id', async (req, res) => {
    const orderID = req.params.order_id;
    const paypalKey = process.env.PAYPAL_API_KEY;

    await request.post(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        headers: {
            "Content-Type": "application/json",
        },
        auth: {
            bearer: paypalKey
        }
    }, function (error, response, body) {
        if (error) {
            return res.status(200).json({
                success: false,
                message: error['message'],
            })
        }
        return res.status(200).json({
            success: true,
            data: JSON.parse(body)
        });
    });
});

router.post('/stripe/charge-card', async (req, res) => {
    const reqBody = req.body;
    const stripeKey = process.env.STRIPE_API_KEY;
    
    const creditCard = reqBody["creditCard"];
    const amount = reqBody["amount"];

    await request.post("https://api.stripe.com/v1/tokens", {
        auth: {
            bearer: stripeKey,
        },
        form: {
            "card[number]": creditCard["cardNumber"],
            "card[exp_month]": Number(creditCard["expMonth"]),
            "card[exp_year]": Number(creditCard["expYear"]),
            "card[cvc]": creditCard["cvc"],
            "card[name]": creditCard["name"]
        }
    }, function (error, response, body) {
        const bodyParsed = JSON.parse(body);

        if (bodyParsed.hasOwnProperty('error')) {
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        }

        request.post("https://api.stripe.com/v1/charges", {
            auth: {
                bearer: stripeKey,
            },
            form: {
                "amount": amount * 100,
                "currency": "usd",
                "source": bodyParsed["id"],
                "description": "Charge for jenny.rosen@example.com"
            }
        }, function (error, response, body) {
            const bodyParsed = JSON.parse(body);

            if (bodyParsed.hasOwnProperty('error')) {
                return res.status(200).json({
                    success: false,
                    message: error['message'],
                })
            }
            return res.status(200).json({
                success: true,
                data: JSON.parse(body),
            });
        })
    });

});

module.exports = router;
