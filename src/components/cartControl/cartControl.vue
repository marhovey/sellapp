<template>
  <div class="cartcontrol clearfix">
    <transition name="mov">
      <div v-show="food.count>0" class="cart-de-wrapper">
        <div class="cart-de" @click.stop.prevent="deCart">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-remove_circle_outline"></use>
          </svg>
        </div>
        <div class="cart-count">{{food.count}}</div>
      </div>
    </transition>
    <div class="cart-add" @click.stop.prevent="addCart">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add_circle"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count += 1;
        }
        this.$emit('add', event.target);
      },
      deCart () {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count -= 1;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.cartcontrol
  .cart-add
    float: left
    padding: 6px
    .icon
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
  .cart-de-wrapper
    float: left
    &.mov-enter-active, &.mov-leave-active
      transition: all 0.4s linear
      transform: translate3D(0,0,0)
      opacity: 1
      .cart-de
        transition: all 0.4s linear
        transform: rotate(0)
    &.mov-enter, &.mov-leave-active
      opacity: 0
      transform: translate3D(24px,0,0)
      .cart-de
        transform: rotate(180deg)
    .cart-de
      float: left
      padding: 6px
      opacity: 1
      transform: translate3D(0,0,0)
      transform: rotate(0)
      .icon
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
    .cart-count
      float: left
      font-size: 10px
      color: rgb(147,153,159)
      text-align: center
      line-height: 24px
      padding-top: 6px
</style>
