import Knex from 'knex';

// Primeiro de tudo, é importante colocar essa numeração nos nomes dos arquivos, pq o knex cria as tabelas na ordem que os arquivos estão dispostos na pasta. Por isso, caso uma tabela que dependa de outra seja criada primeiro, dará erro

export async function up(knex: Knex) {  // O método up vai possuir quais as alterações a gente quer colocar no banco de dados
    return knex.schema.createTable('TbUsers', table => { // Cria a tabela chamada TbUsers e a partir do table a gente vai adicionar os campos dessa tabela
        table.increments('id').primary(); // O Id é auto incrementado e chave primária
        table.string('name').notNullable(); // Tipo string e não nulável
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

export async function down(knex: Knex) { // O down vai possuir as informações que serão feitas caso dê merda no processo e tenha que reverter
    return knex.schema.dropTable('TbUsers'); // Caso dê errado, a gente deleta a tabela recém criada
}