import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'; // BrowserRouter é um tipo de roteamento e Route é usado para definir as rotas
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

// Cada página da aplicação será um Route

// As propriedades são os atributos de um componente. Por exemplo, em Route, existem as propriedades "path" e "component"
// No primeiro Route, o path está só como "/". Isso significa que esse componente será chamado na url principal da aplicação, no endereço inicial. Por isso não foi preciso passar nada depois da barra
// Para que a primeira rota, que contém só a barra, não seja chamada nas outras rotas, essa terá que conter a propriedade exact, para dizer que ela é exclusiva para aquele endereço
function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;