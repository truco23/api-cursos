const Hapi = require('@hapi/hapi')
const consign = require('consign')
const server = new Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 8080
})

consign({ cwd: 'src' })
    .include('config')
    .then('routes')
    .into(server)