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

Mongoose.model('schemaCategories', schemaCategories)