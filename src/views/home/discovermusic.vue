<template>
  <div class="discovermusic">
    <el-header>
      <div class="discoverMusicTitle">
        <router-link :to="{path: 'personality'}" class="link">
          <div class="titleItem" :class="{activeTitle: current === 1}" @click="itemClick(1)">个性推荐</div>
        </router-link>
        <div class="titleItem" :class="{activeTitle: current === 2}" @click="itemClick(2)">歌单</div>

        <div class="titleItem" :class="{activeTitle: current === 3}" @click="itemClick(3)">排行榜</div>

        <div class="titleItem" :class="{activeTitle: current === 4}" @click="itemClick(4)">歌手</div>

        <div class="titleItem" :class="{activeTitle: current === 5}" @click="itemClick(5)">最新音乐</div>
        
      </div>
    </el-header>

    <el-main id="main">
        <div>
          <router-view></router-view>
        </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name:'discovermusic',
  data() {
   return {
    current:1
   }
  },
  created(){
  },
  methods: {
    itemClick(num){
      switch(num){
        case 1: this.current = 1;
        break;
        case 2: this.current = 2;
        break;
        case 3: this.current = 3;
        break;
        case 4: this.current = 4;
        break;
        case 5: this.current = 5;
        break;
      }
    }
  }
}
</script>

<style>
 .discovermusic{
  /* 隐藏溢出内容 */
  overflow-y: hidden;
  overflow-x: hidden;
  font-family: 微软雅黑;
 }
 .discoverMusicTitle{
  display: flex;
  align-items: center;
 }
 .titleItem{
  margin: 0 10px;
  padding: 8px;
  font-size: 14px;

 }
 .activeTitle{
  color: black;
  font-weight: 700;
  font-size: 20px;
  border-bottom: 3px solid #FF4500;
 }

</style>