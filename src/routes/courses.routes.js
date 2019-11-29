const coursesController = require('../controllers/courses.controller')
const Joi = require('@hapi/joi')

module.exports = server => {

    const coursesRoutes = [
        {
            method:'GET',
            path: '/courses',
            options: {
                description: 'Rota de cursos',
                notes: 'Buscar todos os cursos da aplicação',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    query: Joi.object({
                        page: Joi.number(),
                        limit: Joi.number()
                    })
                },
                handler: coursesController.get
            }
        }
    ]

    server.route(coursesRoutes)
}