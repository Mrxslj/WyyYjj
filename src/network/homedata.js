import { request } from "./request";

// 获取 热搜列表
export function getHotsearch () {
  return request({
    url: '/search/hot/detail'
  })
}
// 获取 轮播图
export function getbanners () {
  return request({
    url: '/banner'
  })
}

// 获取 独家放送数据
export function getExclusive(){
  return request({
    url:'/personalized/privatecontent'
  })
}

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
