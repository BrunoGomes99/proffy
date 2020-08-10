import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from './src/pages/Landing';
import { AppLoading } from 'expo';

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'; // Em uma das fontes que eu utilizo, devo passar o (useFonts) para exportá-las
import { Poppins_400Regular, Poppins_600SemiBold,  } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';

// É bom dar uma olhada na documentação do react native pra ver quais são as "tags" utilizadas por ele e como o css dele funciona

export default function App() {

  let [fontsLoaded] = useFonts({ // Diretamenete da documentação do expo-fonts
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if(!fontsLoaded){ // Diretamente da documentação do expo-fonts tbm
    return <AppLoading /> // O AppLoading vai segurar o aplicativo na splash screen, dando a ideia que o aplicativo está carregando até que todas as fontes dentro do app sejam carregadas
  } else {
    return (
      // Tanto no React quanto no React Native, não é permitido retornar dois componentes um em seguida do outro sem ter algum elemento html entre eles (uma div, main, article etc....)
      // Por isso utilizamos esse '<> </>' que é chamado de fragment. Fazemos isso só pra que ele permita chamar AppSStack e StatusBar um em seguida do outro
      // O AppStack é o component responsável pelas rotas
      <>
        <AppStack />
        <StatusBar style="light" /> 
      </>
      //Status bar diz respeito a como a status bar do celular vai se comportar (a barra das horas, wifi, bateria, operadora etc). Coloquei 'light' pra ficar branca. Se tivesse 'auto' ela ficaria preta
    );
  }

}