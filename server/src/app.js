const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const userRouter = require('./routers/user')

const app = express()
app.use(express.json())

app.use(adminRouter)
app.use(userRouter)

module.exports = app