var knex = require("knex")({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "navgurukul",
        database: "Sales_Tax"
    },
    useNullAsDefault: true
});
module.exports = knex;

knex.schema.hasTable('products').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('products', (table) => {
            table.increments('product_id')
            table.string('product_name')
            table.integer('price')
            table.integer('quantity')
            table.string('imported')
            table.string('category')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});