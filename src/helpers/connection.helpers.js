const Mongoose = require('mongoose')
const connection = {}

connection.get = () => {

    Mongoose.connect('mongodb://cursos:cursos@localhost:27017/cursos', { 
        useNewUrlParser: true,
        useCreateIndex :  true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, error => {
        
        if(!error) return error
        console.log('Falha na conexão', error)
    })
}

module.exports = connection