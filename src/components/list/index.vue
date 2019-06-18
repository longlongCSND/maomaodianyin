<template>
  <div class="cinema_body">
    <loading v-if="isLoading"/>
    <scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <!-- <li>
           <div>
             <span>大地影院(澳东世纪店)</span>
             <span class="q"><span class="price">22.9</span> 元起</span>
           </div>
           <div class="address">
             <span>金州区大连经济技术开发区澳东世纪3层</span>
             <span>1763.5km</span>
           </div>
           <div class="card">
             <div>小吃</div>
             <div>折扣卡</div>
           </div>
         </li>-->
        <li class="pullDown" v-text="pullDownMsg"></li>
        <li v-for="cinema in cinemasList" :key="cinema.id">
          <div>
            <span v-text="cinema.nm"></span>
            <span class="q"><span class="price" v-text="cinema.sellPrice"></span> 元起</span>
          </div>
          <div class="address">
            <span v-text="cinema.addr">金州区大连经济技术开发区澳东世纪3层</span>
            <span v-text="cinema.distance"></span>
          </div>
          <div class="card" >
            <div v-for="(num,key) in cinema.tag"  :key="key" >
              <div class="cor" v-if="num===1" :class="key | classCard">
                <span>{{ key | formatCard }}</span>
              </div>
              <!--<div v-if="num===1"  :key="key | formatCard">-->
            </div>
          </div>
        </li>
      </ul>
    </scroller>

    </div>
</template>

<script>
  let cityId;
    export default {
        name: 'list',
        data(){
          return{
            cinemasList:[],
            pullDownMsg:'',
            isLoading:true,
            prevCityId:-1

          }
        },
        created() {
        },
       activated() {
          //请求接口数据
          cityId = this.$store.state.city.id;//获取城市id
          if(this.prevCityId === cityId){return;}//两个id相等的话就不调用ajax请求
          //console.log(cityId);
          this.isLoading = true;
          /*this.axios.get("/api/cinemaList?cityId=10")*/
          this.axios.get("/api/cinemaList?cityId="+cityId)
            .then((response) => {
              console.log(response.data);
              let msg = response.data.msg;
              if (msg === "ok") {
                this.cinemasList = response.data.data.cinemas;
                //数据加载完成loading隐藏
                this.isLoading = false;
                this.prevCityId = cityId;//两个id不相等的话就调用ajax请求
              //console.log(1111);
            }
          })

        },
        filters:{
          formatCard(key){
            var card = [
              { key : 'allowRefund' , value : '改签' },
              { key : 'endorse' , value : '退订' },
              { key : 'sell' , value : '折扣卡' },
              //{ key : 'vipTag' , value : '折扣卡' },
              { key : 'snack' , value : '小吃'}
            ];
            for(var i=0;i<card.length;i++){
              if(card[i].key === key){
                return card[i].value;
              }
            }
            return '';
          },

          classCard(key){
            var card = [
              { key : 'allowRefund' , value : 'bl' },
              { key : 'endorse' , value : 'bl' },
              { key : 'sell' , value : 'or' },
              //{ key : 'vipTag' , value : 'or' },
              { key : 'snack' , value : 'or'}
            ];
            for(var i=0;i<card.length;i++){
              if(card[i].key === key){
                return card[i].value;
              }
            }
            return '';
          }

        },
        methods: {
          //下拉刷新
          handleToScroll(pos){
            if(pos.y > 30){
              this.pullDownMsg = "正在加载...";
            }
          },
          handleToTouchEnd(pos){
            if(pos.y > 30){
              this.axios.get("/api/cinemaList?cityId=10")
                .then((response) => {
                  //console.log(response.data);
                  let msg = response.data.msg;
                  if (msg === "ok") {
                    this.pullDownMsg = "更新完成!";
                    setTimeout(()=>{
                      this.cinemasList = response.data.data.cinemas;
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

<style scoped >
  #content .cinema_body{ flex:1; overflow:auto;}
  .cinema_body ul{ padding:20px;}
  .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
  .cinema_body div{ margin-bottom: 10px;}
  .cinema_body .q{ font-size: 11px; color:#f03d37;}
  .cinema_body .price{ font-size: 18px;}
  .cinema_body .address{ font-size: 13px; color:#666;}
  .cinema_body .address span:nth-of-type(1){display:inline-block;width:80%;flex:1;overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .cinema_body .address span:nth-of-type(2){ float:right; }
  .cinema_body .card{ display: flex;}
  .cinema_body .card div .cor{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; /*border: 1px solid #f90;*/ font-size: 13px; margin-right: 5px;}
  .cinema_body .card div .cor.or{ color: #f90; border: 1px solid #f90;}
  .cinema_body .card div .cor.bl{ color: #589daf; border: 1px solid #589daf;}
  .cinema_body .pullDown{margin:0;padding:0;border:0;text-align: center;}
</style>
