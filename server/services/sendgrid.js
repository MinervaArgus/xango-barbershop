const sgMail = require('@sendgrid/mail');
require("dotenv").config()

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports = sgMail;