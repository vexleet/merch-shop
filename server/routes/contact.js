const express = require('express');
const nodemailer = require('nodemailer');

const router = new express.Router();

router.post('/send', (req, res) => {
    const reqBody = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // use SSL
        auth: {
            user: 'abda70226@gmail.com',
            pass: 'vexisth3pro1337vex1234'
        }
    });

    console.log(reqBody);

    const mailOptions = {
        from: `"${reqBody.name}" <${reqBody.email}>`,
        to: 'piper25@ethereal.email',
        subject: reqBody.subject,
        text: reqBody.text
    }

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);

            return res.json({
                success: false,
                message: 'Something went wrong try again.'
            });
        } else {
            console.log(response);
            return res.status(200).json({
                success: true,
                message: 'Email sent successfully.'
            })
        }
    })


});

module.exports = router;