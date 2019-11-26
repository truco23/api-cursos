const mongoose = require('mongoose');

mongoose.connect('mongodb://cursos:cursos@localhost:27017/cursos', { 
    useNewUrlParser: true,
    useCreateIndex :  true,
    useUnifiedTopology: true
}, error => {
    
    if(!error) return
    console.log('Falha na conexão', error)
})

mongoose.connection.on('connected', function(){

    console.log('conectado ao Mongo');
});

mongoose.connection.on('error', function(erro) {

    console.log('Erro na conecção ' + erro);
});

mongoose.connection.on('disconnected', function(){

    console.log('Desconectado do Mongo');
});

process.on('SIGINT', function () {
    
    mongoose.connection.close(function () {
    
        console.log('Conexão finalizada pelo terminado da aplicação');
        process.exit(0);
    });
});