import axios from "../utils/request"
//用户
export function login(data) {
    return axios.post('/user/login', data)
}
export function register(data) {
    return axios.post('/user/register', data)
}
export function findUserById(id) {
    return axios.post('/user/findUserById/' + id)
}
//新闻列表查询
export function newsList(params) {
    return axios.post('/news/getNews', params)
}
export function deleteNews(id) {
    return axios.post('/news/deleteNews/' + id)
}
export function getNewsById(id) {
    return axios.post('/news/getNewsById/' + id)
}
export function updateNews(params) {
    return axios.post('/news/updateNews/', params)
}
export function addNews(params) {
    return axios.post('/news/addNews/', params)
}