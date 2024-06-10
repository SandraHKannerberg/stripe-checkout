const express = require('express')
const cors = require('cors')
//const bodyParser = require('body-parser');
const { productRouter } = require("./resources/product/product.router");
const { customerRouter } = require("./resources/customer/customer.router");
const { checkOutRouter } = require("./resources/checkout/checkout.router")
const cookieSession = require("cookie-session");
const crypto = require("crypto");

const app = express()

//Middlewares
// app.use(cors({
//     origin: '*'
// }))

const CLIENT_URL = process.env.CLIENT_URL

const corsOptions = {
  origin: CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions));

const secretKey = process.env.COOKIE_SECRET_KEY;

app.use(
    cookieSession({
      name: "session",
      keys: [secretKey],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    })
  );

app.use(express.json())
//app.use(bodyParser.json()); 

// Test
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Debugging
app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url, req.headers);
  next();
});

// Add routers
app.use("/api", productRouter);
app.use("/api", customerRouter);
app.use("/api", checkOutRouter)

module.exports = { app }
