<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message">
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <!-- <li>
                    <div class="img"><img src="/images/movie_1.jpg"></div>
                    <div class="info">
                        <p><span>无名之辈</span><span>8.5</span></p>
                        <p>A Cool Fish</p>
                        <p>剧情,喜剧,犯罪</p>
                        <p>2018-11-16</p>
                    </div>
                </li> -->
         <li v-for="(movies,index) in moviesList" :key="movies.id">
            <div class="img"><img :src="movies.img | setWh('128.180')" :alt="movies.img"></div>
            <div class="info">
                <p><span class="list-p" v-text="movies.nm"></span><span v-text="movies.sc"></span></p>
                <p class="list-p"  v-text="movies.enm"></p>
                <p v-text="movies.cat"></p>
                <p v-text="movies.rt"></p>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'search',
        data(){
          return{
            message:'',
            moviesList:[]
          }
        },
        created() {
        },
        watch: {
          message(newVal) {

            //clearTimeout(timer);//防抖清除请求多次
            /*let timer = setTimeout(()=>{
            this.axios.get("/api/searchList?cityId=10&kw="+newVal,)
              .then((response)=>{
                let msg = response.data.msg;
                let movies = response.data.data.movies;
                if(msg && movies){
                  this.moviesList = response.data.data.movies.list;
                }
              })
          },1000)*/
            //axios请求频繁时取消上一次请求
            let that = this;
            let cityId = this.$store.state.city.id;//获取城市id
            this.cancelRequest();
            //this.axios.get("/api/searchList?cityId=10&kw=" + newVal, {
            this.axios.get('/api/searchList?cityId='+cityId+'&kw=' + newVal, {

              cancelToken:new this.axios.CancelToken(function(c) {
                console.log(111);
                that.source = c;
              })
            })
              .then((response) => {
                let msg = response.data.msg;
                let movies = response.data.data.movies;
                if (msg && movies) {
                  this.moviesList = response.data.data.movies.list;
                }
              })
              .catch((err) => {
                if (this.axios.isCancel(err)) {
                  console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                  //handle error
                  console.log(err);
                }
              })
          }
        },
        methods: {
          cancelRequest(){
            if(typeof this.source ==='function'){
              this.source('终止请求')
            }
          },
        },
        computed: {},
        components: {}
    }
</script>

<style scoped lang="scss">
span{display:inline-block;justify-content:flex-start;}
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{/*margin-top:96px;*/ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}

.search_body .search_result{padding-bottom:80px;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%;}
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1; }
.search_body .search_result .info .list-p{flex-wrap:nowrap;width:85%;overflow: hidden;text-overflow:ellipsis;font-weight: normal;  }
.search_body .search_result .info p{  height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ display:inline-block;font-size: 18px; flex:1;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>
