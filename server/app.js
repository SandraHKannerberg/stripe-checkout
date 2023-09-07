const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { productRouter } = require("./resources/product/product.router");
const { customerRouter } = require("./resources/customer/customer.router");
const cookieSession = require("cookie-session");

const app = express()

//Middlewares
app.use(cors({
    origin: '*'
}))

app.use(
    cookieSession({
      name: "session",
      //keys: ["aVeryS3cr3tK3y"],
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

module.exports = { app }