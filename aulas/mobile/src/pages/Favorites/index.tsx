import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {

    // Criando os estados para os professores favoritados
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        // Lembrando que o AsyncStorage é o banco de daos interno do expo. Existente no dispositivo do usuário
        AsyncStorage.getItem('favorites').then(response => { // Aqui ele vai buscar no banco por uma chave chamada 'favorites'
            if(response) { // Pra garantir que tenha alguma coisa
                const favoritedTeachers = JSON.parse(response); // Como o retorno do AsyncStorage é SEMPRE UMA STRING(UM TEXTO). Aqui convertemos para JSON
    
                
                setFavorites(favoritedTeachers); // Se tiver algo, ele vai atualizar apenas com os professores favoritados, se não tiver ele não mostra nenhum, pois o estado 'favorites' é iniciado como array vazio (lá no useState)
            }
        });
    }

    useFocusEffect(()=>{ // Quase a mesma coisa que o useEffect mas aqui ele sempre vai chamar essa função quando essa aba (a de Favorites) estiver em focus (estiver ativa, pressionada etc)
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherlist}
                contentContainerStyle={{ // Mesma coisa que faria se colocasse só um paddingHorizontal no css
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return(
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true} // Pq é a listagem apenas dos favoritos
                        />
                    );
                })}
            </ScrollView>
        </View>   
    );
}

export default Favorites;