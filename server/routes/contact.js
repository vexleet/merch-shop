const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = new express.Router();

router.post('/send', (req, res) => {
    const reqBody = req.body;

    sgMail.setApiKey('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');

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

module.exports = router;