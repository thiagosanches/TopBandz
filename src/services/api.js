import axios from 'axios';

const api = axios.create({
    baseURL: ' https://xyz/api/game',
})

export default api;
