const express = require('express');
const authCheck = require('../config/auth-check');
const Merch = require('../models/Merch');

const router = new express.Router();

function validateMerch(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload) {
        message = 'No input';

        return {
            success: isFormValid,
            message,
            errors
        }
    }

    if (!payload || typeof payload.merchName !== 'string' || payload.merchName.trim().length < 4) {
        isFormValid = false;
        errors.merchName = 'Merch name should be at least 4 chars.';
    }

    if (!payload || typeof payload.price !== 'number' || payload.price <= 0) {
        isFormValid = false;
        errors.price = 'Price should be a positive number.';
    }

    if (!payload || payload.colors === undefined) {
        isFormValid = false;
        errors.colors = 'There should be at least 1 color.';
    }

    if (!payload || payload.sizes === undefined) {
        isFormValid = false;
        errors.sizes = 'There should be at least 1 size.';
    }

    if (!payload || payload.imagesOfMerch === undefined) {
        isFormValid = false;
        errors.imagesOfMerch = 'There should be at least 1 image.';
    }

    if (!payload || typeof payload.typeOfMerch !== 'string') {
        isFormValid = false;
        errors.typeOfMerch = 'Type of merch is required.';
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

router.post('/create', authCheck, (req, res) => {
    const merchBody = req.body;
    const validationResult = validateMerch(merchBody);

    if (!validationResult.success) {
        return res.status(200).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

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
    } else {
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
            .findOneAndRemove({
                "merchName": name
            })
            .then((data) => {
                return res.status(200).json({
                    success: true,
                    message: `${data.merchName} is successfully deleted!`,
                });
            });
    } else {
        return res.json({
            success: false,
        });
    }
});

router.put('/edit/:name', authCheck, (req, res) => {
    const name = req.params.name.replace(/-/g, ' ');

    const newBody = req.body;

    if (req.user.roles.indexOf('Admin') > -1) {
        Merch.findOneAndUpdate({
            merchName: name
        }, newBody, {
                new: true
            }).then((data) => {
                return res.status(200).json({
                    success: true,
                    message: `${data.merchName} is successfully updated!`,
                });
            })
    } else {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;