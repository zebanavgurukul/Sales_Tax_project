const express = require("express");
const product = express.Router();
const productDB = require("../model/productDB")

product.post('/post',(req,res) => {
    let data_post = {
        product_name : req.body.product_name,
        price : req.body.price,
        quantity : req.body.quantity,
        imported : req.body.imported,
        category : req.body.category
    }
    productDB.post(data_post)
    .then(() => {
        res.send('insert')
    }).catch((err) => {
        res.send(err)
    })
});



module.exports = product