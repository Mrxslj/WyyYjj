import { request } from "./request";

// 获取账号信息
export function AccountInformation(cookie) {
  return request({
    url: '/user/account',
    data:{
      cookie
    }
  })
}

// 获取用户歌单
export function subCount (uid,cookie){
  return request ({
    url:'/user/playlist',
    params:{
      uid,
      cookie
    }
  })
}