// import router from "@/router";
import axios from "axios"
// import { Store } from "vuex";

const aaxios = axios.create({
    // baseURL: "http://192.168.1.144:8100",
    baseURL: "http://106.13.0.241:8100",
    timeout: 5000
})

//在发请求之前：请求拦截器可以检测到，可以做一些事情

aaxios.interceptors.request.use((config) => {
    let access_token = localStorage.getItem('token');
    // console.log(access_token);
    if (access_token) {
        config.headers.token = localStorage.getItem('token')
    }

    return config;
});

export default aaxios;