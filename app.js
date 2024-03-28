require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`this app listening to port ${PORT}`)
})