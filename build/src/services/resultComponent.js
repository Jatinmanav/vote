import axios from 'axios';

const url = '/api/result';
axios.defaults.baseURL = 'http://localhost:3001';

const resultComp =()=> {
    const request = axios.get(url);
    return request.then(res => res.data);
}

export default resultComp;