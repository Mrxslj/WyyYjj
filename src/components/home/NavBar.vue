<template>
  <div class="nav-bar">
    <div class="img">
      <img src="@/assets/img/music.png" alt="" class="img2">
    </div>
      <span class="title">我的网易云</span>
      <div class="back">
        <i class="el-icon-arrow-left" style="cursor: pointer;"></i>
      </div>
      <div class="go">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="box">
        <!-- <el-input v-model="search" placeholder="请输入"  prefix-icon="el-icon-search"/> -->
        <span></span>
        <input placeholder="请输入歌曲名或歌手名" class="search" @focus="PromptBoxShow" @blur="PromptNotShow"/>
      </div>
      
      <transition name="el-fade-in" >
          <div class="PromptShow" v-if="PromptShow">
              <div v-loading="loading" class="Promptbox">
              <div class="hotTitle">热搜榜</div>
              <div>
              <div class="searchItem" v-for="(item, index) in hotsearchList" >
                <div class="number" :class="{active: index + 1 === 1 || index + 1 === 2 || index + 1 === 3}">{{index + 1}}</div>
                <div class="searchName">
                  <div class="singer" :class="{singerActive: index + 1 === 1 || index + 1 === 2 || index + 1 === 3}">{{item.searchWord}}</div>
                  <span class="hot" v-if="item.iconType === 1 || index + 1 === 1 || index + 1 === 2 ">HOT</span>
                  <!-- <div class="icon iconfont3" v-if="item.iconType === 2">&#xe741;</div> -->
                  <div class="score">{{item.score}}</div>
                  <div class="content">{{item.content}}</div>   
                </div>
              </div>
              </div>
            </div>
          </div>
      </transition>

      <div class="userlogin">
        <el-avatar icon="el-icon-user-solid" :size="34" v-if="useravatarshow != false"></el-avatar>
        <el-image :src="useravatar" class="avatar" v-else></el-image>
        <div class="username">{{ username }}</div>
        <span style="font-size: 12px;font-family: 微软雅黑;"  @click="show" v-show="isLogin">登录</span>
        <span style="font-size: 12px;font-family: 微软雅黑;" v-show="isQuit">退出</span>
      </div>

      <!-- 登录界面 -->
      <div class="loginScreen" v-show="loginShow">
        <div class="loginTitle">扫码登录</div>
        <el-image 
          class="QRcode"
          :src="this.qrimgImg">
        </el-image>
        <span class="loginPrompt">使用<p>网易云音乐APP</p>扫码登录</span>
        <i class="el-icon-close" @click="closeLogin"></i>
        <div :plain="true"></div>
      </div>
  </div>

</template>
<link rel="stylesheet" href="@/assets/iconfont/iconfont.css"></link>
<script>
import { getHotsearch,} from '@/network/homedata'
import {login,getImg,QRLogin,LogonStatus } from '@/network/login'
import {AccountInformation, subCount} from '@/network/userDate'

export default {
  name: "navbar",
  data() {
    return {
      search: '',
      PromptShow: false,
      loading: true,
      hotsearchList: [],
      loginShow: false,
      unikey: "",
      qrimgImg: "",
      nowTime:new Date().getTime(),
      QRisLoad:false,
      loginMessage:"",
      isLogin: true,
      isQuit: false,
      Stats:[],
      useravatar:sessionStorage.getItem('avatarUrl'),
      useravatarshow:false,
      username:sessionStorage.getItem('nickname'),
    }
  },
  mounted(){
    this.getQRkey()
  },
  methods:{
    PromptBoxShow(){
      this.PromptShow = true
    },
    PromptNotShow() {
      this.PromptShow = false
    },
    getQRkey(){
       // 二维码 key 生成接口
      login().then(res => {
        // console.log(res.data.data.unikey); //e597a89d-ba33-42fc-a20d-225ba210f6d0
        // console.log(res);
       this.unikey = res.data.data.unikey
       this.getQRimg(this.unikey)
      })
    },
    closeLogin(){
      this.loginShow = false
    },

    getQRimg(key){
        // 二维码生成接口
        getImg(this.unikey).then(res => {
        this.qrimgImg = res.data.data.qrimg
        this.getQRLogin()
      })
    },

    getQRLogin(){
        // 二维码登录
        QRLogin(this.unikey).then(res => {
          this.QRisLoad = false
          
        })
    },
    show(){
      this.loginShow= true
      this.QRisLoad = true
    },
    getLoginStatus(){
      LogonStatus(sessionStorage.getItem('cookie')).then(res => {
        // console.log(res);
        if(res.status === 200){
          this.isQuit = false
          this.isLogin = false
          console.log(res);
          console.log(sessionStorage.getItem('cookie'));
          sessionStorage.getItem('cookie')
          sessionStorage.setItem('nickname', res.data.data.profile.nickname) //用户名称
          sessionStorage.setItem('avatarUrl', res.data.data.profile.avatarUrl) //用户头像
          sessionStorage.setItem('id', res.data.data.account.id) //用户id
          this.useravatarshow = true //显示用户头像
          // console.log(sessionStorage.getItem('cookie'));
          

        } else {
          console.log("登录失败");
        }
    })
    },
   
  },
  created() {
  },
  watch: {
    PromptShow(val) {
      if(val){
        getHotsearch().then(res => {
          this.hotsearchList = res.data.data
          this.loading = false
        })
      }
    },
    QRisLoad:function (){
      // 二维码登录
      let interval = setInterval(async() => {
        QRLogin(this.unikey,this.nowTime).then(res => {
          let code = res.data.code
          // console.log(code);
          if(code === 801){
            // 等待
            console.log(res.data.message);
            
          } else if(code === 802){
            console.log(res.data.message);
            this.$message(res.data.message);
          } else if(code === 803){
            // 登录成功后 获取到登录状态的cookie
            this.Stats = res.data
            console.log(res.data.message); // 打印登录状态
            this.$message(res.data.message);
            this.loginShow = false,
            sessionStorage.setItem('cookie', this.Stats.cookie)
            this.getLoginStatus()
            clearInterval(interval)
          } else if(code === 800){
            console.log(res.data.message);
          }
          this.loginMessage = res.data.message
         
        })        
       },2000)
    }
  }
}
</script>

<style>
  .nav-bar {
    width: 1528px;
    height: 70px;
    background-color: #c62f2f;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }

  .img {
    align-items: center;
    padding: 5px 5px;
    margin-left: 40px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #ff0000;
  }

  .img2 {
    margin: 5px 2px;
  }

  .title {
    margin-left: 20px;
    font-size: 24px;
    color: #fbf2f2;
  }

  .el-icon-arrow-left {
    font-family: element-icons !important;
  }

  .el-icon-arrow-right {
    font-family: element-icons !important;
  }

  .back {
    margin-left: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #ba3131;
    color: #fbf2f2;
    border-radius: 20px;
  }

  .go {
    margin-left: 20px;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #ba3131;
    color: #fbf2f2;
    border-radius: 20px;
  }

  .search {

    margin-left: 30px;
    padding-left: 30px;
    background-color:rgba(255, 255, 255, 0.5);
    border:none ;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    width: 250px;
  }

/* 设置input提示文字样式 */
input::-webkit-input-placeholder{
  padding-left: 30px;
  color: #c37d87;
  font-size: 12px;
}

/* 设置输入时input样式 */
.search:focus {
  background-color:rgba(255, 255, 255, 0.5);
  font-size: 12px;
  border:none ;
}
.box {
  position: relative;
}

.box span {
  position: absolute;
  left: 35px;
  top: 5px;
  width: 20px;
  height: 20px;
  display: inline-block;
  background: url(@/assets/img/search.png) no-repeat;
  background-size: 80% 80%;
  background-position: center;
}

.PromptShow{
  position: absolute;
  left: 347px;
  top: 57px;
  /* padding:12px 12px; */
  z-index: 50;
  width: 300px;
  height: 450px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: rgb(0,0,0,.2) 0px 0px 4px;
  overflow-y:auto;
}
 /* 美化滚动条 */
 .PromptShow::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}

.PromptShow::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.PromptShow::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

.PromptShow::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
.hotTitle{
  margin: 10px 0;
  font-size: 14px;
  font-family: 微软雅黑;
  padding: 12px 12px;
}
.searchItem {
  display: flex;
  align-items:center;
  height: 50px;
  width: 100%;
  padding: 12px 12px;
}
.searchItem:hover {
  background-color: rgba(192, 192, 192, .7)
}
.number{
  font-family: 微软雅黑;
  font-weight: 400;
  margin-right:15px;
  opacity: .7;
}
.active {
  color:red;
}

.singer{
  display: inline;
  font-size: 12px;
  font-family: 微软雅黑;
}
.singerActive {
  display: inline;
  font-weight: 700;
  font-size: 14px;
  font-family: 微软雅黑;
}
.score {
  display: inline;
  margin-left: 10px;
  font-size: 8px;
  font-family: 微软雅黑;
  opacity: 0.5;
}

.content {
  font-size: 12px;
  font-family: 微软雅黑;
  opacity: 0.8;
}
.hot {
  margin-left: 10px;
  color: red;
  font-size: 10px;
  font-style: italic;
}
.userlogin{
  display: flex;
  align-items: center;
  position: absolute;
  right: 70px;
  cursor: pointer;
}
.userlogin span {
  font-family: 微软雅黑;
  color: #fff;
  margin-left: 8px;
  font-size: 14px;
}

/* 登录二维码 */
.loginScreen{
  position: absolute;
  left: 50%;
  top: 125px;
  text-align: center;
  width: 260px;
  height: 400px;
  background-color: #fff;
  z-index: 50;
  border-radius: 10px;
  box-shadow: 2px 2px  #d3d3d3;
}
.loginTitle{
  margin-top: 50px;
  margin-bottom: 15px;
  font-size: 25px;
  color:#000;
}
.loginPrompt{
  display: inline-block;
  margin: 0 auto;
  font-size: 14px;
}
.loginPrompt p {
  display: inline-block;
  margin: 0;
  color: 	#4169E1;
}

.el-icon-close{
  position: absolute;
  right: 6px;
  top: 6px;
  font-size: 22px;
  opacity: .6;
}
.avatar{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.username{
  width: 90px;
  height: 20px;
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
}
</style>