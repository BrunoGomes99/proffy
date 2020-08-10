import knex from 'knex';
import path from 'path';

// Migrations: Em um banco de dados, as migrations são responsáveis por controlar a versão do banco de dados, de forma similar ao que o git faz com os códigos.

const db = knex({
    client: 'sqlite3', // Especifica o banco
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // informa que a conexão se dará no arquivo database.sqlite, criado na mesma pasta onde este arquivo está (por isso "__dirname")
    },
    useNullAsDefault: true, // Informa que o banco irá admitir null quando um campo não estiver preenchido
});

export default db;