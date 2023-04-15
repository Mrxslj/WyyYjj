import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/discovermusic')
const personality = () => import('@/components/home/DiscoverChildview/personality')

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
      }
      
      
    ]
  }
]

export default new VueRouter({
  routes,
  mode:'history',
})