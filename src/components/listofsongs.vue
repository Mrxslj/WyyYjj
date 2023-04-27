<template>
  <div class="listofsongs">
    <div class="songsTitel">
      <div class="TitelSoperate">操作</div>
      <div class="TitelName">标题</div>
      <div class="TitelSinger">歌手</div>
      <div class="TitelAlbum">专辑</div>
      <div class="TitelTime">时间</div>
    </div>

    <div class="SongContent">
      <div class="Song" v-for="(item, index) in songList" :class="{activeSong: (index + 1)%2 === 1}">
          <div class="number" v-if="(index + 1)<10">0{{ index + 1 }}</div>
          <div class="number" v-else>{{ index + 1 }}</div>
          <!--操作-->
          <div class="songSoperate">
            <span class="iconfont icon-aixin"></span>
            <span class="iconfont icon-xiazai1"></span>
          </div>
          <!--歌名-->
          <div class="songName">{{item.data.songs[0].name}}</div>
          <!--歌手-->
          <div class="songSinger">{{item.data.songs[0].ar[0].name}}</div>
          <!--专辑-->
          <div class="songAlbum">{{item.data.songs[0].al.name}}</div>
          <!--时间-->
          <div class="songTime">{{ getHMS(item.data.songs[0].dt/1000) }}</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
 name:'listofsongs',
 date(){
  return {
  }
 },
 computed:{
  songList(){
    return this.$store.state.songlist
  }
 },
 methods:{
  getHMS(time) {
  const min = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60)
  const sec = parseInt(time % 3600 % 60) < 10 ? '0' + parseInt(time % 3600 % 60) : parseInt(time % 3600 % 60)
  return  min + ':' + sec
  }

 }
}
</script>

<style>
.SongContent{
  width: 100%;
}
.songsTitel{
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.TitelSoperate{
  margin-left: 54px;
  width: 70px;
}
.TitelName{
  float:left;
  width: 650px;
}
.TitelSinger{
  float:left;
  width: 310px;
}
.TitelAlbum{
  float:left;
  width: 410px;
}
.TitelTime{
  float:left;
  width: 150px;
}
.Song{
  display: flex;
  width: 100%;
  height: 33px;
  font-size: 13px;
  align-items: center;
}
.Song:hover{
  background-color: #f2f2f3;
}
.number{
  opacity: .7;
  margin-left: 22px;
}
.songSoperate{
    margin-left: 3px;
  width: 30px;
}
.songName{
  margin-left:20px ;
  width: 477px;
}
.songSinger{
width: 224px;
}
.songAlbum{
  width: 299px;
}
.activeSong{
  background-color: #fafafa;
}
</style>