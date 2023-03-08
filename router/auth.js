const express = require('express')
const router = express.Router()

const {register, users, login} = require('../controllers/auth')

router.post('/register', register)
router.get('/users', users)
router.post('/login', login)

module.exports = router;