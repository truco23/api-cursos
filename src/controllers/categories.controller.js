const Mongoose = require('mongoose')
const modelCategories = Mongoose.model('schemaCategories')
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
        const { id } = req.params
        const { name } = req.payload
        const newCategorie = await modelCategories.findOneAndUpdate({_id: id}, name)

        newCategorie.set({name});
        newCategorie.save();

        console.log('Categoria alterada', JSON.stringify(newCategorie));
        return { newCategorie }
    } catch (error) {

        console.error(error)
        return error.message
    }
}

apiController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const categorieRemove = await modelCategories.findOneAndRemove({ _id: id })

        if(!categorieRemove) {
            console.log('Categoria não encontrada ou já foi removida da nossa base de dados');
            return {error: 'Categoria não encontrada ou já foi removida da nossa base de dados' }
        }

        console.log('Categoria removida', JSON.stringify(categorieRemove));
        return { success: 'Categoria removida' }
        // console.log('Removendo categoria', req.params);
        
        // return { id: req.params}
    } catch (error) {
        console.error(error)
        return error
    }
}

module.exports = apiController