const { db } = require('../services/firebase');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const mail = async (req, res) => {
    const { customerName, to, subject, price, service, date, time, appointmentID } = req.body
    console.log(customerName, to, subject, price, service, date, time, appointmentID);
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
            link: "http://localhost:3000/appointmentStatus"
        }
    })

    let response = {
        body: {
            // name: "Appointment Confirmed",
            greeting: customerName + ", your appointment has been confirmed",
            intro: `Appointment ID: ${appointmentID}\nAppointment details: `,
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
            outro: `See you soon!`,
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
            msg: "You should receive an email"
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
            currency: "eur",
            description: "Pago Peluquería Xango",
            payment_method: id,
            confirm: true
        })
        console.log("Payment ID: ", id, "Payment", payment);
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

const checkAppointment = async (req, res) => {
    let { email, id } = req.params
    console.log(email, id);
    try {
        const appointmentsRef = db.collection('appointments')
        const snapshot = await appointmentsRef.where('email', '==', `${email}`).where('appointmentID', '==', `${id}`).get();
        if (snapshot.empty) {
            console.log('No matching results');
            res.send('No matching results');
            return;
        }
        let snapshotArr = []
        snapshot.forEach(doc => {
            // console.log(doc.data().paymentType);
            let appointment = {
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                haircut: doc.data().haircut,
                date: doc.data().date,
                time: doc.data().time,
                price: doc.data().price,
                paymentType: doc.data().paymentType,
                paid: doc.data().paid
            }
            snapshotArr.push(appointment);
        });

        res.send(snapshotArr)
    } catch (error) {
        res.send(error);
    }
    /*  snapshot.forEach(doc => {
         console.log(doc.id, '=>', doc.data());
         appointmentList.push(doc.data());
     })
     res.send(appointmentList) */
}

const cancelAppointment = async (req, res) => {
    let { email, id } = req.params;

    try {
        const appointmentRef = db.collection('appointments').where('email', '==', `${email}`).where('appointmentID', '==', `${id}`);
        appointmentRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            })
        })
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("Unable to cancel appointment");
    }
}

module.exports = {
    mail,
    payment,
    checkAppointment,
    cancelAppointment
}