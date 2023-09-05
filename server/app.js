const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("express-async-errors");

const { productRouter } = require("./resources/product/product.router");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Add routers
app.use("/api", productRouter);
app.use("/api", checkOutRouter);

module.exports = { app };