const express = require('express')
const router = express.Router()

const {balance, debit, credit} = require('../controllers/wallet')

router.get('/balance', balance)
router.post('/debit', debit)
router.post('/credit', credit)


module.exports = router;
