import Knex from 'knex';

// Primeiro de tudo, é importante colocar essa numeração nos nomes dos arquivos, pq o knex cria as tabelas na ordem que os arquivos estão dispostos na pasta. Por isso, caso uma tabela que dependa de outra seja criada primeiro, dará erro

export async function up(knex: Knex) {  // O método up vai possuir quais as alterações a gente quer colocar no banco de dados
    return knex.schema.createTable('TbConnections', table => {
        table.increments('id').primary(); // O Id é auto incrementado e chave primária
        
        table.integer('fkIdUser') // Criando uma chave estrangeira, com relacionamento com o professor com o qual o aluno teve conexão
            .notNullable()
            .references('id')   
            .inTable('TbUsers')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

        table.timestamp('createdAt') // timestamp é formato para hora
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // Por padrão vai salvar com a hora atual
            .notNullable();
    });
}

export async function down(knex: Knex) { // O down vai possuir as informações que serão feitas caso dê merda no processo e tenha que reverter
    return knex.schema.dropTable('TbConnections'); // Caso dê errado, a gente deleta a tabela recém criada
}