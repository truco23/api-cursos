// const Mongoose = require('mongoose')
// const schemaCategories = Mongoose.model('schemaCategories')
// const schemaCategories = require('../models/categories.model')
const apiController = {}

apiController.get = async (req, res) => {
    try {
        console.log('Buscando dados categorias');
        
        return { success: 'get ok'}
    } catch (error) {
        console.error(error)
        return error
    }
}

apiController.getById = async (req, res) => {
    try {
        console.log('Buscando dados categorias', req.params);
        
        return { success: req.params}
    } catch (error) {
        console.error(error)
        return error
    }
}

apiController.put = async (req, res) => {
    try {
        console.log('Alterando categoria', req.params, req.payload);
        
        return [{token: req.headers.token }, { id: req.params}, { payload: req.payload }]
    } catch (error) {
        console.error(error)
        return error
    }
}

apiController.delete = async (req, res) => {
    try {
        console.log('Removendo categoria', req.params);
        
        return { id: req.params}
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = apiController