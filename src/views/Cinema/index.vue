<template>
   <div id="main">
      <topheader title="喵喵电影"></topheader>
     <div id="content">
       <div class="cinema_menu">
         <div class="city_switch">
           全城 <i class="iconfont icon-xiala1"></i>
         </div>
         <div class="brand_swtich">
           品牌 <i class="iconfont icon-xiala1"></i>
         </div>
         <div class="feature_switch">
           特色 <i class="iconfont icon-xiala1"></i>
         </div>
       </div>
       <list></list>
     </div>
      <tab></tab>
    </div>
</template>

<script>
  import topheader from '@/components/header'
  import tab from "@/components/tabBar"
  import list from "@/components/list"
    export default {
        name: 'cinema',
        created() {
        },
        methods: {},
        computed: {},
        components: {
          topheader,
          tab,
          list

        }
    }
</script>

<style scoped lang="scss">
  #content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>
