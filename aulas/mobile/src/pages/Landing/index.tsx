import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
// O RectButton é um botão que segue os padrões do sistema operacional que o usuário está utilizando
// O TouchableOpacity é um outro tipo de botão que perde sua opacidade ao passarmos com o mouse em cima (no caso do mobile, ao clicarmos nele)

import api from '../../services/api';

// Se eu tentar exportar um arquivo Png (entre outros arquivos) no REACT NATIVE (mas só no REACT NATIVE), o arquivo typescript não irá reconhecer o formato
// Pra isso a gente criou a pasta "@types" com o arquivo "index.d.ts". Lá ele irá permitir esse formato de arquivo
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

function Landing() {

    const { navigate } = useNavigation(); // Indica que vai fazer uma navegação para outra página a partir dessa 

    function handleNavigateToGiveClassesPage() { // Indica que a navegação se dará para a página 'GiveClasses'
        navigate('GiveClasses'); // O nome 'GiveClasses' está do mesmo jeito que está declarado no component Screen lá no arquivo AppStack.tsx
    }

    function handleNavigateToStudyPages() {
        navigate('Study');
    }

    const [totalConnection, setTotalConnection] = useState(0); // O useState assum o valor 0 inicialmente só até o valor da qtd de conexões for lido

    // O useEffect possui dois parâmtros. O primeiro é uma função. O segundo é "gatilho" que irá acionar essa função. Por exemplo, eu posso passar uma variável no segundo parâmetro e sempre que essa variável mudar, a função será executada.
    // Como o segundo parâmetro está vaio (apenas um colchete vazio), essa função vai executar apenas uma única vez, que é quando esse componente for exibido na tela.
    useEffect(() => {
        // O "api" (importado da pasta services) vai fazer uma requisição do tipo get na rota '/connections' e então terá como resposta o que vem do frontend
        api.get('/Connections').then(response => {
            const { total } = response.data; // É a mesma coisa de "const total = response.data.total", só fez dessa forma pq o nome da constante é o mesmo nome do campo que vem do frontend
        
            setTotalConnection(total); // O totalConnection será substituído pelo valor de "total", devido ao setTotalConnection (que recria a variável assumindo esse novo valor)
        });
    }, []); 


    /*O contra barra n serve apenas para quebrar linha, já que no React Native não permite botar <br> */
    /*No Text poderíamos colocar uma tag <Text> após a outra para que o texto ficasse em linhas separadas, mas não fizemos isso para que o Text interno herdasse o style do Text externo. Lembrando que a 'tag' <Text> é a única no React Native que permite herdar estilos assim*/
    return(  // As Views reprsentam um bloco (como se fosse uma div); Os Text são textos; Os Image são imagens. VER DOCUMENTAÇÃO DO REACT NATIVE PARA OUTRAS OPÇÕES
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            
            <Text style={styles.title}>
                Seja bem vindo! {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>
                                
            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnection} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View>

    );
}

export default Landing;