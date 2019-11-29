const Mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const schemaCourses = new Mongoose.Schema({

    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    idCategory: {
        required: true,
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'schemaCategories'
    }
},
{
    timestamps: true
})

schemaCourses.plugin(mongoosePaginate)

Mongoose.model('schemaCourses', schemaCourses)