const Mongoose = require('mongoose')
const modelCourses = Mongoose.model('schemaCourses')
const apiCourses = {}

apiCourses.get = async (req, res) => {
    try {
        
        return { success: 'Busca cursos ok'}
    } catch (error) {
        console.error(error);
        return error.message
    }
}

apiCourses.create = async (req, res) => {

    try {
        const { idCategory, name, description } = req.payload
        const result = await modelCourses.create({idCategory, name, description})
        
        console.log('Curso criado com sucesso', JSON.stringify(result));
        return { result }
    } catch (error) {
        console.error(error);
        return error.message
    }
}

module.exports = apiCourses