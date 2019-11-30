require('../src/models/courses.model')
const { deepEqual } = require('assert')
const mongoose = require('mongoose')
const connection = require('../src/helpers/connection.helpers')
const modelCourses = mongoose.model('schemaCourses')

let conected = false;
const addCourse = { idCategory: '5de005219987c6351c7d4c0e', name: 'Curso teste', description: 'Descrição teste' }
const putCourse = { idCategory: '5de005219987c6351c7d4c0e', name: 'Curso para alterar', description: 'Descrição par alterar' }

describe('Testes com os cursos', () => {

    before(async () => {
        await connection.get()
        await mongoose.connection.on('connected', function(){
            conected = true
        });
        await modelCourses.create(addCourse)
        // await modelCourses.create(putCourse)
    })

    it('Testando conexão com o mongoDB', async () => {

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

    });

    it('Testando a remoção de curso', async () => {
        
        const [data] = await modelCourses.find({name: addCourse.name})
        const result = await modelCourses.deleteOne({_id: data._id})
        const expected = 1

        deepEqual(result.n, expected)
    })
})