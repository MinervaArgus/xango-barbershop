const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

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

}

const payment = async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Spike Payment Example",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}

module.exports = {
    mail,
    payment
}