import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'; // Como o nome diz, é um botão sem bordas, sem fundo. É utilizado quando nosso botão é apenas um ícone, sem fundo
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import TeacherList from '../../pages/TeacherList';

import styles from './styles';

interface PageHeaderProps {
    title: string,
    headerRight?: ReactNode // O tipo React Node permite passarmos componentes do React como propriedade. Nesse caso ele foi usado para passarmos o botão dos filtros
    // O headerRight não será obrigatório pq ele só vai existir na página do TeacherLists
}

const PageHeader: React.FC<PageHeaderProps> = ( { title, children, headerRight } ) => {

    const { navigate } = useNavigation();

    function handleGoBack() {
        navigate('Landing');
    }   

    return (
        // O resizeMode nas imagens poderiam ser via css, mas como não estilizamos esses botões no css ficou pela tag mesmo
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon}  resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg}  resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>

            {children}

        </View>
    );
}

export default PageHeader;