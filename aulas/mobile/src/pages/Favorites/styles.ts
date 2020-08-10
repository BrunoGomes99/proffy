// Todos elementos possuem display-flex por padrão
// Não existe arquivo externo '.css'. Aqui, o css é declarado numa StyleSheet. Vale lembrar que os atributos do css não possuem hífen
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, // O flex '1' vai permitir que esse elemento (no caso, o 'container') ocupe a tela toda, todo seu espaço disponível
        backgroundColor: '#F0F0F7'
    },

    teacherlist: {
        marginTop: -40, // Pra que ele suba acima do header
        //paddingHorizontal: 16 // Foi utilizado através do contentContainerStyle na própria ScrollView
    }
});

export default styles;