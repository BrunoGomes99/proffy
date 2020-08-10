import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Exporta um pacote de ícones de diferentes 'sites'. Poderia ser do font-awesome tbm

// ESSE É O ARQUIVO PARA A NAVEGAÇÃO EM ABAS

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen} = createBottomTabNavigator();

function StudyTabs() {
    return(
        // Como essa tela que possui navegação em abas parte da tela de Landing e Study, que já possui um '<NavigationContainer>' a englobando, não usaremos <NavigationContainer> aqui tbm
        <Navigator
            tabBarOptions={{  // A passa a estilização das abas por aqui mesmo
                style: {
                    elevation: 0, // Para tirar o sombreamento padrão das abas
                    shadowOpacity: 0, // Mesma coisa
                    height: 64
                },
                tabStyle: { // Referente a estilização de cada aba separadamente
                    flexDirection: 'row', // Pra que permita que o texto o ícone fiquem na mesma linha e não um embaixo do outro
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: { // Estilização do ícone
                    flex: 0, // flex 0 faz com que ele não ocupe o espaço todo da aba (o que aconteceria se fosse flex 1)
                    width: 20,
                    height: 20
                },
                labelStyle: { // Estilização do texto das abas
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#FAFAFC', // Cor da aba quando ela não está selecionada
                activeBackgroundColor: '#EBEBF5', // Cor da aba quando ela está selecionada
                inactiveTintColor: '#C1BCCC', // Cor do texto quando a aba não está selecionada
                activeTintColor: '#32264D' // Cor do texto quando a aba está selecionada
            }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys', // O nome presente na aba
                    tabBarIcon: ({ color, size, focused }) => { // Adiociona o ícone
                        return(
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites} 
                options={{
                    tabBarLabel: 'Favoritos', // O nome presente na aba
                    tabBarIcon: ({ color, size, focused }) => { // Adiociona o ícone
                        return(
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;