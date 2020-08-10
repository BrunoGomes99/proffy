import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

// A importação da imagem no 'src' não pode ser apenas o caminho. A img deve ser importada e passada no 'src' da tag
// Para os botões utilizou-se <Link>, importado lá em cima, ao invés de <a>, pq o Link permite carregar as páginas em SPA, sem recarregar tudo ao trocar de rotas. Mas o funcionamento é o mesmo da <a>
// Nos botões, o "to" referencia o path presente lá nas Rotas
function Landing(){

    const [totalConnection, setTotalConnection] = useState(0); // O useState assum o valor 0 inicialmente só até o valor da qtd de conexões for lido

    // O useEffect possui dois parâmtros. O primeiro é uma função. O segundo é "gatilho" que irá acionar essa função. Por exemplo, eu posso passar uma variável no segundo parâmetro e sempre que essa variável mudar, a função será executada.
    // Como o segundo parâmetro está vaio (apenas um colchete vazio), essa função vai executar apenas uma única vez, que é quando esse componente for exibido na tela.
    useEffect(() => {
        // O "api" (importado da pasta services) vai fazer uma requisição do tipo get na rota '/connections' e então terá como resposta o que vem do frontend
        api.get('/connections').then(response => {
            const { total } = response.data; // É a mesma coisa de "const total = response.data.total", só fez dessa forma pq o nome da constante é o mesmo nome do campo que vem do frontend
        
            setTotalConnection(total); // O totalConnection será substituído pelo valor de "total", devido ao setTotalConnection (que recria a variável assumindo esse novo valor)
        });
    }, []); 

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img 
                    src={landingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnection} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    )
}

export default Landing;