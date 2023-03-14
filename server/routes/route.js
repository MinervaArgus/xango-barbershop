const router = require('express').Router();

const { mail, payment, checkAppointment, cancelAppointment, getProducts } = require('../controller/appController')

router.post('/mail', mail);

router.post('/payment', payment);

router.get('/checkAppointment/:email/:id', checkAppointment);

router.delete('/cancelAppointment/:email/:id', cancelAppointment);

router.get('/getProducts', getProducts);

module.exports = router;