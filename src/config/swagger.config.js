const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
    info: {
            title: 'Api Cursos',
            version: 'v1.0',
        },
};

module.exports = async server => {

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Servidor rodando:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
};