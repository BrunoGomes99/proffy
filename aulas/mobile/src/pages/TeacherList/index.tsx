import React, { useState } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';  // Importa o pacote de ícones a partir do site 'Feather'
import AssyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false); // isFiltersVisible inicia como falso    
    
    // Criando os estados para os cards dos professores
    const [teachers, setTeachers] = useState([]); // Deve ser um array, e vazio pq de início não deve ter nenhum (Se n tiver cadastrado)
    
    // Criando os estados para os professores favoritados
    const [favorites, setFavorites] = useState<number[]>([]); // Deve ser um array numérico, pois vai armazenar os Ids dos professores favoritado. E é vazio pq de início não deve ter nenhum (Se n tiver cadastrado)

    // Criando os estados a partir das variáveis dos inputs
    const [ subject, setSubject] = useState('');
    const [ weekDay, setWeekDay] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites() {
        // Lembrando que o AsyncStorage é o banco de daos interno do expo. Existente no dispositivo do usuário
        AsyncStorage.getItem('favorites').then(response => { // Aqui ele vai buscar no banco por uma chave chamada 'favorites'
            if(response) { // Pra garantir que tenha alguma coisa
                const favoritedTeachers = JSON.parse(response); // Como o retorno do AsyncStorage é SEMPRE UMA STRING(UM TEXTO). Aqui convertemos para JSON
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => { // favoritedTeachersIds será um array com os Ids dos professores favoritados
                    return teacher.id;
                });
    
                setFavorites(favoritedTeachersIds); // Se tiver algo, ele vai atualizar apenas com os professores favoritados, se não tiver ele não mostra nenhum, pois o estado 'favorites' é iniciado como array vazio (lá no useState)
            }
        });
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible); // Seta o valor contrário do isFiltersVisible sempre que o usuário clicar no botão de filtro
    }

    async function handleFiltersSubmit() { // Função chamada quando o usuário clicar no botão filtrar
        loadFavorites();

        const response = await api.get('/Classes', { //O jeito de fazer de forma assincrona e com o await, dá no mesmo de colocar ".then(response => {})"
            params: { // Esses params são referentes aos parâmetros do tipo query que vem do frontend do filtro
                subject,
                weekDay,
                time,
            }
        });
        
        setIsFiltersVisible(false); // Pra fechar os inputs de filtro após o usuário clicar em Filtrar
        setTeachers(response.data); // Vai substituir o array de professores a ser mostrado apenas com aqueles que contém as informações passadas no filtro
    }

    // IMPORTANTE: Se eu colocasse só um TeacherItem atrás do outro, apareceria a lista, mas eu n conseguiria abaixar pra visualizar todos, veria só os primeirs
    // [CONTINUANDO]: Por isso, para que funcione o scroll eu devo utilizar uma ScrollView entre eles
    return (
        <View style={styles.container}>
            <PageHeader                
                title="Proffys disponíveis"
                headerRight={(
                    // BorderlessButton é usado quando o botão não tem fundo, é apenas o ícone
                    <BorderlessButton onPress={handleToggleFiltersVisible} style={{padding: 10}} /* ESSE PADDING EU QUE QUIS COLOCAR PRO RANGE DO BOTÃO NÃO FICAR MT PEQUENO. DEDOS GORDOS AGRADECEM */>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (  // Ou seja, o que vem depois do '&&' só será executado se o que vem antes 'isFiltersVisible' existir
                    <View style={styles.searchForm}>

                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)} // Usamos onChangeText ao invés de só onChange. O parâmetro text vai pegar exatamente o texto digitado pelo usuário
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#C1BCCC" // Mexe no placeholder por aqui mesmo
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={weekDay}
                                    onChangeText={text => setWeekDay(text)} // Usamos onChangeText ao invés de só onChange. O parâmetro text vai pegar exatamente o texto digitado pelo usuário
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)} // Usamos onChangeText ao invés de só onChange. O parâmetro text vai pegar exatamente o texto digitado pelo usuário
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}            
            </PageHeader>
            
            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={{ // Mesma coisa que faria se colocasse só um paddingHorizontal no css
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)} // Se o array de ids 'favorites' incluir o id do professor em questão, 'favorited' receberá true
                        />                    
                    );
                })}
            </ScrollView>
        </View>        
    );
}

export default TeacherList;