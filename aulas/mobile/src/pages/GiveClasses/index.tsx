import React from 'react';
import { View, ImageBackground, Text, ImageBackgroundBase } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {

    const { goBack } = useNavigation(); // O goBack é um método que simplesmente retorna para a tela anterior. Poderíamos fazer usando o navigate e chamando a Landing tbm, mas preferimos dessa forma

    function handleNavigateBack() {
        goBack();
    }

    return(
        // ImageBackground é literalmente uma imagem de background, porém com algumas particularidades. Ela deve obrigatoriamente receber um tamanho para ocupar na tela e isso tá sendo definido nos estilos do css. Outra particularidade é que atributos como o resizeMode que colocamos no css, fica como atributo na própria 'tag'
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={giveClassesBgImage}
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;