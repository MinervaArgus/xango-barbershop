const { db, bucket, collectionRef } = require('../services/firebase');
const { ref, getDownloadURL, getStorage, listAll } = require('@firebase/storage')
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

const getProducts = async (req, res) => {
    console.log("Inside /getProducts");
    let imagesURL = [];
    const folderName = 'images/Products';

    bucket.getFiles({ prefix: folderName }, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching files');
            return;
        }

        files.forEach(file => {
            if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png') || file.name.endsWith('.gif')) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-17-2024'
                }).then(signedUrls => {
                    imagesURL.push(signedUrls[0]);
                    console.log("length: ", files.length);
                    console.log("length imgURL", imagesURL.length);
                    if (imagesURL.length === files.length - 1) {
                        console.log("imagesURL before sending: ", imagesURL);
                        res.status(200).send(imagesURL);
                    }
                    // console.log("jodida signed URL:", signedUrls);
                    // console.log("imagesURL inside: ", imagesURL);
                    console.log(`Download URL for ${file.name}: ${signedUrls[0]}`);

                }).catch(err => {
                    console.error(err);
                });
            } else if (imagesURL.length === files.length - 1) {
                res.send(imagesURL);
            }
        });
    });
}

const getHairstyles = async (req, res) => {
    console.log("Inside /getHairstyles");
    let imagesURL = [];
    const folderName = 'images/Hairstyles';

    bucket.getFiles({ prefix: folderName }, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching files');
            return;
        }

        files.forEach(file => {
            if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.webp')) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-17-2024'
                }).then(signedUrls => {
                    imagesURL.push(signedUrls[0]);
                    console.log("length: ", files.length);
                    console.log("length imgURL", imagesURL.length);
                    if (imagesURL.length === files.length - 1) {
                        console.log("imagesURL before sending: ", imagesURL);
                        res.status(200).send(imagesURL);
                    }
                    // console.log("jodida signed URL:", signedUrls);
                    // console.log("imagesURL inside: ", imagesURL);
                    console.log(`Download URL for ${file.name}: ${signedUrls[0]}`);

                }).catch(err => {
                    console.error(err);
                });
            } else if (imagesURL.length === files.length - 1) {
                res.send(imagesURL);
            }
        });
    });
}

const getServices = async (req, res) => {
    console.log("Inside /getServices");
    let services = [];
    // Get all documents in the collection
    collectionRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                services.push(doc.data());
                console.log("snapshot length", snapshot.size);
                console.log("services length", services.length);
                if (services.length === snapshot.size) {
                    res.status(200).send(services);
                }
            });
        })
        .catch(err => {
            console.error('Error getting documents', err);
            res.status(500).send(err);
        });
}

module.exports = {
    mail,
    payment,
    checkAppointment,
    cancelAppointment,
    getProducts,
    getHairstyles,
    getServices
}