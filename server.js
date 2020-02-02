const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const product = require('./route/product')
app.use('/product',product)

app.listen(4000, () => {
    console.log("server is listening 4000.........")
});