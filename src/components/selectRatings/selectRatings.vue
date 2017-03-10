<template>
  <div class="selectRating">
    <div class="ratingType border-1bott">
      <div class="clearfix">
        <span @click="select(2,$event)" class="all">{{desc.all}}<b>{{ratings.length}}</b></span>
        <span @click="select(0,$event)" class="good">{{desc.goodRating}}<b>{{goodRatings.length}}</b></span>
        <span @click="select(1,$event)" class="bad">{{desc.badRating}}<b>{{badRatings.length}}</b></span>
      </div>
    </div>
    <div @click="onlyText" :class="{'on':onlyContent}" class="switch clearfix">
      <span class="chek">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-check_circle"></use>
        </svg>
      </span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const GoodRating = 0;
  const BadRating = 1;
  const AllRating = 2;
  export default {
    name: 'selectRatings',
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: AllRating
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            goodRating: '满意',
            badRating: '不满意'
          };
        }
      }
    },
    computed: {
      goodRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === GoodRating;
        });
      },
      badRatings () {
        return this.ratings.filter((rating) => {
          return rating.rateType === BadRating;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      },
      onlyText (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('onlytext');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index.styl'
  .ratingType
    padding: 18px 0
    margin: 0 18px
    border-1bott(rgba(7,17,27,0.1))
    span
      float: left
      padding: 8px 12px
      margin-right: 8px
      font-size: 12px
      line-height: 16px
      border-radius: 2px
      b
        font-weight: 400
        margin-left: 6px
        font-size: 10px
    .all
      background-color: rgb(0,160,220)
      color: #fff
    .good
      background-color: rgba(0,160,220,0.2)
      color: rgb(77,85,93)
    .bad
      background-color: rgba(77,85,93,0.2)
      color: rgb(77,85,93)
  .switch
    padding: 0 18px
    border-bottom: 1px solid rgba(7,17,27,.1)
    span
      float: left
      margin: 12px 0
      font-size: 12px
      color: rgb(147,153,159)
      line-height: 24px
      font-weight: 400
    .icon
      margin-right: 4px
      font-size: 24px
  &.on
    .icon
      color: rgb(0,160,220)
    .text
      color: rgb(7,17,27)
</style>
