const Joi = require('@hapi/joi')
const categoriesController = require('../controllers/categories.controller')

module.exports = server => {

    const categoriesRoutes = [
        // buscar todas as categorias
        {
            method:'GET',
            path: '/categories/all',
            options: {
                description: 'Rota de categorias',
                notes: 'Buscar todas as categorias da aplicação',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    }
                },
                handler: categoriesController.getAll
            }
        },
        // buscar todas as categorias por paginação
        {
            method:'GET',
            path: '/categories',
            options: {
                description: 'Rota de categorias por paginação',
                notes: 'Buscar categorias com paginação',
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
                handler: categoriesController.get
            }
        },
        // buscar por id
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
        // criar
        {
            method:'POST',
            path: '/categories/',
            options: {
                description: 'Rota criação de categoria',
                notes: 'Criar categoria',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                    payload: Joi.object({
                        name: Joi.string().required(),
                    })
                },
                handler: categoriesController.create
            }
        },
        // atualizar
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
                        name: Joi.string().required()
                    }),
                    // headers: Joi.object({
                    //     'token': Joi.string().required()
                    // }).unknown()
                },
                handler: categoriesController.put
            }
        },
        // remover
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