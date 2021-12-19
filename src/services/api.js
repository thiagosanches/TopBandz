import axios from 'axios';

const api = axios.create({
    baseURL: ' https://iothiago.net.br:8443/api/game',
})

export default api;