import axios from 'axios';

const api = axios.create({ // Inicializa o axios
    baseURL: 'http://localhost:3333', // Passa a url base do backend
});

export default api;