const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { productRouter } = require("./resources/product/product.router");
const { customerRouter } = require("./resources/customer/customer.router");
const { checkOutRouter } = require("./resources/checkout/checkout.router")
const cookieSession = require("cookie-session");
const crypto = require("crypto");

const app = express()

//Middlewares
app.use(cors({
    origin: '*'
}))


const secretKey = process.env.COOKIE_SECRET_KEY;

app.use(
    cookieSession({
      name: "session",
      keys: [secretKey],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );

app.use(express.json())
app.use(bodyParser.json()); 

// Add routers
app.use("/api", productRouter);
app.use("/api", customerRouter);
app.use("/api", checkOutRouter)

module.exports = { app }