const { deepEqual } = require('assert')
const mongoose = require('mongoose')
require('../src/models/courses.model')
const modelCourses = mongoose.model('schemaCourses')
let conected = false;
const addCourse = { name: 'Curso teste', description: 'Descrição teste' }

function connection() {
    mongoose.connect('mongodb://cursos:cursos@localhost:27017/cursos', { 
        useNewUrlParser: true,
        useCreateIndex :  true,
        useUnifiedTopology: true
    }, error => {
        
        if(!error) return error
        console.log('Falha na conexão', error)
    })
}

describe('Testes com os cursos', () => {

    before(async () => {
        await connection()
        await mongoose.connection.on('connected', function(){
            conected = true
        });
        // await modelCourses.create(addCourse)
    })

    it('Testando conexão com o mongoDB', async () => {

        const result = conected
        const expected = true

        deepEqual(result, expected)
    })
})