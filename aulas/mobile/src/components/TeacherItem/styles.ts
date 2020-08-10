import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFF',
        borderWidth: 1, // Coloca bordas, creio que esse 1 seja os pixels da borda
        borderColor: '#E6E6F0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden' // Pra garantir que se algo ficar de fora do card, seja escondido
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },

    avatar: {
        width: 64, // No React Native, as imagens externas para aparecerem na aplicação, devem ter seus width e height definidos no estilo
        height: 64,
        borderRadius: 32,
        backgroundColor: '#EEE' // Ele utiliza backgroundColor pra que o usuário tenha a impressão de que a imagem está carregando, até que a imagem carregue de fato XD
    },

    profileInfo: {
        marginLeft: 16
    },

    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264D',
        fontSize: 20
    },

    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 12,
        marginTop: 4
    },

    bio: {
        marginHorizontal: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6A6180'
    },

    footer: {
        backgroundColor: '#FAFAFC',        
        padding: 24,
        alignItems: 'center', // Como não tem o flexDirection: 'row' pra ficarem na mesma linha, os elementos aqui não vão alinhar na vertical, e sim na horizontal
        marginTop: 24
    },
    
    price: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 14        
    },
    
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257E5',
        fontSize: 16    
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16
    },

    favoriteButton: {
        backgroundColor: '#8257E5',
        width: 56,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row', // Pra centralzar o ícone no botão
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8 // Distanciar do botão ao lado
    },

    favorited: {
        backgroundColor: '#E33D3D'
    },

    contactButton: {
        backgroundColor: '#04D361',
        flex: 1, // Fizemos isso pra não delimitar uma largura fixa, assim ele vai sempre preencher o espaço restante
        height: 56,
        borderRadius: 8,
        flexDirection: 'row', // Pra centralzar o ícone no botão
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8 // Distanciar do botão ao lado
    },

    contactButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 16
    }

});

export default styles;