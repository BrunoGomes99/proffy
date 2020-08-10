// Todos elementos possuem display-flex por padrão
// Não existe arquivo externo '.css'. Aqui, o css é declarado numa StyleSheet. Vale lembrar que os atributos do css não possuem hífen
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, // O flex '1' vai permitir que esse elemento (no caso, o 'container') ocupe a tela toda, todo seu espaço disponível
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    },

    banner: {
        width: '100%',
        resizeMode: 'contain' // Redimensiona a Imagem proporcionalmente à largura e altura disponível, mantendo todo seu conteúdo visível. Se fosse 'cover' ao invés de 'contain', a imagem seria cortada pra que cabesse no espaço disponível
    },
    
    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer: {
        flexDirection: 'row', // Esse flex direction é pra que um fique do lado do outro, já que no mobile, por padrão ele coloca um abaixo do outro  (Só no mobile)
        marginTop: 40,
        justifyContent: 'space-between'
    },
    
    button: {
        height: 150,
        width: '48%', // Esse width de 48% foi pensado para deixar um espaçamento entre os botões. Assim, cada um ocupando 48% vai sobrar 4% de espaçamento entre eles (2% de cada botão)        
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },

    buttonPrimary: {
        backgroundColor: '#9871F5'
    },

    buttonSecondary: {
        backgroundColor: '#04D361'
    },
    
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 19 // Tava 20, mas mudei pra 19 pra não quebrar linha no meu celular
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40
    }
});

export default styles;