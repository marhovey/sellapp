<template>
  <transition name="move">
    <div class="food" v-show="showFood" ref="shfood">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <svg class="icon" aria-hidden="true" @click="hideFood">
            <use xlink:href="#icon-keyboard_arrow_right"></use>
          </svg>
        </div>
        <div class="title border-1bott">
          <div class="clearfix">
            <h2 class="name">{{food.name}}</h2>
            <p class="sellCount"><span class="count-rig">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
            <p class="price"><span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span></p>
            <div class="cartcon">
              <cartcontrol @add="addFood" :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFo" class="gocart" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
        </div>
        <div class="info border-1bott border-1top" v-show="food.info">
          <h3 class="head">商品介绍</h3>
          <p>{{food.info}}</p>
        </div>
        <div class=" info foodrating border-1bott border-1top">
          <h3 class="head">商品评价</h3>
          <selectRatings @onlytext="onlyText" @select="selectRating" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></selectRatings>
          <div class="content-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-list" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                <div class="clearfix timeUser">
                  <div>{{rating.rateTime | timeTrim}}</div>
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" class="avatar">
                  </div>
                </div>
                <p class="text" v-show="rating.rateType===0"><span class="up"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-thumb_up"></use></svg></span>{{rating.text}}</p>
                <p class="text" v-show="rating.rateType===1"><span class="down"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-thumb_down"></use></svg></span>{{rating.text}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import {trimTime} from '@/common/js/trimTime.js';
  import selectRatings from '@/components/selectRatings/selectRatings';
  import cartcontrol from '@/components/cartControl/cartControl';
  const AllRating = 2;
  export default {
    name: 'detail',
    props: {
      food: {
        type: Object
      }
    },
    components: {
      'cartcontrol': cartcontrol,
      'selectRatings': selectRatings
    },
    data () {
      return {
        showFood: false,
        selectType: AllRating,
        onlyContent: true,
        desc: {
          all: '全部',
          goodRating: '推荐',
          badRating: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFood = true;
        this.selectType = AllRating;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.shfood, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hideFood () {
        this.showFood = false;
      },
      addFo (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood (target) {
        this.$emit('add', target);
      },
      selectRating (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === AllRating) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      onlyText () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      timeTrim (times) {
        let trim = trimTime(times).Y + '-' + trimTime(times).M + '-' + trimTime(times).D + '   ' + trimTime(times).H + ':' + trimTime(times).min;
        return trim;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl'
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    right: 0
    z-index: 45
    background: #f3f5f7
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
      transform: translate3d(0,0,0)
    &.move-enter, &.move-leave-active
      transform: translate3d(100%,0,0)
    .img-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .icon
        position: absolute
        top: 0
        left: 0
        font-size: 32px
        color: #fff
        padding: 10px
        transform: rotateY(180deg)
    .title
      background-color: #fff
      position: relative
      padding: 18px
      border-1bott(rgba(7,17,27,.1))
      margin-bottom: 16px
      .name
        margin-bottom: 8px
        font-size: 14px
        line-height: 14px
        color: rgb(7,17,27)
      .sellCount
        color: rgb(147,153,159)
        font-size: 10px
        line-height: 10px
        .count-rig
          margin-right: 12px
      .price
        font-size: 14px
        line-height: 24px
        color: rgb(240,20,20)
        font-weight: 700
        .old
          font-size: 10px
          text-decoration: line-through
          color: rgb(147,153,159)
          margin-left: 12px
      .gocart
        position: absolute
        right: 18px
        bottom: 18px
        width: 74px
        height: 24px
        background-color: rgb(0,160,220)
        border-radius: 12px
        color: #fff
        text-align: center
        line-height: 24px
        font-size: 10px
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s linear
          opacity: 1
        &.fade-enter, &.fade-leave-active
          opacity: 0
      .cartcon
        position: absolute
        right: 18px
        bottom: 12px
        color: rgb(0,160,220)
        font-size: 24px
        margin-top: 20px
        line-height: 24px
    .info
      padding: 18px
      background-color: #fff
      border-1top(rgba(7,17,27,0.1))
      border-1bott(rgba(7,17,27,0.1))
      margin-bottom: 16px
      .head
        font-size: 14px
        color: rgb(7,17,27)
        font-weight: 400
      p
        font-size: 12px
        line-height: 24px
        color: rgb(77,85,93)
        padding: 6px 8px 0
    .foodrating
      padding: 0
      margin-bottom: 0
      .head
        padding: 18px 18px 0
      .content-wrapper
        padding: 0 18px
        .rating-list
          padding: 16px 0
          .timeUser
            div
              float: left
            .user
              float: right
              .name
                float: left
                margin-right: 6px
                font-size: 10px
                color: rgb(147,153,159)
                line-height: 24px
              .avatar
                float: left
                width: 24px
                height: 24px
                border-radius: 50%
          .text
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 24px
            margin-top: 6px
            span
              font-size: 24px
              margin-right: 4px
              &.up
                color: rgb(0,160,220)
              &.down
                color: rgb(147,153,159)
</style>
