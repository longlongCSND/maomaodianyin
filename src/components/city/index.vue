<template>
  <div class="city_body">
      <div class="city_list">
        <loading v-if="isLoading"/>
        <!--<scroller class="wrapper" v-else>-->
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li @touchstart="handleToCity(hot.nm,hot.id)" v-for="(hot,index) in hotList" :key="hot.id"  ><!--@tap="handleToCity(hot.nm,hot.id)"-->
              <span v-text="hot.nm"></span>
            </li>
          </ul>
        </div>
        <div class="city_sort">
          <mt-index-list >
            <mt-index-section v-for="city in cityList" :key="city.index" :index="city.index">
              <mt-cell class="mt_index" @click.native="handleToCity(list.nm,list.id)" v-for="list in city.list "  :key="list.id" :title="list.nm"></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </div>
      <!--  </scroller>-->
      </div>
  </div>
</template>

<script>
  export default {
    name: 'citylist',
    data(){
      return{
        cityList:[],
        hotList:[],
        isLoading:true
      }
    },
    created() {
    },
    mounted(){
      //取本地存储数据
      let cityList = window.localStorage.getItem("cityList",JSON.stringify(cityList));
      let hotList = window.localStorage.getItem("hotList",JSON.stringify(hotList));
      if(cityList && hotList){
        this.cityList = JSON.parse(cityList);//解析字符串
        this.hotList = JSON.parse(hotList);
        //数据加载完成loading隐藏
        this.isLoading = false;
      }else{
        this.axios.get("/api/cityList").then((response) =>{
          //console.log(response);
          let msg = response.data.msg;
          if(msg === "ok"){
            let cities = response.data.data.cities;
            //数据加载完成loading隐藏
            this.isLoading = false;
            //console.log(cities);
            let {cityList,hotList} =  this.fromCityList(cities );
            //返回值
            this.cityList = cityList;
            this.hotList = hotList;
            //H5本地存储数据
            window.localStorage.setItem("cityList",JSON.stringify(cityList));//转换为字符串
            window.localStorage.setItem("hotLIst",JSON.stringify(hotList))

          }
        })
      }

    },
    methods: {
      fromCityList(cities){
        let cityList = [];
        let hotList = [];

        //热门城市
        for(let citys of cities){
          if(citys.isHot == 1){
            hotList.push(citys)
          }
        }
        for(let elem of cities ){
          //console.log(index);
          // console.log(elem);
        }
        //所有城市
        //for(let [index,elem] of new Map( cities.map( ( item, i ) => [ i, item ] ) )){
        /*for(let elem of cities){
          let firstLet = elem.py.substring(0,1).toUpperCase();
          if(toCom(firstLet)){
            cityList.push({index:firstLet,list:[{nm:elem.nm,id:elem.id}]})
          }else{
            for(let item of cityList){
              if(item.index === firstLet){
                 item.list.push({nm:item.nm,id:item.id})
              }
            }
          }
        }*/
        for(let i=0;i<cities.length;i++){
          //let firstLet = elem.py.substring(0,1).toUpperCase();
          let firstLet = cities[i].py.substring(0,1).toUpperCase();
          if(toCom(firstLet)){//添加新的索引index
            cityList.push({index:firstLet,list:[{nm:cities[i].nm,id:cities[i].id}]});
            //console.log(cityList);
            // console.log(cityList);
          }else{//累加到已有的索引中index
            for(let elem of cityList){
              //for(let j=0; j<cityList.length;j++){
              if(elem.index === firstLet){
                elem.list.push({nm:cities[i].nm,id:cities[i].id})
                //cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                //console.log(elem );
              }
            }
          }
        }
        //index的排序
        cityList.sort((n1,n2)=>{
          if(n1.index > n2.index) {
            return 1;
          }else if(n1.index < n2.index){
            return -1
          }else{
            return 0;
          }
        })
        function toCom(firstLet){
          /* for(let [index,elem] of new Map( cityList.map( ( item, i ) => [ i, item ] ))){
             if(elem.index === firstLet){*/
          /* for(var i=0;i<cityList.length;i++){*/
          for(let elem of cityList){
            if( elem.index ===  firstLet){
              // if( cityList[i].index ===  firstLet){
              return false;

            }
          }
          return true;
        }

        //console.log(cityList);
        //console.log(hotList);
        return{//返回值
          cityList,
          hotList
        }
      },
      handToIndex(index){
        let h = this.$refs.citySort.getElementsByTagName('h2');
        //let parents = this.$refs.citySort.parentNode;
        console.log(index)
        this.$refs.citySort.parentNode.scrollTop = h[index].offsetTop;//获取city_list的高度
      },
      //获取行对应的城市
      handleToCity(nm,id){
        //alert(1)
        this.$store.commit('city/CITY_INFO',{nm,id});
        //本地存储
        window.localStorage.setItem("nowNm",nm);
        window.localStorage.setItem('nowId',id);
        this.$router.push("/movie/nowplaying");//跳转到正在热影
      }
    },
    computed: {},
    components: {}
  }
</script>

<style scoped lang="scss">
  /*.wrapper{height:40%;}*/

 /* * { touch-action: pan-y; }*/
  .clearfix:after{ content:""; display: block; clear:both;}
  ul li{list-style: none;color:#333;}
  #content .city_body{ margin:46px 0 0; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
  .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;padding-bottom:46px;}
  .city_body .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
  }
    .city_body .city_sort{}
  .city_body .city_sort .mt_index{background: #FFF5F0;}
/*
  .city_body .city_hot{ margin-top: 20px;}*/
 .city_body .city_hot{padding-bottom:20px;}
  .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
  /*.city_body .city_sort div{ margin-top: 20px;}*/
  .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
  .city_body .city_sort ul li{ line-height: 30px;}
  .city_body .city_index{background:#fff; width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}


</style>
