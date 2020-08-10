import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.22:3333' // O baseURL será pego a partir do endereço na aba conections lá no expo. Só que ao invés do 'exp' a gente coloca 'http' e ao invés da porta que tá lá a gente coloca a porta definida no nosso backend, no caso '3333'
});

export default api;