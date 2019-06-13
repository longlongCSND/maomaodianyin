import Vue from 'vue'
import Router from 'vue-router'
import movieRotuer from './Movie'
import mineRotuer from './Mine'
import cinemaRotuer from './Cinema'

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
