const express = require('express')
const router = express.Router()

const {register, users} = require('../controllers/auth')

router.post('/register', register)
router.get('/users', users)

module.exports = router;