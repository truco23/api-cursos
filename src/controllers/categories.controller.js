const Mongoose = require('mongoose')
const modelCategories = Mongoose.model('schemaCategories')
const log = require('../helpers/log.helpers')
const apiController = {}

apiController.get = async (req, res) => {
    
    try {
        const { page = 1, limit = 10 } = req.query
        const options = {
            page,
            limit,
            sort: {
                createdAt: -1
            }
        }
        const categories = await modelCategories.paginate({}, options)

        log.list('Listando as catorias com paginação', categories)

        return categories
    } catch (error) {
        console.error(error)
        return error.message
    }
}

apiController.getAll = async (req, res) => {

    const categories = await modelCategories.find({})

    log.list('Listagem de todas as categorias', categories)
    
    return categories
}

apiController.getById = async (req, res) => {

    try {
        const { id } = req.params
        const categorie = await modelCategories.find({ _id: id })

        log.list('Categoria encontrada', categorie)

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

        log.list('Nova categoria criada', categorie)

        return { categorie }
    } catch (error) {
        console.error(error)
        return error.message
    }
}

apiController.put = async (req, res) => {
    
    try {
        const { id } = req.params
        const { name } = req.payload
        const newCategorie = await modelCategories.findOneAndUpdate({_id: id}, name)

        newCategorie.set({name});
        newCategorie.save();

        log.list('Categoria alterada', newCategorie)

        return { newCategorie }
    } catch (error) {

        console.error(error)
        return error.message
    }
}

apiController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const categorie = await modelCategories.find({_id: id})
        console.log('categoria', categorie);
        
        if(!categorie.length) {
            console.log('Categoria não encontrada ou já foi removida da nossa base de dados');
            return {error: 'Categoria não encontrada ou já foi removida da nossa base de dados' }
        }
        const categorieRemove = await modelCategories.deleteOne({ _id: id })


        log.list('Categoria removida', categorieRemove)

        return { success: 'Categoria removida' }
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = apiController