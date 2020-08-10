// Todos elementos possuem display-flex por padrão
// Não existe arquivo externo '.css'. Aqui, o css é declarado numa StyleSheet. Vale lembrar que os atributos do css não possuem hífen
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#8257E5'
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 160,
        marginVertical: 40
    }
});

export default styles;