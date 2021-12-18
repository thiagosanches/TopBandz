import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44378/api/game'
})

export default api;