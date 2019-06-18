<template>
    <div class="movie_body">
      <loading v-if="isLoading" />
      <scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
          <!--<li>
             <div class="pic_show"><img src="/images/movie_1.jpg"></div>
             <div class="info_list">
                 <h2>无名之辈</h2>
                 <p><span class="person">17746</span> 人想看</p>
                 <p>主演: 陈建斌,任素汐,潘斌龙</p>
                 <p>2018-11-30上映</p>
             </div>
             <div class="btn_pre">
                 预售
             </div>
         </li>-->
          <li class="pullDown" v-text="pullDownMsg"></li>
          <li v-for="(coming,index) in comingList" :key="coming.id">
            <div class="pic_show"><img :src="coming.img | setWh('128.180')" :alt="coming.img"></div>
            <div class="info_list">
              <h2><span v-text="coming.nm"></span><img v-if="coming.version" src="@/assets/maxs.png" alt="图片"></h2>
              <p><span class="person" v-text="coming.wish"></span> 人想看</p>
              <p>主演: <span v-text="coming.star"></span></p>
              <p> <span v-text="coming.rt"></span>上映</p>
            </div>
            <div class="btn_pre">
              预售
            </div>
          </li>
        </ul>
      </scroller>

    </div>
</template>

<script>
  let cityId;
    export default {
        name: 'collect',
        data(){
          return{
            comingList:[],
            pullDownMsg:'',
            isLoading:true
          }
        },
      activated(){//keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
        //请求接口数据
        cityId = this.$store.state.city.id;//获取城市id
        if(this.prevCityId === cityId){return;}//两个id相等的话就不调用ajax请求
        //console.log(cityId);
        this.isLoading = true;
         // this.axios.get("/api/movieComingList?cityId=10")
          this.axios.get("/api/movieComingList?cityId=1"+cityId)

            .then((response)=>{
                let msg = response.data.msg;
                if(msg === "ok"){
                  this.comingList = response.data.data.comingList;
                  //数据加载完成loading隐藏
                  this.isLoading = false;
                  this.prevCityId = cityId;//两个id不相等的话就调用ajax请求
                }
          })


        },
        created() {
        },
        methods: {
          //下拉刷新
          handleToScroll(pos){
            if(pos.y > 30){
              this.pullDownMsg = '正在加载...'
            }
          },
          handleToTouchEnd(pos){
            if(pos.y > 30){
              this.axios.get("/api/movieComingList?cityId=10")
                .then((response)=>{
                  let msg = response.data.msg;
                  if(msg === "ok"){
                    this.pullDownMsg = '更新完成'
                    setTimeout(()=>{
                      this.comingList = response.data.data.comingList;
                      this.pullDownMsg = "";
                    },2000)

                  }
                })
            }
          }
        },
        computed: {},
        components: {}
    }
</script>

<style scoped lang="scss">
  #content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
  #content .movie_body{ flex:1; overflow:auto;}
  .movie_body ul{ margin:0 12px; overflow: hidden;}
  .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
  .movie_body .pic_show{ width:64px; height: 90px;}
  .movie_body .pic_show img{ width:100%;}
  .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
  .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
  .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
  .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
