import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5001/api/game',
})

export default api;
