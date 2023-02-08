const express = require("express")
const appRoute = require('./routes/route.js')
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
// const createMail = require('./routes/new');
// const sgMail = require('./services/sendgrid')
// const nodemailer = require('nodemailer')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use('/api', appRoute);
// app.use(createMail);

module.exports = app;
/*
app.post("/mail", cors(), async (req, res) => {
    const { to, subject, text, html, sandboxMode = false } = req.body
    console.log(to, subject, text, html, sandboxMode);

    const config = {
        host: "smpt.gmail.com",
        // port: 587,
        // service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: "josebaincera@gmail.com",
            pass: "omcehqptegcsdrnc",
        }
    }

    const msg = {
        from: 'josebaincera@gmail.com',
        to,
        subject,
        text
    }

    const transport = nodemailer.createTransport({ config });
    try {
        transport.sendMail(msg);
    } catch (err) {
        return res.status(err.code).send(err.message);
    }
    /*
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
})*/

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
})

// const app = require('./app')
// const cors = require("cors")

// app.use(cors({
//     origin: 'http://localhost:3001'
// }));

// app.listen(3000, () => {
//     console.log('Listening on port 3000');
// });
