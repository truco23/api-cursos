const Mongoose = require('mongoose')
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

Mongoose.model('schemaCourses', schemaCourses)