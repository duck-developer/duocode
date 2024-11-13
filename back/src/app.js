const express = require('express')
const cors = require('cors')
const router_user = require('./routers/router_user')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router_user)



module.exports = app