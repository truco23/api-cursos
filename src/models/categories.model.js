const Mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const schemaCategories = new Mongoose.Schema({

    name: {
        required: true,
        type: String
    }
},
{
    timestamps: true
})

schemaCategories.plugin(mongoosePaginate)

var myModel = Mongoose.model('schemaCategories', schemaCategories)

myModel.paginate().then({})