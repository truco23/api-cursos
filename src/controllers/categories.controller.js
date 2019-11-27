const Mongoose = require('mongoose')
const modelCategories = Mongoose.model('schemaCategories')
const apiController = {}

apiController.get = async (req, res) => {
    
    try {
        const categories = await modelCategories.find({}).sort({ createdAt: -1 })
        console.log('Buscando as categorias', JSON.stringify(categories));
        return categories
    } catch (error) {
        console.error(error)
        return error.message
    }
}

apiController.getById = async (req, res) => {

    try {
        const { id } = req.params
        const categorie = await modelCategories.find({ _id: id })

        console.log('Categoria encontrada', JSON.stringify(categorie));
        return { categorie }
    } catch (error) {
        console.error(error)
        return error.message
    }
}

apiController.create = async (req, res) => {

    try {
        const { name } = req.payload
        const categorie = await modelCategories.create({name})

        if(!categorie) {
            console.log('Não foi possível criar a categoria');
            return { error: 'Não foi possível criar a categoria' }
        }

        console.log('Categoria criada com sucesso', JSON.stringify(categorie));
        return { categorie }
    } catch (error) {
        console.error(error)
        return error.message
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