db.createUser(
    {
        user: "meu_novo_usuario",
        pwd: "minha_nova_senha",
        roles: [
            {
                role: "readWrite",
                db: "database_teste"
            }
        ]
    }
);

db.auth('meu_novo_usuario', 'minha_nova_senha')

db.teste.insert({ name: "Consegui :)" })