<template>
  <div class="seller" ref="sellerin">
    <div>
      <div class="title border-1bott">
        <div class="tit clearfix">
          <div class="lef">
            <h3 class="name">{{seller.name}}</h3>
            <h4 class="clearfix"><span class="starp"><star :size="36" :score="seller.score"></star></span><span>月售{{seller.sellCount}}单</span></h4>
          </div>
          <div class="rig" @click="favorit">
            <svg class="icon" :class="{'on':favor}" aria-hidden="true">
              <use xlink:href="#icon-favorite"></use>
            </svg>
            <p>收藏</p>
          </div>
        </div>
        <div class="deli border-1top">
          <div class="min">
            <p class="st">起送价</p>
            <p class="pri">{{seller.minPrice}}<span>元</span></p>
          </div>
          <div class="deliv">
            <p class="st">商家配送</p>
            <p class="pri">{{seller.deliveryPrice}}<span>元</span></p>
          </div>
          <div class="delit">
            <p class="st">平均配送时间</p>
            <p class="pri">{{seller.deliveryTime}}<span>分钟</span></p>
          </div>
        </div>
      </div>
      <div class="activ border-1top border-1bott">
        <h3>公告与活动</h3>
        <p>{{seller.bulletin}}</p>
        <ul class="act">
          <li class="border-1top" v-for="support in seller.supports">
          <span :class="classMap[support.type]"></span>{{support.description}}</li>
        </ul>
      </div>
      <div class="sellerpic activ">
        <h3>商家实景</h3>
        <div class="picWrapper" ref="picWrapper">
          <ul class="clearfix" ref="picList">
            <li v-for="sepic in seller.pics"><img :src="sepic" alt="" width="120" height="90"></li>
          </ul>
        </div>
      </div>
      <div class="sellerinfo activ">
        <h3>商家信息</h3>
        <ul>
          <li v-for="info in seller.infos" class="border-1top">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star';
import BScroll from 'better-scroll';
  export default {
    name: 'seller',
    props: {
      seller: {}
    },
    components: {
      'star': star
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    watch: {
      'seller': function () {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    data () {
      return {
        favor: false
      };
    },
    methods: {
      favorit () {
        this.favor = !this.favor;
      },
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerin, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let width = (120 + 6) * this.seller.pics.length - 6;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.scrollPic) {
              this.scrollPic = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.scrollPic.refresh();
            }
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl'
.seller
  background-color: #f3f5f7
  position: absolute
  width: 100%
  top: 174px
  bottom: 0
  overflow: hidden
  .title
    background-color: #fff
    border-1bott(rgba(7,17,27,.1))
    padding: 18px
    margin-bottom: 18px
    .tit
      .lef
        float: left
        h3
          font-size: 14px
          line-height: 14px
          color: rgb(7,17,27)
          margin-bottom: 8px
          font-weight: 400
        h4
          font-size: 10px
          color: rgb(77,85,93)
          line-height: 18px
          margin-bottom: 18px
          font-weight: 400
          span
            float: left
          .starp
            margin-right: 8px
      .rig
        float: right
        text-align: center
        font-size: 10px
        line-height: 24px
        color: rgb(77,85,93)
        .icon
          color: rgb(147,153,159)
          font-size: 24px
          &.on
            color: rgb(240,20,20)
    .deli
      border-1top(rgba(7,17,27,.1))
      display: flex
      padding: 18px 0 0
      div
        flex: 1
        text-align: center
        border-1rig(rgba(7,17,27,.1))
        &:last-child
          border-none()
        .st
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
          margin-bottom: 4px
        .pri
          color: rgb(7,17,27)
          line-height: 24px
          font-size: 24px
          span
            font-size: 10px
  .activ
    background-color: #fff
    padding: 18px
    margin-bottom: 18px
    border-1top(rgba(7,17,27,.1))
    border-1bott(rgba(7,17,27,.1))
    h3
      color: rgb(7,17,27)
      font-size: 14px
      line-height: 14px
      font-weight: 400
    p
      font-size: 12px
      line-height: 24px
      color: rgb(240,20,20)
      padding: 8px 0 16px 12px
    .act
      li
        border-1top(rgba(7,17,27,.1))
        padding: 16px 12px
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 16px
        span
          float: left
          width: 16px
          height: 16px
          margin-right: 6px
          &.decrease
            bg-img('decrease_4')
          &.discount
            bg-img('discount_4')
          &.invoice
            bg-img('invoice_4')
          &.guarantee
            bg-img('guarantee_4')
          &.special
            bg-img('special_4')
  .sellerpic
    h3
      margin-bottom: 12px
    .picWrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      li
        float: left
        margin-right: 6px
        &:last-child
          margin-right: 0
  .sellerinfo
    h3
      margin-bottom: 12px
    li
      padding: 16px 12px
      font-size: 12px
      color: rgb(7,17,27)
      line-height: 32px
      border-1top(rgba(7,17,27,.1))
</style>
