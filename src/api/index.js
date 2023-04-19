import router from "@/router";
import axios from "axios";
import ElementUI from 'element-ui';
// import { Store } from "vuex";

const aaxios = axios.create({
    baseURL: "http://corpus.hrbeu.edu.cn",
    // baseURL: "http://192.168.31.200:8000",
    timeout: 60000
})
// const raxios = axios.create({
//     // baseURL: "http://192.168.1.144:8100",
//     baseURL: "",
//     timeout: 60000
// })

//在发请求之前：请求拦截器可以检测到，可以做一些事情

aaxios.interceptors.request.use((config) => {
    let access_token = localStorage.getItem('token');
    // console.log(access_token);
    if (access_token) {
        config.headers.token = localStorage.getItem('token')
    }

    return config;
});

aaxios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status == 402) {
        localStorage.removeItem('token')
        ElementUI.Message({
            message: err.response.data.detail,
            type: 'error'
        })
        router.push('/login')
    } else if (err.response.status == 400) {
        ElementUI.Message({
            message: err.response.data.detail,
            type: 'error'
        })
    }
});
// aaxios.defaults.withCredentials=true;
export default aaxios;
