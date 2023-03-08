//minimalistic web framework to help with network request
const express = require('express')
const app = express()

const authRoutes = require('./router/auth')

//parse jsonbody
app.use(express.json({limit: '1KB'}))
//mount router
app.use('/api/v1/auth', authRoutes)

module.exports = app