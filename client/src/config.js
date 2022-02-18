import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://dev-linktree.herokuapp.com/api/"
});