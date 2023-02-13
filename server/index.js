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


app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
})

