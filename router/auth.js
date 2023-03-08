const express = require('express')
const router = express.Router()

const {register, users, login, logout} = require('../controllers/auth')

router.post('/register', register)
router.get('/users', users)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router;