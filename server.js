const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 500
const errHandler = require('./middleware/errHandler')

const contactRoutes = require('./routes/contactRoutes')

const connecting = require('./config/dbConn')

const userRoutes = require('./routes/userRoutes')

connecting();

app.use(express.json())
app.use('/contacts', contactRoutes)
app.use('/users', userRoutes)
app.use(errHandler)

app.listen(PORT, (req, res) => {
    console.log('how u doin');
})