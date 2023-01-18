import axios from 'axios'

export default axios.create({
    baseURL: 'http://185.193.67.94:9000',
    // baseURL: 'https://buifix-api.herokuapp.com'
    // baseURL: 'https://4df7-105-178-110-233.eu.ngrok.io',
    // baseURL: 'http://localhost:3000'
});
