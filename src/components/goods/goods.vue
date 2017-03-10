<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
            <span class="text border-1top clearfix">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1bott" @click="detail(food,$event)">
                <div class="food-icon">
                  <img width="56" height="56" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h4 class="name">{{food.name}}</h4>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="cont">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol @add="addFood" :food="food"></cartcontrol>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliprice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <foodetail @add="addFood" ref="foodta" :food="deFood"></foodetail>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import foodetail from '@/components/detail/detail';
  import shopcart from '@/components/shopcart/shopcart';
  import cartcontrol from '@/components/cartControl/cartControl';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0,
        deFood: {}
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        // this.goods.forEach((good) => {
        //   good.foods.forEach((food) => {
        //     if (food.count) {
        //       foods.push(food);
        //     }
        //   });
        // });
        for (let i in this.goods) {
          for (let j in this.goods[i].foods) {
            if (this.goods[i].foods[j].count) {
              foods.push(this.goods[i].foods[j]);
            }
          }
        }
        return foods;
      }
    },
    methods: {
      detail (food, event) {
        if (!event._constructed) {
          return;
        }
        this.deFood = food;
        this.$refs.foodta.show();
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculaHeight () {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      addFood (target) {
        this._drop(target);
      },
      _drop (target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculaHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol,
      'foodetail': foodetail
    },
    events: {
      'cart.add' (target) {
        this._drop(target);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index.styl'
  .goods
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    display: flex
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        font-size: 12px
        color: rgb(77,85,93)
        &.current
          position: relative
          z-index: 10
          background-color: #fff
          margin-top: -1px
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1bott(rgba(7,17,27,.2))
          .icon
            float: left
            width: 12px
            height: 12px
            margin-right: 2px
          .decrease
            bg-img('decrease_3')
          .discount
            bg-img('discount_3')
          .invoice
            bg-img('invoice_3')
          .guarantee
            bg-img('guarantee_3')
          .special
            bg-img('special_3')
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background-color: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        border-1bott(rgba(7,17,27,.1))
        padding-bottom: 18px
        &:last-child
          border-none()
          margin-bottom: 0
        .food-icon
          flex: 0 0 56px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc,.extra
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            position: relative
            .cont
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
              font-weight: normal
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: -10px
</style>
