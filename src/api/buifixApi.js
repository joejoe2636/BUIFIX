import axios from 'axios'

export default axios.create({
    baseURL: 'http://38.242.156.44:3000'
    // baseURL: 'https://e792-102-22-141-59.in.ngrok.io',
    // baseURL: 'http://localhost:3000'
});
