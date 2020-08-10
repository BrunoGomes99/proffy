import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'
import api from '../../services/api';

function TeacherList(){
 
    // Criando os estados a partir das variáveis dos inputs
    const [ subject, setSubject] = useState('');
    const [ weekDay, setWeekDay] = useState('');
    const [ time, setTime ] = useState('');
 
    // Criando os estados para os cards dos professores
    const [teachers, setTeachers] = useState([]); // Deve ser um array, e vazio pq de início não deve ter nenhum (Se n tiver cadastrado)

    async function searchTeachers(e: FormEvent) { 
        e.preventDefault(); // Para que a página html toda não recarregue quando mudamos o filtro

        const response = await api.get('/Classes', { //O jeito de fazer de forma assincrona e com o await, dá no mesmo de colocar ".then(response => {})"
            params: { // Esses params são referentes aos parâmetros do tipo query que vem do frontend do filtro
                subject,
                weekDay,
                time,
            }
        });
        
        setTeachers(response.data); // Vai substituir o array de professores a ser mostrado apenas com aqueles que contém as informações passadas no filtro
        //console.log(response);

    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis."> 
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value)} }
                        options={[ /* Tá passando um objeto js (por isso as chaves) e dentro dele um array (por isso os colchetes). Cada elemento do array, é representado entre chaves tbm. PS: value e label pode ser qualquer nome, foram apenas nomes random dados por eles na rocketseat */
                            { value: 'Programação Web', label: 'Programação web' },
                            { value: 'Redes Neurais', label: 'Redes neurais' },
                            { value: 'Algoritmos Genéticos', label: 'Algoritmos genéticos' },
                            { value: 'Banco de Dados', label: 'Banco de dados' },
                            { value: 'Data Mining', label: 'Data Mining' },
                            { value: 'Computação Forense', label: 'Computação Forense' },
                            { value: 'Engenharia de Software', label: 'Engenharia de Software' },
                            { value: 'Computação Gráfica', label: 'Computação Gráfica' },
                            { value: 'Validação de Software', label: 'Validação de Software' }
                        ]}
                    />
                    <Select
                        name="weekDay"
                        label="Dia da semana"
                        value={weekDay}
                        onChange={(e) => { setWeekDay(e.target.value)} }
                        options={[ /* Tá passando um objeto js (por isso as chaves) e dentro dele um array (por isso os colchetes). Cada elemento do array, é representado entre chaves tbm. PS: value e label pode ser qualquer nome, foram apenas nomes random dados por eles na rocketseat */
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value)} }
                    />
                    <button type="submit">
                        Buscar
                    </button>         
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}                
            </main>

        </div>
    )
}

export default TeacherList;