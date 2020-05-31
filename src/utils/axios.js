//axios单例模式
import axios from 'axios'
import { Toast } from 'antd-mobile'

// 后台接口的基础地址
//支持跨域
const BASE_URL = 'https://api-haoke-web.itheima.net';
// 创建axios的实例
const http = axios.create({
  baseURL: BASE_URL
});

// 注册拦截器（request和response）
http.interceptors.request.use(function (config) {
  //加载中
  Toast.loading('loading...',0)
  return config;
}, function (error) {
  return Promise.reject(error);
});


http.interceptors.response.use(function (response) {
  //关闭加载
  Toast.hide()
  const data=response.data
  let res={
  status:data.status,
  description:data.description,
  data:data.body
  }
  return res;
}, function (error) {
  return Promise.reject(error);
});

export { BASE_URL }
export default http