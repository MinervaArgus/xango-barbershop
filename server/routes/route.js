const router = require('express').Router();

const { mail, payment } = require('../controller/appController')

router.post('/mail', mail);

router.post('/payment', payment);

module.exports = router;