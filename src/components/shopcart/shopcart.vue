<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggList">
        <div class="cont-lef clearfix">
          <div class="logo-wrapper">
            <div class="logo" :class="{'white':totalCount>0}">
              <svg class="icon" :class="{'white':totalCount>0}" aria-hidden="true">
                <use xlink:href="#icon-shopping_cart"></use>
              </svg>
            </div>
            <div v-if="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'white':totalCount>0}">￥{{totalPrice}}</div>
          <div class="deliprice">另需配送费￥{{deliprice}}元</div>
        </div>
        <div class="cont-rig" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>  
      <div class="ball-wrapper">
        <div v-for="ball in balls">
        <transition name="ball" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
          </transition>
        </div>
      </div>
      <transition name='togg'>
        <div class="cart-list" v-show="listShow">
          <div class="title">
            <span class="flo-lef">购物车</span>
            <span class="flo-rig" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="item in selectFoods" class="name-list">
                <span class="flo-lef">{{item.name}}</span>
                <div class="flo-rig">
                  <div class="price flo-lef">
                    <span>￥{{listPrice}}{{item.listPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper flo-rig">
                    <cartcontrol @add="addFood" :food="item"></cartcontrol>
                  </div>
                </div>       
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script>
  import cartcontrol from '@/components/cartControl/cartControl';
  import BScroll from 'better-scroll';
  export default {
    name: 'shopcart',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliprice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      listPrice () {
        this.selectFoods.forEach((food) => {
          food.listPrice = food.price * food.count;
        });
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送';
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return '还差￥' + diff + '元起送';
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'go';
        } else {
          return '';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      toggList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      addFood (target) {
        this.drop(target);
      },
      beforeEnter: function (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            inner.style.transform = 'translate3d(' + x + 'px,0,0)';
          }
        }
      },
      enter: function (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetTop;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter: function (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('需要支付' + this.totalPrice + '元');
      }
    },
    components: {
      'cartcontrol': cartcontrol
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index.styl'
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    background: #000
    .content
      display: flex
      background-color: #141d27
      color: rgba(255,255,255,.4)
      .cont-lef
        flex:1
        .logo-wrapper
          float: left
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          background-color: #141d27
          box-sizing: border-box
          border-radius: 50%
          position: relative
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 8px
            font-size: 9px
            color: #fff
            font-weight: 700
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            text-align: center
            &.white
              background-color: rgb(0,168,220)
            .icon
              font-size: 24px
              color: #80858a
              margin-top: 10px
              &.white
                color: #fff
        .price
          float: left
          margin-top: 12px
          line-height: 24px
          box-sizing: border-box
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,.1)
          font-size: 16px
          font-weight: 700
          &.white
            color: #fff
        .deliprice
          float: left
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 12px
      .cont-rig
        flex: 0 0 105px
        width: 105px
        .pay
          background-color: #2b333b
          font-size: 12px
          line-height: 48px
          height: 48px
          text-align: center
          font-weight: 700
          &.go
            background-color: #00b43c
            color: #fff        
    .ball-wrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 50
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          background-color: rgb(0,160,220)
          border-radius: 50%
          transition: all 0.4s linear
    .cart-list
      position: absolute
      left: 0
      top : 0
      z-index: -1
      width: 100%
      transform: translate3d(0,-100%,0)
      &.togg-enter-active, &.togg-leave-active
        transition: all 0.4s linear
        transform: translate3s(0,-100%,0)
      &.togg-enter, &.togg-leave-active
        transform: translate3d(0,0,0)
      .title
        height: 40px
        line-height: 40px
        font-size: 14px
        color: rgb(7,17,27)
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,.1)
        padding: 0 18px
        .flo-lef
          float: left
        .flo-rig
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        max-height: 217px
        overflow: hidden
        background-color: #fff
        .name-list
          height: 48px
          font-size: 14px
          line-height: 48px
          border-1bott(rgba(7,17,27,.1))
          padding: 0 18px
          .flo-lef
            float: left
          .flo-rig
            float: right
          .price
            font-size: 10px
            color: rgb(240,20,20)
            margin-right: 12px
          .cartcontrol-wrapper
            line-height: 24px
            margin-top: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background-color: rgba(7,17,27,.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
