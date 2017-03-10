<template>
  <div id="app">
    <veader :seller="seller"></veader>
    <div class="tab border-1bott border-1top">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import veader from '@/components/header/header.vue';
const ERR_OK = 0;
export default {
  name: 'app',
  components: {
    'veader': veader
  },
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/index.styl'
  #app
    .tab
      font-size: 14px
      line-height: 40px
      display: flex
      text-align: center
      border-1top(rgba(7,17,27,.1))
      border-1bott(rgba(7,17,27,.1))
      .tab-item
        flex: 1
        a
          display: block
          color: rgb(77,85,93)
        .active
          color: rgb(240,20,20)
</style>
