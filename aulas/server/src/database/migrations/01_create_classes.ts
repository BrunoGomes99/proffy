import Knex from 'knex';

// Primeiro de tudo, é importante colocar essa numeração nos nomes dos arquivos, pq o knex cria as tabelas na ordem que os arquivos estão dispostos na pasta. Por isso, caso uma tabela que dependa de outra seja criada primeiro, dará erro

export async function up(knex: Knex) {  // O método up vai possuir quais as alterações a gente quer colocar no banco de dados
    return knex.schema.createTable('TbClasses', table => {
        table.increments('id').primary(); // O Id é auto incrementado e chave primária
        table.string('subject').notNullable(); // A matéria ensinada
        table.decimal('cost').notNullable();

        table.integer('fkIdUser') // Criando uma chave estrangeira, com relacionamento
            .notNullable()
            .references('id')   // Referencia o campo Id
            .inTable('TbUsers') // Da tabela TbUsers
            .onDelete('CASCADE') // O onDelete especifica o que vai acontecer com todas as aulas desse professor se ele for deletado em TbUsers. A opção CASCADE utilizada diz que todas suas aulas em TbClasses tbm serão excluídas
            .onUpdate('CASCADE'); // Mesama coisa, caso o id do professor mude em TbUsers, seu FkIdUsuario tbm vai mudar em todas suas aulas em TbClasses
    });
}

export async function down(knex: Knex) { // O down vai possuir as informações que serão feitas caso dê merda no processo e tenha que reverter
    return knex.schema.dropTable('TbClasses'); // Caso dê errado, a gente deleta a tabela recém criada
}