require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`))