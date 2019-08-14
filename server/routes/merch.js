const express = require('express');
const authCheck = require('../config/auth-check');
const Merch = require('../models/Merch');

const router = new express.Router();

router.post('/create', authCheck, (req, res) => {
    const merchBody = req.body;

    if (req.user.roles.indexOf('Admin') > -1) {
        Merch
            .create(merchBody)
            .then((data) => {
                res.status(200).json({
                    success: true,
                    message: 'New merch added successfully',
                    data: data,
                });
            })
            .catch(error => {
                let message = 'Something went wrong. Check the form for errors';

                if (error.code === 11000) {
                    message = 'Merch with the same name already exists!';
                }

                return res.json({
                    success: false,
                    message: message,
                })
            });
    }
    else {
        return res.json({
            success: false,
            message: 'Invalid credentials!',
        });
    }
});

router.get('/all-merch', (req, res) => {
    Merch.find()
        .then((data) => {
            return res.status(200).json({
                success: true,
                data: data,
            });
        })
});

router.get('/all-merch/:name', (req, res) => {
    const name = req.params.name.replace(/-/g, ' ');

    Merch.findOne({
        merchName: name
    })
        .then((data) => {
            return res.status(200).json({
                success: true,
                data: data,
            });
        });
});

module.exports = router;