import axios from 'axios';

const url = '/api/signin';
axios.defaults.baseURL = 'http://localhost:3001';

const verifyUser =newObject=> {
    const request = axios.post(url, newObject);
    return request.then(res => res.data);
}

export default verifyUser;