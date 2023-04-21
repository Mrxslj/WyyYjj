<template>
  <div class="playlist">

    <div class="indexTitle" >
      <div class="playlisTags" >{{TagsName}} ></div>
      <div class="hotTitele" v-for="(item, index) in HotPlatlistArray">
        <div class="tags">{{item.name}}</div>
       
      </div>
    </div>

    <!-- 内容 -->
    <div class="PlaylistContent">
      <div class="itemBox" v-for="(item, index) in playlistArray">
          <el-image
          :src="item.coverImgUrl"
          class="itemImage">
          </el-image>
          <div class="playlistTitele">{{item.name }}</div>
          <div class="Playback"><span class="iconfont icon-yousanjiao"></span>{{ item.playCount | playvolume}}</div>
          <div class="username"><span class="iconfont icon-yonghu1"></span>{{ item.creator.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {playlist, HotPlatlist, playInfo} from '@/network/PlaylistData'
export default {
  name:'playlist',
  data(){
    return {
      playlistTagesArray: [],
      HotPlatlistArray: [],
      playlisTags:"",
      TagsName:"全部歌单",
      Pages:1,
      playlistArray:[]
    }
  },
  created(){
    this.getplayInfo()
  },
  mounted(){
    setTimeout(() =>{
      this.getplaylist(),
      this.getHotPlatlist()
    },800)
  },
  computed:{
    pagination(){
      return (this.Pages-1)*50
    },
  },
  methods:{
    getplaylist(){
      playlist().then(res => {
        // console.log(res);
        this.playlistTagesArray = res.data
        this.playlisTags = res.data.all.name
        console.log(this.playlistTagesArray);
    })
  },
  getHotPlatlist(){
    HotPlatlist().then(res => {
      // console.log(res);
      this.HotPlatlistArray = res.data.tags
      // console.log(this.HotPlatlistArray);
    })
  },
  getplayInfo(){
    playInfo(this.TagsName,this.pagination).then(res => {
      // console.log(res);
      this.playlistArray = res.data.playlists
      console.log(this.playlistArray);
    })
  }
},
filters: {
	playvolume:function(arg){
			if(arg.toString().length>=13){
				// return arg/1000000000000+"万亿"
				const volume= arg/1000000000000
				const realVal = parseFloat(volume).toFixed(0);
				return realVal+"万亿"
				
			}else if(arg.toString().length>=9){
				const volume= arg/100000000
				const realVal = parseFloat(volume).toFixed(0);
				return realVal+"亿"
			}else if(arg.toString().length>=4){
				const volume= arg/10000
				const realVal = parseFloat(volume).toFixed(0);
				return realVal+"万"
			}
    }
  },
}
</script>

<style>
 .playlist{
  margin: 5px 40px;
  }
 .indexTitle {
  display:flex;
  flex-direction:row;
  /* height: 100px; */
  width: 100%;
 }
 .playlisTags{
  /* display: inline; */ 
  margin-right: auto;
  padding: 4px 8px;
  border: 1px #C0C0C0 solid;
  border-radius:12px;
  font-size: 14px;
  cursor:pointer;
 }
 .playlisTags:hover{
  background-color: #D3D3D3;
 }
 .tags{
  /* display: inline-block; */
  margin: 0 10px;
  font-size: 13px;
  opacity: .8;
  cursor:pointer;
 }
 .PlaylistContent{
  margin-top: 15px;
  display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
  cursor:pointer;
 }
 .itemBox{
  position: relative;
	justify-content: space-between;
	flex-wrap: wrap;
  margin-bottom: 40px;
  /* margin-top: 11px;
  margin-right: 5px;
  height: 260px; */
  /* width:fit-content; */
 }
 .playlistItem:last-of-type{
  margin-right: 0;
 }
.itemImage {
  width: 215px;
  height: 215px;
  border-radius: 5px;
}
.playlistTitele{
  width: 215px;
  height: 20px;
  font-size: 15px;
  white-space: normal;
}
.Playback{
  position: absolute;
  right: 5px;
  top: 5px;
  color:#fff;
  font-size: 14px;
}
.Playback span{
  display: inline-block;
  margin-right: 2px;
}
.username{
  position: absolute;
  left: 8px;
  bottom: 32px;
  color: #fff;
  font-size: 13px;
}
.username span{
  margin-right: 0px;
}
</style>