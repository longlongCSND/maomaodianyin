<template>
    <div class="msgAlert">
      <h2 v-text="title"></h2>
      <p v-text="content"></p>
      <div class="btns">
        <div @touchstart="handleCancel" v-text="cancel"></div>
        <div @touchstart="handleOk" v-text="ok"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'msgAlert',
    }
</script>

<style scoped lang="scss">
    .msgAlert{/*width:50%;height:20%;*/ width:200px; height:120px;
      border:1px #ccc solid;background:#fff;
      position:absolute;left:50%;top:50%;
      transform:translate3d(-50%,-50%,0);
      box-shadow:3px 3px 3px 3px #ccc;
      border-radius: 4px;
    }
  .msgAlert h2{text-align: center;line-height:40px;font-size:18px;}
  .msgAlert p{line-height:30px;font-size:18px;text-align: center;}
  .msgAlert .btns{display: flex;line-height:30px;border-top:1px #ccc solid; width:100%;position: absolute;bottom:0;}
  .msgAlert .btns div{flex:1;text-align: center;border-right:1px #ccc solid;}
  .msgAlert .btns div:last-child{border:none;}
</style>
