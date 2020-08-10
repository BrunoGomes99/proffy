import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router(); // express.Router é o módulo de roteamento do express
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/Classes', classesController.index);
routes.post('/Classes', classesController.create);

routes.get('/Connections', connectionsController.index);
routes.post('/Connections', connectionsController.create);

export default routes;