const Mongoose = require('mongoose')
const modelCourses = Mongoose.model('schemaCourses')
const apiCourses = {}
const log = require('../helpers/log.helpers')

apiCourses.get = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const options = {
            page,
            limit,
            sort: {
                createdAt: -1
            },
            populate: {
                path: 'idCategory',
                select: 'name'
            }
        }
        const result = await modelCourses.paginate({}, options)
        
        log.list('Listagem de cursos', result)

        return { result }
    } catch (error) {
        console.error(error);
        return error.message
    }
}

apiCourses.getById = async (req, res) => {

    try {
        const { id } = req.params
        const result = await modelCourses.find({ _id: id }).populate({ path: 'idCategory', select: 'name'})
        
        log.list('Curso encontrado', result)

        return result
    } catch (error) {
        console.log(error);
        return error.message
    }
}

apiCourses.create = async (req, res) => {

    try {
        const { idCategory, name, description } = req.payload
        const result = await modelCourses.create({idCategory, name, description})
        
        log.list('Novo curso criado', result)

        return { result }
    } catch (error) {
        console.error(error);
        return error.message
    }
}

apiCourses.put = async (req, res) => {

    try {
        const { id } = req.params
        const body = req.payload
        const result = await modelCourses.findOneAndUpdate({ _id: id}, body)

        result.set(body)
        result.save()

        log.list('Curso alterado', result)

        return result
    } catch (error) {
        console.error(error);
        return error.message
    }
}

module.exports = apiCourses