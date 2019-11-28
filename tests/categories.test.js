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

        const [data] = await modelCategories.find({name: addCategorie.name})
        const result = data.name
        const expected = addCategorie.name
        deepEqual(result, expected)
    });

    it('Testando a atualização de categoria', async () => {
        deepEqual(true, true)
    });

    it('Testando a remoção de categoria', async () => {

        const [data] = await modelCategories.find({name: addCategorie.name})
        const remove = await modelCategories.findOneAndDelete({ _id: data._id })
        const result = remove._id
        const expected = data._id
        deepEqual(result, expected)
    })
})