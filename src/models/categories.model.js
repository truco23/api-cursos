const Mongoose = require('mongoose')
const schemaCategories = new Mongoose.Schema({

    name: {
        required: true,
        type: String
    }
},
{
    timestamps: true
})

module.exports = Mongoose.model('schemaCategories', schemaCategories)