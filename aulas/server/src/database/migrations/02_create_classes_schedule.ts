import Knex from 'knex';

// Primeiro de tudo, é importante colocar essa numeração nos nomes dos arquivos, pq o knex cria as tabelas na ordem que os arquivos estão dispostos na pasta. Por isso, caso uma tabela que dependa de outra seja criada primeiro, dará erro

export async function up(knex: Knex) {  // O método up vai possuir quais as alterações a gente quer colocar no banco de dados
    return knex.schema.createTable('TbClassesSchedule', table => {
        table.increments('id').primary(); // O Id é auto incrementado e chave primária

        table.integer('weekDay').notNullable(); // Dia da semana vai de 0 (domingo) até 6 (sábado)
        table.integer('from').notNullable(); // Hora de início
        table.integer('to').notNullable(); // Hora de término
        
        table.integer('fkIdClass') // Criando uma chave estrangeira, com relacionamento
            .notNullable()
            .references('id')   
            .inTable('TbClasses')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');
    });
}

export async function down(knex: Knex) { // O down vai possuir as informações que serão feitas caso dê merda no processo e tenha que reverter
    return knex.schema.dropTable('TbClassesSchedule'); // Caso dê errado, a gente deleta a tabela recém criada
}