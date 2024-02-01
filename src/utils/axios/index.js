import axios from 'axios';
import { selectToken } from '../../redux/reducers/jwtReducer';
import { store } from '../../redux/store';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'https://afcs-app.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

const source = axios.CancelToken.source();
api.interceptors.request.use(

    config => {
        // let auth_token = localStorage.getItem('AFCS-token')
        const auth_token = selectToken(store.getState());

        if (auth_token) {
            config.headers['Authorization'] = `Bearer ${auth_token}`
        }
        config.cancelToken = source.token;
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export const cancelRequest = (message) => {
    source.cancel(message);
};

export default api;