import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-3ccd0-default-rtdb.firebaseio.com/'
});

export default instance;