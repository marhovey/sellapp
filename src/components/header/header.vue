<template>
  <div class="header-wrapper">
    <div class="bg">
      <img :src="seller.avatar" alt="" width="100%">
    </div>
    <div class="header">
      <div class="content clearfix">
        <div class="logo">
          <img width="64" height="64" :src="seller.avatar" alt="">
        </div>
        <div class="contt">
          <div class="title clearfix">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
          <div v-if="seller.supports" class="discount clearfix">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="description">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="num" @click="showDetail">
          {{seller.supports.length}}个
        </div>
      </div>
      <div class="ad clearfix" @click="showDetail">
        <span class="Ad"></span>
        <span class="bulletin">{{seller.bulletin}}</span>
      </div>
      <transition name="fade">
        <div v-show="detailShow" class="detail">
          <div class="content">
            <h1 class="name">{{seller.name}}</h1>
            <star :size="48" :score="seller.score" align="center"></star>
            <div class="title">
              <span class="line"></span>
              <span class="text">优惠信息</span>
              <span class="line"></span>
            </div>
            <div class="dis-list">
              <p v-for="support in seller.supports" class="dis-item clearfix">
                <span class="dis-icon" :class="classMap[support.type]"></span>
                <span>{{support.description}}</span>
              </p>
            </div>
            <div class="title">
              <span class="line"></span>
              <span class="text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="bulletin-detl">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
          <div class="close" @click="offDetail">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </transition>   
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star';
  export default {
    name: 'veader',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'star': star
    },
    data () {
      return {
        detailShow: false
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      offDetail () {
        this.detailShow = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index.styl'
.header-wrapper
  position: relative
  .bg
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    overflow:hidden
  .header
    color: #fff
    background-color: rgba(7,17,27,.5)
    position: relative
    .content
      padding: 24px 12px 18px 24px
      position: relative
      .logo
        float: left
        margin-right: 16px
      .contt
        float: left
        .title
          margin-bottom: 8px
          span
            float: left
          .brand
            width: 30px
            height: 18px
            bg-img('brand')
            margin-right: 6px
          .name
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .delivery
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .discount
          font-size: 12px
          line-height: 12px
          span
            float: left
          .icon
            width: 12px
            height: 12px
            margin-right: 4px
          .decrease
            bg-img('decrease_1')
          .discount
            bg-img('discount_1')
          .invoice
            bg-img('invoice_1')
          .guarantee
            bg-img('guarantee_1')
          .special
            bg-img('special_1')
      .num
        position: absolute
        right: 12px
        bottom: 14px
        font-size: 12px
        line-height: 12px
        padding: 7px 12px
        border-radius: 13px
        background-color: rgba(0,0,0,.2)
    .ad
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      position: relative
      background-color: rgba(7,17,27,.2)
      .Ad
        float: left
        width: 22px
        height: 12px
        margin-top: 8px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin
        margin-left: 4px  
    .detail
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      opacity: 1
      z-index: 99
      background-color: rgba(7,17,27,.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.5s
        opacity: 1
        background-color: rgba(7,17,27,.8)
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background-color: rgba(7,17,27,0)
      .content
        width: 100%
        min-height: 100%
        padding: 0
        .name
          font-size: 16px
          font-weight: 700
          line-height: 16px
          text-align: center
          padding: 64px 0 16px
        .star
          padding-bottom: 28px
        .title
          display: flex
          width: 90%
          margin: 0 auto 24px
          .line
            flex: 1
            height: 1px
            background-color: rgba(255,255,255,.2)
            margin-top: 6px
          .text
            font-size: 14px
            line-height: 14px
            padding: 0 12px
            font-weight: bold
        .dis-list
          width: 90%
          margin: 0 auto 28px
          .dis-item
            padding: 12px 12px 0 12px
            &:first-child
              padding-top: 0
            span
              float: left
            .dis-icon
              width: 16px
              height: 16px
              margin-right: 6px
            .decrease
              bg-img('decrease_2')
            .discount
              bg-img('discount_2')
            .invoice
              bg-img('invoice_2')
            .guarantee
              bg-img('guarantee_2')
            .special
              bg-img('special_2')  
        .bulletin-detl
          width: 90%
          font-size: 12px
          line-height: 24px
          margin: 24px auto 0
          p
            padding: 0 12px
      .close
        position: relative
        margin: -64px auto 0 auto
        width: 32px
        height: 32px
        .icon
          font-size: 32px
          color: rgba(255,255,255,.5)
</style>
