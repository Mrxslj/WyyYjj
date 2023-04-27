import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    playlistID:0,
    songlist:[]
  },
  mutations:{
    setplaylistID:(state,ID) =>{
      state.playlistID = ID
    },
    setSonglistID(state,song){
      state.songlist.push(song)
    },
    // 清空歌单
    cleansong(state){
      state.songlist = []
    },
  }
})

export default store;