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
    },

    searchForm: {
        marginBottom: 24,
    },

    label: {
        color: '#D4C2FF',
        fontFamily: 'Poppins_400Regular'
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputBlock: {
        width: '48%' // Para fazer o distanciamento entre os inputs. Assim cada um aproveita 48% de largura e há um espaço entre eles
    },

    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,        
        justifyContent: 'center',
        paddingHorizontal: 16, // Padding aplicado ao placeholder e o texto do usuário
        marginTop: 4,
        marginBottom: 16
    },

    submitButton: {
        backgroundColor: '#04D361',
        height: 56,        
        borderRadius: 8,
        flexDirection: 'row', // Pra centralzar o ícone no botão
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,    
    }

});

export default styles;