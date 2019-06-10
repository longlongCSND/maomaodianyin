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
      path:"/movie",
      redirect:'/movie/nowPlaying'
    }
  ]
}
