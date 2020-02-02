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

// 3
product.get('/get_data/:product_cart_id',(req,res) => {
    let product_cart_id = req.params.product_cart_id
    productDB.get(product_cart_id)
    .then((data) => {
    let imported = data[0]["imported"]
    let category = data[0]["category"]
    let price = data[0]["price"]
    if (imported == "not_india"){
        var tax_price = price * 10/100
        let data_show = {
            product_cart_id : data[0]["product_cart_id"],
            quantity : data[0]["quantity"],
            product_name : data[0]["product_name"],
            imported : data[0]["imported"],
            category : data[0]["category"],
            price : data[0]["price"],
            quantity_price : data[0]["quantity_price"],
            tax : tax_price,
            price_with_tax : price + tax_price
        }
        res.send(data_show)
    }
    else if (imported == "india"){
        if (category == "general"){
            var tax_amount = price * 5/100
            let data_show = {
                product_cart_id : data[0]["product_cart_id"],
                quantity : data[0]["quantity"],
                product_name : data[0]["product_name"],
                imported : data[0]["imported"],
                category : data[0]["category"],
                price : data[0]["price"],
                quantity_price : data[0]["quantity_price"],
                tax : tax_amount,
                price_with_tax_ind : price + tax_amount
            }
            res.send(data_show)
        }
    }
    else{
        let data_show = {
            cart_id : data[0]["cart_id"],
            quantity : data[0]["quantity"],
            product_name : data[0]["product_name"],
            imported : data[0]["imported"],
            category : data[0]["category"],
            price : data[0]["price"],
            quantity_prise : data[0]["quantity_prise"]
        }
        res.send(data_show)
    }
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = product