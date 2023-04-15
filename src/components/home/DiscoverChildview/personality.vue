<template>
  <div class="personality">
    <!-- 轮播图 -->
    <div class="CarouselMap" v-loading="loadingcarousel">
        <el-carousel class="swiper" type="card" height="244px" >
        <el-carousel-item class="swiperitem" v-for="item in banners">
            <img :src="item.imageUrl" alt="">
            <div class="new" ><div>{{item.typeTitle}}</div></div>
        </el-carousel-item>
        </el-carousel>
    </div>

    <!-- 推荐歌单 -->

    <!-- 独家放送 -->
    <div class="exclusive">
      <div class="exclusiveTitle"><p>独家放送 > </p></div>

      <div class="Exclusivecontent" v-for="item in exclusive">
        <div class="privateicon">
                    <i class="el-icon-caret-right"></i>
                </div>
          <img :src="item.sPicUrl" alt="">
          <p class="ExclusivecontentTitle">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getbanners, getExclusive} from '@/network/homedata'

export default {
  name:'personality',
  data() {
    return {
      banners: [],
      loadingcarousel:  true,
      exclusive: []
    }
  },
  created(){
    getbanners().then(res => {
      this.banners = res.data.banners
      this.loadingcarousel = false
    })
    getExclusive().then(res => {
      this.exclusive = res.data.result
      // console.log(res.data);
    })
  }
}
</script>

<style>
.personality {
  margin: 0 auto;
  width: 1000px;
  font-family: 微软雅黑;
}
.swiperitem img {
  position: relative;
  width: 100%;
    height: 100%;
    /* object-fit: cover; */
    border-radius:10px ;
}
.new {
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 3px 10px;
  color: #fff;
  background-color: #c62f2f;
  font-size: 12px;
  border-top-left-radius:10px ;
  border-bottom-right-radius:10px ;
}

.exclusive{
  margin: 10px 0;
}

.exclusiveTitle p {
  font-size: 20px;
  color: #000;
  font-weight: 700;
}

.Exclusivecontent{
  position: relative;
  display: inline-block;
  /* align-items: center; */
  margin-left: 12px;
 width: 320px;
}

.Exclusivecontent img {
  width: 100%;
  height: 100%;
  border-radius: 2%;
  cursor: pointer;
}
.ExclusivecontentTitle{
  margin-left: 2%;
  margin-right: 2%;
  opacity: .7;
  font-size: 14px;
  color: #000;
  text-align: left;
  overflow: hidden;
}
.ExclusivecontentTitle:hover{
  opacity: 1;
  cursor: pointer;
}
.privateicon{
  position: absolute;
  left: 2px;
  top: 4px;
  z-index: 20;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  cursor: pointer;
}
</style>