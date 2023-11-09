import axios from 'axios';
import querystring from 'querystring'
import { getToken } from '@/utils/setToken.js'
import { ElMessage } from 'element-plus'
//网络请求的公共配置

const instance = axios.create({
    baseURL: '/api',
    timeout: 3000,
})

//拦截器
//发送数据之前
instance.interceptors.request.use((config) => {
    config.headers['token'] = getToken('token')
    if (config.methods === "post") {
        config.data = querystring.stringify(config.data)
    }
    //包含网络请求的所有信息
    return config;
}, error => {
    return Promise.reject(error)
}

)

//接收数据之后
instance.interceptors.response.use(response => {
    let { code, message } = response.data
    if (code != 200) {
        ElMessage.error(message)
    }

    return response.data.code === 200 ? Promise.resolve(response) : Promise.reject(response)
}, error => {
    const { response } = error;
    errorHandle(response.status, response.info)
}
)

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义有误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("找不到该地址");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break;
    }
}
export default instance; 