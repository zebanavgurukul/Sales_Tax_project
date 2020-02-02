const knex = require("../knexFile");

let post = (data_post) => {
    return knex('products').insert(data_post)
}

module.exports = {post}
