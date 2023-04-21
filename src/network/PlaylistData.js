import { request } from "./request";

// 获取歌单分类
export function playlist(){
  return request({
    url:'/playlist/catlist'
  })
}
// 热门歌单列表
export function HotPlatlist(){
  return request({
    url:'/playlist/hot'
  })
}

// 获取歌单
export function playInfo(cat, offset){
  return request({
    url:'/top/playlist',
    params:{
      cat,
      limit:50,
      offset
    }
  })
}




