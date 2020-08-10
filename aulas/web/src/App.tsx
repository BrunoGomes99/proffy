import React from 'react';

import './pages/Landing'; /* Quando eu não especifico o arquivo que quero importar, por padrão ele busca o arquivo index */

import './assets/styles/global.css';

import Routes from './routes';

function App() {
  return (
    <Routes />
  );
}

export default App;
