const { deepEqual } = require('assert')
const mongoose = require('mongoose')
require('../src/models/categories.model')
const modelCategories = mongoose.model('schemaCategories')
let conected = false;
const addCategorie = { name: 'Categoria de teste' }
const putCategorie = { name: 'Categoria para alteração' }
const novoNome = 'Novo nome da categoria'

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
        await modelCategories.create(putCategorie)
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
        
        const [data] = await modelCategories.find({ name: putCategorie.name })
        const newCategorie = await modelCategories.findOneAndUpdate({_id: data._id}, {name: novoNome})
        const expected = novoNome
        
        newCategorie.set({name: novoNome})
        newCategorie.save()
        
        const result = newCategorie.name

        deepEqual(result, expected)
    });

    it('Testando a remoção de categoria', async () => {

        const [removeCategorieAdd] = await modelCategories.find({name: addCategorie.name})
        const [removeCategoriePut] = await modelCategories.find({name: novoNome})

        const removeAdd = await modelCategories.findOneAndDelete({ _id: removeCategorieAdd._id })
        const removePut = await modelCategories.findOneAndDelete({ _id: removeCategoriePut._id })
        
        const resultAdd = removeAdd._id
        const resultPut = removePut._id

        const expectedAdd = removeCategorieAdd._id
        const expectedPut = removeCategoriePut._id

        deepEqual(resultAdd, expectedAdd)
        deepEqual(resultPut, expectedPut)
    })
})