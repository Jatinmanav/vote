import axios from 'axios';

const url = '/api/signup';
axios.defaults.baseURL = 'http://localhost:3001';

const createAll =newObject=> {
    const request = axios.post(url, newObject);
    return request.then(res => res.data);
}

export default createAll;