<template>
  <el-aside class="sidebar" width="15%">
    <div class="innerside">
      <ul class="list">
        <p>推荐</p>
        <div>
          <router-link to="/home" class="link">
            <li class="item" :class="{activesidebar: current === 1}" @click="itemClick(1)">
              <span class="iconfont icon-yinle"></span>
              <span>发现音乐</span>
            </li>
          </router-link>

            <li class="item" :class="{activesidebar: current === 2}"  @click="itemClick(2)">
              <span class="iconfont icon-shipin"></span>
              <span>推荐视频</span>
            </li>
        </div>
      </ul>
      <div>
      <p>我的音乐</p>
      <ul class="LisetUl">
        <div  v-for="(item,index) in userplay">
            <li class="listLi" @click="userplayJump(item.id)">{{ item.name }}</li>
        </div>
      </ul>
    </div>
    </div>
  </el-aside>
</template>

<script>
import {subCount} from '@/network/userDate'
export default {
  name: 'sidebar',
  data() {
    return {
      current: 1,
      userplay:[]
    }
  },
  created(){
    this.getsubCount()
  },
  methods:{
    itemClick(num){
      switch (num) {
        case 1:this.current = 1;
        break;
        case 2:this.current = 2;
        break;
      }
    },
    getsubCount(){
      // 不能直接把 sessionStorage.getItem('cookie') 放到函数的变量中
      let cookie = sessionStorage.getItem('cookie')
          let uid = sessionStorage.getItem('id')
      subCount(uid,cookie).then(res => {
          // console.log(res.data.playlist);
          this.userplay = res.data.playlist
          // console.log(this.userplay);
      })
    },
    userplayJump(id){
      this.$router.push('/PlaylistPage/' + id);
      this.$store.commit('setplaylistID', id)
    }
  },
  watch:{
   $route(val){
    if (val.path.match(RegExp(/personal/))){
       this.current = 1;
      }
    }
  },
}
</script>

<style>
.sidebar{
  text-align: left;
  border-right: 1px solid #dcdcdc;
  text-decoration: none;
  height:89vh;
  font-family: 微软雅黑;
}

p{
  margin: 10px 10px;  
  color:#A9A9A9;
}
li{
  padding: 0 0;
  margin: 0 5px;
  list-style:none;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  border-radius: 10px;
}
.item {
  padding-left: 20px;
}
.item:hover {
  background-color: #dcdcdc;
}

.activesidebar{
  opacity: .8;
  color: #000;
  background: #e6e7ea!important;
  font-weight: 700;
}

.iconfont{
  font-family:"iconfont" !important;
  margin-right: 8px;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

 /* 美化滚动条 */
 .sidebar::-webkit-scrollbar {
  width: 0px;
  height: 6px;
}
.sidebar::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}
.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
.LisetUl{
  padding-left: 20px;
  /* list-style: none; */
}
.listLi{
  /* 隐藏超出内容 */
  overflow: hidden;
  padding-left: 20px;
}
.listLi:hover{
  opacity: .8;
  color: #000;
  background: #e6e7ea!important;
}
</style>