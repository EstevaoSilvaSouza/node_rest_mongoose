const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    name: String,
    type: String
})

module.exports = Category