const express = require("express");
const product = express.Router();
const productDB = require("../model/productDB")

// 1
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

// 2
product.get('/get/:product_id',(req,res) => {
    let product_id = req.params.product_id
    productDB.get_data(product_id)
    .then((data) => {
        let price = data[0]['price']
        let quantity = data[0]['quantity']
        let quantity_price = quantity * price
    let data_insert = {
        product_cart_id : data[0]['product_id'],
        product_name : data[0]['product_name'],
        price : data[0]['price'],
        quantity : data[0]['quantity'],
        imported : data[0]['imported'],
        category : data[0]['category'],
        quantity_price : quantity_price
    }
    productDB.cart(data_insert)
    .then(() => {
        res.send('insert')
    }).catch((err) => {
        res.send(err)
    })
    })
});

module.exports = product