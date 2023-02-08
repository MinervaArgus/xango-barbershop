const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require("dotenv").config()

const mail = async (req, res) => {
    const { customerName, to, subject, price, service, date, time, html, sandboxMode = false } = req.body
    console.log(to, price, service);
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Peluquería Xango",
            link: "https://mailgen.js/"
        }
    })

    let response = {
        body: {
            // name: "Appointment Confirmed",
            greeting: customerName + ", your appointment has been confirmed",
            intro: "Appointment details: ",
            table: {
                data: [
                    {
                        date,
                        time,
                        service,
                        price
                    }
                ]
            },
            outro: "See you soon,",
            signature: false
        }
    }

    let mailfr = MailGenerator.generate(response)

    let message = {
        from: "josebaincera@gmail.com",
        to,
        subject,
        html: mailfr
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
    /* let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        }
    })
    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Succes!", // plain text body
        html: "<b>Succes!</b>", // html body
    }

    transporter.sendMail(message).then((info) => {
        return res.status(201).json({
            msg: "you should receive an email",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    }) */


    //res.status(201).json("Mail sent")
}

module.exports = {
    mail
}