const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = new express.Router();

router.post('/send', (req, res) => {
    const reqBody = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'vex_malamov@abv.bg',
        from: reqBody.email,
        subject: reqBody.subject,
        text: reqBody.message,
    };

    sgMail.send(msg)
        .then((data) => {
            return res.status(200).json({
                success: true,
                message: 'Email sent successfully.'
            })
        }).catch((error) => {
            return res.json({
                success: false,
                message: 'Something went wrong try again.'
            });
        });
});

router.post('/contact-client', (req, res) => {
    const reqBody = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: reqBody.email,
        from: 'vex_malamov@abv.bg',
        subject: reqBody.subject,
        text: reqBody.message,
    };

    sgMail.send(msg)
        .then((data) => {
            return res.status(200).json({
                success: true,
            })
        }).catch((error) => {
            return res.json({
                success: false,
                message: 'Something went wrong try again.'
            });
        });
});

module.exports = router;