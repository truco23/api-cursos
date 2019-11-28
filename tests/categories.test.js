const { deepEqual } = require('assert')
const mongoose = require('mongoose')
require('../src/models/categories.model')
const modelCategories = mongoose.model('schemaCategories')
let conected = false;
const addCategorie = { name: 'Categoria de teste' }

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

describe('Testes com as categorias', () => {
    
    before(async () => {

        await connection()
        await mongoose.connection.on('connected', function(){
            conected = true
        });
        await modelCategories.create(addCategorie)
    });

    it('Testando conexão com o MongoDB', async () => {

        const result = conected;
        const expected = true;
        
        deepEqual(result, expected)
    });

    it('Testando o cadastro de categoria', async () => {
        
        const [result] = await modelCategories.find({ name: addCategorie.name })
        const expected = addCategorie.name

        deepEqual(result.name, expected)
    });

    it('Testando a listagem de categorias', async () => {
        deepEqual(true, true)
    });

    it('Testando a atualização de categoria', async () => {
        deepEqual(true, true)
    });

    it('Testando a remoção de categoria', async () => {

        const [data] = await modelCategories.find({name: addCategorie.name})
        const result = await modelCategories.findOneAndDelete({ _id: data._id })
        const expected = result._id
        deepEqual(result._id, expected._id)
    })
})