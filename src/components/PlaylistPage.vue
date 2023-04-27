<template>
  <div class="PlaylistPage">
    <div class="title">
      <div class="ImgBox">
        <el-image
        :src="this.playlist.coverImgUrl"
        class="titleImg">
        </el-image>
      </div>

      <div class="information">
        <div class="ITiele">{{ this.playlist.name }}</div>

        <div class="CreatedUser">
          <el-image :src="this.userIn.avatarUrl" class="userImg"></el-image>
          <div class="createName">{{ this.userIn.nickname }}</div>
          <div class="createTime">{{this.playlist.createTime | dateFormat}} 创建</div>
        </div>

        <div class="FeatureGroups">
          <div class="FGitemsBegin"><span></span>播放全部</div>
          <div class="FGitems"><span class="el-icon-folder-add"></span>收藏({{ this.playlist.subscribedCount | playvolume}}) </div>
          <div class="FGitems"><span class="el-icon-share"></span>分享({{ this.playlist.shareCount | playvolume}}) </div>
          <div class="FGitems"><span class="iconfont icon-xiazai"></span>下载全部 </div>
        </div>
        <div class="tagsGroups">
          <span>标签 : </span><div class="tags" v-for="(item, index) in this.playlist.tags"> {{ item }} / </div>
        </div>
        <div class="Basic">
            <div>歌曲 :<span> {{ this.playlist.trackCount}}</span></div>
            <div>播放 :<span> {{ this.playlist.playCount | playvolume}}</span></div>
        </div>
        <div class="Brief"><span>简介 :</span>{{ this.playlist.description }}</div>
      </div>

    </div>

    <div class="playlistMusicTitle">
        <div class="titleItem" :class="{activeTitle: current === 1}" @click="itemClick(1)">歌曲列表</div>
        <div class="titleItem" :class="{activeTitle: current === 2}" @click="itemClick(2)">评论()</div>
        <div class="titleItem" :class="{activeTitle: current === 3}" @click="itemClick(3)">收藏者</div>
    </div>

    <!-- 歌曲列表界面 -->
    <div class="playlistcontent" >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {allSong, Song} from '@/network/playlistmessage'


export default {
  name: "PlaylistPage",

  data(){
    return {
      playlist:{},
      userIn:{},
      num:[],
      current:1,
      cookie:"",
      trackids:[],
      ids:[]
    }
  },
  created(){
    //  this.playID = this.$store.state.playlistID
     
  },
  mounted(){
    // console.log(this.$store.state.playlistID + "+++");
    this.getAllSong()
  },
  computed:{
    playID(){
      return this.$route.params.id
    },
   

  },
  methods:{
    getAllSong(){
      
      this.cookie = sessionStorage.getItem('cookie')
      allSong(this.playID,this.cookie).then(res =>{
        this.playlist = res.data.playlist
        this.userIn = res.data.playlist.creator
        this.trackids = res.data.playlist.trackIds
        // console.log(this.trackids);
      }).then(() => {
        // 提取数组中的ids
        for(let i = 0; i < this.trackids.length; i++){
          this.ids[i] = this.trackids[i].id
        }

        let promise = null 
        // 通过.map的方式把ids传给item
        promise = this.ids.map(item => {
          return new Promise((resolve) => {
            Song(item).then(res => {
              resolve(res)
              // console.log(res)
            })
          })
        })
        Promise.all(promise).then(res => {
          this.$store.commit('cleansong')
          // console.log(res);
          for(let song of res){
            this.$store.commit('setSonglistID', song)
          }
        })
      })
    }, 
    itemClick(num){
      switch(num){
        case 1: this.current = 1;
        break;
        case 2: this.current = 2;
        break;
        case 3: this.current = 3;
        break;
      }
    }
  },
  watch:{
    '$route' (to, from) {
    // 在mounted函数执行的方法，放到该处
	this.getAllSong();
	}
  }
}
</script>

<style>
.title{
  display: flex;
  margin: 20px 20px;
}
.titleImg{
  margin-right: 30px;
  width: 230px;
  height: 230px;
  border-radius: 5px;
}
.ITiele{
  margin-top: 5px;
  color:black;
  font-weight: 700;
  font-family: 微软雅黑;
}
.CreatedUser{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.userImg{
  width: 22px;
  height: 22px;
  border-radius:50%;
}
.createName{
  margin-left: 8px;
  margin-right: 8px;
  font-size: 12px;
  color: #4682B4;
}
.createTime{
  color: #000;
  font-size: 12px;
  opacity: .6;
}
.FeatureGroups{
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.FGitemsBegin{
  margin-right: 10px;
  font-size: 14px;
  background-color: #ec4141;
  border-radius: 20px;
  padding: 5px 20px;
  font-family: 微软雅黑;
}
.FGitems{
  margin-right: 10px;
  font-size: 14px;
  color: #000;
  border: 1px solid #808080;
  border-radius: 20px;
  padding: 5px 20px;
  font-family: 微软雅黑;
}
.FGitems span{
  margin-right: 5px;
}
.tagsGroups{
  display: flex;
  margin-top: 10px;
}
.tagsGroups span{
  color:#000;
  font-size: 12px;
}
.tags{
  font-size: 13px;
  color: #4682B4;
}
.Basic{
  display: flex;
  margin-top: 10px;
}
.Basic div{
  color:#000;
  font-size: 13px;
  margin-right: 10px;
}
.Basic span{
  color:#000;
  font-size: 13px;
  opacity: .7;
}
.Brief{
  color: #000;
  font-size: 13px;
}
.playlistMusicTitle{
  display: flex;
  align-items: center;
  margin: 20px 20px;
 }
 .titleItem{
  margin: 0 10px;
  padding: 1px;
  font-size: 14px;

 }
 .activeTitle{
  color: black;
  font-weight: 700;
  font-size: 20px;
  border-bottom: 3px solid #FF4500;
 }

</style>