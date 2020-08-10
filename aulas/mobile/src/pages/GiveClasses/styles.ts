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

    content: {
        flex: 1,
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180
    },

    description: {
        marginTop: 24,
        color: '#D4C2FF',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240
    },
    
    okButton: {
        marginVertical: 40,
        backgroundColor: '#04D361',
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    okButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Archivo_700Bold'
    }
});

export default styles;