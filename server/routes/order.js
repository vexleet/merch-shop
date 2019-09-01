const express = require('express');
const authCheck = require('../config/auth-check');
const Order = require('../models/Order');
const request = require('request');

const router = new express.Router();

router.post('/create', (req, res) => {
    const reqBody = req.body;

    Order.create(reqBody)
        .then((data) => {
            return res.status(200).json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        });
});

router.get('/all', authCheck, (req, res) => {
    if (req.user.roles.indexOf('Admin') > -1) {
        Order.find({ approved: false })
            .then((data) => {
                return res.status(200).json({
                    success: true,
                    data
                });
            })
            .catch((error) => {
                return res.status(200).json({
                    success: false,
                })
            })
    }
    else {
        return res.json({
            success: false,
        });
    }
});

router.get('/details/:id', authCheck, (req, res) => {
    const orderId = req.params.id;

    if (req.user.roles.indexOf('Admin') > -1) {
        Order.findOne({ _id: orderId })
            .then((data) => {
                return res.status(200).json({
                    success: true,
                    data,
                })
            })
            .catch((error) => {
                return res.status(200).json({
                    success: false,
                    message: 'Something went wrong!',
                })
            })
    }
    else {
        return res.json({
            success: false,
        });
    }
});

router.put('/approve/:id', authCheck, (req, res) => {
    const orderId = req.params.id;

    if (req.user.roles.indexOf('Admin') > -1) {
        Order.findByIdAndUpdate(orderId, {
            status: "Approved",
            approved: true,
        })
            .then((data) => {
                const clientEmail = {
                    email: data.email,
                    subject: 'Approved order.',
                    message: 'Hello we would like to inform you that your order was approved and it will arrive in 3-5 work days.'
                }

                request.post(`http://localhost:5000/contact/contact-client`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(clientEmail),
                }, function (error, repsonse, body) {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody['success']) {
                        return res.status(200).json({
                            success: true,
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: false,
                        });
                    }
                });
            })
            .catch((error) => {
                return res.status(200).json({
                    success: false,
                    message: 'Something went wrong!',
                });
            });
    }
    else {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;