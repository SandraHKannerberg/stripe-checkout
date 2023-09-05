require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PORT = 3000
const app = express()

const CLIENT_URL = 'http://localhost:5173'

//Middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`))