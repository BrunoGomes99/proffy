import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;        
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection() {
        api.post('/Connections',{
            fkIdUser: teacher.id,
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            
            <p>{teacher.bio}</p>
            
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsAppIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;

// Faz programas por dinheiro! Quem nunca fez essa piadinha infame não deve ser chamado de profissional de TI.
// <br />
// Programo porque gosto e porque quero ficar rico fazendo programa rs. Tô retomando as atividades, pois não vai ser do nada que eu vou aprender a programar em React. Pós coronga que me aguarde!