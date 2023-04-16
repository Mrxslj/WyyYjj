import { request } from "../request";
export function gethotsearch(){
    return request({
        url:'/search/hot/detail'
    })
}
// 手机验证登入
// export function loginCellphoneByCaptcha(phone, captcha) {
//     return request({
//         url:'/login/cellphone',
//         params:{
//             phone,
//             captcha
//         }
//     })
//   }
  export function loginCellphoneByCaptcha(phone, captcha) {
    return request('/login/cellphone', 'post', { 'phone': phone, 'captcha': captcha })
  }
// 发送验证码
export function getcaptcha(phone){
    return request({
        url:'/captcha/sent',
        params:{
            phone
        }
    })
}
// 验证验证码
export function getverify(phone,captcha){
    return request({
        url:'/captcha/verify',
        params:{
            phone,
            captcha
        }
    })
}
// 获得生成二维码的key
export function getkey(){
    return request({
        url:'login/qr/key',
        params:{
            timerstamp: new Date().getTime(),
          } 
    })
}
// 获取二维码
export function getceate(key){
    return request({
        url:'login/qr/create',
        params:{
            timerstamp: new Date().getTime(),
            qrimg: true,
            key,
        }
    })
}
// 获取扫码的接口
export function getcheck(key){
    return request({
        url:'login/qr/check',
        params:{
            timerstamp: new Date().getTime(),
            withCredentials: true,
            key
        }
    })
}

export function getStatus(cookie){
    return request({
        url:'/login/status',
        params:{
            cookie
        }
    })
}
export function getaccount(){
    return  request ({
        url:'/user/subcount',
    })
}