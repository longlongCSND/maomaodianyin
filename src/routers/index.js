import Vue from 'vue'
import Router from 'vue-router'
import movieRotuer from './movie'
import mineRotuer from './mine'
import cinemaRotuer from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRotuer,
    mineRotuer,
    cinemaRotuer,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})
