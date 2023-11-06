import axios from "axios";
import config from '../config'

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.name === "TokenExpiredError") {
        const data = (await refreshToken()).data;
        const access_token = data.idToken;
        originalRequest.headers.Authorization = 'Bearer ' + access_token
        axiosApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

const refreshToken = async () => get('/auth/refreshToken');
export const updateToken = async(token) => axiosApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;


const get = async (url) => {
    return await axiosApiInstance.get(`${config.serverAddress}${url}`);
}
const deleteCall = async (url) => {
    return await axiosApiInstance.delete(`${config.serverAddress}${url}`);
}
const post = async (url, body) => {
    return await axiosApiInstance.post(`${config.serverAddress}${url}`, body);
}
const put = async (url, body) => {
    return await axiosApiInstance.put(`${config.serverAddress}${url}`, body);
}
const patch = async (url, body) => {
    return await axiosApiInstance.patch(`${config.serverAddress}${url}`, body);
}

export const login = async (username, password) => {
    const result = await post('/auth', { username, password });
    if (result.data.status === 'OK')
        axiosApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token.idToken;
    return result
};

export {
    get,
    post,
    put,
    deleteCall,
    patch
}