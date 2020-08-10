import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // Ele busca o database.sqlite a partir dessa pasta atual, entrando na src e entrando na database (esses parâmetros são a mesma coisa de src/database/database.sqlite). É só navegação de diretórios
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};