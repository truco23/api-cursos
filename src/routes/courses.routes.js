const coursesController = require('../controllers/courses.controller')
const Joi = require('@hapi/joi')

module.exports = server => {

    const coursesRoutes = [
        // listas todos os cursos
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
        },
        // criar curso
        {
            method:'POST',
            path: '/courses',
            options: {
                description: 'Rota criação de cursos',
                notes: 'Criar curso',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    payload: Joi.object({
                        idCategory: Joi.string(),
                        name: Joi.string(),
                        description: Joi.string()
                    })
                },
                handler: coursesController.create
            }
        }
    ]

    server.route(coursesRoutes)
}