import axios from "axios";
import config from '../config'

const get = async(url) => {
    return await axios.get(`${config.serverAddress}${url}`);
}
const deleteCall = async(url) => {
    return await axios.delete(`${config.serverAddress}${url}`);
}
const post = async (url, body) => {
    return await axios.post(`${config.serverAddress}${url}`, body);
}
const put = async (url, body) => {
    return await axios.put(`${config.serverAddress}${url}`, body);
}
const patch = async (url, body) => {
    return await axios.patch(`${config.serverAddress}${url}`, body);
}


export {
    get,
    post,
    put,
    deleteCall,
    patch
}