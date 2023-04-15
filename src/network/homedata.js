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

// 登录
export function login(phone,password){
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}