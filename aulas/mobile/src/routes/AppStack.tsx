import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        // NavigationContainer é equivalente ao BrowserRoute na web. Ele deve ficar em volta de todas as rotas
        // O Navigator representa uma rota e o Screen uma tela da aplicação. O headerShown: false é passado pra tirar o header padrão existente quando criamos um Navigator
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;