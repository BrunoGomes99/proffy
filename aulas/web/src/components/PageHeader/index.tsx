import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import { Link } from 'react-router-dom';

import './styles.css';

//Declara as propriedades que o componente PageHeader pode ter
interface PageHeaderProps {
    title: string;
    description?: string; // Essa propriedade é nulável pq ela só existe na tela do teacher form e não na teacher list
}

// PageHeader ficou nesse formato pq ele deve receber um dos parâmetros criados por nós
// Basicamente inicializo como constante, digo que ele é do tipo FC (Function Component), passo entre "<>" o conjunto de propriedades que ele pode receber e coloco "props" como parâmetro indicando as propriedades
// O {props.children} vai renderizar tudo aquilo que está dentro do componente PageHeader e que não faz parte de uma propriedade
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                   <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>                
                { props.description && <p>{props.description}</p> /* Isso é a msm coisa de "props.description ? <p>{props.description}</p> : null". Só que nesse caso, ele só vai executar o que vem depois de "&&" se o que vier antes existir */  }  
                
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;
