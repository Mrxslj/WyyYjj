import { request } from "./request";

// 二维码登录 接口
// 二维码 key 生成接口
export function login(){
  return request({
    url: '/login/qr/key',
    params:{
      timerstamp: new Date().getTime()
    }
  })
}
// 二维码生成接口
export function getImg(key){
  return request({
    url:'/login/qr/create',
    params:{
      key,
      qrimg:true,
      timerstamp: new Date().getTime(),
    }
  })
}
 // 二维码登录
 export function QRLogin(key){
  return request({
    url:'/login/qr/check',
    params: {
      key,
      withCredentials: true,
      timerstamp: new Date().getTime(),
    }
  })
}

// 登录状态
export function LogonStatus(cookie){
  return request({
    url: '/login/status',
    params:{
      cookie
    }
  })
}
