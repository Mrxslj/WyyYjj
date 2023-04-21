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
export function subCount (ID,limit,offset){
  return request ({
    url:'/user/playlist',
    params:{
      ID,
      limit,
      offset
    }
  })
}