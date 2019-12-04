const Hapi = require('@hapi/hapi')
const consign = require('consign')
const server = new Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 3001,
    routes: {
        cors: {
            origin: ['*'], 
            headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"], 
            additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"], 
            credentials: true
        }
      }
})

consign({ cwd: 'src' })
    .include('config')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(server)