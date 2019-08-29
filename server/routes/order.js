const express = require('express');
const authCheck = require('../config/auth-check');
const Order = require('../models/Order');

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
                console.log(data);

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

module.exports = router;