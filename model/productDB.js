const knex = require("../knexFile");

// 1
let post = (data_post) => {
    return knex('products').insert(data_post)
};

// 2
let get_data = (product_id) => {
    return knex('products').select('*').where('products.product_id',product_id)
};

let cart = (data_insert) => {
    return knex('product_cart').insert(data_insert)
}

module.exports = {post,get_data,cart}
