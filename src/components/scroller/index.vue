<template>
    <div class="wrapper" ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  //引入滚动插件
  import BScroll from "better-scroll"
    export default {
        name: 'scroller',
        props:{
          handleToScroll:{
            type:Function,//函数
            default:()=>{}
          },
          handleToTouchEnd:{
            type:Function,//函数
            default:()=>{}
          }
        },
        mounted(){
          let scroll = new BScroll(this.$refs.wrapper,{
            tap:true,
            probeType:1
          });
          this.scroll = scroll;
          scroll.on('scroll',(pos)=>{
            //回调函数
            this.handleToScroll(pos);
          });
          scroll.on('touchEnd',(pos)=>{
            //回调函数
            this.handleToTouchEnd(pos);
          })
        },
        methods:{
          toScrollTop(y){
            this.scroll.scrollTo(0,y);//获取插件的y值
          }
        }

    }
</script>

<style scoped lang="scss">
    .wrapper{height:100%;}
</style>
