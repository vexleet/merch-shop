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
                console.log(error);
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
        });
    }
});

router.get('/all', (req, res) => {
    Merch.find()
        .then((data) => {
            return res.status(200).json({
                success: true,
                data: data,
            });
        })
});

router.get('/details/:name', (req, res) => {
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

router.delete('/delete/:name', authCheck, (req, res) => {
    const name = req.params.name.replace(/-/g, ' ');

    if (req.user.roles.indexOf('Admin') > -1) {
        Merch
            .findOneAndRemove({ "merchName": name })
            .then((data) => {
                return res.status(200).json({
                    success: true,
                    message: `${data.merchName} is successfully deleted!`,
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