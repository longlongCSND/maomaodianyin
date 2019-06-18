<template>
    <div id="main">
      <topheader title="喵喵电影"></topheader>
      <div id="content">
        <div class="movie_menu">
          <router-link tag="div" to="/movie/city" class="city_name">
            <span v-text="$store.state.city.nm"></span><i class="iconfont icon-xiala1"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
            <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
          </div>
          <router-link tag="div" to="/movie/search" class="search_entry">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <tab></tab>
    </div>
</template>

<script>
  import topheader from '@/components/header'
  import tab from "@/components/tabBar"
  import {msgBox } from "@/components/JS"
    export default {
        name: 'movie',
       /* created() {
        },*/

        mounted(){
          //发送请求获取数据
          this.axios.get('/api/getLocation')
            .then((response)=>{
               let msg = response.data.msg
               if(msg === "ok"){
                  let nm = response.data.data.nm;
                  let id = response.data.data.id;
                  //判断如果是同一个城市弹窗不显示
                  if(this.$store.state.city.id == id){return};
                   msgBox ({
                     title:'定位',
                     content:nm,
                     cancel:'取消',
                     ok:'切换城市',
                    /* handleCancel(){//取消按钮
                       console.log(1);
                     },*/
                     handleOk(){//切换城市
                       window.localStorage.setItem("nowNm",nm);
                       window.localStorage.setItem("nowId",id);
                       window.location.reload();//从新加载
                     }
                   })
               }
            })
        },
        methods: {},
        computed: {},
        components: {
          topheader,
          tab,
        }
    }
</script>

<style scoped lang="scss">
  /*#content{position:relative; }*/
  #content .movie_menu{z-index:9999999999; width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
  .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
  .movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
  .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
  .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
  .movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry i{  font-size:24px; color:red;}

  .slide-enter-active{ animation : 13s detailMove;}
  @keyframes detailMove{
    0%{
      transform : translateX(100%);
    }
    100%{
      transform : translateX(0);
    }
  }
</style>
