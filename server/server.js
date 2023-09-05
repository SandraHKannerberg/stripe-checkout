require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = 3000
const app = express()

//Middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`))