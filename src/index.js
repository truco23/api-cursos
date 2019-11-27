const Hapi = require('@hapi/hapi')
const consign = require('consign')
const server = new Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 3001
})

consign({ cwd: 'src' })
    .include('config')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(server)