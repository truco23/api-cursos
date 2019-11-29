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

module.exports = apiCourses