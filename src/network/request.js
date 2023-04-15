import axios from "axios";


export function request (config) {
  return new Promise((resolve,reject) => {
    const instance = axios.create({
        baseURL:'http://localhost:3000',
        timeout:5000
    })
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // console.log(config);
        return config
      }, error => {
        console.log(error);
      });
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        // console.log(res);
        return res
      }, error => {
        console.log(error);
      })
  

    // 发送网络请求
    return instance(config).then(res => {
      resolve(res)
      // console.log(res);
    }).catch(err => {
      reject(err)
    })
  })
}