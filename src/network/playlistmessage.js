import { request } from "./request";

// 获取歌单详情
export function allSong(id,cookie){
  return request({
    url:'/playlist/detail',
    params:{
      id,
      cookie
    }
  })
}
  // 获取音乐
  export function Song(ids){
    return request({
      url:'/song/detail',
      params:{
        ids
      }
    })
  }

