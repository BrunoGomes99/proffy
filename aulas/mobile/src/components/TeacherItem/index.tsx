import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
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

export interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited}) => {

    const [isFavorited, setIsFavorited] = useState(favorited); // isFavorited será inicializado com o valor passado para a propiedade 'favorited'

    function handleLinkToWhatsapp() {
        api.post('/Connections', {
            fkIdUser: teacher.id,
        })
        
        // Existe um conceito no React Native chamado de Deep linking. Ele chama outros aplicativos do seu celular, abre outros app. Por isso, cada aplicativo tem seu próprio endereço de deep linking, por isso devemos pesquisar para cada um
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`); // Usamos 'Linking' importado diretamente do React Native para chamar o deep linking do whatsApp. O endereço do deep linking do wpp é colocado dentro do openURL entre crase
    }
    
    async function handleToggleFavorite() {
        
        const favorites = await AsyncStorage.getItem('favorites'); // Busca todos os professores favoritados. Se não existir nenhum, não retorna nada
     
        let favoritesArray = [];

        if (favorites) {
            // favoritesArray recupera todos os professores que já foram adicionados anteriormente
            favoritesArray = JSON.parse(favorites); // Converte de texto pra JSON
        }
        
        if(isFavorited){
            // Remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) =>{ // O findIndex vai procurar o index de um array quando tal elemento obedece uma condição
                return teacherItem.id === teacher.id // O elemento do array que tiver seu index igual ao index do professor em questão, terá seu index retornado
            });

            favoritesArray.splice(favoriteIndex, 1); // O 'splice' é uma operação de array que remove um determinado index (favoriteIndex, no caso) e é definido quantas casas desse array são removidas (1 no caso)
            setIsFavorited(false); // Pq esse professor foi removido dos favoritos

        } else {
            // Adicionar aos favoritos
            favoritesArray.push(teacher); // Esse 'teacher' em questão é adicionado ao favoritesArray.
            setIsFavorited(true); // Pq esse professor foi favoritado
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray)); // Pega todo o favoritesArray (com os professores favoritados anteriormente mais esse professor de agora(se for inclusão) ou sem ele (se for remoção)) e converte para string de novo para poder salvar na chave 'favorites' do AsyncStorage
    }

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={{ uri: teacher.avatar }} // No React Native (e não no ReactJS), a forma de passar uma imagem externa é através desse objeto js 'uri'. Por isso, não funciona passar apenas a string com a url
                    style={styles.avatar}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text
                        style={styles.priceValue} /*Tem um Text só pro valor pq ele tem uma estilização própria*/
                    >
                        R$ {teacher.cost}
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}, // Se estiver favoritado recebe a estilização do favoritado
                        ]}  /*Recebe o estilo do padrão (tamanho, centralização etc. ) botão e do botão favoritado*/ 
                    >   
                        { isFavorited
                            ? <Image source={unfavoriteIcon}/> //Se for favoritado, vai o botão pra desfavoritar
                            : <Image source={heartOutlineIcon}/> // Se n for favoritado, vai o botão pra favoritar
                        }
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;