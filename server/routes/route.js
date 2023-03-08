const router = require('express').Router();

const { mail, payment, checkAppointment, cancelAppointment } = require('../controller/appController')

router.post('/mail', mail);

router.post('/payment', payment);

router.get('/checkAppointment/:email/:id', checkAppointment);

router.delete('/cancelAppointment/:email/:id', cancelAppointment);

module.exports = router;