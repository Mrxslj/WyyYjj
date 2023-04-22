import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/discovermusic')
const personality = () => import('@/components/home/DiscoverChildview/personality')
const playlist = () => import('@/components/home/DiscoverChildview/playlist')
const PlaylistPage = () => import('@/components/PlaylistPage')
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component: home,
    children: [
      {
        path:'',
        redirect: 'personality'
      },
      {
        path: 'personality',
        component:personality
      },
      {
        path: 'playlist',
        component:playlist
      }      
    ]
  },
  {
    path:'/PlaylistPage',
    component:PlaylistPage
  }
]

export default new VueRouter({
  routes,
  mode:'history',
})