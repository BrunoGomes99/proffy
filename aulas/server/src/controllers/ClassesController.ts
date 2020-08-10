import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem { // Foi criado no formato de interface para receber o schedule informado pelo usuário
    weekDay: number,
    from: string,
    to: string
};


export default class ClassesController {

    async index(request: Request, response: Response) { // Método de listagem das aulas
        const filters = request.query; // Pega os filtros acessando sua query (lembrar parâmetro query)

        //Aqui usou "as string" pq não sabia que tipo era fitlers.algumacoisa
        const subject = filters.subject as string;
        const weekDay = filters.weekDay as string;
        const time = filters.time as string;

        if(!filters.weekDay || !filters.subject || !filters.time) { // Caso não ache nenhum desses filtros
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time); // Faz logo a conversão das horas pra minutos.
    
        const classes = await db('TbClasses')
            .whereExists(function () { // Usa-se WhereExists, pq ele só vai retornar se a condição presente no select dentro dele existir
                this.select('TbClassesSchedule.*')
                    .from('TbClassesSchedule')
                    .whereRaw('`TbClassesSchedule`.`fkIdClass` = `TbClasses`.`id`') // Em whereExists, é recomendável usar esse whereRaw. Aqui ele verifica se existe alguma dessas aulas na TbSchedule
                    .whereRaw('`TbClassesSchedule`.`weekDay` = ??', [Number(weekDay)]) // O interrogação é substituído pelo parâmetro depois da vírgula. Usou Number pra converter ele para formato numérico, já que ele foi declarado como string lá em cima. Aqui ele verifica se para essa aula, existe algum horário disoponível nesse dia da semana
                    .whereRaw('`TbClassesSchedule`.`from` <= ??', [timeInMinutes]) // Verifica se o professor começa a trabalhar no mínimo no horário buscado pelo usuário
                    .whereRaw('`TbClassesSchedule`.`to` > ??', [timeInMinutes]) // Verifica se o horário limite do professor não é ultrapassado pelo horário escolhido pelo aluno

            })
            .where('TbClasses.subject', '=', subject) // Seleciona todas as aulas onde a matéria é igual à matéria informada no filtro
            .join('TbUsers', 'TbClasses.fkIdUser', '=', 'TbUsers.id') // Faz o join onde tem relacionamento com outra tabela, no caso onde o FkIdUser de TbClasses for igual ao Id de TbUser. Assim, ele retorna tbm as informações do usuário em questão
            .select(['TbClasses.*','TbUsers.*']); // Retorna tudo presente nesse filtro

        return response.json(classes);
    }

    async create (request: Request, response: Response) { //request é tudo aquilo que vem do frontend para o backend, enquato que response é tudo aquilo que vou retornar para o frontend a partir do backend
    
        const {  // Esse formato é o mesmo de delcarar várias constantes e todas elas receberem o request.body por vez
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body; // O request.body pega todas as informações inseridas pelo usuário no frontend
    
        const trx = await db.transaction(); // O transaction garante que se em uma das alterações de banco ocorrer um erro, todas as outras serão desfeitas. Por exemplo, se ele incluir o usuario e a classe, mas em schedule deu erro, todas as 3 transições serão desfeitas
    
        try {
        
            // Abaixo, o insertedUsersIds serve para armazenar os id's de todos os usuários que forem criados, num array. Isso o ocorre pq o insert sempre retorna o Id do elemento que ele cria na tabela
            const insertedUsersIds = await trx('TbUsers').insert({ // Por se tratar de uma operação em banco de dados a gente usa o await pra que o código só prossiga depois que essa operação for concluída
                name, // Se a coluna da tabela e a variável que eu criei tivessem nomes diferentes, bastava em colocar "Nome: name"
                avatar,
                whatsapp,
                bio,
            });
    
            const fkIdUser = insertedUsersIds[0]; // Pega o primeiro elemento do vetor, até pq como só foi adicionado um usuário por vez, só vai existir um id no vetor.
    
            const insertedClassesIds = await trx('TbClasses').insert({
                subject,
                cost,
                fkIdUser,
            });
    
            const fkIdClass = insertedClassesIds[0];
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => { //O map serve para percorrer todos os objetos dentro de schedule que inserimos
                return {
                    fkIdClass,
                    weekDay: scheduleItem.weekDay, // Nesse não precisa converter, pois o formato da coluna do banco e o valor vindo da request são inteiros
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
    
            await trx('TbClassesSchedule').insert(classSchedule); // Não precisa desmembrar pq classSchedule já está no formato esperado pelo banco
    
            await trx.commit();
    
            return response.status(201).send(); // Dá o send no método retornando o status 201 (criado com sucesso)
        } catch(err) {
    
            await trx.rollback(); // Desfaz as alterações do banco
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    
    }
}