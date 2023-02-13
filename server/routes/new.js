/* const express = require('express');
const sgMail = require('../services/sendgrid')
const cors = require("cors")
const router = express.Router();

router.post('/api/mail', cors(), async (req, res) => {
    const { to, subject, text, html, sandboxMode = false } = req.body;

    const msg = {
        to,
        from: 'josebainc@hotmail.com',
        subject,
        text,
        html,
        mail_settings: {
            sandbox_mode: {
                enable: sandboxMode
            }
        }
    }

    try {
        await sgMail.send(msg);
    } catch (err) {
        return res.status(err.code).send(err.message);
    }

    res.status(201).send({ success: true });
});

module.exports = router; */