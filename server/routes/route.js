const router = require('express').Router();

const { mail } = require('../controller/appController')

router.post('/mail', mail);

module.exports = router;