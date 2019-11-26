module.exports = server => {

    const homeRoutes = [
        {
            method:'GET',
            path: '/',
            options: {
                description: 'Rota de boas vindas',
                notes: 'Rota inicial da aplicação',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    failAction: (req, res, error) => {
                        throw error
                    },
                },
                handler: async (req, headers) => {
                    console.log('Rota inicial da aplicação');
                    return { success: 'Bem vindo a nossa API de cursos :)' }
                }
            }
        }
    ]

    server.route(homeRoutes)
}