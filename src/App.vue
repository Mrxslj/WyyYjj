<template>
  <div id="app">
    <nav-bar id="navbar"/>

    <el-container id="home-container">
      <sidebar></sidebar>
        <el-main id="main">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
    </el-container>
  </div>
</template>
<link rel="stylesheet" href="@/assets/iconfont/iconfont.css"></link>
<script>
import NavBar from '@/components/home/NavBar.vue'
import sidebar from "@/components/home/sidebar"

export default {
  name: 'App',
  components: {
    NavBar,
    sidebar
  }
}
</script>

<style>
@import url(./assets/css/base.css);
/*  设置最小宽度 */
#app {
  min-width: 1528px;
  position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
#main{
  padding: 10px 0px 10px 0px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>
