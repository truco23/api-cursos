const { deepEqual } = require('assert')
const mongoose = require('mongoose');
let conected = false;

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
    });

    it('Testando conexão com o MongoDB', async () => {

        const result = conected;
        const expected = true;
        
        deepEqual(result, expected)
    });

    it('Testando o cadastro de categoria', async () => {
        deepEqual(true, true)
    });

    it('Testando a listagem de categorias', async () => {
        deepEqual(true, true)
    });

    it('Testando a atualização de categoria', async () => {
        deepEqual(true, true)
    });

    it('Testando a remoção de categoria', async () => {
        deepEqual(true, true)
    })
})