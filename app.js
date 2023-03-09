//minimalistic web framework to help with network request
const express = require('express')
const app = express()
const {DATABASE_CONNECTION_STRINGS} = require('./configs/properties')
const session = require('express-session')
const MongoStore = require('connect-mongo')


// Use session middleware to manage user sessions
app.use(
    session({
      secret: 'user secret',
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: DATABASE_CONNECTION_STRINGS }),
      cookie: { maxAge: 3600000 }, // 1 hour
    })
  )

const authRoutes = require('./router/auth')
const walletRoutes = require('./router/wallet')

//parse jsonbody
app.use(express.json({limit: '1KB'}))
//mount router
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/wallet', walletRoutes)

module.exports = app