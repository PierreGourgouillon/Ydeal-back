const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    pictures: { type: [String], require: false },
    category: { type: String, require: true },
    description: { type: String, require: true },
    createdAt: { type: String, require: true },
    ownerId: { type: String, ref: 'User.firebaseId' },
})

module.exports = mongoose.model("Product", productSchema);