<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<style>
#app{ display: flex; height:100%;}
/*#app div{ margin:0 auto;}*/
/*上啦刷新*/
.movie_body ul .pullDown{width:100%;padding:0 !important; border:none !important;margin:0 !important;justify-content: center !important;}
.mint-indexlist-content{margin-right:0 !important;}
.mint-indexlist-nav{max-height:95% !important;border:0 !important;}
.mint-indexsection-index{padding:0 10px !important;}
.mint-indexlist-indicator{top:15% !important;}
</style>
