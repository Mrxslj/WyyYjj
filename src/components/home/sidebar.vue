<template>
  <el-aside class="sidebar" width="20%">
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
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      current: 1
    }
  },
  methods:{
    itemClick(num){
      switch (num) {
        case 1:this.current = 1;
        break;
        case 2:this.current = 2;
        break;

      }
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
  margin: 0 0;
  list-style:none;
  height: 60px;
  line-height: 60px;
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
</style>