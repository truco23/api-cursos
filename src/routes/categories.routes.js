const Joi = require('@hapi/joi')
const categoriesController = require('../controllers/categories.controller')

module.exports = server => {

    const categoriesRoutes = [
        {
            method:'GET',
            path: '/categories',
            options: {
                description: 'Rota de categorias',
                notes: 'Buscar todas as categorias da aplicação',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                },
                handler: categoriesController.get
            }
        },
        {
            method:'GET',
            path: '/categories/{id}',
            options: {
                description: 'Rota busca categoria pelo id',
                notes: 'Buscar categoria pelo id',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    params: Joi.object({
                        id: Joi.required(),
                    })
                },
                handler: categoriesController.getById
            }
        },
        {
            method:'PUT',
            path: '/categories/{id}',
            options: {
                description: 'Rota alteração de categoria',
                notes: 'Alterar categoria pelo id',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    params: Joi.object({
                        id: Joi.required()
                    }),
                    payload: Joi.object({
                        name: Joi.string()
                    }),
                    headers: Joi.object({
                        'token': Joi.string().required()
                    }).unknown()
                },
                handler: categoriesController.put
            }
        },
        {
            method:'DELETE',
            path: '/categories/{id}',
            options: {
                description: 'Rota remoção de categoria',
                notes: 'Remover categoria pelo id',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    params: Joi.object({
                        id: Joi.required()
                    })
                },
                handler: categoriesController.delete
            }
        }
    ]

    server.route(categoriesRoutes)
}