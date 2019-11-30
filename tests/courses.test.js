require('../src/models/courses.model')
const { deepEqual } = require('assert')
const mongoose = require('mongoose')
const connection = require('../src/helpers/connection.helpers')
const modelCourses = mongoose.model('schemaCourses')

let conected = false;
const addCourse = { idCategory: '5de005219987c6351c7d4c0e', name: 'Curso teste', description: 'Descrição teste' }
const putCourse = { idCategory: '5de005219987c6351c7d4c0e', name: 'Curso para alterar', description: 'Descrição par alterar' }
const novosDados = { name: 'Curso alterado', description: 'Descrição alterada' }

describe('Testes com os cursos', () => {

    before(async () => {
        await connection.get()
        await mongoose.connection.on('connected', function(){
            conected = true
        });
        await modelCourses.create(addCourse)
        await modelCourses.create(putCourse)
    })

    it('Testando conexão com o MongoDB', async () => {

        const result = conected
        const expected = true

        deepEqual(result, expected)
    });

    it('Testando o cadastro de curso', async () => {
        
        const [data] = await modelCourses.find({name: addCourse.name})
        const course = {name: addCourse.name, description: addCourse.description}
        const result = {name: data.name, description: data.description}
        const expected = course
        
        deepEqual(result, expected)
    })

    it('Testando a listagem de cursos', async () => {

        const [data] = await modelCourses.find({name: addCourse.name})
        const course = {name: addCourse.name, description: addCourse.description}
        const result = {name: data.name, description: data.description}
        const expected = course

        deepEqual(result, expected)
    })

    it('Testando a alteração do curso', async () => {
        
        const [data] = await modelCourses.find({ name: putCourse.name})
        const alt = await modelCourses.findOneAndUpdate({_id: data._id}, novosDados)
        const expected = novosDados

        alt.set(novosDados)
        alt.save()

        const result = {
            name: alt.name,
            description: alt.description
        }
        
        deepEqual(result, expected)
    });

    it('Testando a remoção de curso', async () => {
        
        const [addData] = await modelCourses.find({name: addCourse.name})
        const [putData] = await modelCourses.find({name: novosDados.name})

        const addResult = await modelCourses.deleteOne({_id: addData._id})
        const putResult = await modelCourses.deleteOne({_id: putData._id})
        const expected = 1

        deepEqual(addResult.n, expected)
        deepEqual(putResult.n, expected)
    })
})