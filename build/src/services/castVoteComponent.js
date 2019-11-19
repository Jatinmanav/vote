import axios from 'axios';

const url = '/api/castvote';
axios.defaults.baseURL = 'http://localhost:3001';

const castvote =newObject=> {
    const request = axios.post(url, newObject);
    return request.then(res => res.data);
}

export default castvote;