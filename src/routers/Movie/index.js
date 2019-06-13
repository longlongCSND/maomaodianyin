export default {
  path:'/movie',
  name:'movie',
  component:()=>import('@/views/Movie'),
  children:[
    {
      path:'city',
      name:'city',
      component:() =>import("@/components/city")
    },
    {
      path:'nowPlaying',
      name:'nowplaying',
      component:() =>import("@/components/nowPlaying")
    },
    {
      path:'comingSoon',
      name:'comingsoon',
      component:() =>import("@/components/comingSoon")
    },
    {
      path:'search',
      name:'search',
      component:() =>import("@/components/search")
    },
    {
      path:'citylist',
      name:"citylist",
      component:()=>import("@/components/citylist/citylist.vue")
    },
    {
      path:'indexlist',
      name:"indexlist",
      component:()=>import("@/components/citylist/listcity.vue")
    },
    {
      path:"/movie",
      redirect:'/movie/nowPlaying'
    }
  ]
}
