<template>
  <div class="playlist">
    <div class="indexTitle" >
      <!-- 歌单列表 -->
      <div class="playlisTags" @click="allTagsShow">{{TagsName}} ></div>
      <div class="allTags" v-show="isTagsAll">
        <div class="allTagName" @click="getTagPlay(TagsName)">{{ TagsName }}</div>
        <div class="TagsListAll">
          <!-- 语种 -->
          <div class="TagsGroup">
            <div class="group"><span class="iconfont icon-diqiu"></span>{{this.tagsGroup[0]}}</div>
            <div class="taglist">
            <div class="tag" v-for="(item, index) in LanguagesTags"
             @click="getTagPlay(item,index)"><div>{{item}}</div></div>
            </div>
          </div>
          <!-- 风格 -->
          <div class="TagsGroup">
            <div class="group"><span class="iconfont icon-gangqin"></span>{{this.tagsGroup[1]}}</div>
            <div class="taglist">
            <div class="tag"  v-for="(item, index) in styleTags"
            @click="getTagPlay(item,index)"><div>{{item}}</div></div>
            </div>
          </div>
          <!-- 场景 -->
          <div class="TagsGroup">
            <div class="group"><span class="iconfont icon-kafei"></span>{{this.tagsGroup[2]}}</div>
            <div class="taglist">
            <div class="tag" v-for="(item, index) in scenarioTags"
            @click="getTagPlay(item,index)"><div>{{item}}</div></div>
            </div>
          </div>
          <!-- 情感 -->
          <div class="TagsGroup">
            <div class="group"><span class="iconfont icon-xiaolian"></span>{{this.tagsGroup[3]}}</div>
            <div class="taglist">
            <div class="tag" v-for="(item, index) in emotionTags"
            @click="getTagPlay(item,index)"><div>{{item}}</div></div>
            </div>
          </div>
          <!-- 主题 -->
          <div class="TagsGroup">
            <div class="group"><span class="iconfont icon-caidan"></span>{{this.tagsGroup[4]}}</div>
            <div class="taglist">
            <div class="tag" v-for="(item, index) in topicTags"
            @click="getTagPlay(item,index)"><div>{{item}}</div></div>
            </div>
          </div>  
          </div>
      </div>
      <!-- 热门歌单列表 -->
      <div class="hotTitele" v-for="(item, index) in HotPlatlistArray">
        <div class="tags" 
        @click="tagsClick(item.name,index)" 
        :class="{'active':isActive==index}"
        >{{item.name}}</div>
       
      </div>
    </div>

    <!-- 内容 -->
    <div class="PlaylistContent">
        <div class="itemBox" v-for="(item, index) in playlistArray" @click="Jump(item.id)">
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
      playlistArray:[],
      isActive:0,
      tagsGroup:{},
      tagsList:[],
      LanguagesTags:[], //语言
      styleTags:[], //风格
      scenarioTags:[], //场景
      emotionTags:[], //情感
      topicTags:[], //主题
      isTagsAll:false
    }
  },
  mounted(){
    
    setTimeout(() =>{
      this.getplaylist(),
      this.getHotPlatlist(),
      this.getplayInfo(this.TagsName)
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
        this.playlistTagesArray = res.data
        this.playlisTags = res.data.all.name
        this.tagsGroup = res.data.categories
        this.tagsList = res.data.sub
        console.log(this.playlistTagesArray);
        console.log(this.tagsList.length);
        this.getallTags()
        console.log(this.LanguagesTags);
        console.log(this.styleTags);
        console.log(this.scenarioTags);
        console.log(this.emotionTags);
        console.log(this.topicTags);
        // console.log(this.playlisTags);
    })
  },
  getHotPlatlist(){
    HotPlatlist().then(res => {
      // console.log(res);
      this.HotPlatlistArray = res.data.tags
      // console.log(this.HotPlatlistArray);
    })
  },
  getplayInfo(tagName){
    playInfo(tagName,this.pagination).then(res => {
      // console.log(tagName);
      this.playlistArray = res.data.playlists
      // console.log(this.playlistArray);
    })
  },
  tagsClick(tagsname,index){
   this.getplayInfo(tagsname)
    this.tagsSelected(index)
  },
  tagsSelected(num){
    if(num === 0 ){
      this.isActive = 0
    } else {
      for(let i = 0; i< num; i++){
        switch(i){
          case i : this.isActive = num;
          break;
        }
      }
    }
  },
  // 点击歌单进行跳转 并且把歌单id传给 歌单详情页
  Jump(id){
    this.$router.push('/PlaylistPage/' + id);
    this.$store.commit('setplaylistID', id)
    // this.$store.commit('PlaylistInformation', )
  },
  getallTags(){
    for(let i=0; i<this.tagsList.length; i++ ){
      switch(this.tagsList[i].category){
        case 0: this.LanguagesTags.push(this.tagsList[i].name)
        break;
        case 1: this.styleTags.push(this.tagsList[i].name)
        break;
        case 2: this.scenarioTags.push(this.tagsList[i].name)
        break;
        case 3: this.emotionTags.push(this.tagsList[i].name)
        break;
        case 4: this.topicTags.push(this.tagsList[i].name)
        break;
      }
      
    }
  },
  allTagsShow(){
    this.isTagsAll = true
  },
  getTagPlay(tagsname,index){
    this.getplayInfo(tagsname)
    this.isTagsAll = false
  }
},
}
</script>

<style>
 .playlist{
  margin: 5px 40px;
  font-family: 微软雅黑;
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
  margin: 0 0px;
  font-size: 12px;
  opacity: .8;
  cursor:pointer;
  padding: 3px 10px;
  
 }
 .active{
  color: red;
  background-color: rgba(240,128,128,.2);
  border-radius: 20px;
  opacity: .7;
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
.allTags{
  position: absolute;
  left: 345px;
  top: 185px;
  z-index: 50;
  background-color: #fff;
  width: 756px;
  height: 755px;
  /* 设置div阴影 */
  box-shadow: 0px 0px 3px #dcdcdc;
  /* 设置div圆角 */
  border-radius: 2px;
}
.allTagName{
  padding-left: 30px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #dcdcdc;
}
.TagsListAll{
  margin-left: 20px;
  margin-top: 20px;
}
.TagsGroup{
    display: block;
    margin-top: 20px;
}
.group{
  display: inline-block;
  margin-right: 70px;
}
.taglist{
  display: inline;
}
.tag{
  display: inline-block;
  width: 120px;
  margin-top: 20px;
}
</style>