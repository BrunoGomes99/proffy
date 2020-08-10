import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express(); // Representa a aplicação

app.use(express.json()); // Permite que o express entenda o formato JSON

app.use(cors()); // Permite que o express use o cors

// Rotas: endereço completo da funcionalidade, url da página. Ex: http://localhost:3333/Users , http://google.com, http://americanas.com/MeusPedidos
// Recurso O que vem depois do ".com, .org, .net" etc. Especifica a página dentro do site. Ex: /Users, /Clientes, /Assinaturas
// Parâmetros: O que vem depois do recurso. Os parâmetros podem ser do tipo:
    // Body params: Dados para criação ou atualização de um registro
    // Route params: Identificam qual recurso eu quero atualizar ou deletar. Muito usado na forma de ids ou guid. Ex: /Users/1 (onde esse 1 é o id do usuário em questão)
    // Query params: Muito usado para paginação, filtros e ordenação. Ex: /Users?page=2&ano=2009 (A partir da interrogação pra frente)

app.use(routes); // Informa o app que ele usará o routes que foi declarado em routes.ts ("routes" é o nome do meu objeto que eu exporto em routes.ts)

app.listen(3333); // Define a porta 3333 para a aplicação usar