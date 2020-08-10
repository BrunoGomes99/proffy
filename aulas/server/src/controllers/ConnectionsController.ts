import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    async index(request: Request, response: Response) {
        const totalConnections = await db('TbConnections').count('* as total'); // Pega todos os registros de TbConnections, conta através de count e retorna todas (*) em um só registro chamado total

        const { total } = totalConnections[0]; // A constante total (deve ter o mesmo nome do registro acima), recebe o valor a partir do array retornado como totalConnections

        return response.json({ total });
    }

    async create(request: Request, response: Response) {
        const { fkIdUser } = request.body;

        await db('TbConnections').insert({
            fkIdUser
        });

        return response.status(201).send();
    }
}