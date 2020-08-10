import React, { useState, FormEvent } from 'react'; // O useState é importado aqui para usar o conceito de estados
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

// Fildset foi a tag html usada pra dividir as sessões do formulário. A tag legend representa seu título

function TeacherForm(){

    const history = useHistory(); // Serve para redirecionar a página após o submit

    // Aqui será usado o conceito de Estado, que nada mais é quando o usuário, a partir do frontend, muda uma variável do component
    // O useState retorna dois valores, por isso o array. O primeiro (scheduleItems) é a variável inicial completamente igual a como ela foi declarada. Já o segundo (setScheduleItems) é uma variável nova que irá substituir a variável inicial (scheduleItems)
    const [scheduleItems, setScheduleItems] = useState([
        { weekDay: 0, from: '', to: '' } // Aqui a gente tá inicializando os valores da variável "scheduleItems". Por isso os values estão sendo vazios (Exceto o dia da semana que tá passando valor do domingo, mas só pq a variável é numérica e não aceita null)
    ]);
 
    const [name, setName] = useState(''); // Como o input deve iniciar vazio, o useState assume para a variável name o valor ('') no início    
    const [avatar, setAvatar] = useState(''); // Como o input deve iniciar vazio, o useState assume para a variável name o valor ('') no início    
    const [whatsapp, setWhatsapp] = useState(''); // Como o input deve iniciar vazio, o useState assume para a variável name o valor ('') no início    
    const [bio, setBio] = useState(''); // Como o input deve iniciar vazio, o useState assume para a variável name o valor ('') no início    

    const [subject, setSubject] = useState(''); // Inicia com o valor (''). Lembra que lá no component do Select, definimos que o valor ('') é o value do item "Selecione uma opção"
    const [cost, setCost] = useState('');

    function addNewScheduleItem(){
        setScheduleItems([ // setScheduleItems abre parênteses como se fosse uma função. Em seguida ela adiciona um vetor (por isso os colchetes)
            ...scheduleItems, // Essa nova variável vai possuir todo o conteúdo da variável inicial (por isso essa sintaxe)
            { weekDay: 0, from: '', to: '' } // E vai adicionar esses atributos sempre que for recriada. Adicionando assim, mas um horário
        ]); 
    }

    function setScheduleItemValue(position: Number, field: string, value: string) {
        // Cria um novo Array para respeitar o conceito de imutabilidade
        const newArray = scheduleItems.map((scheduleItem, index) => { // Vai percorrer o scheduleItems já existente
            if(index === position) { //Se o elemento atual do vetor (index) for igual ao elemento que está sendo alterado (position)
                return {...scheduleItem, [field]: value }; // Vai retornar todo o scheduleItem já existente, porém no compo correspondente ao "field", haverá uma subsituição de valores. Assumindo agora o valor em 'value'
            }

            return scheduleItem; // Se não encontrar o elemento que foi alterado, será retornado o scheduleItem do jeito que tava
        });

        setScheduleItems(newArray);
    }

    function handleCreateClass(e: FormEvent) { // Recebe um evento do submit, mas aqui o evento deve ser especificado com o tipo FormEvent
        e.preventDefault(); // Diz que o comportamento html padrão é previnido. Isso foi feito pra que a página não recarregue após o submit

        // Chama a requisição POST para o caminho '/Classes'
        api.post('/Classes', { // variáveis que vem do JSON do front // variáveis criadas nos estados. Obs: as que não tem os ":" é pq estão com o mesmo nome tanto no json quando nas variáveis declaradas aqui
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost), // Converte para tipo numérico pq ele vem do frontend como texto
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso');

            history.push('/'); // Redireciona o usuário para a página de landing page
        }).catch(() => {
            alert('Erro no cadastro');
        });
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>    
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} // Esse "e" significa um evento. E a gente consegue recuperar o que o usuário digitar no campo a partir de "e.target.value". Assim, sempre que o input mudar (onChange), esse evento será acionado
                        />
                        <Input
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
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
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                       />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem} >
                                + Novo horário
                            </button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index )=> { // Vai retornar tudo o que tem em scheduleItems através do map. Aqui, o map tbm tem o parâmetro 'index'. Ele existe pq como "scheduleItems" é o vetor, o 'index' irá identificar qual elemento do vetor estamos tratando
                            return(
                                //Lembrando que se usamos map, devemos adicionar uma key única. A key utilizada foi o dia da semana, isso significa que um professor não pode agendar horários no mesmo dia da semana
                                <div key={scheduleItem.weekDay} className="schedule-item">
                                <Select
                                    name="weekDay"
                                    label="Dia da semana"
                                    value={scheduleItem.weekDay}
                                    onChange={(e)=>{ setScheduleItemValue(index, 'weekDay', e.target.value)} }
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
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={(e)=>{ setScheduleItemValue(index, 'from', e.target.value)} }
                                />
                                <Input
                                    name="to"
                                    label="Até"
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={(e)=>{ setScheduleItemValue(index, 'to', e.target.value)} }
                                />
                                </div>
                            );                        
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;